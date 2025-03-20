import { categorySuggest, createCategory, useOrgCategories } from '@/services/category.service'
import { Video } from '@/types'
import { Button, Group, Loader, Popover, Stack, Title, useMantineTheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconFolderFilled, IconPlus, IconSparkles } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { openCreateCategoryModal } from '../../library/_components/modal-create-category'
import { CategoryCardSelect } from './category-card'

interface VideoCategoryProps {
    orgId: string | undefined
    video: Video | null
    selectedCategory: string
    onCategorySelect: (orgId: string, categoryId: string) => void
    loading: boolean
}

export const VideoCategory = ({ orgId, video, selectedCategory, onCategorySelect, loading }: VideoCategoryProps) => {
    const { data } = useOrgCategories(orgId)
    const videoCategoryIds = video?.categoryId.map((category) => category._id)
    const filteredCategories = data?.data.filter((category) => !videoCategoryIds?.includes(category._id)) || []
    const [suggesting, setSuggesting] = useState(false)
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [open, setOpen] = useState(false)
    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const handleSuggest = async () => {
        setSuggesting(true)
        try {
            const res = await categorySuggest(orgId, video?.transcript)
            if (res) {
                setIsNewCategory(res.data.isNewCategory)
                setNewCategory(res.data.category)
            }
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to suggest AI category',
                color: 'red'
            })
        } finally {
            setSuggesting(false)
        }
    }

    const handleAddCategory = async () => {
        try {
            setOpen(false)
            await createCategory(orgId, newCategory)
            notifications.show({
                title: 'Success',
                message: 'Category added successfully',
                color: 'green'
            })
            queryClient.invalidateQueries({
                queryKey: ['org-categories', orgId]
            })
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to add category',
                color: 'red'
            })
        }
    }

    const onSelect = useCallback(
        (categoryId: string) => {
            onCategorySelect(video?._id || '', categoryId)
        },
        [video?._id, onCategorySelect]
    )

    return (
        <Stack>
            <Group justify='space-between'>
                <Title order={4}>{video?.title}</Title>
                <Group>
                    <Button
                        disabled={loading}
                        leftSection={<IconPlus size={16} />}
                        color={theme.colors[theme.primaryColor][5]}
                        onClick={() => openCreateCategoryModal(orgId!)}
                    >
                        Create Category
                    </Button>
                    {video?.transcript && (
                        <Popover width={320} position='bottom' withArrow shadow='md' opened={open} onChange={setOpen}>
                            <Popover.Target>
                                <Button
                                    leftSection={<IconSparkles size={14} />}
                                    onClick={() => {
                                        setOpen((prev) => !prev)
                                        if (!open) {
                                            handleSuggest()
                                        }
                                    }}
                                    disabled={loading}
                                >
                                    AI Category Suggest
                                </Button>
                            </Popover.Target>
                            <Popover.Dropdown>
                                {suggesting ? (
                                    <div className='flex items-center justify-center'>
                                        <Loader size={'sm'} />
                                    </div>
                                ) : isNewCategory ? (
                                    <Stack>
                                        <p className='flex items-center gap-1 my-0 flex-wrap'>
                                            Suggested category:{' '}
                                            <span
                                                className='font-semibold rounded-sm px-2 py-1 flex items-center gap-2 w-fit flex-nowrap'
                                                style={{
                                                    backgroundColor: theme.colors[theme.primaryColor][0],
                                                    color: theme.colors[theme.primaryColor][9]
                                                }}
                                            >
                                                <IconFolderFilled size={14} />
                                                {newCategory}
                                            </span>
                                        </p>
                                        <Button onClick={handleAddCategory}>Add Category</Button>
                                    </Stack>
                                ) : (
                                    <p className='flex items-center gap-1 my-0 flex-wrap'>
                                        Suitable category:{' '}
                                        <span
                                            className='font-semibold rounded-sm px-2 py-1 flex items-center gap-2 w-fit flex-nowrap'
                                            style={{
                                                backgroundColor: theme.colors[theme.primaryColor][0],
                                                color: theme.colors[theme.primaryColor][9]
                                            }}
                                        >
                                            <IconFolderFilled size={14} />
                                            {newCategory}
                                        </span>
                                    </p>
                                )}
                            </Popover.Dropdown>
                        </Popover>
                    )}
                </Group>
            </Group>
            <div className='grid grid-cols-3 gap-4'>
                {filteredCategories
                    .filter((c) => !c.isDeleted)
                    .map((category) => (
                        <CategoryCardSelect
                            key={category._id}
                            category={category}
                            selected={selectedCategory}
                            onSelect={onSelect}
                        />
                    ))}
            </div>
        </Stack>
    )
}
