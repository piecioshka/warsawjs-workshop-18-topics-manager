const AbstractComponent = require('./abstract-component');

const TEMPLATE = () => `
    <div class="topics columns"></div>
`;

class TopicListComponent extends AbstractComponent {

    compile(data) {
        return TEMPLATE(data);
    }

}

module.exports = TopicListComponent;
