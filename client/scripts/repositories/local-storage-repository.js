const TopicsManager = require('../services/topics-manager.service');
const TrainersManager = require('../services/trainers-manager.service');
const LocaleStorageHelper = require('../helpers/local-storage.helper');

class LocalStorageRepository {

    save() {
        return new Promise((resolve, reject) => {
            const topics = TopicsManager.getList();
            const trainers = TrainersManager.getList();
            LocaleStorageHelper.serialize({ topics, trainers });
            resolve();
        });
    }

    restore() {
        return new Promise((resolve) => {
            const database = LocaleStorageHelper.unserialize();
            if (!database) {
                return resolve();
            }
            TopicsManager.appendList(database.topics);
            TrainersManager.appendList(database.trainers);
            resolve();
        });
    }

}

// Wzorzec: Singleton
module.exports = new LocalStorageRepository;
