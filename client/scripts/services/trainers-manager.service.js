const debug = require('debug');

const console = {
    log: debug('trainers-manager:service:log'),
    info: debug('trainers-manager:service:info'),
    debug: debug('trainers-manager:service:debug'),
    warn: debug('trainers-manager:service:warn'),
    error: debug('trainers-manager:service:error')
};

class TrainersManager {

    constructor() {
        this.list = [];
    }

    add(trainer) {
        this.list.push(trainer);
    }

    getById(id) {
        return this.list.find((trainer) => {
            return trainer.id === id;
        });
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
window.a = module.exports = new TrainersManager;
