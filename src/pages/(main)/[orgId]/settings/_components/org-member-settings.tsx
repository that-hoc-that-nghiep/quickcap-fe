import { useUser } from '@/hooks/useUser'
import { addMemberToOrg, useOrgInfo, removeMemberFromOrg, updatePermission } from '@/services/auth.service'
import { PermissionData, PermissionTypeUI } from '@/types'

import { ActionIcon, Avatar, Badge, Button, Card, Group, Select, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { closeAllModals, openModal } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconPencil, IconPlus, IconUserMinus } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'react-router'

const AddMemberModal = () => {
    const { orgId } = useParams()
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: ''
        },

        validate: {
            email: (value: string) =>
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value) ? null : 'Invalid email address'
        }
    })
    const queryClient = useQueryClient()
    const [isAdding, setIsAdding] = useState(false)
    const handleCreateNewOrg = async (values: typeof form.values) => {
        setIsAdding(true)
        try {
            await addMemberToOrg(orgId, values.email)
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Member added successfully'
            })
            closeAllModals()
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to add member'
            })
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleCreateNewOrg)}>
            <TextInput
                withAsterisk
                label='New member email'
                placeholder='example@gmail.com'
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isAdding}>
                    Cancel
                </Button>
                <Button type='submit' color='green' loading={isAdding}>
                    Add member
                </Button>
            </Group>
        </form>
    )
}

const ConfirmRemoveMemberModal = ({ userEmail }: { userEmail: string }) => {
    const { orgId } = useParams()
    const queryClient = useQueryClient()
    const [isRemoving, setIsRemoving] = useState(false)
    const handleRemoveMember = async () => {
        setIsRemoving(true)
        try {
            await removeMemberFromOrg(orgId, userEmail)
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Member removed successfully'
            })
            closeAllModals()
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to remove member'
            })
        } finally {
            setIsRemoving(false)
        }
    }

    return (
        <>
            <Text size='sm'>Are you sure you want to remove this member? This action cannot be undone.</Text>
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isRemoving}>
                    Cancel
                </Button>
                <Button color='red' onClick={handleRemoveMember} loading={isRemoving}>
                    Remove member
                </Button>
            </Group>
        </>
    )
}

const UpdatePermissionMemberModal = ({
    userEmail,
    currentPermission
}: {
    userEmail: string
    currentPermission: string
}) => {
    const { orgId } = useParams()
    const queryClient = useQueryClient()
    const [isUpdating, setIsUpdating] = useState(false)

    const form = useForm({
        initialValues: {
            permission: PermissionTypeUI[currentPermission]
        }
    })

    const handleUpdatePermission = async (values: typeof form.values) => {
        setIsUpdating(true)
        try {
            await updatePermission(orgId, userEmail, PermissionData[values.permission])
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'Member permission updated successfully'
            })
            closeAllModals()
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to update permission'
            })
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleUpdatePermission)}>
            <Text size='sm' mb='sm'>
                Select new permission for this member:
            </Text>
            <Select label='Permission' data={['View Only', 'Can Edit']} {...form.getInputProps('permission')} />
            <Group justify='flex-end' mt='md'>
                <Button variant='outline' onClick={() => closeAllModals()} disabled={isUpdating}>
                    Cancel
                </Button>
                <Button type='submit' color={'red'} loading={isUpdating}>
                    Update Permission
                </Button>
            </Group>
        </form>
    )
}

const OrgMemberSettings = () => {
    const { currentOrg, user: curentUser } = useUser()
    const { data } = useOrgInfo(currentOrg?.id)


    const handleShowAddMemberModal = () => {
        openModal({
            title: `Add member to ${currentOrg?.name}`,
            children: <AddMemberModal />
        })
    }

    const handleShowRemoveMemberModal = (userEmail: string) => {
        openModal({
            title: `Remove member from ${currentOrg?.name}`,
            children: <ConfirmRemoveMemberModal userEmail={userEmail} />
        })
    }

    const handleShowUpdatePermissionModal = (userEmail: string, currentPermission: string) => {
        openModal({
            title: `Memeber: ${userEmail}`,
            children: <UpdatePermissionMemberModal userEmail={userEmail} currentPermission={currentPermission} />
        })
    }
    return (
        <Card withBorder p='xl' radius='md' shadow='xs' className='flex flex-col h-full'>
            <Group justify='space-between' mb='lg'>
                <Text size='xl' fw={700}>
                    Members
                </Text>
                {currentOrg?.type !== 'Personal' && currentOrg?.is_owner ? (
                    <Button
                        color='green'
                        leftSection={<IconPlus size={16} />}
                        size='sm'
                        onClick={handleShowAddMemberModal}
                    >
                        Add member
                    </Button>
                ) : null}
            </Group>

            {data?.users.map((user) => (
                <Group key={user.id} justify='space-between' align='center' mb='lg'>
                    <Group>
                        <Avatar src={user.picture} radius='xl' size='md' color='blue'>
                            {user.name[0]}
                        </Avatar>
                        <Stack gap={2}>
                            <Group justify=''>
                                <Text size='sm' fw={500}>
                                    {user.name}
                                </Text>

                                <Badge color={user.is_owner ? 'red' : 'blue'}>
                                    {user.is_owner ? 'Owner' : 'Member'}
                                </Badge>
                            </Group>
                            <Text size='xs' c='dimmed'>
                                {user.email}
                            </Text>
                        </Stack>
                    </Group>

                    {currentOrg?.is_owner && currentOrg?.type !== 'Personal' && curentUser?.email !== user.email ? (
                        <Group>
                            <Tooltip label='Update permission' withArrow>
                                <ActionIcon
                                    variant='subtle'
                                    onClick={() => handleShowUpdatePermissionModal(user.email, user.is_permission)}
                                >
                                    <IconPencil size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label='Remove member' withArrow>
                                <ActionIcon variant='subtle' onClick={() => handleShowRemoveMemberModal(user.email)}>
                                    <IconUserMinus size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    ) : null}
                </Group>
            ))}
        </Card>
    )
}

export default OrgMemberSettings
