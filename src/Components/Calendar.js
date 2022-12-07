import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import { API_URL } from "../constants";

export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, [events])

    const getEvents = () => {
        fetch(API_URL + "gettrainings")
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert("Something went wrong")
            })
            .then(data =>
                setEvents(data))
            .catch(err => console.log(err));
    }

    return (
        <div id="calendar" style={{ width: "90%", margin: "auto" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "today,prev,next",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek,dayGridDay"
                }}
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}
                events={events.map((e) => {
                    return ({
                        title: e.customer !== null ? `${e.activity} / ${e.customer.firstname} ${e.customer.lastname}` : "",
                        start: e.date !== null ? e.date : ""
                    })
                })}
            />
        </div >
    )
}