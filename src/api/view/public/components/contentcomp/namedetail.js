import myCardview from "./sub/cardview.js";
import myCarousel from "./sub/carouselslide.js";

export default {
    data() {
        return {

        }
    },

    inject: [
        'nameDetail',
    ],

    components: {
        myCardview: myCardview,
        myCarousel,
    },

    template: /* html */
        `
        <div class="card my-3 p-4 min-vh-100">
            <div class="container">
                <div class="row row-cols-md-2 row-cols-1 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-thumbnail w-75 ms-md-auto me-md-2 mx-auto"
                            :src="nameDetail.image"
                            v-if="nameDetail.summary != null">
                        <img class="img-thumbnail w-75 ms-md-auto me-md-2 mx-auto"
                            v-else
                            src="https://t3.ftcdn.net/jpg/02/43/51/48/360_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg">
                    </div>
                    <div class="col d-flex flex-column p-3">
                        <p class="text-uppercase fs-2 fw-bold mb-1">{{nameDetail.name}}</p>
                        <p class="fw-bold">Vai trò:
                            <span class="fw-normal">{{nameDetail.role}}</span>
                        </p>
                        <p class="fw-bold">Năm sinh:
                            <span class="fw-normal">{{nameDetail.birth_date}}</span>
                        </p>
                        <p class="fw-bold">Năm mất:
                            <span class="fw-normal">{{nameDetail.death_date}}</span>
                        </p>
                        <p class="fw-bold">
                            Tiểu sử:
                            <span class="fw-normal"
                                v-if="nameDetail.summary != null">
                                {{nameDetail.summary}}
                            </span>
                            <span class="fw-normal"
                                v-else>
                                Not found.
                            </span>
                        </p>
                        <p class="fw-bold">Giải thưởng:
                            <span class="fw-normal">{{nameDetail.plot}}</span>
                        </p>
                        <p class="fw-bold">Chiều cao:
                            <span class="fw-normal">{{nameDetail.height}}</span>
                        </p>
                    </div>
                </div>

                <p class="fw-bold mb-4 text-decoration-underline">Các bộ phim tham dự:</p>

                <!-- List movie Cardview -->
                <myCarousel :listDataProp="nameDetail.thumbnail.cast_list"
                    :myId="castMoviesCrs"
                    @requestDetailMovie = "id => this.$emit('requestDetailMovie', id)"/>

            </div>
        </div>
        `
}