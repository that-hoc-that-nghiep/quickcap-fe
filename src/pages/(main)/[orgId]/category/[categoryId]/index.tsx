import { Group, Skeleton, Stack, Text, useMantineTheme } from '@mantine/core'
import { Suspense } from 'react'
import { useParams } from 'react-router'
import VideoCategoris from './_components/videoCategoris'
import { useCategoryById } from '@/services/category.service'

const CategoryVideosPage = () => {
    const { categoryId } = useParams()
    const theme = useMantineTheme()
    const { data } = useCategoryById(categoryId!)
    return (
        <Stack>
            <Group gap={4}>
                <Text size='lg'>Videos</Text>
                <span>/</span>
                <Text size='xl' fw={500} c={theme.colors[theme.primaryColor][5]}>
                    {data.data.name}
                </Text>
            </Group>

            <div className='grid grid-cols-4 gap-4'>
                <Suspense
                    fallback={Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={180} />
                    ))}
                >
                    <VideoCategoris />
                </Suspense>
            </div>
        </Stack>
    )
}

export default CategoryVideosPage
