import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function AddTraining(props) {
    const [date, setDate] = React.useState(dayjs(""));
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: "",
        date: "DD.MM.YYYY HH:mm",
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
            <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                Add training
            </Button>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                        color="secondary"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date&Time picker"
                            value={date || null}
                            onChange={e => setDate({ ...training, date: e.target.value })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="dense"
                        label="Duration"
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