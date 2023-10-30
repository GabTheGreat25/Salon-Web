import React from "react";

export default function(data){
    console.log(data)
    return(
        <>
        <div className="flex flex-col items-center text-center">
        <img className="rounded-md h-64 w-56 m-8 bg-purple-500 " src={data.image} alt="Lhanlee Salon"/>
        <span className="font-bold text-2xl">{data.title}</span>
        <span className="font-bold text-pink-400 text-2xl">{data.description}</span>
        </div>
        </>
    )
}