export { SimpleMovie, toSimpleMovie, currencyToNumber, toggleDarkMode };

class SimpleMovie {
    constructor(id, name, year, imgSrc) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.imgSrc = imgSrc;
    }
}

function toSimpleMovie(movie) {
    return new SimpleMovie(movie['id'], movie['title'], movie['year'], movie['image']);
}

function currencyToNumber(currency) {
    const str = currency.replace(/[$,]+/g, "");
    return Number(str);
}

function toggleDarkMode() {
    const cars = document.getElementsByClassName('carousel');
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        for (const car of cars) {
            car.classList.add("carousel-dark");
        }
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        for (const car of cars) {
            car.classList.remove("carousel-dark");
        }
    }

}