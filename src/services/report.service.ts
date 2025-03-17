import { BackendResponse } from '@/types/common'
import { ReportVideo } from '@/types/report'
import { backendInstance } from '@/utils/api'

export const createReport = async (videoId: string, content: string, type: string) => {
    if (!videoId) return null
    const { data } = await backendInstance.post<BackendResponse<ReportVideo>>(`/report/${videoId}`, {
        type,
        content
    })
    return data
}

