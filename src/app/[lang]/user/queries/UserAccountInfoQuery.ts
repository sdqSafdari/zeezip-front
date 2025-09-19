import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientUserMetricsURL} from "@/app/utils/LinkUtils";
import {plainToInstance} from "class-transformer";
import UserAccountDomain from "@/app/[lang]/user/queries/UserAccountDomain";

export default function useQuery_userAccount(reThrow:boolean=true){
    const {data,status,isFetching,isPending,isError}:{data:UserAccountDomain,status:string} = useQuery({
        queryKey: ['user','userMetrics'], // used as cache key
        queryFn: ({queryKey}) => {
            return axios.get(createHttpClientUserMetricsURL()).then(res=> res.data)
                .then(responseBody=>{
                    return plainToInstance(UserAccountDomain,responseBody);
                });
        },
        staleTime: 3*60*1000,
        retry: 3, // retry the failed queries
        throwOnError: reThrow
    });
    return {
        userAccount:data,
        userAccount_isFetching:isFetching,
        userAccount_isError:isError,
        userAccount_isPending:isPending
    };
}