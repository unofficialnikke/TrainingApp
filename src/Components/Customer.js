import React,{ useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [columnDefs] = useState([
        {field: "Fullname", sortable: true, filter: true,
        valueGetter: function(params) {
            return params.data.firstname + " " + params.data.lastname }},
        {field: "Address", sortable: true, filter: true, width: 300,
        valueGetter: function(params) {
            return params.data.streetaddress + ", " + params.data.postcode + " " + params.data.city}},
        {field: "email", sortable: true, filter: true},
        {field: "phone", headerName: "Phone number",sortable: true, filter: true},
    ]);

    useEffect(() => {
        getCustomers();
        }, [])

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(data => {
                setCustomers(data.content);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        <div className="ag-theme-material" style={{height: 600, width: "50%", margin: "auto"}}>
            <h2>Customers</h2>
           <AgGridReact 
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                supressCellFocus={true}
           />
        </div>
        </>
        );
}


