const schema = `
CREATE TABLE IF NOT EXISTS public.movie
(
    id CHAR(15) PRIMARY KEY,
    awards TEXT,
    box_office TEXT,
    companies TEXT,
    countries TEXT,
    full_title TEXT,
    genre_list TEXT,
    im_db_rating TEXT,
    image TEXT,
    images TEXT,
    languages TEXT,
    original_title TEXT,
    plot TEXT,
    plot_full TEXT,
    posters TEXT,
    release_date DATE,
    runtime_str TEXT,
    title TEXT,
    year TEXT
);


CREATE TABLE IF NOT EXISTS public.name (
    id CHAR(15) PRIMARY KEY,
    awards TEXT,
    birth_date DATE,
    death_date DATE,
    height TEXT,
    image TEXT,
    images TEXT,
    name TEXT,
    role TEXT,
    summary TEXT
);


CREATE TABLE IF NOT EXISTS public.review (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    content TEXT,
    date DATE,
    rate TEXT,
    title TEXT,
    username TEXT,
    warning_spoilers BOOL
);


CREATE TABLE IF NOT EXISTS public.movie_name_actor (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    name_id CHAR(15),
    as_character TEXT
);


CREATE TABLE IF NOT EXISTS public.movie_name_director (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    name_id CHAR(15)
);


CREATE TABLE IF NOT EXISTS public.movie_name_writer (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    name_id CHAR(15)
);


CREATE TABLE IF NOT EXISTS public.movie_movie_similar (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    movie_id_similar CHAR(15)
);


CREATE TABLE IF NOT EXISTS public.name_movie_cast (
    id SERIAL PRIMARY KEY,
    movie_id CHAR(15),
    name_id CHAR(15),
    role TEXT
);

`




module.exports = { schema };