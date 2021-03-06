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
import {Droppable, Draggable} from 'react-beautiful-dnd';

const useStyles = makeStyles({
    listItem: {
        width: "100%"
    }
});

export const PeopleList = ({people}) => {
    const classes = useStyles();

    const renderPerson = (person, id) => {
        return <Draggable key={person.name} draggableId={person.name} index={id}>
            {(provided) => (<ListItem  className={classes.listItem} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
            )}
        </Draggable>
    }

    return <div>
        <Typography variant={"h3"} align={"center"}>Characters List: {people.length}</Typography>
        <Droppable droppableId={"people"}>
            {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                    {people.map((person, index) => renderPerson(person, index))}
                    {provided.placeholder}
                </List>
                )}
        </Droppable>
    </div>
}