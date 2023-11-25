import myActordetail from './contentcomp/actordetail.js'
import myIntro from './contentcomp/intro.js'
import myMoviedetail from './contentcomp/moviedetail.js'
import mySearchresult from './contentcomp/searchresult.js'
import myLoadingscreen from './contentcomp/loadingscreen.js'

export default {
    data() {
        return {
        }
    },

    components: {
        myIntro,
        mySearchresult,
        myActordetail,
        myMoviedetail,
        myLoadingscreen,
    },

    props: {
        currentView: {
            type: String,
            default: 'myIntro',
        },
    },

    computed: {
        currentProps() {
            if (this.currentView === 'myIntro') {

            } else if (this.currentView === 'mySearchresult') {

            } else if (this.currentView === 'myActordetail') {

            } else if (this.currentView === 'myMoviedetail') {

            } else if (this.currentView === 'myLoadingscreen') {

            }
            return {};
        },
        currentEvents() {
            if (this.currentView === 'myIntro') {
                return {
                    requestDetailMovie: id => {
                        this.$emit('requestDetailMovie', id)
                    },
                };
            } else if (this.currentView === 'mySearchresult') {

            } else if (this.currentView === 'myActordetail') {

            } else if (this.currentView === 'myMoviedetail') {
                return {
                    requestActorDetail: id => {
                        this.$emit('requestActorDetail', id)
                    }
                }
            } else if (this.currentView === 'myLoadingscreen') {

            }
            return {};
        }
    },

    template: /* html */
        `
        <main class="my-5">

        <!-- Switches -->
            <!-- Introduction View -->
            <!-- List movie Cardview -->
            <!-- Movie Details -->
            <!-- Actor Details -->
            <KeepAlive>
                <component :is="currentView"
                    v-bind="currentProps"
                    v-on="currentEvents">
                </component>
            </KeepAlive>

        </main>

        `
}