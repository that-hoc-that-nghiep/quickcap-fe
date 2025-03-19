import { addVideoToOrgs, uploadVideo, useVideoByOrgIdUnique } from '@/services/video.service'
import { Button, Group, MultiSelect, Paper, Skeleton, Stack } from '@mantine/core'
import { Suspense, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import VideoDropzone from '../upload/_components/video-dropzone'
import { FileWithPath } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { VideoCategory } from './_components/video-category'

const AddVideoToOrgPage = () => {
    const { orgId } = useParams<{ orgId: string }>()
    const navigate = useNavigate()
    const { data } = useVideoByOrgIdUnique(orgId!)
    const filteredVideos = data?.data.filter((video) => !video.isNSFW && !video.isDeleted) || []

    const [selectedVideos, setSelectedVideos] = useState<string[]>(filteredVideos[0] ? [filteredVideos[0]._id] : [])
    const [loading, setLoading] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({})
    const queryClient = useQueryClient()
    const handleSeclectVideos = (value: string[]) => {
        const validValue = Array.from(new Set([filteredVideos[0]._id ? filteredVideos[0]._id : '', ...value]))
        setSelectedVideos(validValue)
    }

    const handleCategorySelect = useCallback((videoId: string, categoryId: string) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [videoId]: categoryId
        }))
    }, [])
    const getVideos = useCallback((id: string) => filteredVideos.find((video) => video._id === id), [data?.data])

    const onUpload = async (files: FileWithPath[]) => {
        setLoading(true)
        try {
            const res = await uploadVideo(files[0])
            if (res) {
                notifications.show({
                    color: 'green',
                    title: 'Upload successful',
                    message: 'Video uploaded successfully'
                })
            }
            queryClient.invalidateQueries({
                queryKey: ['videos-unique', orgId]
            })
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Upload failed',
                message: 'Something went wrong'
            })
        } finally {
            setLoading(false)
        }
    }
    const handleAddVideoToOrgs = async () => {
        setLoading(true)
        try {
            if (!orgId) {
                notifications.show({
                    title: 'Error',
                    message: 'Failed to add video to organizations',
                    color: 'red'
                })
                throw new Error('Org id is missing')
            }
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await addVideoToOrgs(
                Object.entries(selectedCategories).map(([videoId, categoryId]) => ({
                    orgId,
                    videoId,
                    categoryId
                }))
            )
            queryClient.invalidateQueries({
                queryKey: ['videos']
            })
            notifications.show({
                title: 'Success',
                message: 'Video added to organizations successfully',
                color: 'green'
            })
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to add video to organizations',
                color: 'red'
            })
        } finally {
            setLoading(false)
            navigate(`/${orgId}/library`)
        }
    }
    return (
        <Stack>
            <Paper p={16}>
                <VideoDropzone onUpload={onUpload} loading={loading} />
            </Paper>

            <Paper p={16} shadow='xs' withBorder>
                <MultiSelect
                    disabled={loading}
                    hidePickedOptions
                    data={filteredVideos.map((video) => ({ value: video._id, label: video.title })) || []}
                    value={selectedVideos}
                    onChange={handleSeclectVideos}
                    label="Personal org's videos"
                />
            </Paper>
            {selectedVideos.map((video) => {
                const videoInfo = getVideos(video)

                return (
                    <Paper key={video} p={16} shadow='xs' withBorder>
                        <Stack>
                            <Suspense
                                fallback={
                                    <Stack>
                                        <Group justify='space-between'>
                                            <Skeleton width={200} height={40} />
                                            <Skeleton width={300} height={40} />
                                        </Group>
                                        <div className='grid grid-cols-3 gap-4'>
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} height={60} />
                                            ))}
                                        </div>
                                    </Stack>
                                }
                            >
                                <VideoCategory
                                    orgId={orgId}
                                    video={videoInfo!}
                                    selectedCategory={selectedCategories[videoInfo?._id!] || ''}
                                    onCategorySelect={handleCategorySelect}
                                    loading={loading}
                                />
                            </Suspense>
                        </Stack>
                    </Paper>
                )
            })}
            <Group justify='end'>
                <Button
                    disabled={Object.keys(selectedCategories).length !== selectedVideos.length}
                    onClick={async () => {
                        await handleAddVideoToOrgs()
                    }}
                    loading={loading}
                >
                    Add
                </Button>
            </Group>
        </Stack>
    )
}

export default AddVideoToOrgPage
