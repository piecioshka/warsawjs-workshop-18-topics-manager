require('../../styles/components/topic-list.css');

const AbstractComponent = require('./abstract-component');

const console = {
    log: require('debug')('topic-list:component:log')
};

class TopicListComponent extends AbstractComponent {

    compile() {
        return `
            <div class="section topic-list js-topic-list">
                <div class="container-fluid">
                    <div class="topics"></div>
                </div>
            </div>
        `;
    }

    static removeElement($parent) {
        const $element = $parent.querySelector('.js-topic-list');
        if ($element) {
            $element.parentNode.removeChild($element);
        }
    }

}

module.exports = TopicListComponent;
