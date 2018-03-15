const AbstractComponent = require('./abstract-component');

const TEMPLATE = (data) => `
    <div class="media">
        <div class="media-left">
            <figure class="image is-48x48">
                <img
                        src="${data.avatar}"
                        alt=""
                />
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">${data.name}</p>
        </div>
    </div>
`;

class TrainerListComponent extends AbstractComponent {

    compile(data) {
        return TEMPLATE(data);
    }

}

module.exports = TrainerListComponent;
