import { Category } from '@/types'
import { backendInstance } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

const getOrgsCategories = async (orgId: string | undefined) => {
    if (!orgId) return null
    const { data } = await backendInstance.get<{ data: Category[] }>(`/category/all/${orgId}`)
    return data
}

export const useOrgCategories = (orgId: string | undefined) => {
    return useQuery({
        queryKey: ['org-categories', orgId],
        queryFn: () => getOrgsCategories(orgId)
    })
}

export const createCategory = async (orgId: string | undefined, name: string) => {
    if (!orgId) return null
    const { data } = await backendInstance.post<{ data: Category }>(`/category/${orgId}`, { name })
    return data
}
