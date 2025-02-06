import { Paper, Stack, Text } from '@mantine/core'

export const BillingPage = () => {
    return (
        <Paper p={'md'} shadow='sm'>
            <Stack>
                <Stack gap={2}>
                    <Text size='xl' fw={500}>
                        Current plan
                    </Text>
                    <Text size='sm' c='dimmed'>
                        Your payment history
                    </Text>
                </Stack>
                <Stack gap={2}>
                    <Text size='xl' fw={500}>
                        $0/Month
                    </Text>
                    <Text size='sm' c='dimmed'>
                        FREE
                    </Text>
                </Stack>
            </Stack>
        </Paper>
    )
}
