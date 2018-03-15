const EventEmitter = require('super-event-emitter');

function toElement(string) {
    let domParser = new DOMParser();
    let document = domParser.parseFromString(string, 'text/html');
    let $fragment = document.createDocumentFragment();
    Array.from(document.body.children).forEach(function ($element) {
        $fragment.appendChild($element);
    });
    return $fragment;
}

class AbstractComponent {

    constructor($parent) {
        // console.log('AbstractComponent#constructor');
        this.$el = null;
        this.$parent = $parent;
        EventEmitter.mixin(this);
    }

    compile() {
        throw new Error('Please override me');
    }

    render(data) {
        // console.log('AbstractComponent#render');
        const compiledHTML = this.compile(data);

        this.$el = toElement(compiledHTML);
        this.$parent.appendChild(this.$el);

        this.emit('component:render');
    }

}

module.exports = AbstractComponent;
