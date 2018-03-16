require('../../styles/components/topic-list-element.css');

const Handlebars = require('handlebars');
const AbstractComponent = require('./abstract-component');

const console = {
    log: require('debug')('topic-element:component:log')
};

class TopicListElementComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.topic = null;

        this.on('component:render', () => {
            this.$el.querySelector('.js-vote-for-me').addEventListener('click', this._onClickVote.bind(this));
            this.$el.querySelector('.js-append-trainer').addEventListener('click', this._onClickAddTrainer.bind(this));
        });
    }

    compile(topic) {
        this.topic = topic;

        return Handlebars.compile(`
            <div class="topic-list-element is-inline-block">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title ellipsis">
                            <span class="tag is-medium">
                                "{{ topic.name }}"
                            </span>
                        </p>
                    </header>
                
                    <div class="card-content trainers">
                        <!-- Tutaj będą trenerzy //-->
                    </div>

                    <footer class="card-footer">
                        <a href="#" class="card-footer-item js-vote-for-me">
                            ❤️ 
                            {{#if topic.vote}}
                                {{ topic.vote }}
                            {{/if}}
                        </a>

                        <a href="#" class="card-footer-item js-append-trainer">
                            🗣 Zapisz się
                        </a>
                    </footer>
                </div>
            </div>
        `)({ topic });
    }

    _onClickVote(evt) {
        evt.preventDefault();
        this.emit('topic:vote', this.topic);
    }

    _onClickAddTrainer(evt) {
        evt.preventDefault();
        this.emit('trainer:add');
    }

}

module.exports = TopicListElementComponent;
