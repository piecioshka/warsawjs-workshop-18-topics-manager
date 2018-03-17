const GITHUB = require('../config').GITHUB;

const hello = require('hellojs');
const gitHubAuth = hello('github');

const console = {
    log: require('debug')('github-auth-with-hello:service:log'),
    info: require('debug')('github-auth-with-hello:service:info'),
    warn: require('debug')('github-auth-with-hello:service:warn'),
    debug: require('debug')('github-auth-with-hello:service:debug'),
    error: require('debug')('github-auth-with-hello:service:error')
};

function authorization() {
    console.log('authorization');

    return gitHubAuth.login();
}

// -----------------------------------------------------------------------------

function fetchProfile() {
    console.log('fetchProfile');

    hello.init({
        github: GITHUB.CLIENT_ID
    }, {
        redirect_uri: 'http://localhost:1234/'
    });

    const status = gitHubAuth.getAuthResponse();

    if (!status) return Promise.resolve(null);

    return gitHubAuth.api('/me');
}

function signIn() {
    console.log('signIn');
    authorization()
        .then(() => {
            location.reload(true);
        });
}

function signOut() {
    console.log('signOut');
    return hello.logout('github')
        .then(() => {
            location.reload(true);
        });
}

module.exports = {
    fetchProfile,
    signIn,
    signOut
};
