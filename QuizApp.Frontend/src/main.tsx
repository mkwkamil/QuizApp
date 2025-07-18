import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GlobalToaster from "@components/common/GlobalToaster";
import App from './App';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            placeholderData: (prev: any) => prev,
            staleTime: 1000 * 60 * 3,
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <GlobalToaster />
        </QueryClientProvider>
    </StrictMode>
);