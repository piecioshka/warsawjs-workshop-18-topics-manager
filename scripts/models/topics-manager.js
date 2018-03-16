const uuid = require('uuid');

const MOCK = require('../../mocks/default-list-of-topics');

const console = {
    log: require('debug')('topics-manager:log'),
    warn: require('debug')('topics-manager:warn')
};

class TopicsManager {

    constructor() {
        this.list = [];

        MOCK.forEach((item) => {
            this.list.push(item);
        });
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

    getList() {
        return this.list;
    }

}

module.exports = TopicsManager;
