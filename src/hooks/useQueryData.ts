import { QueryFunction, QueryKey, useQuery } from '@tanstack/react-query'

export const useQueryData = <T>(queryKey: QueryKey, queryFn: QueryFunction<T>, enabled?: boolean) => {
    const { data, isPending, isFetched, refetch, isFetching } = useQuery<T>({
        queryKey,
        queryFn,
        enabled
    })

    return { data, isPending, isFetched, refetch, isFetching }
}
