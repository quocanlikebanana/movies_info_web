export default {
    data() {
        return {
            numSlide: 0,
            numItemPerSlide: 3,

            // dataSlides: [[]],
            // listMovies: [],
        }
    },

    props: {
        listDataProp: {
            required: true,
            default: [],
        },
        myId: {
            required: true,
            default: "myId",
        },
    },

    computed: {
        dataSlides() {
            const buffer = [];
            this.numSlide = Math.ceil(this.listDataProp.length / this.numItemPerSlide);
            for (let i = 0; i < this.numSlide; i++) {
                buffer[i] = [];
                for (let j = 0; j < this.numItemPerSlide; j++) {
                    buffer[i][j] = this.listDataProp[i * this.numItemPerSlide + j];
                }
            }
            return buffer;
        },
    },

    template: /* html */
        `
        <div :id="myId"
            class="carousel slide carousel-fade container-fluid my-3
            css-mulCrs carousel-dark">
            <div class="carousel-indicators">
                <template v-for="(slides, n) in dataSlides">
                    <button type="button"
                        :data-bs-target="'#' + myId"
                        :data-bs-slide-to="n"
                        :class="{active: n === 0}"
                        :aria-current="n === 0"
                        :aria-label="'Slide ' + (n + 1)"></button>
                </template>
            </div>
            <div class="carousel-inner overflow-visible">
                <template v-for="(slides, n) in dataSlides">
                    <div class="carousel-item"
                        :class="{active: n === 0}"
                        data-bs-interval="3000">
                        <div class="container-fluid">
                            <div class="row row-cols-3 g-2">
                                <template v-for="slide in slides">
                                    <div class="col">
                                        <div class="hover-zoom-detail bg-secondary text-dark"
                                            style="cursor: pointer;"
                                            @click="$emit('requestDetailMovie', slide.id)">
                                            <img :src="slide.image"
                                                class="img-fluid"
                                                :alt="slide.title">
                                                <p>{{slide.title}}&nbsp&nbsp<span>({{slide.year}})</span></p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <button class="carousel-control-prev"
                type="button"
                :data-bs-target="'#' + myId"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon"
                    aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next"
                type="button"
                :data-bs-target="'#' + myId"
                data-bs-slide="next">
                <span class="carousel-control-next-icon"
                    aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        `
}


