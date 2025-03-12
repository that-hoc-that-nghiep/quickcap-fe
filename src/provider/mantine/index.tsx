import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/spotlight/styles.css'

const myColor: MantineColorsTuple = [
    '#ffeaf3',
    '#fcd4e1',
    '#f4a7bf',
    '#ec779c',
    '#e64f7e',
    '#e3366c',
    '#e22862',
    '#c91a52',
    '#b41148',
    '#9f003e'
]

const theme = createTheme({
    colors: {
        myColor
    },
    primaryColor: 'myColor'
})

export const BaseMantineProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider>
    )
}
