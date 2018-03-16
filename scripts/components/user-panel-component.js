const Mustache = require('mustache');
const AbstractComponent = require('./abstract-component');
const GitHubHelper = require('../helpers/github-helper');

const console = {
    log: require('debug')('user-panel:component:log')
};

class UserPanelComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            const $signIn = this.$el.querySelector('.js-sign-in-via-github');
            if ($signIn) {
                $signIn.addEventListener('click', this._onClickSignIn.bind(this));
            }
        });
    }

    compile(user) {
        return Mustache.render(`
            <nav class="navbar is-dark">
                <div class="navbar-menu container">
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
                        {{#user}}
                            <a class="navbar-item js-user-panel">
                                <figure class="image is-32x32">
                                    <img 
                                        src="{{ user.avatar_url }}"
                                        alt="{{ user.login }}"
                                    />
                                </figure>
                                <span>{{ user.name }}</span>
                            </a>
                        {{/user}}
    
                        {{^user}}
                            <div class="navbar-item js-sign-in">
                                <a href="#" class="button is-warning js-sign-in-via-github">
                                    Zaloguj się za pomocą GitHuba
                                </a>
                            </div>
                        {{/user}}
                    </div>
                </div>
            </nav>
        `, { user });
    }

    _onClickSignIn() {
        GitHubHelper.redirectAuthorize();
    }

    render(model) {
        super.render(model);
    }

}

module.exports = UserPanelComponent;
