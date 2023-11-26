import myListmovie from "./sub/cardview.js"

export default {
    data() {
        return {

        }
    },

    inject: [
        'actorDetailData',
        'actorDetailMovies',
    ],

    components: {
        myListmovie,
    },

    template: /* html */
        `
        <div class="card my-3 p-4 min-vh-100">
            <div class="container">
                <div class="row row-cols-md-2 row-cols-1 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-thumbnail w-75 ms-md-auto me-md-2 mx-auto"
                                :src="actorDetailData.record.image">
                    </div>
                    <div class="col d-flex flex-column p-3">
                        <p class="text-uppercase fs-2 fw-bold mb-1">{{actorDetailData.record.name}}</p>
                        <p class="fw-bold">Tiểu sử:
                            <span class="fw-normal">{{actorDetailData.record.summary}}
                            </span>
                        </p>
                    </div>
                </div>

                <p class="fw-bold mb-4 text-decoration-underline">Các bộ phim tham dự:</p>

                <!-- List movie Cardview -->
                <myListmovie :listDataProp="actorDetailMovies"/>

            </div>
        </div>
        `
}