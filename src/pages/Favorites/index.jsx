import React from "react";
import { Sidebar, FavoriteCard } from "@/components";
import favorites from "../../data/favorites";

export default function () {
 
    const newFavorites = favorites.map((u)=>{
        return <FavoriteCard {...u}/>
    });

    return(
        <>
        <div className="flex text-black">
        <Sidebar/>
        <div class="bg-gray-100 p-4 w-full m-1">
            <h1 className="text-2xl font-bold"><i className="fa fa-heart text-pink-300" aria-hidden="true"></i>My Favorites</h1>
             <h3 className="border-t border-gray-300 w-full mb-5 mt-1"></h3>
             <div class="container mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {newFavorites}
                </div>
             </div>
       </div>
       </div>
        </>
    )
}