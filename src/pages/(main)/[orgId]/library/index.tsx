import { Button, Group, Skeleton, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconArrowRight, IconFolderFilled, IconVideoFilled } from '@tabler/icons-react'
import Categories from './_components/categories'
import { Suspense } from 'react'
import Videos from './_components/videos'

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
                <div className='grid grid-cols-5 gap-4'>
                    <Suspense
                        fallback={Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} height={60} />
                        ))}
                    >
                        <Categories />
                    </Suspense>
                </div>
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
                <div className='grid grid-cols-4 gap-4'>
                    <Suspense
                        fallback={Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} height={180} />
                        ))}
                    >
                        <Videos />
                    </Suspense>
                </div>
            </Stack>
        </Stack>
    )
}
