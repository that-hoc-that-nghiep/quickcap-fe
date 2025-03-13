export interface BackendResponse<T> {
    data: T
    message: string
    statusCode: number
}
