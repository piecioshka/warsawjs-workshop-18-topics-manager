const console = {
    log: require('debug')('trainers-manager:service:log'),
    info: require('debug')('trainers-manager:service:info'),
    debug: require('debug')('trainers-manager:service:debug'),
    warn: require('debug')('trainers-manager:service:warn'),
    error: require('debug')('trainers-manager:service:error')
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
