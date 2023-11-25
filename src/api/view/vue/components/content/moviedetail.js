export default {
    data() {
        return {
            movie: null,
        }
    },

    inject: {
        movieDetail: {
            from: 'movieDetailData',
            default: {
                record: {
                    title: "",
                    year: "",
                    directorList: [],
                    actorList: [],
                    plot: "",
                }
            }
        },
        reviewDetail: {
            from: 'movieDetailReview',
            default: {
                record: [],
            }
        }
    },

    template: /* html */
        `
        <div class="card my-3 p-4 min-vh-100">
            <div class="container">
                <div class="row row-cols-md-2 row-cols-1 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-thumbnail w-75 ms-md-auto me-md-2 mx-auto"
                            :src="movieDetail.record.image"
                            :alt="movieDetail.record.title">
                    </div>
                    <div class="col d-flex flex-column p-3">
                        <p class="text-uppercase fs-2 fw-bold mb-1">{{movieDetail.record.title}}</p>
                        <p class="fst-italic mb-3">{{movieDetail.record.year}}</p>
                        <p class="fw-bold">Đạo diễn:
                            <template v-for="(director, n) in movieDetail.record.directorList">
                                <span v-if="n >= 1">,&nbsp</span>
                                <span class="fw-normal">{{director.name}}</span>
                            </template>
                        </p>
                        <p class="fw-bold">Diễn viên:
                            <template v-for="actor in movieDetail.record.actorList">
                                <a href="#/"
                                    class="fw-normal"
                                    @click="$emit('requestActorDetail', actor.id)">{{actor.name}}</a>
                                &nbsp
                            </template>
                        </p>
                        <p class="fw-bold">Tóm tắt phim:
                            <span class="fw-normal">{{movieDetail.record.plot}}</span>
                        </p>
                    </div>
                </div>
                <p class="fw-bold text-primary text-decoration-underline"
                    style="font-size: 1.5em;">Reviews:</p>
                <div class="row row-cols-1 d-flex flex-column p-2 gy-4">
                    <template v-for="rev in reviewDetail.record">
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
            </div>
        </div>
        `
}