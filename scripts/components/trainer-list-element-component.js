const Handlebars = require('handlebars');
const AbstractComponent = require('./abstract-component');

const console = {
    log: require('debug')('trainer-list-element:component:log')
};

class TrainerListElementComponent extends AbstractComponent {

    compile(trainer) {
        return Handlebars.compile(`
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img
                                src="{{ trainer.avatar_url }}"
                                alt=""
                        />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4 ellipsis">
                        {{ trainer.name }}
                    </p>
                </div>
            </div>
        `)({ trainer });
    }

}

module.exports = TrainerListElementComponent;
