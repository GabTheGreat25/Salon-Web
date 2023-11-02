import React from "react";
import { Sidebar,  ScheduleCard } from "@/components";
import history from "../../data/history";

export default function () {
    const newSchedule = history.map((s)=>{
        return <ScheduleCard {...s}/>
    });
    return(
        <>
        <div className="flex">
        <Sidebar/>
        <div className="flex flex-col w-full h-64 m-5">
            <h1 className="text-xl font-bold"><i className="fa fa-calendar" aria-hidden="true"></i>My Schedule</h1>
            {newSchedule}
        </div>
        </div>
        </>
    )
}