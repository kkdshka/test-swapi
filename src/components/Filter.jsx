import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, Select, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    formControl: {
        margin: "2em",
        minWidth: 200,
    },
});

const initialYearRange = {
    start: 1000,
    startEra: "BBY",
    end: 0,
    endEra: "ABY"
}

export const Filter = ({filters, setFilters, allSpecies}) => {
    const classes = useStyles();
    const {movie, species} = filters;
    const [yearRange, setYearRange] = useState(initialYearRange);

    useEffect(() => {
        setFilters({...filters, yearRange: yearRange});
    }, [yearRange, setYearRange])

    const handleMovieChange = (event) => {
        const film = event.target.value;
        setFilters({...filters, film: film});
    };

    const handleSpecieChange = (event) => {
        const specie = event.target.value;
        setFilters({...filters, species: specie});
    };

    const handleStartChange = (event) => {
        setYearRange({...yearRange, start: event.target.value});
    }

    const handleStartEraChange = (event) => {
        setYearRange({...yearRange, startEra: event.target.value});
    }

    const handleEndChange = (event) => {
        setYearRange({...yearRange, end: event.target.value});
    }

    const handleEndEraChange = (event) => {
        setYearRange({...yearRange, endEra: event.target.value});
    }

    const renderSpeciesOptions = () => {
        return allSpecies.map((specie, index) => {
            return <option value={String(specie.name)} key={"specie" + index}>{specie.name}</option>
        })
    };

    return <Grid container direction={"row"} alignItems={"center"}>
        <Grid item xs={2}>
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
        <Grid item xs={2}>
            <FormControl className={classes.formControl}>
                <InputLabel>Specie</InputLabel>
                <Select native value={species} onChange={handleSpecieChange}>
                    <option value={""}/>
                    {renderSpeciesOptions()}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={2} className={classes.formControl}>
            <TextField type={"number"} label={'Start'} onChange={handleStartChange}/>
            <Select native onChange={handleStartEraChange}>
                <option value={"BBY"}>BBY</option>
                <option value={"ABY"} disabled={yearRange.endEra === "BBY"}>ABY</option>
            </Select>
        </Grid>
        <Grid item xs={2} className={classes.formControl}>
            <TextField type={"number"} label={'End'} onChange={handleEndChange}/>
            <Select native onChange={handleEndEraChange}>
                <option value={"ABY"}>ABY</option>
                <option value={"BBY"} disabled={yearRange.startEra === "ABY"}>BBY</option>
            </Select>
        </Grid>
    </Grid>
};