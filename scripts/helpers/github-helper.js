let ACCESS_TOKEN = null;

const CLIENT_ID = `818f8c60795bd17bc476`;
const CLIENT_SECRET = `9a84fe785140a718847e579da45be0ce67e71f96`;

const CORS_PROXY = `https://cors-anywhere.herokuapp.com/`;
const AUTHORIZE_URL = `https://github.com/login/oauth/authorize`;
const FETCH_ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token`;
const FETCH_PROFILE_URL = `https://api.github.com/user`;

const console = {
    log: require('debug')('github:helper:log'),
    error: require('debug')('github:helper:error')
};

function addQueryParams(urlSearchParamsInstance, queryParams) {
    Object.keys(queryParams).forEach((key) => {
        urlSearchParamsInstance.append(key, queryParams[key]);
    });
}

function redirect(url) {
    console.log('redirect', url);

    location.href = url;
}

function redirectAuthorize() {
    console.log('redirectAuthorize');

    const queryParams = new URLSearchParams();
    addQueryParams(queryParams, {
        client_id: CLIENT_ID
    });
    const authorizeURL = `${AUTHORIZE_URL}?${queryParams.toString()}`;
    redirect(authorizeURL);
}

function authorize(code) {
    console.log('authorize', code);

    const redirectUri = location.href.replace(location.search, '');
    const queryParams = new URLSearchParams();
    addQueryParams(queryParams, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: redirectUri
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
                ACCESS_TOKEN = null;
                return;
            }

            // console.log(response);
            ACCESS_TOKEN = response.access_token;
        })
        .catch(() => {
            ACCESS_TOKEN = null;
        });
}


function fetchProfile() {
    if (!ACCESS_TOKEN) {
        return;
    }

    console.log('fetchProfile');

    const queryParams = new URLSearchParams();
    addQueryParams(queryParams, {
        access_token: ACCESS_TOKEN
    });

    const profileURL = `${FETCH_PROFILE_URL}?${queryParams.toString()}`;

    const options = {
        method: 'GET'
    };

    return fetch(profileURL, options)
        .then((response) => response.json());
}

module.exports = {
    redirectAuthorize,
    authorize,
    fetchProfile
};
