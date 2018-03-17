'use strict';

require('bulma');
require('../styles/common.css');

const TopicAddFormComponent = require('./components/topic-add-form.component');
const TopicListElementComponent = require('./components/topic-list-element.component');
const TopicListComponent = require('./components/topic-list.component');
const TrainerListElementComponent = require('./components/trainer-list-element.component');
const UserPanelComponent = require('./components/user-panel.component');
const VersionComponent = require('./components/version.component');

const TopicsManager = require('./models/topics-manager.model');
const TrainersManager = require('./models/trainers-manager.model');

const GitHubAuthService = require('./services/github-auth.service');
const UserService = require('./services/user.service');
const version = require('../package').version;

const console = {
    log: require('debug')('main:log')
};

let $app = null;
let topicsManager = null;
let trainersManager = null;

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
            if (UserService.isLoggedIn()) {
                trainersManager.add(UserService.getUser());
                const status = topicsManager.addTrainer(topic, UserService.getUser());

                // Jeśli udało się dodać trenera to odświeżamy listę tematów.
                if (status) {
                    renderTopics();
                }
            }
        });
        $topics.render({ topic, user: UserService.getUser() });

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

    if (UserService.isLoggedIn()) {
        const $form = new TopicAddFormComponent($app);
        $form.on('topic:input', ({ name }) => {
            topicsManager.addTopic({
                topicName: name,
                trainerId: UserService.getUser().id
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
    $panel.on('user:sign-in', () => {
        GitHubAuthService.fetchProfile()
            .then((profile) => {
                if (profile) {
                    UserService.signIn(profile);
                    render();
                }
            }, (error) => {
                console.log('ups...', error);
            });
    });
    $panel.render(UserService.getUser());
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
    GitHubAuthService.setup();
    init();
    render();
}

window.addEventListener('DOMContentLoaded', setup);
