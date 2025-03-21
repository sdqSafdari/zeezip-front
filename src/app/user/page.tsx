"use client"

import UserUploadForm from "@/app/user/components/UserUploadForm";
import DashboardLayout from "@/app/user/components/dashboard-layout";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL, createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
import UserInfoDto from "@/app/user/UserInfoDto";
import UserFilesTable from "@/app/user/components/UserFilesTable";
import UserMetrics from "@/app/user/components/UserMetrics";
import {useState} from "react";
import useQuery_userAccount from "@/app/user/queries/UserAccountInfoQuery";

interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}
export default function UserDashboard() {
    const [relativePath, setRelativePath] = useState("/");
    const {userAccount,userAccount_isError,userAccount_isFetching} = useQuery_userAccount();

    const {data,status}:{data:UserInfoResponse,status:string} = useQuery({
        queryKey: ['user','userData'], // used as cache key
        queryFn: ({queryKey}) => {
            return axios.get(createHttpClientUserInfoURL()).then(res=> res.data);
        },
        staleTime: 3*60*1000,
        retry: 3 // retry the failed queries
    });//TODO write pending component
    const userInfo: UserInfoDto = data ?
        new UserInfoDto(data.name, data.email, data.picture) :
        new UserInfoDto('', '', '');
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