"use client"

import DashboardLayout from "@/app/[lang]/user/components/dashboard-layout";
import UserFilesTable from "@/app/[lang]/user/components/UserFilesTable";
import {useState} from "react";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";
import UserAccountInfo from "@/app/[lang]/user/components/UserAccountInfo";

interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}

export default function UserAccount(){
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
                <UserAccountInfo/>
            </div>
        </DashboardLayout>
    );
}