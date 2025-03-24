import { useUser } from '@/hooks/useUser'
import { deleteOrg, leaveOrg, updateOrg } from '@/services/auth.service'
import { Button, Card, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconLogout2, IconTrash } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const ConfirmActionOrgModal = ({ type }: { type: 'delete' | 'leave' }) => {
    const { orgId } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const handleActionOrg = async () => {
        setIsLoading(true)
        try {
            if (type === 'delete') {
                await deleteOrg(orgId)
            } else {
                await leaveOrg(orgId)
            }
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: type === 'delete' ? 'Organization deleted successfully' : 'Left organization successfully'
            })
            closeAllModals()
            navigate('/')
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: `Failed to ${type} organization`
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Text size='sm'>Are you sure you want to {type} this organization? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isLoading}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleActionOrg} loading={isLoading}>
                    {type === 'delete' ? 'Delete organization' : 'Leave organization'}
                </Button>
            </Group>
        </>
    )
}

const OrgCommonSettings = () => {
    const { currentOrg } = useUser()
    const [isSaving, setIsSaving] = useState(false)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: currentOrg?.name || ''
        },
        validate: {
            name: (value: string) => (value.trim().length > 2 ? null : 'Organization name is too short')
        }
    })

    const queryClient = useQueryClient()
    const handleSave = async (values: typeof form.values) => {
        setIsSaving(true)
        try {
            await updateOrg(currentOrg!.id, values.name)
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                title: 'Success',
                message: 'Organization settings saved',
                color: 'green'
            })
        } catch (error) {
            console.error(error)
            notifications.show({
                title: 'Error',
                message: 'Failed to save organization settings',
                color: 'red'
            })
        } finally {
            setIsSaving(false)
        }
    }

    const handleOpenActionOrgModal = (type: 'delete' | 'leave') => {
        openModal({
            title: 'Delete organization',
            children: <ConfirmActionOrgModal type={type} />
        })
    }

    return (
        <Card withBorder p='xl' radius='md' className='flex flex-col h-full' shadow='xs'>
            <Text size='xl' fw={700} mb='lg'>
                Organization Settings
            </Text>

            <form onSubmit={form.onSubmit(handleSave)}>
                <Stack style={{ flex: 1 }}>
                    <TextInput
                        label='Organization name'
                        placeholder='Super Organization'
                        {...form.getInputProps('name')}
                        disabled={isSaving || !currentOrg?.is_owner}
                    />

                    {currentOrg?.type === 'Organization' ? (
                        <>
                            <Group justify='space-between' mt='xl'>
                                <Text fw={600} size='sm' c={currentOrg?.is_owner ? 'red' : 'orange'}>
                                    Danger Zone
                                </Text>
                            </Group>

                            <Group justify='space-between'>
                                {currentOrg?.is_owner ? (
                                    <Button
                                        color='red'
                                        leftSection={<IconTrash size={16} />}
                                        variant='outline'
                                        onClick={() => handleOpenActionOrgModal('delete')}
                                        disabled={isSaving}
                                    >
                                        Delete organization
                                    </Button>
                                ) : (
                                    <Button
                                        color='orange'
                                        leftSection={<IconLogout2 size={16} />}
                                        variant='outline'
                                        onClick={() => handleOpenActionOrgModal('leave')}
                                        disabled={isSaving}
                                    >
                                        Leave organization
                                    </Button>
                                )}
                            </Group>
                        </>
                    ) : null}
                    {currentOrg?.is_owner ? (
                        <Group justify='flex-end'>
                            <Button type='submit' color='green' loading={isSaving}>
                                Save
                            </Button>
                        </Group>
                    ) : null}
                </Stack>
            </form>
        </Card>
    )
}

export default OrgCommonSettings
