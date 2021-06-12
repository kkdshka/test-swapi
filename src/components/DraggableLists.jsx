import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {PeopleList} from "./PeopleList";
import {DragDropContext} from 'react-beautiful-dnd';
import {Favorites} from "./Favorites";

export const DraggableList = ({filteredPeople, people}) => {
    const [list, setList] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setList(filteredPeople);
    }, [filteredPeople])

    const onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) return;

        const copied = list[source.index];

        if (favorites.includes(copied)) return;

        if (source.droppableId === "people" && destination.droppableId === 'favorites') {

            setFavorites([...favorites, copied])
        }
    };

    return <DragDropContext onDragEnd={onDragEnd}>
        <Grid item xs={6}>
            {filteredPeople ? <PeopleList people={filteredPeople}/> : <PeopleList people={people}/>}
        </Grid>
        <Grid item xs={6}>
            <Favorites people={favorites}/>
        </Grid>
    </DragDropContext>
};