const GITHUB = require('../config').GITHUB;

const hello = require('hellojs');

const console = {
    log: require('debug')('github-auth-with-hello:service:log'),
    info: require('debug')('github-auth-with-hello:service:info'),
    warn: require('debug')('github-auth-with-hello:service:warn'),
    debug: require('debug')('github-auth-with-hello:service:debug'),
    error: require('debug')('github-auth-with-hello:service:error')
};

function authorization() {
    return hello('github').login();
}

// -----------------------------------------------------------------------------

function setup() {
    hello.init({
        github: GITHUB.CLIENT_ID
    }, {
        redirect_uri: 'http://localhost:1234/'
    });
}

function fetchProfile() {
    return authorization()
        .then(() => {
            return hello('github').api('/me');
        });
}

module.exports = {
    setup,
    fetchProfile
};
