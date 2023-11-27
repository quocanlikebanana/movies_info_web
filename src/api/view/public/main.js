import myHeader from './components/header.js'
import myNavbar from './components/navbar.js'
import myContent from './components/content.js'
import myFooter from './components/footer.js'

import { computed } from 'vue';
import fetchManager from './fetch.js';


export default {
    data() {
        return {
            currentContentView: 'myLoadingscreen',

            top5Rating: [],
            top30Boxoffice: [],
            top30Mostfav: [],

            searchMovieResults: [],
            searchNameResults: [],

            nameDetail: null,
            nameDetailMovies: null,

            movieDetail: null,
            movieReviewList: null,

        }
    },

    async created() {
        this.goIntroDuction();
    },

    provide() {
        return {
            top5Rating: computed(() => this.top5Rating),
            top30Boxoffice: computed(() => this.top30Boxoffice),
            top30Mostfav: computed(() => this.top30Mostfav),

            movieDetail: computed(() => this.movieDetail),
            movieReviewList: computed(() => this.movieReviewList),

            nameDetail: computed(() => this.nameDetail),
            nameDetailMovies: computed(() => this.nameDetailMovies),

            searchMovieResults: computed(() => this.searchMovieResults),
            searchNameResults: computed(() => this.searchNameResults),
        }
    },

    components: {
        myHeader,
        myNavbar,
        myContent,
        myFooter,
    },

    methods: {
        toggleDarkMode() {
            toggleDarkMode();
        },

        // Only fixed this screen transition
        async goIntroDuction() {
            this.currentContentView = 'myLoadingscreen';
            const res = await fetchManager.getIntroData();
            this.top5Rating = res.top5Rating;
            this.top30Boxoffice = res.top30Boxoffice;
            this.top30Mostfav = res.top30Mostfav;
            this.currentContentView = 'myIntro';
        },

        async requestDetailMovieHandler(id) {
            this.currentContentView = 'myLoadingscreen';
            this.movieDetail = await fetchManager.getDetailMovie(id);
            console.log(this.movieDetail);
            if (this.movieDetail == null) {
                alert("Can't find Movie's detail. The movie's probably updating it's info, maybe later ...");
                this.currentContentView = 'myIntro';
            } else {
                this.movieReviewList = await fetchManager.getPageMovieReview(id, 1);
                this.currentContentView = 'myMoviedetail';
            }
        },

        async requestNameDetailHandler(id) {
            this.currentContentView = 'myLoadingscreen';
            this.nameDetail = await fetchManager.getDetailName(id);
            console.log(this.nameDetail);
            if (this.nameDetail == null) {
                alert("Can't find Actor's detail.");
                this.currentContentView = 'myIntro';
            } else {
                this.currentContentView = 'myNamedetail';
            }
        },

        goFav() {
            this.currentContentView = 'myFavmovies';
        },

        async searchHandler(key) {
            this.currentContentView = 'myLoadingscreen';
            this.searchMovieResults = await fetchManager.searchMovie(key);
            this.searchNameResults = await fetchManager.searchName(key);
            this.currentContentView = 'mySearchresult';

        },



    },


    template: /* html */
        `
        <div class="container-fluid d-flex flex-column mx-auto"
                style="max-width: 1200px;">
            <!-- Header -->
            <myHeader />

            <!-- NavBar -->
            <myNavbar @goHome="goIntroDuction"
                @goSearch="(key) => searchHandler(key)"
                @goFav="goFav"/>

            <!-- Content -->
            <myContent
                :currentView="currentContentView"
                @requestDetailMovie="(id) => requestDetailMovieHandler(id)"
                @requestNameDetail="(id) => requestNameDetailHandler(id)"
                @goFav="goFav"/>

            <!-- Footer -->
            <myFooter />
        </div>
        `
}