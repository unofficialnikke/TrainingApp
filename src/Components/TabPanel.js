import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Customer from "./CustomerList";
import Training from "./TrainingList";
import Calendar from "./Calendar";
import Chart from "./Chart";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                    textColor="secondary"
                    indicatorColor="secondary">
                    <Tab label="Customers" {...a11yProps(0)} />
                    <Tab label="Trainings" {...a11yProps(1)} />
                    <Tab label="Calendar" {...a11yProps(2)} />
                    <Tab label="Bar chart" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Customer />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Training />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Calendar />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Chart />
            </TabPanel>
        </Box>
    );
}