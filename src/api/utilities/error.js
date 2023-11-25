class HTMLDisplayError extends Error {
    constructor(title, message) {
        super('');
        this.title = title;
        this.message = message;
    }
}

module.exports = { HTMLDisplayError };