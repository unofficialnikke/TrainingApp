import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Training() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [columnDefs] = useState([
        { field: "activity", sortable: true, filter: true },
        {
            field: "date", sortable: true, filter: true,
            valueFormatter: params => params.value !== null ? dayjs(params.value).format("DD.MM.YYYY HH:mm") : ""
        },
        { field: "duration", sortable: true, filter: true, width: 150 },
        {
            field: "customer", sortable: true, filter: true,
            valueGetter: function (params) {
                if (params.value === null) {
                    return ""
                } else {
                    return `${params.data.customer.firstname} ${params.data.customer.lastname}`
                }
            }
        },
        {
            width: 125,
            cellRenderer: params =>
                <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteTraining(params.data)}>
                    Delete
                </Button>
        }
    ])

    useEffect(() => {
        getTrainings();
    }, [])

    const customerName = (params) => {
        return `${params.value.firstname || ''} ${params.value.lastname || ''}`;
    }

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
                    if (response.ok) {
                        getTrainings();
                        setOpen(!open);
                    } else {
                        alert("Somethinig went wrong");
                    }
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
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success">
                    Customer deleted succesfully
                </Alert>
            </Snackbar>
        </>
    );
}
