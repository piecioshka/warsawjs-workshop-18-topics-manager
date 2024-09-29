require('../../styles/components/trainer-list-element.scss');

const Mustache = require('mustache');
const AbstractComponent = require('./abstract.component');
const UNKNOWN_TRAINER = require('../config').UNKNOWN_TRAINER;

const console = {
    log: require('debug')('trainer-list-element:component:log')
};

class TrainerListElementComponent extends AbstractComponent {

    compile(trainer) {
        const avatar = (trainer && trainer.avatar_url) || UNKNOWN_TRAINER.AVATAR_URL;
        const name = (trainer && trainer.name) || UNKNOWN_TRAINER.NAME;
        const login = (trainer && trainer.login) || UNKNOWN_TRAINER.LOGIN;
        const profile_url = `https://github.com/${login}`;

        return Mustache.render(`
            <div class="media trainer-list-element">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <a href="{{ profile_url }}">

                            <img
                                    src="{{ avatar }}"
                                    alt=""
                            />
                        </a>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="ellipsis">
                        <a href="{{ profile_url }}">
                            {{ name }}
                        </a>
                    </p>
                </div>
            </div>
        `, { name, avatar, profile_url });
    }

}

module.exports = TrainerListElementComponent;
