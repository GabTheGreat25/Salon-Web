import React from "react";


export default function (data) {
    console.log(data)
    return(
        <>
            <div class="bg-white rounded-lg shadow-md">
                <img src={data.image} alt="Image 1" className="max-w-2xl h-52 w-full object-cover rounded-t-lg" /> 
                <div className="flex items-center">
                <div class="p-4">
                    <h2 class="text-xl font-semibold">{data.description}</h2>
                    <p class="text-pink-300 font-semibold">Price:<span>{data.price}</span></p>
                </div>
                <button className="ml-auto border border-pink-500 text-pink-500 hover:bg-pink-100 h-10 w-20 text-sm m-1">Find Similar</button>
                </div>
            </div>
        </>
    )
}