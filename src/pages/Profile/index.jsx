import React from "react";
import { Sidebar } from "@/components";
import profileImg from "@/assets/Customer.png";

export default function (){
    return(
        <>
    <div className="flex">
        <Sidebar/>
    <div class="flex-1 p-4 w-full h-full bg-white m-20 p-5 text-black rounded-lg shadow-lg flex flex-col md:flex-row items-center space-x-4">
    <div class="md:w-3/4">
        <h2 class="text-3xl font-sans font-extrabold mb-4">My Profile</h2>
        <h5 className="font-medium ">Manage and protect your own account</h5>
        <h3 className="border-t border-gray-300"></h3>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4 ">
                <div class="w-1/3 text-gray-500">User Name:</div>
                <div class="w-2/3 font-semibold">YourUserName123</div>
            </div>    
        </div>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4">
                <div class="w-1/3 text-gray-500">First Name:</div>
                <div class="w-2/3 font-semibold">Juan</div>
            </div>    
        </div>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4">
                <div class="w-1/3 text-gray-500">Last Name:</div>
                <div class="w-2/3 font-semibold">Dela Cruz</div>
            </div>    
        </div>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4">
                <div class="w-1/3 text-gray-500">Phone:</div>
                <div class="w-2/3 font-semibold">09123456789</div>
            </div>    
        </div>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4">
                <div class="w-1/3 text-gray-500">Email:</div>
                <div class="w-2/3 font-semibold">juan.delacruz@gmail.com</div>
            </div>    
        </div>
        <div class="pt-4">
            <div class="flex items-center space-x-2 mt-4">
                <div class="w-1/3 text-gray-500">Birth Date:</div>
                <div class="w-2/3 font-semibold">10-23-2001</div>
            </div>    
        </div>
    </div>
    <div class="mt-4 md:mt-0 md:w-1/4">
    <div class="flex flex-col items-center space-x-2">
        <img src={profileImg} alt="Profile Picture" class="w-42 h-42 rounded-full border border-gray-300" />
        <h3 class="text-gray-600 text-center text-xl font-semibold mt-1.5">User Profile</h3>
        <button class="bg-pink-500 text-white px-4 py-2 rounded-full mt-2">Edit Profile</button>

    </div>
</div>
</div>



        </div>
        </>
    )
}