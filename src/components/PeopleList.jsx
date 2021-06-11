import React from "react";
import {notEmpty} from "../utils/helpers"

import {
    List,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    listItem: {
        width: "100%"
    }
});

export const PeopleList = ({people}) => {
    const classes = useStyles();

    const renderPerson = (person) => {
        return <ListItem button key={person.name} className={classes.listItem}>
            <Accordion className={classes.listItem}>
                <AccordionSummary>
                    <Typography variant={"h5"}>{person.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <Typography>Name: {person.name}</Typography>
                        <Typography>Species: {person.species}</Typography>
                        <Typography>Movies: {person.films.join(", ")}</Typography>
                        <Typography>Spaceships: {notEmpty(person.starships) ? person.starships.join(", ") : "None"}</Typography>
                    </List>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    }

    return <div>
        <Typography variant={"h3"} align={"center"}>Characters List: {people.length}</Typography>
        <List>
            {people.map(person => renderPerson(person))}
        </List>
    </div>
}