require('../../styles/components/topic-list.scss');

const Mustache = require('mustache');
const AbstractComponent = require('./abstract.component');

const console = {
    log: require('debug')('topic-list:component:log')
};

class TopicListComponent extends AbstractComponent {

    compile() {
        return Mustache.render(`
            <div class="section topic-list js-topic-list">
                <div class="container">
                    <div class="topics columns is-multiline"></div>
                </div>
            </div>
        `);
    }

    static removeElement($parent) {
        const $element = $parent.querySelector('.js-topic-list');
        if ($element) {
            $element.parentNode.removeChild($element);
        }
    }

}

module.exports = TopicListComponent;
