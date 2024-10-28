
// context/index.tsx

'use client';

import React, { ReactNode } from 'react';
import { projectId, metadata, educhainNetwork, wagmiAdapter } from '@/config';

import { createAppKit } from '@reown/appkit/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { State, WagmiProvider } from 'wagmi';

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error('Reown Project ID is not defined');

createAppKit({
  adapters: [wagmiAdapter],
  networks: [educhainNetwork],
  defaultNetwork: educhainNetwork,
  allowUnsupportedChain: true,
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  }
 })

export default function Web3ModalProvider({
  children,
  initialState
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
    