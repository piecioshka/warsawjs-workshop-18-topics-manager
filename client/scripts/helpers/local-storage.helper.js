const STORAGE = require('../config').STORAGE;

class LocalStorageHelper {

    serialize(data) {
        const dataSerialized = JSON.stringify(data);
        localStorage.setItem(STORAGE.DATABASE_KEY, dataSerialized);
    }

    unserialize() {
        const data = localStorage.getItem(STORAGE.DATABASE_KEY);

        try {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }
            return null;
        } catch (err) {
            return null;
        }
    }

}

// Wzorzec: Singleton
module.exports = new LocalStorageHelper();
