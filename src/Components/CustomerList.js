import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { API_URL } from "../constants";
import Button from "@mui/material/Button";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customer() {
    const [customers, setCustomers] = useState([]);
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
                <Button size="small" variant="contained" color="error" onClick={() => deleteCustomer(params.data)}>
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
                    if (response.ok)
                        getCustomers();
                    else
                        alert("Somethinig went wrong");
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
                if (response.ok)
                    getCustomers();
                else
                    alert("Something went wrong")
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

    return (
        <>
            <div className="ag-theme-material" style={{ height: 600, width: "75%", margin: "auto" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                    supressCellFocus={true}
                />
            </div>
            <AddCustomer addCustomer={addCustomer} />

        </>
    );
}


