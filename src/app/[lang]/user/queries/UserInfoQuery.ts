import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserInfoURL} from "@/app/utils/LinkUtils";
import {plainToInstance} from "class-transformer";
import UserInfoDomain from "@/app/[lang]/user/queries/UserInfoDomain";


interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}
export default function useQuery_userInfo(){
    const {data,isFetching,isError,isPending}:{data:UserInfoDomain} = useQuery({
        queryKey: ['user','userData'], // used as cache key
        queryFn: ({queryKey}) => {
            return axios.get(createHttpClientUserInfoURL())
                .then(res=> res.data)
                .then(responseBody=>{
                    return plainToInstance(UserInfoDomain,responseBody)
                });
        },
        staleTime: 3*60*1000,
        retry: 3 // retry the failed queries
    });
    return {
        userInfo:data,
        userInfo_isFetching:isFetching,
        userInfo_isError:isError,
        userInfo_isPending:isPending
    }
}