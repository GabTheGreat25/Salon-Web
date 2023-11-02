import React from "react";
import { Sidebar } from "@/components";

export default function () {
    return(
        <>
        <div className="flex">
        <Sidebar/>
        <div class="flex-1 p-4 w-full h-full bg-white m-20 p-5 text-black rounded-lg shadow-lg flex flex-col md:flex-row items-center space-x-4">
        <div class="md:w-3/4">
        <h2 class="text-3xl font-sans font-extrabold mb-4">Change my Password</h2>
        <h5 className="font-medium ">Manage my password</h5>
        <h3 className="border-t border-gray-300"></h3>
        <div className="pt-4">
    <form>
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Current Password:</div>
            <div className="w-1/2">
                <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
    </form>
</div>
<div className="pt-4">
    <form>
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">New Password:</div>
            <div className="w-1/2">
                <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
    </form>
</div>
<div className="pt-4">
    <form>
        <div className="flex items-center space-x-2 mt-4">
            <div className="w-1/3 text-gray-500">Confirm Password:</div>
            <div className="w-1/2">
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" className="rounded-md font-semibold border-b border-gray-400 bg-gray-200" />
            </div>
        </div>
    </form>
</div>
<div className="pt-4">
    <div className="flex items-center space-x-2 mt-4">
        <div className="w-1/3"></div>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-full ml-auto">Change Password</button>
    </div>
</div>
        </div>
        </div>
        </div>
        </>
    )
}