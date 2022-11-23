import React,{ useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [columnDefs] = useState([
        {field: "firstname", sortable: true, filter: true},
        {field: "lastname", sortable: true, filter: true},
        {field: "streetaddress", sortable: true, filter: true},
        {field: "city", sortable: true, filter: true},
        {field: "email", sortable: true, filter: true},
        {field: "phone", sortable: true, filter: true},
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

    console.log(customers)

    return (
        <>
        <div className="ag-theme-material" style={{height: 650, width: "65%", margin: "auto"}}>
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


