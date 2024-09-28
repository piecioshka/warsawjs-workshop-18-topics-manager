const TopicsManager = require('../services/topics-manager.service');
const TrainersManager = require('../services/trainers-manager.service');
const SERVER_URL = require('../config').SERVER_URL;

const headers = new Headers({
    'Content-Type': 'application/json'
});

class HttpStorageRepository {

    save() {
        const topics = TopicsManager.getList();
        const trainers = TrainersManager.getList();

        Promise.resolve()
            .then(() => {
                return fetch(`${SERVER_URL}topics`, {
                    method: 'PUT',
                    body: JSON.stringify({ topics }),
                    headers
                });
            })
            .then(() => {
                return fetch(`${SERVER_URL}trainers`, {
                    method: 'PUT',
                    body: JSON.stringify(trainers),
                    headers
                });
            });
    }

    restore() {
        return fetch(`${SERVER_URL}db`)
            .then((response) => response.json())
            .then((database) => {
                if (!database) {
                    return;
                }
                TopicsManager.appendList(database.topics);
                TrainersManager.appendList(database.trainers);
            });
    }

}

// Wzorzec: Singleton
module.exports = new HttpStorageRepository;
