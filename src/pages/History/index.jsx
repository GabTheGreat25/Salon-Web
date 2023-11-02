import React from "react";
import { Sidebar } from "@/components";
import history from "../../data/history";
import { HistoryCard } from "@/components";

export default function (){
    
    const newHistory = history.map((h)=>{
        return <HistoryCard {...h}/>
    });
    return(
        <>
        <div className="flex">
        <Sidebar/>
        <div className="flex flex-col w-full h-64 m-5">
            <h1>History</h1>
            {newHistory}
        </div>
        </div>
       </>
    );
};