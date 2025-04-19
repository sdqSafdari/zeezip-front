"use client"

import UserUploadForm from "@/app/[lang]/user/components/UserUploadForm";
import DashboardLayout from "@/app/[lang]/user/components/dashboard-layout";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL, createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
import UserInfoDomain from "@/app/[lang]/user/queries/UserInfoDomain";
import UserFilesTable from "@/app/[lang]/user/components/UserFilesTable";
import UserMetrics from "@/app/[lang]/user/components/UserMetrics";
import {useState} from "react";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";

interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}
export default function UserDashboard() {
    const [relativePath, setRelativePath] = useState("/");
    const {userAccount,userAccount_isError,userAccount_isFetching} = useQuery_userAccount();
    const {userInfo,userInfo_isFetching,userInfo_isError} = useQuery_userInfo();
    if (userInfo_isFetching) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingSpinner/>
            </div>)
    }
    return (
        <DashboardLayout userInfo={userInfo}>
            <div className='pr-4'>
                <div className='flex items-start justify-start gap-8  my-8 w-full'>
                    <UserUploadForm relativePath={relativePath} userAccount={userAccount}/>
                    <UserMetrics userAccount={userAccount} isFetching={userAccount_isFetching} isError={userAccount_isError }/>
                </div>
                <UserFilesTable relativePath={relativePath} setRelativePath={setRelativePath}/>
            </div>
        </DashboardLayout>
    )
}