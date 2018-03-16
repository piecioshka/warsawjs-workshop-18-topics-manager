require('../../styles/components/topic-list-element.scss');

const Mustache = require('mustache');
const AbstractComponent = require('./abstract-component');
const TOPIC_READY_TO_RELEASE = require('../config').TOPIC_READY_TO_RELEASE;

const console = {
    log: require('debug')('topic-element:component:log')
};

class TopicListElementComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.topic = null;

        this.on('component:render', () => {
            const $vote = this.$el.querySelector('.js-vote-for-me');
            $vote.addEventListener('click', this._onClickVote.bind(this));

            const $addTrainer = this.$el.querySelector('.js-add-trainer');
            if ($addTrainer) {
                $addTrainer.addEventListener('click', this._onClickAddTrainer.bind(this));
            }
        });
    }

    compile({ topic, user }) {
        this.topic = topic;

        return Mustache.render(`
            <div class="topic-list-element is-inline-block">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title ellipsis">
                            <span class="tag is-medium is-dark">
                                Temat:
                            </span>&nbsp;
                            "{{ topic.name }}"
                        </p>
                    </header>

                    <div class="card-content trainers">
                        <!-- Tutaj będą trenerzy //-->
                    </div>

                    <footer class="card-footer">
                        <a href="#" class="card-footer-item js-vote-for-me">
                            ❤️ 
                            {{ #topic.vote }}
                                {{ topic.vote }}
                            {{ /topic.vote }}
                        </a>

                        {{ #user }}
                            <a href="#" class="card-footer-item js-add-trainer">
                                🗣 Zapisz się
                            </a>
                        {{ /user }}
                    </footer>
                </div>
            </div>
        `, { topic, user });
    }

    _onClickVote(evt) {
        evt.preventDefault();
        this.emit('topic:vote', this.topic);
    }

    _onClickAddTrainer(evt) {
        evt.preventDefault();
        this.emit('trainer:add', this.topic);
    }

    render({ topic, user }) {
        super.render(({ topic, user }));
        this._setupReadyToRelease(topic);
    }

    _setupReadyToRelease(topic) {
        const isReadyToRelease = (topic.trainers.length >= TOPIC_READY_TO_RELEASE.TRAINERS_COUNT
            && topic.vote >= TOPIC_READY_TO_RELEASE.VOTES_COUNT);

        if (isReadyToRelease) {
            this.$el.querySelector('.card').classList.add('ready-to-release');
        }
    }
}

module.exports = TopicListElementComponent;
