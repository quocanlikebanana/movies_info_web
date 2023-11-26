export default {
    data() {
        return {
            searchString: "",
        }
    },

    emits: {
        goSearch: null,
        goHome: null,
        goFav: null,
    },

    template: /* html */
        `
        <nav class="navbar navbar-expand-lg rounded bg-primary-subtle border border-2 border-info-subtle">
            <div class="container-fluid">
                <button class="navbar-brand mb-0 h1 border-0 bg-transparent"
                        @click="$emit('goHome')"><i class="fa fa-home"></i></button>
                <div class="my-auto mx-auto flex-fill d-flex justify-content-center">
                    <button class="navbar-brand border-0 bg-transparent text-light-emphasis"
                        @click="$emit('goFav')">
                        21190
                    </button>
                </div>
                <button class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse flex-grow-0"
                     id="navbarSupportedContent">
                    <div class="d-flex ms-auto mb-2 mt-2"
                         role="search">
                        <input class="form-control me-2"
                               type="search"
                               placeholder="Search"
                               aria-label="Search"
                               v-model="searchString">
                        <button class="btn btn-outline-success border border-2 border-success-subtle"
                            @click="$emit('goSearch', searchString)">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        `
}