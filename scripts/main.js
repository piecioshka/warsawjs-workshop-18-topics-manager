'use strict';

require('bulma');

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

function renderTopics() {
    const topics = topicsManager.getList();
    console.log('renderTopics', topics.length);

    const $list = new TopicListComponent($app);
    $list.render();

    topics.forEach((topic) => {
        const $topicsPlaceholder = $app.querySelector('.topics');
        const $topics = new TopicListElementComponent($topicsPlaceholder);
        $topics.on('topic:vote', (topic) => {
            topicsManager.vote(topic);
            render();
        });
        $topics.on('trainer:add', () => {
            if (user) {
                trainersManager.add(user);
                render();
            }
        });
        $topics.render(topic);

        topic.trainers.forEach((trainerId) => {
            const trainer = trainersManager.getById(trainerId);
            const $trainerPlaceholder = $topics.$el.querySelector('.trainers');
            const $trainers = new TrainerListElementComponent($trainerPlaceholder);
            $trainers.render(trainer);
        });
    });
}

function renderTopicAddForm() {
    if (user) {
        const $form = new TopicAddFormComponent($app);
        $form.on('topic:input', ({ name }) => {
            topicsManager.add({
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

function renderUserPanel() {
    const $panel = new UserPanelComponent($app);
    $panel.render(user);
}

function renderVersion() {
    const $version = new VersionComponent($app);
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
    setupGitHubAuthorization();
    init();
    render();
}

window.addEventListener('DOMContentLoaded', setup);
