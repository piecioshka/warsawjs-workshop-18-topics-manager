'use strict';

require('bulma');
require('../styles/common.css');

const TopicAddFormComponent = require('./components/topic-add-form-component');
const TopicListElementComponent = require('./components/topic-list-element-component');
const TopicListComponent = require('./components/topic-list-component');
const TrainerListElementComponent = require('./components/trainer-list-element-component');
const UserPanelComponent = require('./components/user-panel-component');
const VersionComponent = require('./components/version-component');

const TopicsManager = require('./models/topics-manager');
const TrainersManager = require('./models/trainers-manager');

const GitHubHelper = require('./helpers/github-helper');
const version = require('../package').version;

const console = {
    log: require('debug')('main:log')
};

let user = null;
let $app = null;
let topicsManager = null;
let trainersManager = null;

function setupGitHubAuthorization() {
    const accessCodeGitHub = new URL(location.href).searchParams.get('code');

    if (accessCodeGitHub) {
        Promise.resolve()
            .then(() => {
                return GitHubHelper.authorize(accessCodeGitHub);
            })
            .then(() => {
                return GitHubHelper.fetchProfile();
            })
            .then((gitHubProfile) => {
                if (gitHubProfile) {
                    user = gitHubProfile;
                    render();
                }
            })
            .catch((error) => {
                console.log('ups...', error);
            });
    }
}

function renderTopics() {
    const topics = topicsManager.getList();
    console.log('renderTopics', topics.length);

    TopicListComponent.removeElement($app);

    const $list = new TopicListComponent($app);
    $list.render();

    topics.forEach((topic) => {
        const $topicsPlaceholder = $app.querySelector('.topics');
        const $topics = new TopicListElementComponent($topicsPlaceholder);
        $topics.on('topic:vote', (topic) => {
            topicsManager.vote(topic);
            renderTopics();
        });
        $topics.on('trainer:add', (topic) => {
            if (user) {
                trainersManager.add(user);
                const status = topicsManager.addTrainer(topic, user);

                // Jeśli udało się dodać trenera to odświeżamy listę tematów.
                if (status) {
                    renderTopics();
                }
            }
        });
        $topics.render({ topic, user });

        topic.trainers.forEach((trainerId, index) => {
            const trainer = trainersManager.getById(trainerId);
            const $trainerPlaceholder = $topics.$el.querySelector('.trainers');
            const $trainers = new TrainerListElementComponent($trainerPlaceholder);
            $trainers.render(trainer);

            if (index === 0) {
                $trainers.$el.classList.add('selected');
            }
        });
    });
}

function renderTopicAddForm() {
    console.log('renderTopicAddForm');

    if (user) {
        const $form = new TopicAddFormComponent($app);
        $form.on('topic:input', ({ name }) => {
            topicsManager.addTopic({
                topicName: name,
                trainerId: user.id
            });
            render();
        });
        $form.render();
    } else {
        TopicAddFormComponent.removeElement($app);
    }
}

function renderUserPanel() {
    console.log('renderUserPanel');
    const $panel = new UserPanelComponent($app);
    $panel.render(user);
}

function renderVersion() {
    console.log('renderVersion');
    const $version = new VersionComponent($app.querySelector('.js-version-placeholder'));
    $version.render(version);
}

function init() {
    console.log('init');
    $app = document.querySelector('#app');
    topicsManager = new TopicsManager();
    trainersManager = new TrainersManager();
}

function render() {
    console.log('render');
    $app.innerHTML = '';
    renderUserPanel();
    renderTopicAddForm();
    renderTopics();
    renderVersion();
}

function setup() {
    console.log('setup');
    setupGitHubAuthorization();
    init();
    render();
}

window.addEventListener('DOMContentLoaded', setup);
