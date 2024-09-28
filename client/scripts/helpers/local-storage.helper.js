const STORAGE = require('../config').STORAGE;

class LocalStorageHelper {

    serialize(data) {
        const dataSerialized = JSON.stringify(data);
        localStorage.setItem(STORAGE.DATABASE, dataSerialized);
    }

    unserialize() {
        const data = localStorage.getItem(STORAGE.DATABASE);

        try {
            return JSON.parse(data);
        } catch (err) {
            return null;
        }
    }

}

// Wzorzec: Singleton
module.exports = new LocalStorageHelper();
