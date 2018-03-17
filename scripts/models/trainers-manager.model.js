const MOCK = require('../../mocks/default-list-of-trainers');

class TrainersManager {

    constructor() {
        this.list = [];

        MOCK.forEach(this.add.bind(this));
    }

    add(trainer) {
        this.list.push(trainer);
    }

    getById(id) {
        return this.list.find((trainer) => {
            return trainer.id === id;
        });
    }

}

module.exports = TrainersManager;
