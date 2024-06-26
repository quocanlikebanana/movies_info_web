import fetch from '../../fetch.js';
import myPagination from './sub/paginationbar.js';
import myCarouselslide from './sub/carouselslide.js';

export default {
    data() {
        return {
            movie: null,
            displayReview: [],
        }
    },

    mounted() {
        this.displayReview = this.movieReviewList;
    },

    components: {
        myPagination,
        myCarouselslide,
    },

    inject: {
        movieDetail: {
            from: 'movieDetail',
        },
        movieReviewList: {
            from: 'movieReviewList',
            default: [],
        }
    },

    emits: {
        requestNameDetail: null,
        requestFavInsert: null,
        requestDetailMovie: null,
    },

    computed: {
        getMovieId() {
            return this.movieDetail.id;
        },
        totalReviewPage() {
            return this.movieDetail.total_review_page;
        },
    },

    methods: {
        async updateReviewPage(pageNum) {
            this.displayReview = await fetch.getPageMovieReview(this.getMovieId, pageNum);
        },
    },

    template: /* html */
        `
        <div class="card my-3 p-4 min-vh-100">
            <div class="container">
                <div class="row row-cols-md-2 row-cols-1 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-thumbnail w-75 ms-md-auto me-md-2 mx-auto"
                            :src="movieDetail.image"
                            :alt="movieDetail.title">
                    </div>
                    <div class="col d-flex flex-column p-3">
                        <p class="text-uppercase fs-2 fw-bold mb-1">{{movieDetail.title}}</p>
                        <p class="fst-italic mt-1 mb-5">{{movieDetail.year}}</p>
                        <p class="fw-bold">Độ dài:
                            <span class="fw-normal">{{movieDetail.runtime_str}}</span>
                        </p>
                        <p class="fw-bold">Ngày phát hành:
                            <span class="fw-normal">{{movieDetail.release_date}}</span>
                        </p>
                        <p class="fw-bold">Điểm xếp hạng:
                            <span class="fw-normal">{{movieDetail.im_db_rating}}</span>
                        </p>
                        <p class="fw-bold">Thể loại:
                            <template v-for="gerne in movieDetail.genre_list">
                                <span class="fw-normal">{{gerne}}</span>&nbsp
                            </template>
                        </p>
                        <p class="fw-bold">Biên kịch:
                            <template v-for="name in movieDetail.thumbnail.writer_list">
                                <a href="#/"
                                    class="fw-normal"
                                    @click="$emit('requestNameDetail', name.id)">{{name.name}}</a>
                                &nbsp
                            </template>
                        </p>
                        <p class="fw-bold">Đạo diễn:
                            <template v-for="name in movieDetail.thumbnail.director_list">
                                <a href="#/"
                                    class="fw-normal"
                                    @click="$emit('requestNameDetail', name.id)">{{name.name}}</a>
                                &nbsp
                            </template>
                        </p>
                        <p class="fw-bold">Diễn viên:
                            <template v-for="name in movieDetail.thumbnail.actor_list">
                                <a href="#/"
                                    class="fw-normal"
                                    @click="$emit('requestNameDetail', name.id)">{{name.name}}</a>
                                &nbsp
                            </template>
                        </p>
                        <p class="fw-bold">Tóm tắt phim:
                            <span class="fw-normal">{{movieDetail.plot}}</span>
                        </p>
                        <div class="mt-5 algin-self-end">
                            <button class="btn btn-danger"
                                @click="$emit('requestFavInsert', movieDetail.id)">
                                <span><i class="fa fa-heart"></i> Favorite</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Similar Crs -->
                <p class="fw-bold text-primary text-decoration-underline mt-5"
                    style="font-size: 1.5em;">Related:</p>
                <myCarouselslide :listDataProp="movieDetail.thumbnail.similar_list"
                    :myId="'similarMovieCrs'"
                    @requestDetailMovie="id => this.$emit('requestDetailMovie', id)"/>

                <!-- Review -->

                <p class="fw-bold text-primary text-decoration-underline mt-5"
                    style="font-size: 1.5em;">Reviews:</p>
                <div class="row row-cols-1 d-flex flex-column p-2 gy-4">
                    <template v-for="rev in displayReview">
                        <div class="border border-2 border-primary rounded-2 d-block p-3">
                            <div class="d-flex">
                                <p class="fw-bold fs-2 my-0">{{rev.title}}</p>
                                <p v-if="rev.warningSpoilers === true" class="fw-bold text-danger ms-auto text-center">Spoiler Alert</p>
                            </div>
                            <p class="fst-italic">{{rev.date}}</p>
                            <p>{{rev.content}}</p>
                            <div class="d-flex align-items-baseline">
                                <p v-if="rev.rate !== ''" class="m-2"><span>{{rev.rate}}</span>/10 ⭐</p>
                                <p class="ms-auto text-decoration-underline">{{rev.username}}</p>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="row">
                    <myPagination :totalPage="totalReviewPage"
                        @pageChanged="pageNum => updateReviewPage(pageNum)"/>
                </div>
            </div>
        </div>
        `
}