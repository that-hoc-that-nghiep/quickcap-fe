import {
    Grid,
    Select,
    Slider,
    ColorPicker,
    Divider,
    Text,
    Checkbox,
    Switch,
    MultiSelect,
    Space,
    Group,
    Button
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

interface DisplaySettingsProps {
    themeColor: string
    setThemeColor: (color: string) => void
}

export const DisplaySettings = ({ themeColor, setThemeColor }: DisplaySettingsProps) => {
    const handleSave = () => {
        notifications.show({
            title: 'Display settings saved',
            message: 'Your display preferences have been successfully updated',
            color: 'green',
            icon: <IconCheck size={16} />
        })
    }

    return (
        <>
            <Text size='lg' fw={600} mb='md'>
                Theme
            </Text>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                        label='Theme Mode'
                        placeholder='Select mode'
                        data={[
                            { value: 'light', label: 'Light' },
                            { value: 'dark', label: 'Dark' },
                            { value: 'system', label: 'System Default' }
                        ]}
                        defaultValue='system'
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Text size='sm' fw={500} mb={4}>
                        Accent Color
                    </Text>
                    <ColorPicker
                        format='hex'
                        value={themeColor}
                        onChange={setThemeColor}
                        swatches={['#1c7ed6', '#37B24D', '#F59F00', '#E03131', '#7048E8', '#1098AD']}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Text size='sm' fw={500} mb={4}>
                        Density
                    </Text>
                    <Slider
                        label={(value) => ['Compact', 'Normal', 'Spacious'][Math.floor(value / 50)]}
                        step={50}
                        marks={[
                            { value: 0, label: 'Compact' },
                            { value: 50, label: 'Normal' },
                            { value: 100, label: 'Spacious' }
                        ]}
                        defaultValue={50}
                    />
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Dashboard Layout
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Select
                        label='Default View'
                        placeholder='Select view'
                        data={[
                            { value: 'grid', label: 'Grid View' },
                            { value: 'list', label: 'List View' },
                            { value: 'board', label: 'Board View' }
                        ]}
                        defaultValue='grid'
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <MultiSelect
                        label='Widgets to Display'
                        placeholder='Select widgets'
                        data={[
                            { value: 'recent', label: 'Recent Activity' },
                            { value: 'stats', label: 'Statistics' },
                            { value: 'calendar', label: 'Calendar' },
                            { value: 'tasks', label: 'Tasks' },
                            { value: 'notes', label: 'Notes' }
                        ]}
                        defaultValue={['recent', 'stats', 'calendar']}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Checkbox label='Show welcome message on login' defaultChecked />
                </Grid.Col>
            </Grid>

            <Divider my='lg' />

            <Text size='lg' fw={600} mb='md'>
                Accessibility
            </Text>
            <Grid>
                <Grid.Col span={12}>
                    <Switch label='High contrast mode' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Switch label='Reduce animations' />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Select
                        label='Font Size'
                        placeholder='Select size'
                        data={[
                            { value: 'sm', label: 'Small' },
                            { value: 'md', label: 'Medium' },
                            { value: 'lg', label: 'Large' },
                            { value: 'xl', label: 'Extra Large' }
                        ]}
                        defaultValue='md'
                    />
                </Grid.Col>
            </Grid>

            <Space h='xl' />
            <Group justify='flex-end'>
                <Button variant='default'>Cancel</Button>
                <Button onClick={handleSave}>Save Display Settings</Button>
            </Group>
        </>
    )
}