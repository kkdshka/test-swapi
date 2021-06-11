import React from "react";
import {FormControl, InputLabel, Select, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    formControl: {
        margin: "2em",
        minWidth: 200,
    },
});

export const Filter = ({filters, setFilters, allSpecies}) => {
    const classes = useStyles();
    const {movie, species} = filters;

    const handleMovieChange = (event) => {
        const film = event.target.value;
        setFilters({...filters, film: film});
    };

    const handleSpecieChange = (event) => {
        const specie = event.target.value;
        setFilters({...filters, species: specie});
    };

    const renderSpeciesOptions = () => {

        return allSpecies.map((specie, index) => {
            return <option value={String(specie.name)} key={"specie" + index}>{specie.name}</option>
        })
    };

    return <Grid container direction={"row"}>
        <Grid item xs={4}>
            <FormControl className={classes.formControl}>
                <InputLabel>Movie</InputLabel>
                <Select native value={movie} onChange={handleMovieChange}>
                    <option value={""}/>
                    <option value={"Episode IV"}>Episode IV</option>
                    <option value={"Episode V"}>Episode V</option>
                    <option value={"Episode VI"}>Episode VI</option>
                    <option value={"Episode I"}>Episode I</option>
                    <option value={"Episode II"}>Episode II</option>
                    <option value={"Episode III"}>Episode III</option>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={4}>
            <FormControl className={classes.formControl}>
                <InputLabel>Specie</InputLabel>
                <Select native value={species} onChange={handleSpecieChange}>
                    <option value={""}/>
                    {renderSpeciesOptions()}
                </Select>
            </FormControl>
        </Grid>
    </Grid>
};