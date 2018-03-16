const uuid = require('uuid');

const MOCK = require('../../mocks/default-list-of-topics');

const console = {
    log: require('debug')('topics-manager:log')
};

class TopicsManager {

    constructor() {
        this.list = [];

        MOCK.forEach((item) => {
            this.list.push(item);
        });
    }

    add(topic) {
        this.list.push({
            id: uuid.v4(),
            name: topic.topicName,
            trainers: [topic.trainerId],
            vote: 0
        });
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
