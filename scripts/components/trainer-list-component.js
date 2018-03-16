const AbstractComponent = require('./abstract-component');

class TrainerListComponent extends AbstractComponent {

    compile(trainer) {
        return `
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img
                                src="${trainer.avatar}"
                                alt=""
                        />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${trainer.name}</p>
                </div>
            </div>
        `;
    }

}

module.exports = TrainerListComponent;
