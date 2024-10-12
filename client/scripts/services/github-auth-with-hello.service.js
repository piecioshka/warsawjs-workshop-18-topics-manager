const uuid = require("uuid");
const debug = require("debug");
const hello = require("hellojs");
const gitHubAuth = hello("github");
const GITHUB = require("../config").GITHUB;

// WARNING: This integration has sometimes issues, because https://github.com/MrSwitch/hello.js/issues/670

const console = {
    log: debug("github-auth-with-hello:service:log"),
    info: debug("github-auth-with-hello:service:info"),
    warn: debug("github-auth-with-hello:service:warn"),
    debug: debug("github-auth-with-hello:service:debug"),
    error: debug("github-auth-with-hello:service:error"),
};

function authorization() {
    console.log("authorization");
    return gitHubAuth.login();
}

// -----------------------------------------------------------------------------

function fetchProfile() {
    console.log("fetchProfile");

    hello.init(
        {
            github: GITHUB.CLIENT_ID,
        },
        {
            redirect_uri: location.href,
            scope: GITHUB.SCOPE,
            state: uuid.v4(),
        }
    );

    const status = gitHubAuth.getAuthResponse();

    if (!status) {
        return Promise.reject("user is not authenticated");
    }

    return gitHubAuth.api("/me");
}

function signIn() {
    console.log("signIn");
    authorization().then(() => {
        location.reload();
    });
}

function signOut() {
    console.log("signOut");
    gitHubAuth.logout().then(() => {
        location.reload();
    });
}

module.exports = {
    fetchProfile,
    signIn,
    signOut,
};
