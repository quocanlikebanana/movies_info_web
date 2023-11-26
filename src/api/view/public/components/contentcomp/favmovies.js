import fetch from '../../fetch.js';
import myCardview from './sub/cardview.js';
import myPaginationbar from './sub/paginationbar.js';

export default {
    data() {
        return {
            cardUsed: 'myDeleteablecard',
            displayFav: [],
        }
    },

    mounted() {
        this.updatePageFav(1);
    },

    created() {
    },

    components: {
        myCardview,
        myPaginationbar,
    },

    methods: {
        async updatePageFav(pageNum) {
            const json = await fetch.getPageFavMovie(pageNum);

        }
    },

    template: /*html*/
        `
        <div class="container-fluid">
            <p class="fw-medium fs-2 text-sucess-emphasis mb-5">Phim Ưa Thích</p>
            <div class="row">
                <div class="col col-md-7">
                    <myCardview :cardUsed="cardUsed"
                        :listDataProp="displayFav"
                        @requestDetailMovie="id => this.$emit('requestDetailMovie', id)"
                        @/>
                    <myPaginationbar class="mt-5"
                        :totalPage="totalPage"
                        @pageChanged="(pageNum) => update(pageNum)"/>
                </div>
            </div>
        </div>
        `,
}