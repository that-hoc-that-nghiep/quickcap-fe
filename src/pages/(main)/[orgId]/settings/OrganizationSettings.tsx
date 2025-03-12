import {
    Grid,
    TextInput,
    Text,
    Group,
    Button,
    Stack,
    Card,
    Badge,
    Avatar,
    Box,
    ActionIcon,
    Center
} from '@mantine/core'
import { IconCheck, IconPlus, IconTrash, IconPencil } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

export const OrganizationSettings = () => {
    const handleSave = () => {
        notifications.show({
            title: 'Cài đặt nhóm đã lưu',
            message: 'Thông tin nhóm của bạn đã được cập nhật thành công',
            color: 'green',
            styles: {
                root: {
                    backgroundColor: 'white',
                    color: 'black'
                }
            },
            icon: <IconCheck size={16} />
        })
    }

    const cardStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const
    }

    return (
        <Grid gutter='xl'>
            {/* Left Section - Group Settings */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p='xl' radius='md' style={cardStyle}>
                    <Text size='xl' fw={700} mb='lg'>
                        Cài đặt nhóm
                    </Text>

                    <Stack style={{ flex: 1 }}>
                        <TextInput label='Tên nhóm' defaultValue='Pham Hong Phong' placeholder='Nhập tên nhóm' />

                        <Text fw={600} size='sm' mb='xs'>
                            Thông tin gói dịch vụ
                        </Text>
                        <Group>
                            <Text size='sm'>Gói hiện tại:</Text>
                            <Badge color='gray' style={{ backgroundColor: '#D3D3D3', color: 'black' }}>
                                Free
                            </Badge>
                        </Group>
                        <Group mt='xs'>
                            <Text size='sm'>Ngày hết hạn:</Text>
                            <Text size='sm' c='dimmed'>
                                Không có
                            </Text>
                        </Group>

                        <Group justify='space-between' mt='xl'>
                            <Text fw={600} size='sm' c='red' mb='md'>
                                Vùng nguy hiểm
                            </Text>
                        </Group>

                        <Group justify='space-between'>
                            <Button color='red' leftSection={<IconTrash size={16} />} variant='outline'>
                                Xóa nhóm
                            </Button>
                            <Button
                                onClick={handleSave}
                                style={{
                                    backgroundColor: '#3E8E41',
                                    color: 'white',
                                    transition: 'background-color 0.3s ease'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3E8E41')}
                            >
                                Lưu
                            </Button>
                        </Group>
                    </Stack>
                </Card>
            </Grid.Col>

            {/* Right Section - Members */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder p='xl' radius='md' style={cardStyle}>
                    <Group justify='space-between' mb='lg'>
                        <Text size='xl' fw={700}>
                            Thành viên
                            <Text span c='dimmed' fw={400} size='sm'>
                                {' '}
                                (1/3)
                            </Text>
                        </Text>
                        <Button
                            color='green'
                            leftSection={<IconPlus size={16} />}
                            size='sm'
                            style={{
                                backgroundColor: '#3E8E41', 
                                color: 'white',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')} 
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3E8E41')} 
                        >
                            Thêm thành viên
                        </Button>
                    </Group>

                    <Card withBorder p='md' mb='lg'>
                        <Group>
                            <Avatar radius='xl' size='md' color='blue'>
                                PH
                            </Avatar>
                            <Box style={{ flex: 1 }}>
                                <Group justify='space-between'>
                                    <Text size='sm' fw={500}>
                                        Pham Hong Phong K17-HL
                                    </Text>
                                    <Badge color='red' style={{ color: '#F0F0F0' }}>
                                        Chủ nhóm
                                    </Badge>
                                </Group>
                                <Text size='xs' c='dimmed'>
                                    phampong@example.com
                                </Text>
                            </Box>
                            <ActionIcon variant='subtle'>
                                <IconPencil size={16} />
                            </ActionIcon>
                        </Group>
                    </Card>

                    <Center mt='lg' style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <Text size='sm' c='dimmed'>
                            Thêm thành viên để cộng tác làm việc
                        </Text>
                    </Center>
                </Card>
            </Grid.Col>
        </Grid>
    )
}
