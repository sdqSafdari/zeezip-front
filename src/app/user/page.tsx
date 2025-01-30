"use client"

import UserUploadForm from "@/app/user/UserUploadForm";

export default function UserDashboard(){
    return (
        <div className="flex flex-col-on-mobile items-start">
        <UserUploadForm />
        </div>
    )
}