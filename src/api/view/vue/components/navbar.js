export default {
    data() {
        return {

        }
    },

    template: /* html */
        `
        <nav class="navbar navbar-expand-lg rounded">
            <div class="container-fluid">
                <button class="navbar-brand mb-0 h1 border-0 bg-transparent"
                        @click="$emit('goHome')">Home</button>
                <button class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse"
                     id="navbarSupportedContent">
                    <div class="d-flex ms-auto mb-2 mt-2"
                         role="search">
                        <input class="form-control me-2"
                               type="search"
                               placeholder="Search"
                               aria-label="Search">
                        <button class="btn btn-outline-success">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        `
}