const uuid = require("uuid");
const debug = require("debug");

const GITHUB = require("../config").GITHUB;
const GITHUB_ACCESS_TOKEN_KEY =
    require("../config").STORAGE.GITHUB_ACCESS_TOKEN_KEY;

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_PROFILE_URL = "https://api.github.com/user";

const console = {
    log: debug("github-auth-my-own:service:log"),
    info: debug("github-auth-my-own:service:info"),
    warn: debug("github-auth-my-own:service:warn"),
    debug: debug("github-auth-my-own:service:debug"),
    error: debug("github-auth-my-own:service:error"),
};

let ACCESS_TOKEN = null;

const TokenRepository = {
    saveAccessToken() {
        console.debug("TokenRepository, saveAccessToken");
        localStorage.setItem(GITHUB_ACCESS_TOKEN_KEY, ACCESS_TOKEN);
    },

    restoreAccessToken() {
        ACCESS_TOKEN = localStorage.getItem(GITHUB_ACCESS_TOKEN_KEY);
        console.debug("TokenRepository, restoreAccessToken", { ACCESS_TOKEN });
    },

    deleteAccessToken() {
        console.debug("TokenRepository, deleteAccessToken");
        localStorage.removeItem(GITHUB_ACCESS_TOKEN_KEY);
    },
};

function buildUrl(uri, params) {
    const url = new URL(uri);
    Object.keys(params).forEach((key) => {
        url.searchParams.append(key, params[key]);
    });
    return url.toString();
}

function requestTemporaryToken() {
    console.log("requestTemporaryToken");

    if (ACCESS_TOKEN) return;

    const authorizeURL = buildUrl(AUTHORIZE_URL, {
        client_id: GITHUB.CLIENT_ID,
        redirect_uri: location.href,
        scope: GITHUB.SCOPE,
        state: uuid.v4(),
    });

    location.href = authorizeURL;
}

function fetchAccessToken(params) {
    console.log("fetchAccessToken", params);

    const accessTokenParams = {
        client_id: GITHUB.CLIENT_ID,
        client_secret: GITHUB.CLIENT_SECRET,
        code: params.code,
    };
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(accessTokenParams),
    };

    return fetch(CORS_PROXY + ACCESS_TOKEN_URL, options)
        .then((response) => response.json())
        .then((response) => {
            if (response.error) {
                throw new Error(response.error_description);
            }

            return response.access_token;
        });
}

function authorization() {
    console.log("authorization");

    const params = {
        code: new URL(location.href).searchParams.get("code"),
    };

    if (ACCESS_TOKEN) {
        return Promise.resolve();
    }

    if (!params.code) {
        return Promise.reject("missing code parameter");
    }

    return fetchAccessToken(params).then((accessToken) => {
        ACCESS_TOKEN = accessToken;
        TokenRepository.saveAccessToken();
        // Usuwamy zbędne parametry np. code, state, które ustawił GitHub OAuth2
        location.href = location.href.replace(location.search, "");
    });
}

function makeAuthRequest(url) {
    console.log("makeAuthRequest", url);
    const options = {
        headers: {
            Authorization: `token ${ACCESS_TOKEN}`,
        },
    };
    return fetch(url, options).then((response) => response.json());
}

// -----------------------------------------------------------------------------

function fetchProfile() {
    console.log("fetchProfile");

    TokenRepository.restoreAccessToken();

    return authorization().then(() => {
        if (!ACCESS_TOKEN) {
            return Promise.reject("missing ACCESS_TOKEN");
        }

        return makeAuthRequest(GITHUB_PROFILE_URL);
    });
}

function signIn() {
    console.log("signIn");
    requestTemporaryToken();
}

function signOut() {
    console.log("signOut");
    TokenRepository.deleteAccessToken();
    // Usuwamy zbędne parametry np. code, state, które ustawił GitHub OAuth2
    location.href = location.href.replace(location.search, "");
}

module.exports = {
    fetchProfile,
    signIn,
    signOut,
};
