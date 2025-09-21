import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {
    createHttpClientStreamHistoryURL,
    createHttpClientStreamInfoURL,
    createHttpClientUserInfoURL
} from "@/app/utils/LinkUtils";
import {plainToInstance} from "class-transformer";
import UserInfoDomain from "@/app/[lang]/user/queries/UserInfoDomain";
import {StreamHistoryDomain} from "@/app/[lang]/user/queries/StreamHistoryDomain";


interface UserInfoResponse{
    name: string;
    email: string;
    picture: string;
}
export default function useQuery_streamHistory(){
    const {data,isFetching,isError,isPending}:{data:StreamHistoryDomain[]} = useQuery({
        queryKey: ['user','streamHistory'], // used as cache key
        queryFn: ({queryKey}) => {
            return axios.get(createHttpClientStreamHistoryURL())
                .then(res=> res.data)
                .then(responseBody=>{
                    return plainToInstance(StreamHistoryDomain,responseBody)
                });
        },
        staleTime: 3*60*1000,
        retry: 1, // retry the failed queries
        //Poll every 5 seconds until first StreamHistoryDomain is FINISHED
        refetchInterval: (query) => {
            const items: StreamHistoryDomain[] | undefined = query.state.data;

            if (!items || !items[0]) return false; // no data yet → don’t poll

            const stillRunning = items[0].state === 'NEW' || items[0].state === 'IN_PROGRESS';

            return stillRunning ? 5000 : false; // poll only if needed
        }
    });
    return {
        streamHistory:data,
        streamHistory_isFetching:isFetching,
        streamHistory_isError:isError,
        streamHistory_isPending:isPending
    }
}