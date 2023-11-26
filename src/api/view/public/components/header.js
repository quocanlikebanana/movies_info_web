import { toggleDarkMode } from '../script.js';

export default {
    data() {
        return {

        }
    },

    methods: {
        callToggle() {
            toggleDarkMode();
        }
    },

    template: /* html */
        `
        <header class="alert alert-light rounded
        d-flex justify-content-between p-3">
            <p class="fst-italic fw-semibold text-danger-emphasis
            my-auto">21120190</p>
            <p class="text-dark fs-2 fw-semibold
            my-auto">Movies Information</p>
            <div class="d-flex align-items-center my-3"
                 style="height: 3em;">
                <div class="form-check form-switch">
                    <input class="form-check-input"
                           id="flexSwitchCheckDefault"
                           type="checkbox"
                           @change="callToggle">
                    <label class="form-check-label"
                           for="flexSwitchCheckDefault"><i class='fas fa-moon'></i></label>
                </div>
            </div>
        </header>
        `
}