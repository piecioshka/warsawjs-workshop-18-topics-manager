const AbstractComponent = require('./abstract-component');
const GitHubHelper = require('../helpers/github-helper');

const TEMPLATE = () => `
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    <a href="/">WarsawJS Workshop: Topics Manager</a>
                </h1>

                <h2 class="subtitle">
                    Jesteś trenerem? Chcesz dodać nowy temat?
                </h2>

                <button class="button">
                    Zaloguj się za pomocą GitHuba
                </button>
            </div>
        </div>
    </section>
`;

class SignInComponent extends AbstractComponent {

    compile(data) {
        return TEMPLATE(data);
    }

    registerSignInButton() {
        const $button = document.querySelector('button');

        $button.addEventListener('click', () => {
            GitHubHelper.redirectAuthorize();
        });
    }

    readCodeFromUrl() {
        const accessCodeGitHub = new URL(location.href).searchParams.get('code');

        if (accessCodeGitHub) {
            GitHubHelper.authorize(accessCodeGitHub);
        }
    }

}

module.exports = SignInComponent;
