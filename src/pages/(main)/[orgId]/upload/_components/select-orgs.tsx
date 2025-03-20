import { useUser } from '@/hooks/useUser'
import { categorySuggest, createCategory, useOrgCategories } from '@/services/category.service'
import { addVideoToOrgs } from '@/services/video.service'
import { useUploadStep } from '@/stores/uploadStep'
import { Category, Org, Video } from '@/types'
import {
    Button,
    Group,
    Loader,
    MultiSelect,
    Paper,
    Popover,
    Skeleton,
    Stack,
    Text,
    Title,
    useMantineTheme
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconCircleCheckFilled, IconFolderFilled, IconPlus, IconSparkles } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { openCreateCategoryModal } from '../../library/_components/modal-create-category'

interface SelectOrgsProps {
    video: Video | null
}

interface OrgCategoryProps {
    org:
        | (Org & {
              is_owner: boolean
              is_permission: string
          })
        | undefined
    video: Video | null
    selectedCategory: string
    onCategorySelect: (orgId: string, categoryId: string) => void
}

const CategoryCardSelect = ({
    category,
    selected,
    onSelect
}: {
    category: Category
    selected: string
    onSelect: (orgId: string) => void
}) => {
    const theme = useMantineTheme()
    return (
        <Paper
            key={category._id}
            shadow='sm'
            p={'md'}
            withBorder
            className='col-span-1 cursor-pointer'
            component='button'
            onClick={() => onSelect(category._id)}
        >
            <Group justify='space-between' wrap='nowrap'>
                <Group wrap='nowrap' gap={8} className='grow' style={{ minWidth: 0 }}>
                    <div className='no-underline flex gap-2 grow w-full'>
                        <IconFolderFilled
                            size={24}
                            color={theme.colors[theme.primaryColor][5]}
                            style={{ flexShrink: 0 }}
                        />
                        <Text
                            size='md'
                            fw={500}
                            c={theme.primaryColor}
                            className='min-w-0 max-w-full truncate overflow-hidden text-ellipsis whitespace-nowrap'
                            title={category.name}
                        >
                            {category.name}
                        </Text>
                    </div>
                    {selected === category._id && (
                        <IconCircleCheckFilled
                            size={20}
                            color={theme.colors[theme.primaryColor][5]}
                            style={{ flexShrink: 0 }}
                        />
                    )}
                </Group>
            </Group>
        </Paper>
    )
}

const OrgCategory = ({ org, video, selectedCategory, onCategorySelect }: OrgCategoryProps) => {
    const { data: categories } = useOrgCategories(org?.id)
    const [suggesting, setSuggesting] = useState(false)
    const [isNewCategory, setIsNewCategory] = useState(false)
    const [newCategory, setNewCategory] = useState('')
    const [open, setOpen] = useState(false)
    const theme = useMantineTheme()
    const queryClient = useQueryClient()
    const handleSuggest = async () => {
        setSuggesting(true)
        try {
            const res = await categorySuggest(org?.id, video?.transcript)
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
            await createCategory(org?.id, newCategory)
            notifications.show({
                title: 'Success',
                message: 'Category added successfully',
                color: 'green'
            })
            queryClient.invalidateQueries({
                queryKey: ['org-categories', org?.id]
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
            onCategorySelect(org?.id || '', categoryId)
        },
        [org?.id, onCategorySelect]
    )

    return (
        <Stack>
            <Group justify='space-between'>
                <Title order={4}>{org?.name}</Title>
                <Group>
                    <Button
                        leftSection={<IconPlus size={16} />}
                        color={theme.colors[theme.primaryColor][5]}
                        onClick={() => openCreateCategoryModal(org?.id!)}
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
                {categories?.data?.map((category) => (
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

const SelectOrgs = ({ video }: SelectOrgsProps) => {
    const [, { increment }] = useUploadStep()
    const [loading, setLoading] = useState(false)
    const { orgs } = useUser()
    const personalOrg = useMemo(() => orgs?.find((org) => org.type === 'Personal'), [orgs])
    const [selectedOrgs, setSelectedOrgs] = useState<string[]>(personalOrg?.id ? [personalOrg.id] : [])
    const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({})
    const queryClient = useQueryClient()
    useEffect(() => {
        // Ensure that the personal org is selected by default
        if (personalOrg?.id) {
            setSelectedOrgs((prev) => Array.from(new Set([personalOrg.id, ...prev])))
        }
    }, [personalOrg?.id])
    const handleSelect = (value: string[]) => {
        const validValue = Array.from(new Set([personalOrg?.id ? personalOrg.id : '', ...value]))
        setSelectedOrgs(validValue)
    }
    const handleCategorySelect = useCallback((orgId: string, categoryId: string) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [orgId]: categoryId
        }))
    }, [])
    const getOrg = useCallback((id: string) => orgs?.find((org) => org.id === id), [orgs])

    const handleAddVideoToOrgs = async () => {
        setLoading(true)
        try {
            if (!video?._id) {
                notifications.show({
                    title: 'Error',
                    message: 'Failed to add video to organizations',
                    color: 'red'
                })
                throw new Error('Video ID is missing')
            }
            await addVideoToOrgs(
                Object.entries(selectedCategories).map(([orgId, categoryId]) => ({
                    orgId,
                    videoId: video?._id,
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
            increment()
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to add video to organizations',
                color: 'red'
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Stack>
            <Paper p={16} shadow='xs' withBorder>
                <MultiSelect
                    hidePickedOptions
                    data={orgs
                        ?.filter((org) => org.is_permission !== 'READ')
                        .map((org) => ({ value: org.id, label: org.name }))}
                    value={selectedOrgs}
                    onChange={handleSelect}
                    label='Select organizations'
                />
            </Paper>
            {selectedOrgs.map((orgId) => {
                const org = getOrg(orgId)

                return (
                    <Paper key={orgId} p={16} shadow='xs' withBorder>
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
                                <OrgCategory
                                    org={org}
                                    video={video}
                                    selectedCategory={selectedCategories[orgId] || ''}
                                    onCategorySelect={handleCategorySelect}
                                />
                            </Suspense>
                        </Stack>
                    </Paper>
                )
            })}
            <Group justify='end'>
                <Button
                    disabled={Object.keys(selectedCategories).length !== selectedOrgs.length}
                    onClick={async () => {
                        await handleAddVideoToOrgs()
                        increment()
                    }}
                    loading={loading}
                >
                    Next
                </Button>
            </Group>
        </Stack>
    )
}

export default SelectOrgs
