import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BaseMantineProvider, ReactRouterProvider, TanstackQueryProvider } from '@/provider'

import '@/styles/index.css'
import '@/styles/fonts.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TanstackQueryProvider>
            <BaseMantineProvider>
                <ReactRouterProvider />
            </BaseMantineProvider>
        </TanstackQueryProvider>
    </StrictMode>
)
