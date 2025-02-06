import { mockCategories, mockVideos } from '@/utils/constant'
import { Anchor, Avatar, Button, Card, Group, Image, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconFolderFilled, IconVideoFilled } from '@tabler/icons-react'
import { Link } from 'react-router'

export const LibraryPage = () => {
    const theme = useMantineTheme()

    return (
        <Stack gap='lg'>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconFolderFilled size={24} color={theme.primaryColor} />
                        <Text size='lg' fw={500}>
                            Categories
                        </Text>
                    </Group>
                    <Button variant='subtle' rightSection={<IconArrowRight size={18} />}>
                        See all
                    </Button>
                </Group>
                <Group>
                    {mockCategories.map((category) => (
                        <Paper
                            key={category.id}
                            shadow='sm'
                            w={200}
                            p={'md'}
                            component={Link}
                            to={`/category/${category.id}`}
                        >
                            <Group justify='space-between'>
                                <Stack gap={4}>
                                    <Text truncate='end' lineClamp={1} size='md' fw={500} c={theme.primaryColor}>
                                        {category.name}
                                    </Text>
                                    <Text size='xs' c='dimmed'>
                                        {category.count} videos
                                    </Text>
                                </Stack>
                                <IconFolderFilled size={24} color={theme.primaryColor} />
                            </Group>
                        </Paper>
                    ))}
                </Group>
            </Stack>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconVideoFilled size={24} color={theme.primaryColor} />
                        <Text size='lg' fw={500}>
                            Videos
                        </Text>
                    </Group>
                    <Button variant='subtle' rightSection={<IconArrowRight size={18} />}>
                        See all
                    </Button>
                </Group>
                <Group align='stretch'>
                    {mockVideos.map((video) => (
                        <Card key={video.id} withBorder shadow='sm' w={300}>
                            <Card.Section component={Link} to={`/video/${video.id}`}>
                                <Image
                                    src={video.thumbnailUrl}
                                    alt={video.title}
                                    height={160}
                                    fit='cover'
                                    className='aspect-video'
                                />
                            </Card.Section>
                            <Group wrap='nowrap' align='start' mt={16}>
                                <Avatar></Avatar>
                                <Stack gap={2}>
                                    <Anchor
                                        component={Link}
                                        to={`/video/${video.id}`}
                                        lineClamp={2}
                                        underline='never'
                                        fw={600}
                                    >
                                        {video.title}
                                    </Anchor>
                                    <Text size='sm' c='dimmed'>
                                        {video.author}
                                    </Text>
                                    <Text size='sm' c='dimmed'>
                                        {video.views} views
                                    </Text>
                                </Stack>
                            </Group>
                        </Card>
                    ))}
                </Group>
            </Stack>
        </Stack>
    )
}
