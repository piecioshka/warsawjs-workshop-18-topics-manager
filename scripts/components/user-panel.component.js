const Mustache = require('mustache');

const AbstractComponent = require('./abstract.component');

const console = {
    log: require('debug')('user-panel:component:log'),
    warn: require('debug')('user-panel:component:warn')
};

class UserPanelComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            const $signIn = this.$el.querySelector('.js-sign-in-via-github');
            if ($signIn) {
                $signIn.addEventListener('click', this._onClickSignIn.bind(this));
            }
            const $signOut = this.$el.querySelector('.js-sign-out-via-github');
            if ($signOut) {
                $signOut.addEventListener('click', this._onClickSignOut.bind(this));
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
                                    src="https://warsawjs.com/assets/images/logo/logo-transparent-240x240.png"
                                    alt=""
                                />
                            </figure>
                            <strong>WarsawJS Workshop #18</strong>: Topics Manager
                        </a>
                        <span class="navbar-item js-version-placeholder">
                            <!-- Tutaj będzie wersja aplikacji //-->
                        </span>
                    </div>

                    <div class="navbar-end">
                        {{ #user }}
                            <div class="navbar-item js-sign-in">
                                <a href="#" class="button is-danger js-sign-out-via-github">
                                    Wyloguj
                                </a>
                            </div>

                            <a href="https://github.com/{{ user.login }}" class="navbar-item js-user-panel">
                                <span>{{ user.name }}</span>&nbsp;
                                <figure class="image is-32x32">
                                    <img 
                                        src="{{ user.avatar_url }}"
                                        alt="{{ user.login }}"
                                    />
                                </figure>
                            </a>
                        {{ /user }}
    
                        {{ ^user }}
                            <div class="navbar-item js-sign-in">
                                <a href="#" class="button is-warning js-sign-in-via-github">
                                    <span>Zaloguj się za pomocą GitHuba</span>&nbsp;
                                    <figure class="image is-24x24">
                                        <svg version="1.1" width="24" height="24" viewBox="0 0 16 16" class="octicon octicon-mark-github" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                                    </figure>
                                </a>
                            </div>
                        {{ /user }}
                    </div>
                </div>
            </nav>
        `, { user });
    }

    _onClickSignIn(evt) {
        evt.preventDefault();
        this.emit('user:sign-in');
    }

    _onClickSignOut(evt) {
        evt.preventDefault();
        this.emit('user:sign-out');
    }

}

module.exports = UserPanelComponent;
