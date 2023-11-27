import myCarouselslide from './sub/carouselslide.js'

export default {
    data() {
        return {

        }
    },

    inject: [
        'top5Rating',
        'top30Boxoffice',
        'top30Mostfav',
    ],

    components: {
        myCarouselslide,
    },

    emits: {
        requestDetailMovie: null,
    },

    methods: {
        singCsrImgClick(id) {
            this.$emit('requestDetailMovie', id);
        }
    },

    template: /* html */
        `
        <!-- Single movie carousel -->
        <div id="singCrsNewest"
                class="carousel slide carousel-fade
                container-fluid my-3 carousel-dark"
                data-bs-ride="carousel">
            <div class="carousel-inner">
                <template v-for="(movie, index) in top5Rating">
                    <div class="carousel-item"
                        :class="{active: index === 1}"
                        data-bs-interval="3000">
                        <img :src="movie.image"
                            :alt="movie.title"
                            @click="singCsrImgClick(movie.id)"
                            style="cursor: pointer;">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>{{movie.title}}</h5>
                            <p>{{movie.year}}</p>
                        </div>
                    </div>
                </template>
            </div>
            <button class="carousel-control-prev"
                    type="button"
                    data-bs-target="#singCrsNewest"
                    data-bs-slide="prev">
                <span class="carousel-control-prev-icon"
                        aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next"
                    type="button"
                    data-bs-target="#singCrsNewest"
                    data-bs-slide="next">
                <span class="carousel-control-next-icon"
                        aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <div class="carousel-indicators">
                <template v-for="(movie, n) in top5Rating">
                    <button type="button"
                        data-bs-target="#singCrsNewest"
                        :data-bs-slide-to="n"
                        :class="{active: n === 0}"
                        :aria-current="n === 0"
                        :aria-label="'Slide ' + (n + 1)"></button>
                </template>
            </div>
        </div>

        <!-- Most popular -->
        <p class="my-2">Top Box Office:</p>
        <!-- List movie carousel -->
        <myCarouselslide :listDataProp="top30Boxoffice"
            :myId="'popularMulCrs'"
            @requestDetailMovie="id => singCsrImgClick(id)"/>

        <!-- Top Rating -->
        <p class="my-2">Most Favorite:</p>
        <!-- List movie carousel -->
        <myCarouselslide :listDataProp="top30Mostfav"
            :myId="'ratingMulCrs'"
            @requestDetailMovie="id => singCsrImgClick(id)"/>
        `
}