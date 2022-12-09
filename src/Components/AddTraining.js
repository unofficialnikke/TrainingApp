import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        activity: "",
        date: null,
        duration: "",
        customer: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({ ...training, customer: props.data.links[1].href });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }


    return (
        <>
            <Button size="small" variant="text" color="secondary" startIcon={<AddIcon />} onClick={handleClickOpen}>
                Add training
            </Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            inputFormat="DD.MM.YYYY HH:mm"
                            value={training.date}
                            onChange={(newValue) => { setTraining({ ...training, date: newValue }) }}
                            renderInput={(params) => <TextField {...params} />}
                            disablePast={true}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                        color="secondary"
                    />
                    <TextField
                        margin="dense"
                        label="Duration (in minutes)"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Close</Button>
                    <Button onClick={handleSave} color="secondary">Save</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}