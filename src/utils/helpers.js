export const preparePeopleData = (people, starships, species, setPeople) => {

    const films = {
        "http://swapi.dev/api/films/1/": 'Episode IV',
        "http://swapi.dev/api/films/2/": "Episode V",
        "http://swapi.dev/api/films/3/": "Episode VI",
        "http://swapi.dev/api/films/4/": "Episode I",
        "http://swapi.dev/api/films/5/": "Episode II",
        "http://swapi.dev/api/films/6/": "Episode III"
    }

    const getPersonSpecie = (person) => {
        const arrayOfSpecies = person.species.map(specieUrl => species.filter(specie => specieUrl === specie.url));
        if (notEmpty(arrayOfSpecies)) {
            return arrayOfSpecies[0][0].name;
        } else {
            return 'Human';
        }
    }

    const getPersonStarships = (person) => {
        const arrayOfStarships = person.starships.map(starshipUrl => starships.filter(starship => starshipUrl === starship.url));
        return arrayOfStarships.map((value) => value[0].name);
    }

    const getPersonFilms = (person) => {
        return person.films.map((filmUrl) => films[filmUrl]);
    }

    const preparedPeopleData = people.map((person) => {
        return {
            name: person.name,
            species: getPersonSpecie(person),
            starships: getPersonStarships(person),
            films: getPersonFilms(person),
            birthYear: person.birth_year
        }
    });
    setPeople(preparedPeopleData);
};

export async function fetchUrls (urls) {
    const requests = urls.map(url => fetch(url).then((res) => res.json()));
    const data = await Promise.all(requests);
    return data.reduce((accumulator, currentValue)=> {
        return accumulator.concat(currentValue.results)
    }, []);
}

export const notEmpty = (array) => {
    return array.length > 0;
}

export const yearConverter = (year) => {
    return Number(year.replace(/\D+/g,""));
}