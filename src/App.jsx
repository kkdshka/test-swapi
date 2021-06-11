import React, { useEffect, useState } from "react"
import { Main } from "./components/Main";
import { CircularProgress } from "@material-ui/core";
import {peopleUrls, starshipsUrls, speciesUrls} from "./utils/urls";
import {fetchUrls, preparePeopleData, notEmpty} from "./utils/helpers";

const initialFilters = {
    movie: "",
    species: "",
    rangeOfYears: ""
}

export default function App() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [starships, setStarships] = useState([]);
    const [species, setSpecies] = useState([]);

    useEffect (() => {
        async function fetchData () {
            const peopleData = await fetchUrls(peopleUrls);
            const starshipsData = await fetchUrls(starshipsUrls);
            const speciesData = await fetchUrls(speciesUrls);
            setSpecies(speciesData)
            setStarships(starshipsData);
            setPeople(peopleData);
            setLoading(false)
        }

        fetchData().then(() => setLoading(false));
    }, []);

    const [preparedPeopleData, setPreparedPeopleData] = useState([]);

    useEffect (()=> {
        if(notEmpty(people) && notEmpty(starships) && notEmpty(species)) {
            preparePeopleData(people, starships, species, setPreparedPeopleData)
        }
    }, [people, starships, species])

    const [filters, setFilters] = useState(initialFilters);
    const [filteredPeople, setFilteredPeople] = useState([])

    return (
        <div>
            {loading ? <CircularProgress/> : <Main people={preparedPeopleData} setPeople={setFilteredPeople}/>}
        </div>
    )
}
