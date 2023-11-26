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
        requestDetailMovie: null,
    },

    template: /*html*/
        `
        <div class="card text-center h-100"
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
        `,
}