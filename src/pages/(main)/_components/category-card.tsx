import { deleteCategoryById } from '@/services/category.service'
import { Category } from '@/types'
import { ActionIcon, Button, Group, Menu, Paper, Text, useMantineTheme } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconDotsVertical, IconFolderFilled, IconTrash } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
// import { Link } from 'react-router'

interface CategoryCardProps {
    category: Category
}

const ConfirmDeleteCategoryModal = ({ category }: CategoryCardProps) => {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const handleDeleteCategory = async () => {
        setIsLoading(true)
        try {
            await deleteCategoryById(category._id)
            queryClient.invalidateQueries({
                queryKey: ['org-categories']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Category deleted successfully'
            })
            closeAllModals()
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to delete category'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Text size='sm'>Are you sure you want to delete this category? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleDeleteCategory} loading={isLoading}>
                    Delete category
                </Button>
            </Group>
        </>
    )
}

const CategoryActions = ({ category }: CategoryCardProps) => {
    const handleOpenDeleteCategoryModal = () => {
        openModal({
            title: 'Delete category',
            children: <ConfirmDeleteCategoryModal category={category} />
        })
    }
    return (
        <Menu.Dropdown>
            <Menu.Item leftSection={<IconTrash size={14} />} onClick={handleOpenDeleteCategoryModal}>
                Delete
            </Menu.Item>
        </Menu.Dropdown>
    )
}

const CategoryCard = ({ category }: CategoryCardProps) => {
    const theme = useMantineTheme()
    return (
        <Paper key={category._id} shadow='sm' p={'md'} withBorder className='col-span-1'>
            <Group justify='space-between' wrap='nowrap'>
                <Group wrap='nowrap' gap={8} className='grow' style={{ minWidth: 0 }}>
                    <IconFolderFilled size={24} color={theme.colors[theme.primaryColor][5]} style={{ flexShrink: 0 }} />
                    <Text
                        size='md'
                        fw={500}
                        c={theme.primaryColor}
                        className='min-w-0 max-w-full truncate overflow-hidden text-ellipsis whitespace-nowrap'
                    >
                        {category.name}
                    </Text>
                </Group>
                <Menu shadow='md' position='bottom-start' offset={-3}>
                    <Menu.Target>
                        <ActionIcon
                            variant='transparent'
                            onClick={(e) => e.stopPropagation()}
                            style={{ flexShrink: 0 }}
                        >
                            <IconDotsVertical size={20} />
                        </ActionIcon>
                    </Menu.Target>
                    <CategoryActions category={category} />
                </Menu>
            </Group>
        </Paper>
    )
}

export default CategoryCard
