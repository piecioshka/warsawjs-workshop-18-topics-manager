const md5 = require('md5');

function generate(email) {
    const hash = md5(email.trim().toLowerCase());
    return 'https://gravatar.com/avatar/' + hash + '?s=200';
}


module.exports = {
    generate
};
