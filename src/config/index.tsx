
// config/index.tsx

import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { cookieStorage, createStorage } from 'wagmi'
// import { arbitrum, arbitrumSepolia } from 'wagmi/chains'
import { educhain } from './educhain'

// Your WalletConnect Cloud project ID
export const projectId = 'cf5b0fccc9eb8d115d826f606a8be2d8'

// Create a metadata object
const metadata = {
  name: 'QuizFi',
  description: 'QuizFi App',
  url: 'https://quizfi.click', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [educhain] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})