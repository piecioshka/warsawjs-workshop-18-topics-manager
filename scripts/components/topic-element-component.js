const AbstractComponent = require('./abstract-component');

class TopicElementComponent extends AbstractComponent {

    constructor($parent) {
        super($parent);

        this.on('component:render', () => {
            this.$el.querySelector('.vote-for-me').addEventListener('click', this._onClickVote.bind(this));
            this.$el.querySelector('.append-trainer').addEventListener('click', this._onClickAddTrainer.bind(this));
        });
    }

    compile(topic) {
        return `
            <div class="column is-one-third">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            ${topic.body}
                        </p>
                    </header>
                
                    <div class="card-content trainers">
                        <!-- Tutaj będą trenerzy //-->
                    </div>
        
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item vote-for-me">❤️</a>
                        <a href="#" class="card-footer-item append-trainer">➕</a>
                    </footer>
                </div>
            </div>
        `;
    }

    _onClickVote() {
        console.log('_onClickVote');
    }

    _onClickAddTrainer() {
        console.log('_onClickAddTrainer');
    }

}

module.exports = TopicElementComponent;
