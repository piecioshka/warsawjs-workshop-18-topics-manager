const Mustache = require('mustache');
const AbstractComponent = require('./abstract-component');

const console = {
    log: require('debug')('version:component:log')
};

class VersionComponent extends AbstractComponent {

    compile(version) {
        return Mustache.render(`
            <div class="tags has-addons">
                <span class="tag">version</span>
                <span class="tag is-info">{{ version }}</span>
            </div>
        `, { version });
    }

}

module.exports = VersionComponent;
