import { getUserInfo } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export const useUser = () => {
    const { accessToken } = useAuthStore()
    const { orgId } = useParams<{ orgId: string }>()
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', accessToken],
        queryFn: () => getUserInfo(accessToken)
    })

    let currentOrg = null
    if (data) {
        currentOrg = data.organizations.find((org) => org.id === orgId)
    }

    return {
        user: data,
        orgs: data?.organizations,
        currentOrg,
        isLoading,
        error
    }
}
