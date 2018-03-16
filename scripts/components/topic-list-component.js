const AbstractComponent = require('./abstract-component');

class TopicListComponent extends AbstractComponent {

    compile() {
        return `
            <div class="topics columns"></div>
        `;
    }

}

module.exports = TopicListComponent;
