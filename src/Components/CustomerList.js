import React, { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../constants";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [customersFilt, setCustomersFilt] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [columnDefs] = useState([
        {
            width: 180,
            cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />
        },
        {
            field: "name", headerName: "Full name", sortable: true, filter: true,
            valueGetter: function (params) {
                return params.data.firstname + " " + params.data.lastname
            }
        },
        {
            field: "address", sortable: true, filter: true, width: 300,
            valueGetter: function (params) {
                return params.data.streetaddress + ", " + params.data.postcode + " " + params.data.city
            }
        },
        { field: "email", sortable: true, filter: true },
        { field: "phone", headerName: "Phone number", sortable: true, filter: true },
        {
            width: 125,
            cellRenderer: params => <EditCustomer data={params.data} editCustomer={updateCustomer} />
        },
        {
            width: 125,
            cellRenderer: params =>
                <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteCustomer(params.data)}>
                    Delete
                </Button>
        }
    ]);

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch(API_URL + "api/customers")
            .then(response => response.json())
            .then(data => {
                setCustomers(data.content);
            })
            .catch(err => console.log(err));
    }

    const deleteCustomer = (data) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            fetch(data.links[1].href, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        getCustomers();
                        setOpen(!open);
                    } else {
                        alert("Somethinig went wrong");
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch(API_URL + "api/customers", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert("Something went wrong")
            })
            .catch(err => console.log(err))
    }

    const addTraining = (customer) => {
        fetch(API_URL + "api/trainings", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setOpen1(!open1);
                } else {
                    alert("Somethinig went wrong");
                }
            })
            .catch(err => console.log(err))
    }

    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert("Something went wrong");
            })
            .catch(err => console(err))
    }

    const onBtnExport = useCallback(() => {
        var params = {
            skipHeader: false,
            skipFooters: true,
            allColumns: true,
            onlySelected: false,
            suppressQuotes: true,
            fileName: "customerlist",
            columnSeparator: ', '
        };
        gridRef.current.api.exportDataAsCsv(params);
    }, []);

    return (
        <>

            <div className="ag-theme-material" style={{ height: 600, width: "75%", margin: "auto" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    supressCellFocus={true}
                    ref={gridRef}
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

            <Snackbar
                open={open1}
                onClose={() => setOpen1(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert
                    onClose={() => setOpen1(false)}
                    severity="info">
                    Training added to customer
                </Alert>
            </Snackbar>

            <AddCustomer addCustomer={addCustomer} />

            <br />

            <Button size="small" variant="contained" color="success" onClick={onBtnExport}>
                Download customerlist
            </Button>
        </>
    );
}


