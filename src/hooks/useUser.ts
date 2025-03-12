import { getUserInfo } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router'

export const useUser = () => {
    const { accessToken } = useAuthStore()
    const { orgId } = useParams<{ orgId: string }>()
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', accessToken],
        queryFn: () => getUserInfo(accessToken)
    })

    const currentOrg = useMemo(() => {
        if (data) {
            return data.organizations.find((org) => org.id === orgId)
        }
    }, [data, orgId])

    return {
        user: data,
        orgs: data?.organizations,
        currentOrg,
        isLoading,
        error
    }
}
