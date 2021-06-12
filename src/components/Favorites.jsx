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
import {Droppable} from "react-beautiful-dnd";

const useStyles = makeStyles({
    listItem: {
        width: "100%"
    },
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver && "lightblue",
    minHeight: "100vh"
});

export const Favorites = ({people}) => {
    const classes = useStyles();

    const renderPerson = (person, id) => {
        return <ListItem className={classes.listItem} key={`favorites-${id}`}>
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
        <Typography variant={"h3"} align={"center"}>Favorites</Typography>
        <Droppable droppableId="favorites">
            {(provided, snapshot) => (
                <List style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps} ref={provided.innerRef}>
                    {people.map((person, index) => renderPerson(person, index))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    </div>
}