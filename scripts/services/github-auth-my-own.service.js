let ACCESS_TOKEN = null;
const GITHUB = require('../config').GITHUB;
const GITHUB_ACCESS_TOKEN = require('../config').STORAGE.GITHUB_ACCESS_TOKEN;

const CORS_PROXY = `https://cors-anywhere.herokuapp.com/`;
const AUTHORIZE_URL = `https://github.com/login/oauth/authorize`;
const FETCH_ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token`;
const FETCH_PROFILE_URL = `https://api.github.com/user`;

const console = {
    log: require('debug')('github-auth-my-own:service:log'),
    info: require('debug')('github-auth-my-own:service:info'),
    warn: require('debug')('github-auth-my-own:service:warn'),
    debug: require('debug')('github-auth-my-own:service:debug'),
    error: require('debug')('github-auth-my-own:service:error')
};

function redirect(url) {
    console.log('redirect', url);
    location.href = url;
}

function saveAccessToken() {
    localStorage.setItem(GITHUB_ACCESS_TOKEN, ACCESS_TOKEN);
}

function restoreAccessToken() {
    ACCESS_TOKEN = localStorage.getItem(GITHUB_ACCESS_TOKEN);
}

function deleteAccessToken() {
    localStorage.removeItem(GITHUB_ACCESS_TOKEN);
}

function connect() {
    console.log('connect');

    if (ACCESS_TOKEN) return;

    const queryParams = new URLSearchParams({
        client_id: GITHUB.CLIENT_ID
    });
    const authorizeURL = `${AUTHORIZE_URL}?${queryParams.toString()}`;

    redirect(authorizeURL);
}

function authentication(code) {
    console.log('authentication', code);

    const queryParams = new URLSearchParams({
        client_id: GITHUB.CLIENT_ID,
        client_secret: GITHUB.CLIENT_SECRET,
        code: code
    });

    const accessTokenURL = `${FETCH_ACCESS_TOKEN_URL}?${queryParams.toString()}`;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    };

    return fetch(`${CORS_PROXY}${accessTokenURL}`, options)
        .then((response) => response.json())
        .then((response) => {
            if (response.error) {
                console.error(response);
                return null;
            }

            // console.log(response);
            return response.access_token;
        })
        .catch(() => {
            return null;
        });
}

function authorization() {
    console.log('authorization');

    const accessCodeGitHub = new URL(location.href).searchParams.get('code');

    if (!accessCodeGitHub) return Promise.resolve(null);

    if (ACCESS_TOKEN) return Promise.resolve(null);

    return authentication(accessCodeGitHub)
        .then((accessToken) => {
            if (!accessToken) {

                if (accessCodeGitHub) {
                    connect();
                }

                return;
            }

            ACCESS_TOKEN = accessToken;
            saveAccessToken();
        });
}

// -----------------------------------------------------------------------------

function fetchProfile() {
    console.log('fetchProfile');

    restoreAccessToken();

    return authorization()
        .then(() => {
            if (!ACCESS_TOKEN) {
                return Promise.resolve(null);
            }


            const queryParams = new URLSearchParams({
                access_token: ACCESS_TOKEN
            });

            const profileURL = `${FETCH_PROFILE_URL}?${queryParams.toString()}`;

            const options = {
                method: 'GET'
            };

            return fetch(profileURL, options)
                .then((response) => response.json());
        });
}

function signIn() {
    connect();
}

function signOut() {
    deleteAccessToken();
    location.href = location.href.replace(location.search, '');
}

module.exports = {
    fetchProfile,
    signIn,
    signOut
};
