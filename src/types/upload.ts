import { Video } from './index'
import { BackendResponse } from './common'

// Common upload status interface
export interface UploadStatus {
    uploaded: number
    total: number
    complete: boolean
    missingChunks?: number[]
}

// Response when uploading a chunk
export interface ChunkUploadResponse {
    message: string
    uploadStatus: UploadStatus
    data?: Video // For the final chunk that completes the upload
}

// Response for checking upload status
export interface ChunkStatusResponse {
    message: string
    status: UploadStatus
}

// Type-safe backend responses
export type BackendChunkUploadResponse = BackendResponse<ChunkUploadResponse>
export type BackendChunkStatusResponse = BackendResponse<ChunkStatusResponse>
