"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
// import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </LocalizationProvider>
    </QueryClientProvider>
  );
}
