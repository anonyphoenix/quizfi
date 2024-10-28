
// config/index.tsx

import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { educhain } from './educhain';
import { AppKitNetwork } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from 'wagmi';

export const projectId:string = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

// Create a metadata object
export const metadata = {
  name: 'QuizFi',
  description: 'QuizFi App',
  url: 'https://quizfi.click', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const educhainNetwork = educhain as AppKitNetwork;

export const wagmiAdapter = new WagmiAdapter({
  networks: [educhain],
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
});