const CLIENT_ID = `818f8c60795bd17bc476`;
const CLIENT_SECRET = `9a84fe785140a718847e579da45be0ce67e71f96`;

const AUTHORIZE_URL = `https://github.com/login/oauth/authorize`;
const FETCH_ACCESS_TOKEN_URL = `https://github.com/login/oauth/access_token`;

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

    const method = 'POST';
    const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: location.origin
    };
    const queryParams = new URLSearchParams();
    addQueryParams(queryParams, body);

    const accessTokenURL = `${FETCH_ACCESS_TOKEN_URL}?${queryParams.toString()}`;
    const options = {
        method
    };

    fetch(accessTokenURL, options)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = {
    redirectAuthorize,
    authorize
};
