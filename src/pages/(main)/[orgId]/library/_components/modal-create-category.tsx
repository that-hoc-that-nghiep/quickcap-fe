import { createCategory } from '@/services/category.service'
import { Button, Group, TextInput, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
const CreateCategoryStep2Modal = ({ orgId }: { orgId: string }) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: ''
        },

        validate: {
            name: (value: string) => (value.trim().length > 0 ? null : 'Category name is required')
        }
    })
    const theme = useMantineTheme()
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
        } catch (error: any) {
            console.error(error)
            if (axios.isAxiosError(error)) {
                const statusCode = error.response?.status // Lấy mã lỗi HTTP
                const errorMessage = error.response?.data?.message || 'Something went wrong.'

                if (statusCode === 400) {
                    notifications.show({
                        color: 'orange',
                        title: 'Validation Error',
                        message: errorMessage
                    })
                } else if (statusCode === 404) {
                    notifications.show({
                        color: 'yellow',
                        title: 'Not Found',
                        message: 'The requested resource was not found.'
                    })
                } else if (statusCode && statusCode >= 500) {
                    notifications.show({
                        color: 'red',
                        title: 'Server Error',
                        message: 'Something went wrong on the server. Please try again later.'
                    })
                } else {
                    notifications.show({
                        color: 'red',
                        title: 'Error',
                        message: 'Failed to create category'
                    })
                }
            } else {
                notifications.show({
                    color: 'red',
                    title: 'Unexpected Error',
                    message: 'An unknown error occurred.'
                })
            }
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleCreateCategory)}>
            <TextInput
                disabled={isCreating}
                withAsterisk
                label='Category name'
                placeholder='Math, Science, etc.'
                key={form.key('name')}
                {...form.getInputProps('name')}
                error={form.errors.name}
            />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isCreating}>
                    Cancel
                </Button>
                <Button type='submit' color={theme.primaryColor} loading={isCreating}>
                    Create
                </Button>
            </Group>
        </form>
    )
}
export const openCreateCategoryModal = (orgId: string) =>
    openModal({ title: 'Create new category', children: <CreateCategoryStep2Modal orgId={orgId} /> })
