"use client"

import UserUploadForm from "@/app/[lang]/user/components/UserUploadForm";
import DashboardLayout from "@/app/[lang]/user/components/dashboard-layout";
import UserFilesTable from "@/app/[lang]/user/components/UserFilesTable";
import UserCloudStorageMetrics from "@/app/[lang]/user/components/UserCloudStorageMetrics";
import {useState} from "react";
import useQuery_userAccount from "@/app/[lang]/user/queries/UserAccountInfoQuery";
import useQuery_userInfo from "@/app/[lang]/user/queries/UserInfoQuery";
import LoadingSpinner from "@/app/sitecomponents/loading/LoadingSpineer";

export default function UserDashboard() {
    const [relativePath, setRelativePath] = useState("/");
    const {userAccount,userAccount_isError,userAccount_isFetching} = useQuery_userAccount();
    const {userInfo,userInfo_isFetching,userInfo_isError,userInfo_isPending} = useQuery_userInfo();
    if (userInfo_isPending) {
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
                    <UserCloudStorageMetrics userAccount={userAccount} isFetching={userAccount_isFetching} isError={userAccount_isError }/>
                </div>
                <UserFilesTable relativePath={relativePath} setRelativePath={setRelativePath}/>
            </div>
        </DashboardLayout>
    )
}