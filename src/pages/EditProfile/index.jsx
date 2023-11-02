import React from "react";
import { Sidebar } from "@/components";
import profileImg from "@/assets/Customer.png";

export default function () {
    return(
        <>
        <div className="flex">
        <Sidebar/>
    <div class="flex-1 p-4 w-full h-full bg-white m-20 p-5 text-black rounded-lg shadow-lg flex flex-col md:flex-row items-center space-x-4">
    <div class="md:w-3/4">
        <h2 className="text-3xl font-sans font-extrabold mb-4">My Profile</h2>
        <h5 className="font-medium ">Manage and protect your own account</h5>
        <h3 className="border-t border-gray-300"></h3>
        <div class="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">User Name:</div>
            <div className="w-1/2 ">
                <input type="text" id="userName" name="userName" value="Juan Dela Cruz 123" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>
<div className="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">First Name:</div>
            <div className="w-1/2">
                <input type="text" id="firstName" name="firstName" value="Juan" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>
<div className="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Last Name:</div>
            <div className="w-1/2">
                <input type="text" id="lastName" name="lastName" value="Dela Cruz" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>
<div className="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Phone:</div>
            <div className="w-1/2">
                <input type="text" id="phone" name="phone" value="09123456789" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>
<div className="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Email:</div>
            <div className="w-1/2">
                <input type="email" id="email" name="email" value="juan.delacruz@gmail.com" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>
<div className="pt-4">
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Birth Date:</div>
            <div className="w-1/2 ">
                <input type="date" id="birthDate" name="birthDate" value="2001-10-23" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
</div>

    </div>
    <div className="mt-4 md:mt-0 md:w-1/4">
    <div className="flex flex-col items-center space-x-2">
        <img src={profileImg} alt="Profile Picture" class="w-42 h-42 rounded-full border border-gray-300" />
        <h3 className="text-gray-600 text-center text-xl font-semibold mt-1.5">User Profile</h3>
        <label for="imageInput" class="bg-pink-500 text-white px-4 py-2 rounded-full mt-2 cursor-pointer">
            Select Image
        </label>
        <input type="file" id="imageInput" name="image" class="hidden" accept="image/*"/>

        {/* <button className="bg-pink-500 text-white px-4 py-2 rounded-full mt-2">Select Image</button> */}
        <p className="text-sm text-gray-400">File Maximum 1 MB</p>
        <span className="text-sm text-gray-400" >File Extension JPEG, PNG</span>
        <button className="bg-pink-500 text-white px-4 py-2 mt-10 rounded-full mt-2 w-36 h-15">Save</button>
    </div>
</div>
</div>
</div>

        </>
    )
}