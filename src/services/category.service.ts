import { Category } from '@/types'
import { backendInstance } from '@/utils/api'
import { useSuspenseQuery } from '@tanstack/react-query'

const getOrgsCategories = async (orgId: string | undefined) => {
    if (!orgId) return null
    const { data } = await backendInstance.get<{ data: Category[] }>(`/category/all/${orgId}`)
    return data
}

export const useOrgCategories = (orgId: string | undefined) => {
    return useSuspenseQuery({
        queryKey: ['org-categories', orgId],
        queryFn: () => getOrgsCategories(orgId)
    })
}

const getCategoryById = async (categoryId: string) => {
    const { data } = await backendInstance.get<{ data: Category }>(`/category/${categoryId}`)
    return data
}

export const useCategoryById = (categoryId: string) => {
    return useSuspenseQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(categoryId)
    })
}

export const createCategory = async (orgId: string | undefined, name: string) => {
    if (!orgId) return null
    const { data } = await backendInstance.post<{ data: Category }>(`/category/${orgId}`, { name })
    return data
}

export const deleteCategoryById = async (categoryId: string) => {
    await backendInstance.delete(`/category/${categoryId}`)
}
