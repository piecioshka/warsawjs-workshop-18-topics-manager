const GravatarHelper = require('../helpers/gravatar-helper');

const MOCK = require('../../mocks/default-list-of-trainers');

class TrainersManager {

    constructor() {
        this.list = [];

        MOCK.forEach((mock) => {
            this.add(mock);
        });
    }

    add(trainer) {
        trainer.avatar = GravatarHelper.generate(trainer.email);
        this.list.push(trainer);
    }

    getById(id) {
        return this.list.find((trainer) => {
            return trainer._id === id;
        });
    }

}

module.exports = TrainersManager;
