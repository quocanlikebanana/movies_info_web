export default {
    data() {
        return {
            listData: [],
        }
    },

    props: {
        listDataProp: {
            type: Array,
            default: [],
        }
    },

    mounted() {
        this.listData = this.listDataProp;
    },

    watch: {
        listDataProp: {
            handler(newLD, oldLD) {
                console.log("test");
            }
        }
    },

    template: /* html */
        `
        <div class="css-cardview container-fluid my-3 p-3">
            <div class="row row-cols-2 row-cols-md-3 g-2">
                <template v-for="data in listDataProp">
                    <div class="col">
                        <div class="card text-center h-100">
                            <img :src="data.image"
                                class="card-img-top"
                                alt="...">
                            <div class="card-body">
                                <h5 class="card-title">{{data.title}}</h5>
                                <p class="card-text">({{data.year}})</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        `
}
