import myCardview from "./sub/cardview.js";
import myTableview from "./sub/tableview.js";
import myPaginationbar from './sub/paginationbar.js';

const perPageMovie = 12;
const perPageName = 6;

export default {
    data() {
        return {
            displayPageMovie: [],
            displayPageName: [],
            cardUsed: 'myNormalcard',
        }
    },

    mounted() {
        this.updatePageMovie(1);
        this.updatePageName(1);
    },

    inject: [
        'searchMovieResults',
        'searchNameResults',
    ],

    components: {
        myCardview,
        myPaginationbar,
        myTableview,
    },

    computed: {
        totalPageMovie() {
            return Math.ceil(this.searchMovieResults.length / perPageMovie);
        },
        totalPageName() {
            return Math.ceil(this.searchNameResults.length / perPageName);
        },
    },

    methods: {
        updatePageMovie(pageNum) {
            const offset = perPageMovie * (pageNum - 1);
            this.displayPageMovie = this.searchMovieResults.slice(offset, offset + perPageMovie);
        },
        updatePageName(pageNum) {
            const offset = perPageName * (pageNum - 1);
            this.displayPageName = this.searchNameResults.slice(offset, offset + perPageName);
        },
    },

    template: /* html */
        `
        <div class="container-fluid">
            <div class="row">
                <div class="col col-md-7">
                    <p class="fw-medium fs-2 text-decoration-underline text-primary-emphasis">Phim:</p>
                    <myCardview :cardUsed="cardUsed"
                        :listDataProp="displayPageMovie"
                        @requestDetailMovie="id => this.$emit('requestDetailMovie', id)"/>
                    <myPaginationbar class="mt-5"
                        :totalPage="totalPageMovie"
                        @pageChanged="(pageNum) => updatePageMovie(pageNum)"/>
                </div>
                <div class="col col-md-5 mt-4 mt-md-0">
                    <p class="fw-medium fs-2 text-decoration-underline text-primary-emphasis">Diễn Viên:</p>
                    <myTableview :listDataProp="displayPageName"
                        @requestNameDetail="id => this.$emit('requestNameDetail', id)"/>
                    <myPaginationbar class="mt-5"
                        :totalPage="totalPageName"
                        @pageChanged="(pageNum) => updatePageName(pageNum)"/>
                </div>
            </div>
        </div>
        `
}