import CategoryCard from '@/pages/(main)/_components/category-card'
import { createCategory, useOrgCategories } from '@/services/category.service'
import { Button, Group, TextInput, UnstyledButton } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'

const CreateCategoryModal = () => {
    const { orgId } = useParams()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: ''
        },

        validate: {
            name: (value: string) => (value.trim().length > 0 ? null : 'Category name is required')
        }
    })
    const queryClient = useQueryClient()
    const [isCreating, setIsCreating] = useState(false)
    const handleCreateCategory = async (values: typeof form.values) => {
        setIsCreating(true)
        try {
            await createCategory(orgId, values.name)
            queryClient.invalidateQueries({
                queryKey: ['org-categories']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Category created successfully'
            })
            closeAllModals()
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to create category'
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleCreateCategory)}>
            <TextInput
                withAsterisk
                label='Category name'
                placeholder='Math, Science, etc.'
                key={form.key('name')}
                {...form.getInputProps('name')}
            />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isCreating}>
                    Cancel
                </Button>
                <Button type='submit' color='green' loading={isCreating}>
                    Create
                </Button>
            </Group>
        </form>
    )
}


const Categories = () => {
    const { orgId } = useParams()
    const { data } = useOrgCategories(orgId)
    const handleOpenCreateCategoryModal = () => {
        openModal({
            title: 'Create new category',
            children: <CreateCategoryModal />
        })
    }
    return (
        <>
            {data?.data.map((category) => <CategoryCard key={category._id} category={category} />)}
            <UnstyledButton
                onClick={handleOpenCreateCategoryModal}
                p={'md'}
                className='border-dashed border-2 border-gray-200 flex items-center justify-center rounded hover:shadow transition-all duration-300'
            >
                <IconPlus size={24} className='text-gray-600/50' />
            </UnstyledButton>
        </>
    )
}

export default Categories
