import React,{ useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        {field: "activity", sortable: true, filter: true},
        {field: "date", sortable: true, filter: true},
        {field: "duration", sortable: true, filter: true},
    ])

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
            .then(response => response.json())
            .then(data => {
                setTrainings(data.content);
            })
            .catch(err => console.log(err));
    }
    
    console.log(trainings)

    return (
        <div className="ag-theme-material" style={{height: 500, width: "32%", margin: "auto"}}>
            <h2>Trainings</h2>
            <AgGridReact 
                rowData={trainings}
                columnDefs={columnDefs}
            />
        </div>
        );
}
