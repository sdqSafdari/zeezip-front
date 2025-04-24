import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {createHttpClientTryResetPlanURL} from "@/app/utils/LinkUtils";
import {plainToInstance} from "class-transformer";
import UserAccountDomain from "@/app/[lang]/user/queries/UserAccountDomain";

export default function useMutation_tryResetPlan(){
    const queryClient:QueryClient = useQueryClient();
    return useMutation({
        mutationFn:()=>{
            return axios.put(createHttpClientTryResetPlanURL()).then(responseEntity=>responseEntity.data)
                .then(responseBody=>plainToInstance(UserAccountDomain,responseBody));
        },
        onSuccess:(userAccountDomain)=>{
            queryClient.setQueryData(['user','userMetrics'],userAccountDomain);
        }
    });
}