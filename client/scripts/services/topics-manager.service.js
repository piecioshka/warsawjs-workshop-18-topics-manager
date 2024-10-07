const uuid = require('uuid');
const debug = require('debug');

const console = {
    log: debug('topics-manager:service:log'),
    info: debug('topics-manager:service:info'),
    debug: debug('topics-manager:service:debug'),
    warn: debug('topics-manager:service:warn'),
    error: debug('topics-manager:service:error')
};

class TopicsManager {

    constructor() {
        this.list = [];
    }

    addTopic(topic) {
        this.list.push({
            id: uuid.v4(),
            name: topic.topicName,
            trainers: [topic.trainerId],
            vote: 0
        });
    }

    addTrainer(topic, user) {
        const foundTopic = this.list.find((item) => {
            return item.id === topic.id;
        });

        if (!foundTopic) {
            return;
        }

        if (foundTopic.trainers.includes(user.id)) {
            // Zabezpieczenie przed duplikatami
            console.warn('Attempt to add user who is already on trainer list');
            return;
        }

        foundTopic.trainers.push(user.id);
    }

    vote({ id }) {
        const topic = this.list.find((topic) => {
            return topic.id === id;
        });

        if (!topic) {
            return;
        }

        topic.vote++;
    }

    appendList(list) {
        if (!Array.isArray(list)) {
            console.warn('List is not an array');
            return;
        }
        this.list = this.list.concat(list);
    }

    getList() {
        return this.list;
    }

}

// Wzorzec: Singleton
window.b = module.exports = new TopicsManager;
