export default {
    data() {
        return {
            currentPage: 1,
        }
    },

    provide() {
        return {
        };
    },

    created() {
    },

    components: {
    },

    methods: {
        paginateUp() {
            const newPage = Math.min(this.currentPage + 1, this.totalPage);
            this.currentPageChanged(newPage);
        },
        paginateDown() {
            const newPage = Math.max(this.currentPage - 1, 1);
            this.currentPageChanged(newPage);
        },
        currentPageChanged(newPage) {
            this.currentPage = newPage;
            this.$emit("pageChanged", newPage);
        },
    },

    props: {
        totalPage: {
            type: Number,
            required: true,
        },
    },

    emits: {
        pageChanged: null,
    },

    template: /*html*/
        `
            <ul class="pagination m-2 flex-wrap">
                <li class="page-item"
                    @click="paginateDown">
                    <a class="page-link"
                        href="#/"
                        aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <template v-for="n in totalPage">
                    <li :class="{active: n === currentPage}"
                        class="page-item"
                        @click="currentPageChanged(n)">
                        <a v-if="n !== currentPage"
                            class="page-link" href="#/">
                            {{n}}
                        </a>
                        <span v-else
                            class="page-link"
                            style="user-select: none;">
                            {{n}}
                        </span>
                    </li>
                </template>
                <li class="page-item"
                    @click="paginateUp">
                    <a class="page-link"
                        href="#/"
                        aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        `,
}