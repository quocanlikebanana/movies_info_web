
export default {
    data() {
        return {

        }
    },

    created() {
    },

    components: {
    },

    methods: {
    },

    props: {
        listDataProp: {
            type: Array,
            default: [],
        }
    },

    emits: {
        requestNameDetail: null,
    },

    template: /*html*/
        `
        <table class="table">
            <thead class="table-primary">
                <tr>
                    <th class="py-3 ps-3"
                        style="width: 30%;">Tên</th>
                    <th class="py-3"
                        style="width: 40%;">Các vai trò</th>
                    <th class="py-3"
                        style="width: 30%;">Ảnh</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="record in listDataProp">
                    <tr role="button"
                        @click="$emit('requestNameDetail', record.id)">
                        <td class="py-3 ps-3">
                            <p class="fw-medium">{{record.name}}</p>
                        </td>
                        <td class="py-3">{{record.role}}</td>
                        <td class="py-3 align-middle" style = "height: 180px;">
                            <img v-if="record.image != null"
                                class="img-thumbnail"
                                :src="record.image">
                            <img class="img-thumbnail"
                                v-else
                                src="https://t3.ftcdn.net/jpg/02/43/51/48/360_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.jpg">
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        `,
}