class MovieActor {
    constructor(id, actor) {
        this.movie_id = id;
        this.name_id = actor.id;
        this.as_character = actor.asCharacter;
    }
}

class MovieDirector {
    constructor(id, actor) {
        this.movie_id = id;
        this.name_id = actor.id;
        this.as_character = actor.asCharacter;
    }
}

module.exports = {
    MovieActor
};