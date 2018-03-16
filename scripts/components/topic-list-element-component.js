require('../../styles/components/topic-list-element.css');

const Mustache = require('mustache');
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

        return Mustache.render(`
            <div class="topic-list-element is-inline-block">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Temat: "{{ topic.name }}"
                        </p>
                    </header>
                
                    <div class="card-content trainers">
                        <!-- Tutaj będą trenerzy //-->
                    </div>

                    <footer class="card-footer">
                        <a href="#" class="card-footer-item js-vote-for-me">
                            ❤️ 
                            {{#topic.vote}}
                                {{ topic.vote }}
                            {{/topic.vote}}
                        </a>

                        <a href="#" class="card-footer-item js-append-trainer">
                            🗣 Zapisz się
                        </a>
                    </footer>
                </div>
            </div>
        `, { topic });
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
