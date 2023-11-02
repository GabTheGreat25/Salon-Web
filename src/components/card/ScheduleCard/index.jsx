import React from "react";

export default function (data) {
    console.log(data);

    return(
        <>
         <div className="p-4 w-full h-full bg-white m-4 text-black rounded-lg shadow-lg items-center space-x-4">
            <div class="flex justify-between items-center space-x-4 border-b border-gray-300 w-full"> 
                <h2 class="text-lg font-sans font-semibold mb-4  flex items-center">
                    <i class="fa fa-home" aria-hidden="true"></i>
                        Lhanlee Beauty Lounge
                <span class="ml-4 font-light text-pink-400">
                    {data.date}
                </span>
                </h2>
                <h3 className="bg-pink-300 rounded-full p-2 text-white text-xs">{data.status}</h3>
            </div>

            <div class="text-center mt-4 flex items-center">
            <img src={data.serviceImg} alt="Order Image" class="w-20 h-20 rounded-full" />
                <div class="flex flex-col m-2 space-x-4">
                    <h3 class="font-semibold text-2xl">{data.description}</h3>
                     <h5>
                        Variation: 
                        <span>
                        {data.variation}
                        </span>
                    </h5>
            </div>
            <h3 class="ml-auto p-2 text-right">
            {data.price}
            </h3>
        </div>
        <div className="border-t m-2 text-right border-gray-300 w-full">
            <h3>Order Total {data.price}</h3>
            <button className="bg-transparent rounded-xl p-2 text-black border border-gray-900 text-xs m-2 w-24">Pending</button>
        </div>
        </div>
        </>
    )
}