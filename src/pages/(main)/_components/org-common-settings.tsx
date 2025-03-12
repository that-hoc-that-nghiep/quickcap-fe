import { useUser } from '@/hooks/useUser'
import { updateOrg } from '@/services/auth.service'
import { Badge, Button, Card, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconTrash } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const OrgCommonSettings = () => {
    const { currentOrg } = useUser()
    const [isSaving, setIsSaving] = useState(false)
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            name: ''
        },
        validate: {
            name: (value) => (value.trim().length > 2 ? null : 'Organization name is too short')
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
    return (
        <Card withBorder p='xl' radius='md' className='flex flex-col' shadow='xs'>
            <Text size='xl' fw={700} mb='lg'>
                Organization Settings
            </Text>

            <form onSubmit={form.onSubmit(handleSave)}>
                <Stack style={{ flex: 1 }}>
                    <TextInput
                        label='Organization name'
                        placeholder='Super Organization'
                        key={form.key('name')}
                        value={currentOrg?.name}
                        {...form.getInputProps('name')}
                        disabled={isSaving || !currentOrg?.is_owner}
                    />

                    <Text fw={700} size='md' mb='xs'>
                        Thông tin gói dịch vụ
                    </Text>
                    <Group>
                        <Text size='sm'>Gói hiện tại:</Text>
                        <Badge color='gray' style={{ backgroundColor: '#D3D3D3', color: 'black' }}>
                            Free
                        </Badge>
                    </Group>
                    <Group>
                        <Text size='sm'>Ngày hết hạn:</Text>
                        <Text size='sm' c='dimmed'>
                            Không có
                        </Text>
                    </Group>

                    <Group justify='space-between' mt='xl'>
                        <Text fw={600} size='sm' c='red'>
                            Vùng nguy hiểm
                        </Text>
                    </Group>

                    <Group justify='space-between'>
                        <Button color='red' leftSection={<IconTrash size={16} />} variant='outline'>
                            Xóa nhóm
                        </Button>
                        <Button type='submit' color='green' loading={isSaving}>
                            Lưu
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Card>
    )
}

export default OrgCommonSettings
