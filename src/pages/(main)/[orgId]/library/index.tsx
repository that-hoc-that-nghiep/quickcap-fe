import { mockCategories, mockVideos } from '@/utils/constant'
import { Button, Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconFolderFilled, IconVideoFilled } from '@tabler/icons-react'
import { Link } from 'react-router'
import VideoCard from '../../_components/video-card'

export const LibraryPage = () => {
    const theme = useMantineTheme()
    return (
        <Stack gap='xl'>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconFolderFilled size={24} color={theme.colors[theme.primaryColor][5]} />
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
                                <IconFolderFilled size={24} color={theme.colors[theme.primaryColor][5]} />
                            </Group>
                        </Paper>
                    ))}
                </Group>
            </Stack>
            <Stack>
                <Group justify='space-between' align='center'>
                    <Group>
                        <IconVideoFilled size={24} color={theme.colors[theme.primaryColor][5]} />
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
                        <VideoCard key={video.id} video={video} />
                    ))}
                </Group>
            </Stack>
        </Stack>
    )
}
