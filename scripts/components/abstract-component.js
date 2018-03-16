const EventEmitter = require('super-event-emitter');

class AbstractComponent extends EventEmitter {

    constructor($parent) {
        super();

        this.$el = document.createElement('div');
        this.$parent = $parent;
    }

    render(model) {
        this.$el.innerHTML = this.compile(model);
        this.$el = this.$parent.appendChild(this.$el.firstElementChild);
        this.emit('component:render');
    }

}

module.exports = AbstractComponent;
