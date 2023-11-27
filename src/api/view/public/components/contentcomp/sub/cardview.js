import myNormalcard from './subsub/normalcard.js';
import myDeleteablecard from './subsub/deleteablecard.js';

export default {
    data() {
        return {
            listData: [],
        }
    },

    props: {
        cardUsed: "myNormalcard",
        listDataProp: {
            type: Array,
            default: [],
        }
    },

    components: {
        myNormalcard,
        myDeleteablecard,
    },

    emits: {
        requestDetailMovie: null,
        requestDeleteFav: null,
    },

    // Copy once
    mounted() {
        this.listData = this.listDataProp;
    },

    template: /* html */
        `
        <div class="css-cardview container-fluid my-3 p-3">
            <div class="row row-cols-2 row-cols-md-3 g-2">
                <template v-for="data in listDataProp">
                    <div class="col">
                        <component :is="cardUsed"
                            :data="data"
                            @requestDetailMovie="id => this.$emit('requestDetailMovie', id)"
                            @requestFavDelete="id => this.$emit('requestFavDelete', id)">
                        </component>
                    </div>
                </template>
            </div>
        </div>
        `
}

