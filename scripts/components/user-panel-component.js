const AbstractComponent = require('./abstract-component');
const GitHubHelper = require('../helpers/github-helper');

const console = {
    log: require('debug')('user-panel:component:log')
};

class UserPanelComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            this.$el.querySelector('.js-sign-in-via-github').addEventListener('click', this._onClickSignIn.bind(this));
        });
    }

    compile(user = {}) {
        return `
            <nav class="navbar is-transparent">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <a href="./" class="navbar-item">
                            <figure class="image is-32x32">
                                <img 
                                    src="http://warsawjs.com/assets/images/logo/logo-transparent-240x240.png"
                                    alt=""
                                />
                            </figure>
                            <strong>WarsawJS Workshop #18</strong>: Topics Manager
                        </a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item js-sign-in">
                            <a href="#" class="button is-warning js-sign-in-via-github">
                                Zaloguj się za pomocą GitHuba
                            </a>
                        </div>

                        <a class="navbar-item js-user-panel">
                            <figure class="image is-32x32">
                                <img 
                                    src="${user && user.avatar_url}"
                                    alt="${user && user.login}"
                                />
                            </figure>
                            <span>${user && user.name}</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;
    }

    _onClickSignIn() {
        GitHubHelper.redirectAuthorize();
    }

    render(model) {
        super.render(model);
        this._setupUserPanel(model);
    }

    _setupUserPanel(model) {
        const $signIn = document.querySelector('.js-sign-in');
        const $panel = document.querySelector('.js-user-panel');
        if (!model) {
            $panel.classList.add('is-hidden');
            $signIn.classList.remove('is-hidden');
        } else {
            $signIn.classList.add('is-hidden');
            $panel.classList.remove('is-hidden');
        }
    }

}

module.exports = UserPanelComponent;
