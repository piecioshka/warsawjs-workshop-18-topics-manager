const Handlebars = require('handlebars');
const AbstractComponent = require('./abstract-component');

const console = {
    log: require('debug')('version:component:log')
};

class VersionComponent extends AbstractComponent {

    compile(version) {
        return Handlebars.compile(`
            <div class="section">
                <div class="columns is-mobile is-centered">
                    <div class="column is-narrow">
                        <div class="tags has-addons">
                            <span class="tag is-dark">version</span>
                            <span class="tag is-info">{{ version }}</span>
                        </div>
                    </div>
                </div>
            </div>
        `)({ version });
    }

}

module.exports = VersionComponent;
