import myHeader from './components/header.js'
import myNavbar from './components/navbar.js'
import myContent from './components/content.js'
import myFooter from './components/footer.js'

import { computed } from 'vue';


export default {
    data() {
        return {
            currentContentView: 'myLoadingscreen',

            top5Gross: [],
            top15Popular: [],
            top15Rating: [],

            searchData: null,

            actorDetailData: null,
            actorDetailMovies: null,

            movieDetailData: null,
            movieDetailReview: null,

        }
    },

    async created() {
        this.goIntroDuction();
    },

    provide() {
        return {
            top5Gross: computed(() => this.top5Gross),
            top15Popular: computed(() => this.top15Popular),
            top15Rating: computed(() => this.top15Rating),

            movieDetailData: computed(() => this.movieDetailData),
            movieDetailReview: computed(() => this.movieDetailReview),

            actorDetailData: computed(() => this.actorDetailData),
            actorDetailMovies: computed(() => this.actorDetailMovies),
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
            const url = [
                'get/topboxoffice/?per_page=5&page=1',
                'get/mostpopular/?per_page=15&page=1',
                'get/top50/?per_page=15&page=1',
            ]
            this.top5Gross = (await fetch(url[0])).items;
            this.top15Popular = (await fetch(url[1])).items;
            this.top15Rating = (await fetch(url[2])).items;
            await new Promise(r => setTimeout(r, 5000));
            this.currentContentView = 'myIntro';
            await new Promise(r => setTimeout(r, 1000));
        },

        async requestDetailMovieHandler(id) {
            this.currentContentView = 'myLoadingscreen';
            const urlMovie = `detail/movie/${id}`;
            const urlReview = `detail/review/${id}`;
            this.movieDetailData = await fetch(urlMovie);
            if (this.movieDetailData.record === null) {
                alert("Can't find Movie's detail. The movie's probably updating it's info, comeback later for details.");
                this.currentContentView = 'myIntro';
            } else {
                this.movieDetailReview = await fetch(urlReview);
                this.currentContentView = 'myMoviedetail';
            }
        },

        async requestActorDetailHandler(id) {
            this.currentContentView = 'myLoadingscreen';
            const urlActor = `detail/name/${id}`;
            this.actorDetailData = await fetch(urlActor);
            if (this.actorDetailData.record === null) {
                alert("Can't find Actor's detail.");
                this.currentContentView = 'myIntro';
            } else {
                const movies = [];
                for (const castMovie of this.actorDetailData.record.castMovies) {
                    const movieUrk = `detail/movie/${castMovie.id}`;
                    const movie = (await fetch(movieUrk)).record;
                    if (movie !== null) {
                        movies.push(movie);
                    }
                }
                this.actorDetailMovies = movies;
                this.currentContentView = 'myActordetail';
            }
        },

    },


    template: /* html */
        `
        <div class="container-fluid d-flex flex-column mx-auto"
                style="max-width: 1200px;">
            <!-- Header -->
            <myHeader />

            <!-- NavBar -->
            <myNavbar @goHome="goIntroDuction"/>

            <!-- Content -->
            <myContent
                :currentView="currentContentView"
                @requestDetailMovie="(id) => requestDetailMovieHandler(id)"
                @requestActorDetail="(id) => requestActorDetailHandler(id)"/>

            <!-- Footer -->
            <myFooter />
        </div>
        `
}