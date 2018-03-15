'use strict';

require('bulma');

const SignInComponent = require('./components/sign-in-component');
const TopicElementComponent = require('./components/topic-element-component');
const TopicListComponent = require('./components/topic-list-component');
const TrainerListComponent = require('./components/trainer-list-component');

const TopicsManager = require('./models/topics-manager');
const TrainersManager = require('./models/trainers-manager');

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
        const a = $list.$el.querySelector('.topics');
        console.log(a);
        const $topics = new TopicElementComponent(a);
        $topics.render(topic);

        topic.trainers.forEach((trainer) => {
            const $trainers = new TrainerListComponent($topics.$el.querySelector('.trainers'));
            $trainers.render(trainer);
        });
    });

}

function renderSignInPanel($app) {
    const $signIn = new SignInComponent($app);
    $signIn.render();
}

function setup() {
    const $app = document.querySelector('#app');
    renderSignInPanel($app);
    renderTopics($app);
}

window.addEventListener('DOMContentLoaded', setup);
