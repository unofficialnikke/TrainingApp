import React,{ useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        {field: "activity", sortable: true, filter: true},
        {field: "date", sortable: true, filter: true,
        valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm")},
        {field: "duration", sortable: true, filter: true},
        {field: "customer.firstname", headerName: "Firstname", sortable: true, filter: true},
        {field: "customer.lastname", headerName: "Lastname", sortable: true, filter: true},
    ])

    useEffect(() => {
        getTrainings();
    }, [])


    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(response => response.json())
            .then(data => {
                setTrainings(data);
            })
            .catch(err => console.log(err));
    }

    return ( 
        <div className="ag-theme-material" style={{height: 550, width: "55%", margin: "auto"}}>
            <h2>Trainings</h2>
            <AgGridReact 
                rowData={trainings}
                columnDefs={columnDefs}
            />        
        </div>
        );
}
