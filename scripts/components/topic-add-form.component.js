require('../../styles/components/topic-add-form.scss');

const Mustache = require('mustache');
const AbstractComponent = require('./abstract.component');

const ENTER_KEY_CODE = 13;

const console = {
    log: require('debug')('topic-ad-form:component:log')
};

class TopicAddFormComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            this.$name = this.$el.querySelector('.js-topic-name');
            this.$name.addEventListener('keydown', this._onKeydownTopicName.bind(this));

            this.$button = this.$el.querySelector('.js-add-button');
            this.$button.addEventListener('click', this._onClickAddButton.bind(this));
        });
    }

    compile() {
        return Mustache.render(`
            <div class="container topic-add-form">
                <article class="message is-success">
                    <div class="message-header">
                        <p>Dodaj temat warsztatów</p>
                    </div>
                    <div class="message-body">
                        <div class="field is-grouped js-topic-and-form">
                            <div class="control is-expanded">
                                <input class="input js-topic-name" type="text" placeholder="Wpisz temat warsztatów jaki chciałbyś poprowadzić"/>
                            </div>
                            <div class="control">
                                <a class="button is-success js-add-button">
                                    Dodaj nowy temat
                                </a>
                            </div>
                        </div>    
                    </div>
                </article>
            </div>
        `);
    }

    _onKeydownTopicName(evt) {
        if (evt.keyCode !== ENTER_KEY_CODE) {
            return;
        }

        this.emit('topic:input', { name: this._getTopicInputValue() });
        this._resetTopicInputValue();
    }

    _onClickAddButton(evt) {
        evt.preventDefault();
        this.emit('topic:input', { name: this._getTopicInputValue() });
        this._resetTopicInputValue();
    }

    _getTopicInputValue() {
        return this.$name.value;
    }

    _resetTopicInputValue() {
        this.$name.value = '';
        this.$name.focus();
    }

    static removeElement($parent) {
        const $element = $parent.querySelector('.js-topic-and-form');
        if ($element) {
            $element.parentNode.removeChild($element);
        }
    }

}

module.exports = TopicAddFormComponent;
