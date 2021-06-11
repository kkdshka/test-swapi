import React, {useState, useEffect} from "react";
import {PeopleList} from "./PeopleList";
import {Filter} from './Filter';
import {Grid, Typography} from "@material-ui/core";
// import { makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles({
//
// });

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
        <Grid item xs={6}>
            {filteredPeople ? <PeopleList people={filteredPeople}/> : <PeopleList people={people}/>}
        </Grid>
        <Grid item xs={6}>
            <Typography variant={"h3"} align={"center"}>Favorites</Typography>
        </Grid>
    </Grid>

}