import React from "react";
import {PeopleList} from "./PeopleList";
import {Grid, Typography, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({

});

export const Main = ({people, setPeople}) => {
    const classes = useStyles();

    const onChangeName = (event) => {
        const value = event.target.value;
        const filteredPeople = people.filter((person) => {
            person.name.toLowerCase().includes(value.toLowerCase())
        });
        setPeople(filteredPeople);
    }

    return <Grid container direction={"row"}>
        <Grid item xs={12}>
            <Typography variant={"h3"} align={"center"}>Filter</Typography>
            <TextField
                onChange={onChangeName}
                placeholder={"Name"}
            />
        </Grid>
        <Grid item xs={6}>
            <PeopleList people={people}/>
        </Grid>
        <Grid item xs={6}>
            <Typography variant={"h3"} align={"center"}>Favorites</Typography>
        </Grid>
    </Grid>

}