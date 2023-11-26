export default {
    data() {
        return {
        }
    },

    created() {
    },

    props: {
        data: {}
    },

    emits: {
        requestDeleteFav: null,
    },

    template: /*html*/
        `
        <div class="card "
            role="button"
            @click="$emit('requestDetailMovie', data.id)">
            <img :src="data.image"
                class="card-img-top"
                alt="...">
            <div class="card-body">
                <h5 class="card-title">{{data.title}}</h5>
                <p class="card-text">({{data.year}})</p>
            </div>
        </div>
        <div class="card h-100" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="data.image"
                        class="card-img-top"
                        alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{data.title}}</h5>
                        <div class="d-flex justify-content-between">
                            <p class="card-text"><small class="text-body-secondary">{{data.year}}</small></p>
                            <p class="card-text"><small class="text-body-secondary">{{data.im_db_rating}}</small></p>
                        </div>
                        <button class="btn btn-danger btn-sm rounded-2"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            @click="$emit('requestDeleteFav', data.id)"
                            title="Delete">Delete <i class="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
        `,
}