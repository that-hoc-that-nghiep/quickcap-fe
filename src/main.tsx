import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactRouterProvider, TanstackQueryProvider } from '@/provider'

import '@/styles/index.css'
import '@/styles/fonts.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TanstackQueryProvider>
            <ReactRouterProvider />
            <Toaster richColors position='bottom-right' />
        </TanstackQueryProvider>
    </StrictMode>
)
