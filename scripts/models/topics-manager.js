const uuid = require('uuid');

const MOCK = require('../../mocks/default-list-of-topics');

class TopicsManager {

    constructor() {
        this.list = [];

        MOCK.forEach((mock) => {
            this.list.push(mock);
        });
    }

    add({ topicBody }) {
        this.list.push({
            _id: uuid.v4(),
            body: topicBody
        });
    }

    vote({ topicId }) {

    }

    getAll() {
        return MOCK;
    }
}

module.exports = TopicsManager;
