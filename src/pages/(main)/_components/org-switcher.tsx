import { useUser } from '@/hooks/useUser'
import { AppShell, Button, Group, Select, TextInput } from '@mantine/core'
import { closeAllModals, openModal } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { IconPlus } from '@tabler/icons-react'
import { useLocation, useNavigate } from 'react-router'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { createOrg } from '@/services/auth.service'
import { useState } from 'react'

const CreateNewOrgModal = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: ''
        },

        validate: {
            name: (value) => (value.trim().length > 2 ? null : 'Organization name is too short')
        }
    })
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [isCreating, setIsCreating] = useState(false)
    const handleCreateNewOrg = async (values: typeof form.values) => {
        setIsCreating(true)
        try {
            const data = await createOrg(values.name)
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
            queryClient.invalidateQueries({
                queryKey: ['org']
            })
            notifications.show({
                color: 'green',
                title: 'Success',
                message: 'New organization created'
            })
            closeAllModals()
            navigate(`/${data.organization.id}/library`)
        } catch (error) {
            console.error(error)
            notifications.show({
                color: 'red',
                title: 'Error',
                message: 'Failed to create new organization'
            })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleCreateNewOrg)}>
            <TextInput
                withAsterisk
                label='Organization name'
                placeholder='Super star organization'
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

const OrgSwitcher = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { orgs, currentOrg } = useUser()

    const handleOrgChange = (newOrgId: string | null) => {
        if (newOrgId) {
            const currentPath = pathname.split('/').slice(2).join('/')
            navigate(`/${newOrgId}/${currentPath || 'home'}`)
        }
    }

    const handleOpenCreateOrgModal = () => {
        openModal({
            title: 'Create new organization',
            children: <CreateNewOrgModal />
        })
    }
    return (
        <AppShell.Section>
            <Group gap={8} justify='space-between'>
                <Select
                    checkIconPosition='right'
                    data={orgs?.map((org) => ({ label: org.name, value: org.id })) || []}
                    value={currentOrg?.id}
                    onChange={handleOrgChange}
                    comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                    allowDeselect={false}
                    placeholder='Chọn tổ chức'
                    w={200}
                />
                <Button px={8} onClick={handleOpenCreateOrgModal}>
                    <IconPlus size={20} />
                </Button>
            </Group>
        </AppShell.Section>
    )
}

export default OrgSwitcher
