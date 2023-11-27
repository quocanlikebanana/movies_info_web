import myNamedetail from './contentcomp/namedetail.js'
import myIntro from './contentcomp/intro.js'
import myMoviedetail from './contentcomp/moviedetail.js'
import mySearchresult from './contentcomp/searchresult.js'
import myLoadingscreen from './contentcomp/loadingscreen.js'
import myFavmovies from './contentcomp/favmovies.js'

import fetch from '../fetch.js'

export default {
    data() {
        return {
            favPageData: {},
        }
    },

    components: {
        myIntro,
        mySearchresult,
        myNamedetail,
        myMoviedetail,
        myLoadingscreen,
        myFavmovies,
    },

    props: {
        currentView: {
            type: String,
            default: 'myIntro',
        },
    },

    emits: {
        goFav: null,
        requestDetailMovie: null,
    },

    methods: {
        async updateFavPage(pageNum) {
            this.favPageData = await fetch.getPageFavMovie(pageNum);
        },
        async insertFavMovie(id) {
            await fetch.insertIntoFavMovie(id);
            // Nav to myFavmovies
            this.$emit('goFav');
            this.updateFavPage(1);
        },
        async deleteFavMovie(id) {
            await fetch.deleteFromFavMovie(id);
            this.updateFavPage(1);
        }
    },

    computed: {
        currentProps() {
            if (this.currentView === 'myIntro') {

            } else if (this.currentView === 'mySearchresult') {

            } else if (this.currentView === 'myNamedetail') {

            } else if (this.currentView === 'myMoviedetail') {

            } else if (this.currentView === 'myFavmovies') {
                return {
                    favPage: this.favPageData.data,
                    totalFavPage: this.favPageData.total_page,
                };
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
                return {
                    requestDetailMovie: id => {
                        this.$emit('requestDetailMovie', id)
                    },
                    requestNameDetail: id => {
                        this.$emit('requestNameDetail', id)
                    },
                };
            } else if (this.currentView === 'myNamedetail') {
                return {
                    requestDetailMovie: id => {
                        this.$emit('requestDetailMovie', id)
                    },
                }
            } else if (this.currentView === 'myMoviedetail') {
                return {
                    requestDetailMovie: id => {
                        this.$emit('requestDetailMovie', id)
                    },
                    requestNameDetail: id => {
                        this.$emit('requestNameDetail', id)
                    },
                    requestFavInsert: id => {
                        this.insertFavMovie(id);
                    },
                }
            } else if (this.currentView === 'myFavmovies') {
                return {
                    requestDetailMovie: id => {
                        this.$emit('requestDetailMovie', id)
                    },
                    requestFavPage: pageNum => {
                        this.updateFavPage(pageNum);
                    },
                    requestFavDelete: id => {
                        this.deleteFavMovie(id);
                    },
                };
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