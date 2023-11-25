class Person {
    constructor(rawPerson) {
        this.id = rawPerson.id;
        this.first_name = rawPerson.first_name;
        this.last_name = rawPerson.last_name;
        this.email = rawPerson.email;
        this.avatar = rawPerson.avatar;
    }
    get fullName() {
        return `${this.first_name} ${this.last_name}`;
    }
};

function castArray(value) {
    return Array.isArray(value) ? value : [value]
}

module.exports = { castArray, Person };

