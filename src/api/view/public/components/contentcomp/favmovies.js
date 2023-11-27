import fetch from '../../fetch.js';
import myCardview from './sub/cardview.js';
import myPaginationbar from './sub/paginationbar.js';

export default {
    data() {
        return {
            cardUsed: 'myDeleteablecard',
        }
    },

    mounted() {
        this.$emit('requestFavPage', 1);
    },

    props: {
        favPage: {
            type: Array,
        },
        totalFavPage: {
            default: 0,
        },
    },

    emits: {
        requestDetailMovie: null,
        requestFavDelete: null,
        requestFavPage: null,
    },

    components: {
        myCardview,
        myPaginationbar,
    },

    methods: {
    },

    template: /*html*/
        `
        <div class="container-fluid">
            <div class="row">
                <p class="fw-medium fs-2 text-sucess-emphasis mb-5">Phim Ưa Thích</p>
            </div>
            <div class="row">
                <myCardview :cardUsed="cardUsed"
                    :listDataProp="favPage"
                    @requestDetailMovie="id => this.$emit('requestDetailMovie', id)"
                    @requestFavDelete="id => this.$emit('requestFavDelete', id)"/>
                <myPaginationbar class="mt-5"
                    :totalPage="totalFavPage"
                    @pageChanged="(pageNum) => this.$emit('requestFavPage', pageNum)"/>
            </div>
        </div>
        `,
}