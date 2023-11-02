import React from "react";
import profileImg from "@/assets/Customer.png";
import { useNavigate } from "react-router-dom";

export default function () {

    const navigate = useNavigate();
    
    const profile = ()=>{
        navigate("/profile");
    };
    const history = ()=>{
        navigate("/history");
    };
    const favorites = ()=>{
        navigate("/favorites");
    };
    const schedule = ()=>{
        navigate("/schedule");
    }
    return(
        <>
        <div className="w-56 bg-transparent h-screen text-black rounded bg-gray-200 shadow-lg bg-opacity-75 p-4 mt-2">
            <div className="flex items-center m-5">
            <img className="border rounded-full w-11 h-11 border-pink-300 m-1" src={profileImg} alt="User Profile"/>
            <div class="p-4 text-base font-semibold">Juan Dela Cruz</div>
            </div>
    
            <ul class="space-y-2 text-center text-base">
    <li class="p-2 group relative">
        <a href="#" onClick={profile} class="hover:text-pink-700">
            <i className="fa fa-user-circle" aria-hidden="true"></i> My Account
        </a>
        <ul class="ml-4">
            <li class="p-2">
                <a href="#"  className="hover:text-pink-700">
                    <i className="fa fa-id-card" aria-hidden="true"></i> Edit Profile
                </a>
            </li>
            <li class="p-2">
                <a href="#"  className="hover:text-pink-700">
                    <i className="fa fa-lock" aria-hidden="true"></i> Set Password
                </a>
            </li>
        </ul>
    </li>
    <li class="p-2">
        <a href="#" onClick={history} className="hover:text-pink-700">
            <i className="fa fa-history" aria-hidden="true"></i> History
        </a>
    </li>
    <li class="p-2">
        <a href="#" onClick={schedule} className="hover:text-pink-700">
            <i className="fa fa-calendar" aria-hidden="true"></i> Schedule
        </a>
    </li>
    <li class="p-2">
        <a href="#" onClick={favorites} className="hover:text-pink-700">
            <i className="fa fa-heart" aria-hidden="true"></i> My Favorites
        </a>
    </li>
</ul>
    </div>
        </>
    )
}