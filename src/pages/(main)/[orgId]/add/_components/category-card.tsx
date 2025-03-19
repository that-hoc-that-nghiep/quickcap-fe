import { Category } from '@/types'
import { Group, Paper, Text, useMantineTheme } from '@mantine/core'
import { IconCircleCheckFilled, IconFolderFilled } from '@tabler/icons-react'

export const CategoryCardSelect = ({
    category,
    selected,
    onSelect
}: {
    category: Category
    selected: string
    onSelect: (orgId: string) => void
}) => {
    const theme = useMantineTheme()
    return (
        <Paper
            key={category._id}
            shadow='sm'
            p={'md'}
            withBorder
            className='col-span-1 cursor-pointer'
            component='button'
            onClick={() => onSelect(category._id)}
        >
            <Group justify='space-between' wrap='nowrap'>
                <Group wrap='nowrap' gap={8} className='grow' style={{ minWidth: 0 }}>
                    <div className='no-underline flex gap-2 grow w-full'>
                        <IconFolderFilled
                            size={24}
                            color={theme.colors[theme.primaryColor][5]}
                            style={{ flexShrink: 0 }}
                        />
                        <Text
                            size='md'
                            fw={500}
                            c={theme.primaryColor}
                            className='min-w-0 max-w-full truncate overflow-hidden text-ellipsis whitespace-nowrap'
                            title={category.name}
                        >
                            {category.name}
                        </Text>
                    </div>
                    {selected === category._id && (
                        <IconCircleCheckFilled
                            size={20}
                            color={theme.colors[theme.primaryColor][5]}
                            style={{ flexShrink: 0 }}
                        />
                    )}
                </Group>
            </Group>
        </Paper>
    )
}
