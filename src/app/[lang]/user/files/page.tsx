"use client"

import DashboardLayout from "@/app/[lang]/user/components/dashboard-layout";
import UserFilesTable from "@/app/[lang]/user/components/UserFilesTable";
import {useState} from "react";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";

interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}

export default function UserFiles(){
    const [relativePath, setRelativePath] = useState("/");
    const {userInfo,userInfo_isError,userInfo_isFetching} = useQuery_userInfo();
    if (userInfo_isFetching) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner/>
            </div>)
    }
    return (
        <DashboardLayout userInfo={userInfo}>
            <div className='pr-4'>
                <UserFilesTable relativePath={relativePath} setRelativePath={setRelativePath}/>
            </div>
        </DashboardLayout>
    );
}