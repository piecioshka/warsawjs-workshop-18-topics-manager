'use strict';

require('bulma');
require('../styles/common.css');

const TopicAddFormComponent = require('./components/topic-add-form.component');
const TopicListElementComponent = require('./components/topic-list-element.component');
const TopicListComponent = require('./components/topic-list.component');
const TrainerListElementComponent = require('./components/trainer-list-element.component');
const UserPanelComponent = require('./components/user-panel.component');
const VersionComponent = require('./components/version.component');

const StorageRepository = require('./repositories/storage-repository');
const TopicsManager = require('./services/topics-manager.service');
const TrainersManager = require('./services/trainers-manager.service');
const GitHubAuthService = require('./services/github-auth.service');
const UserService = require('./services/user.service');
const version = require('../../package').version;

const console = {
    log: require('debug')('main:log'),
    info: require('debug')('main:info'),
    debug: require('debug')('main:debug'),
    warn: require('debug')('main:warn'),
    error: require('debug')('main:error')
};

let $app = null;

function renderTopics() {
    const topics = TopicsManager.getList();
    console.log('renderTopics', topics.length);

    TopicListComponent.removeElement($app);

    const $list = new TopicListComponent($app);
    $list.render();

    topics.forEach((topic) => {
        const $topicsPlaceholder = $app.querySelector('.topics');
        const $topics = new TopicListElementComponent($topicsPlaceholder);
        $topics.on('topic:vote', (topic) => {
            TopicsManager.vote(topic);
            renderTopics();
            StorageRepository.save();
        });
        $topics.on('trainer:add', (topic) => {
            if (UserService.isLoggedIn()) {
                TrainersManager.add(UserService.getUser());
                const status = TopicsManager.addTrainer(topic, UserService.getUser());

                // Jeśli udało się dodać trenera to odświeżamy listę tematów.
                if (status) {
                    renderTopics();
                    StorageRepository.save();
                }
            }
        });
        $topics.render({ topic, user: UserService.getUser() });

        topic.trainers.forEach((trainerId, index) => {
            const trainer = TrainersManager.getById(trainerId);
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
            TopicsManager.addTopic({
                topicName: name,
                trainerId: UserService.getUser().id
            });
            render();
            StorageRepository.save();
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
        GitHubAuthService.signIn();
    });
    $panel.on('user:sign-out', () => {
        GitHubAuthService.signOut();
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
}

function auth() {
    console.log('auth');
    return GitHubAuthService.fetchProfile()
        .then((profile) => {
            if (profile) {
                UserService.signIn(profile);
                TrainersManager.add(UserService.getUser());
                render();
            }
        }, (error) => {
            console.log('ups...', error);
        });
}

function load() {
    console.log('load');
    // const MOCK_TOPICS = require('../mocks/mock-topics');
    // TopicsManager.appendList(MOCK_TOPICS);
    //
    // const MOCK_TRAINERS = require('../mocks/mock-trainers');
    // TrainersManager.appendList(MOCK_TRAINERS);

    return StorageRepository.restore();
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
    Promise.resolve()
        .then(init)
        .then(auth)
        .then(load)
        .then(render);
}

window.addEventListener('DOMContentLoaded', setup);
