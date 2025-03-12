import { Grid } from '@mantine/core'
import OrgCommonSettings from '../../_components/org-common-settings'

export const SettingsPage = () => {
    return (
        <Grid gutter='xl'>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <OrgCommonSettings />
            </Grid.Col>

            {/* Right Section - Members */}
            <Grid.Col span={{ base: 12, md: 6 }}>
                {/* <Card withBorder p='xl' radius='md' style={cardStyle}>
                    <Group justify='space-between' mb='lg'>
                        <Text size='xl' fw={700}>
                            Thành viên
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
                </Card> */}
            </Grid.Col>
        </Grid>
    )
}
