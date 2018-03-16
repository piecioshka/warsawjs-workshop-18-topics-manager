const AbstractComponent = require('./abstract-component');

class VersionComponent extends AbstractComponent {

    compile(version) {
        return `
            <div class="columns is-mobile is-centered">
                <div class="column is-narrow">
                    <div class="tags has-addons">
                        <span class="tag is-dark">version</span>
                        <span class="tag is-info">${version}</span>
                    </div>
                </div>
            </div>
        `;
    }

}

module.exports = VersionComponent;
