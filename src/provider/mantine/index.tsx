import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { shadcnTheme } from './theme'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/nprogress/styles.css'
import './style.css'

export const BaseMantineProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider theme={shadcnTheme}>
            <ModalsProvider>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider>
    )
}
