import { mockVideos } from '@/utils/constant'
import { Button, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconFolderFilled, IconVideoFilled } from '@tabler/icons-react'
import VideoCard from '../../_components/video-card'
import Categories from './_components/categories'

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
                <Categories />
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
