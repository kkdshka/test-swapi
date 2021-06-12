import React, {useState, useEffect} from "react";
import {Filter} from './Filter';
import {Grid} from "@material-ui/core";
import {DraggableList} from "./DraggableLists";

const initialFilters = {
    film: "",
    species: "",
    yearRange: ""
}

const yearConverter = (year) => {
    if (year === "unknown") return 1000;

    const parsedYear =  {
        year: year.match(year.match(/\d+[.]*\d*/g))[0],  //числа целые и с плавающей точкой
        era: year.match(/[A-Z]+/g)[0]                    //буквы
    };

    return parsedYear.era === "ABY" ? parsedYear.year - 1000 : parsedYear.year;
}

const isYearInRange = (year, range) => {
    const parsedRange = {
        start: range.startEra === "ABY" ? Number(range.start - 1000) : Number(range.start),
        end: range.endEra === "ABY" ? Number(range.end - 1000) : Number(range.end),
    }
    return year <= parsedRange.start && year >= parsedRange.end
}

const filterPeople = (people, filters) => {
    return people.filter((person) => {
        return (filters.film ? person.films.includes(filters.film) : true)
        && (filters.species ? person.species.includes(filters.species) : true)
        && (filters.yearRange ? isYearInRange(yearConverter(person.birthYear), filters.yearRange) : true);
    });
}

export const Main = ({people, species}) => {
    const [filters, setFilters] = useState(initialFilters);
    const [filteredPeople, setFilteredPeople] = useState(people);

    useEffect(() => {
        setFilteredPeople(filterPeople(people, filters))
    }, [filters, people]);

    return <Grid container direction={"row"}>
        <Grid item xs={12}>
            <Filter filters={filters} setFilters={setFilters} allSpecies={species}/>
        </Grid>
        <DraggableList people={people} filteredPeople={filteredPeople}/>
    </Grid>

}