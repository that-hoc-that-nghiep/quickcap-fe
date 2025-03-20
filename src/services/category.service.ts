import { Category } from '@/types'
import { BackendResponse } from '@/types/common'
import { backendInstance } from '@/utils/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getOrgsCategories = async (orgId: string | undefined) => {
    if (!orgId) return null
    const { data } = await backendInstance.get<BackendResponse<Category[]>>(`/category/all/${orgId}`)
    return data
}

export const useOrgCategories = (orgId: string | undefined) => {
    return useSuspenseQuery({
        queryKey: ['org-categories', orgId],
        queryFn: () => getOrgsCategories(orgId)
    })
}

const getCategoryById = async (categoryId: string) => {
    const { data } = await backendInstance.get<BackendResponse<Category>>(`/category/${categoryId}`)
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
    const { data } = await backendInstance.post<BackendResponse<Category>>(`/category/${orgId}`, { name })
    return data
}

export const deleteCategoryById = async (categoryId: string) => {
    await backendInstance.delete(`/category/${categoryId}`)
}

export const categorySuggest = async (orgId: string | undefined, transcript: string | undefined) => {
    if (!orgId || !transcript) return null
    const { data } = await backendInstance.post<BackendResponse<{ category: string; isNewCategory: boolean }>>(
        `/category/suggest/${orgId}`,
        { transcript }
    )
    return data
}
