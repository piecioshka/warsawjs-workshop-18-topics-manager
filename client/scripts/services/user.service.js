class UserService {

    constructor() {
        this._user = null;
    }

    signIn(user) {
        this._user = user;
    }

    signOut() {
        this._user = null;
    }

    getUser() {
        return this._user;
    }

    isLoggedIn() {
        return (this._user !== null);
    }

}

// Wzorzec: Singleton
module.exports = new UserService;
