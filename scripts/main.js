'use strict';

require('bulma');

const SignInComponent = require('./components/sign-in-component');
const TopicElementComponent = require('./components/topic-element-component');
const TopicListComponent = require('./components/topic-list-component');
const TrainerListComponent = require('./components/trainer-list-component');

const TopicsManager = require('./models/topics-manager');
const TrainersManager = require('./models/trainers-manager');

const GitHubHelper = require('./helpers/github-helper');

function renderTopics($app) {
    const topicsManager = new TopicsManager();
    const trainersManager = new TrainersManager();

    const topics = topicsManager.getAll();
    topics.forEach((topic) => {
        topic.trainers = topic.trainers.map((trainerId) => {
            return trainersManager.getById(trainerId);
        });
    });

    const $list = new TopicListComponent($app);
    $list.render();

    topics.forEach((topic) => {
        const $topicsPlaceholder = $app.querySelector('.topics');
        const $topics = new TopicElementComponent($topicsPlaceholder);
        $topics.render(topic);

        topic.trainers.forEach((trainer) => {
            const $trainerPlaceholder = $topics.$el.querySelector('.trainers');
            const $trainers = new TrainerListComponent($trainerPlaceholder);
            $trainers.render(trainer);
        });
    });

}

function renderSignInPanel($app) {
    const $signIn = new SignInComponent($app);
    $signIn.render();
}

function setupGitHubAuthorization() {
    const accessCodeGitHub = new URL(location.href).searchParams.get('code');

    if (accessCodeGitHub) {
        GitHubHelper.authorize(accessCodeGitHub);
    }
}

function setup() {
    setupGitHubAuthorization();
    const $app = document.querySelector('#app');
    renderSignInPanel($app);
    renderTopics($app);
}

window.addEventListener('DOMContentLoaded', setup);
