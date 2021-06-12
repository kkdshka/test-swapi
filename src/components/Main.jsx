import React, {useState, useEffect} from "react";
import {Filter} from './Filter';
import {Grid} from "@material-ui/core";
import {DraggableList} from "./DraggableLists";

const initialFilters = {
    film: "",
    species: "",
    rangeOfYears: ""
}

const filterPeople = (people, filters) => {
    return people.filter((person) => {
        return (filters.film ? person.films.includes(filters.film) : true)
        && (filters.species ? person.species.includes(filters.species) : true);
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