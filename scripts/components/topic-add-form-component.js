const AbstractComponent = require('./abstract-component');

const ENTER_KEY_CODE = 13;

const console = {
    log: require('debug')('topic-ad-form:component:log')
};

class TopicAddFormComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            this.$el.querySelector('.js-topic-name').addEventListener('keydown', this._onKeydownTopicName.bind(this));
            this.$el.querySelector('.js-add-button').addEventListener('click', this._onClickAddButton.bind(this));
        });
    }

    compile() {
        return `
            <article class="message is-success">
                <div class="message-header">
                    <p>Dodaj temat warsztatów</p>
                </div>
                <div class="message-body">
                    <div class="field is-grouped js-topic-and-form">
                        <div class="control is-expanded">
                            <input class="input js-topic-name" type="text" placeholder="Wpisz tutaj temat warsztatów jakie chciałbyś poprowadzić"/>
                        </div>
                        <div class="control">
                            <a class="button is-success js-add-button">
                                Dodaj nowy temat
                            </a>
                        </div>
                    </div>    
                </div>
            </article>
        `;
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
        return this.$el.querySelector('.js-topic-name').value;
    }

    _resetTopicInputValue() {
        this.$el.querySelector('.js-topic-name').value = '';
    }

    static removeElement($parent) {
        const $element = $parent.querySelector('.js-topic-and-form');
        if ($element) {
            $element.parentNode.removeChild($element);
        }
    }

}

module.exports = TopicAddFormComponent;
