const AbstractComponent = require('./abstract-component');
const GitHubHelper = require('../helpers/github-helper');

class SignInComponent extends AbstractComponent {

    compile() {
        return `
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
    }

    registerSignInButton() {
        const $button = document.querySelector('button');

        $button.addEventListener('click', () => {
            GitHubHelper.redirectAuthorize();
        });
    }

    render(model) {
        super.render(model);
        this.registerSignInButton();
    }

}

module.exports = SignInComponent;
