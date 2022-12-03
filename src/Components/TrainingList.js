import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [columnDefs] = useState([
        { field: "activity", sortable: true, filter: true },
        {
            field: "date", sortable: true, filter: true,
            valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm")
        },
        { field: "duration", sortable: true, filter: true, width: 150 },
        {
            field: "name", headerName: "Customer", sortable: true, filter: true,
            valueGetter: function (params) {
                return params.data.customer.firstname + " " + params.data.customer.lastname
            }
        },
        {
            width: 125,
            cellRenderer: params =>
                <Button size="small" variant="contained" color="error" onClick={() => deleteTraining(params.data)}>
                    Delete
                </Button>
        }
    ])

    useEffect(() => {
        getTrainings();
    }, [])


    const getTrainings = () => {
        fetch(API_URL + "gettrainings")
            .then(response => response.json())
            .then(data => {
                setTrainings(data);
            })
            .catch(err => console.log(err));
    }

    const deleteTraining = (data) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
            fetch(API_URL + `api/trainings/${data.id}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok)
                        getTrainings();
                    else
                        alert("Something went wrong");
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, width: "48%", margin: "auto" }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    supressCellFocus={true}
                />
            </div>
        </>
    );
}
