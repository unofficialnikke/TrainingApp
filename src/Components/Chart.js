import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import { API_URL } from '../constants';

export default function Chart() {
    const [activities, setActivities] = useState([]);

    const chartData = []
    const data = _.groupBy(activities, "activity");
    const names = Object.keys(data);
    const durations = Object.entries(data).map((item) => ((_.sumBy(item[1], i => i.duration))));

    for (let i = 0; i < names.length; i++) {
        if (!names[i]) continue;
        chartData.push({ activity: names[i], duration: durations[i] });
    }

    useEffect(() => {
        getActivities();
    }, [])

    const getActivities = async () => {
        await fetch(API_URL + "gettrainings")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setActivities(data.map((i) => {
                    return (
                        { activity: i.activity, duration: i.duration }
                    )
                }))

            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <ResponsiveContainer width="60%" height={500}>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: "Duration (min)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#47A443" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}