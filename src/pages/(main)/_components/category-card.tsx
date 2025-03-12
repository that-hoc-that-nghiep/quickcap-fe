import { Category } from '@/types'
import { ActionIcon, Group, Menu, Paper, Stack, Text, useMantineTheme } from '@mantine/core'
import { IconDotsVertical, IconFolderFilled, IconTrash } from '@tabler/icons-react'
import { Link } from 'react-router'

interface CategoryCardProps {
    category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
    const theme = useMantineTheme()
    return (
        <Paper key={category._id} shadow='sm' w={200} p={'md'} withBorder>
            <Group justify='space-between'>
                <Link to={`/category/${category._id}`} className='no-underline flex gap-2 grow'>
                    <IconFolderFilled size={24} color={theme.colors[theme.primaryColor][5]} />
                    <Stack gap={4}>
                        <Text truncate='end' lineClamp={1} size='md' fw={500} c={theme.primaryColor}>
                            {category.name}
                        </Text>
                    </Stack>
                </Link>
                <Menu shadow='md' position='bottom-start' offset={-3}>
                    <Menu.Target>
                        <ActionIcon variant='transparent' onClick={(e) => e.stopPropagation()}>
                            <IconDotsVertical size={20} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item leftSection={<IconTrash size={14} />}>Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Paper>
    )
}

export default CategoryCard
