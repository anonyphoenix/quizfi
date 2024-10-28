import { defineChain } from '@reown/appkit/networks';

export const educhain = defineChain({
  id: 656476,
  caipNetworkId: 'eip155:656476',
  chainNamespace: 'eip155',
  name: 'EDU Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'Open Campus',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: {
      http: ['https://open-campus-codex-sepolia.drpc.org', 'https://rpc.open-campus-codex.gelato.digital'],
      webSocket: ['wss://ws.open-campus-codex.gelato.digital']},
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'http://opencampus-codex.blockscout.com/' },
  },
  contracts: {
    multicall3: {
      address: '0x8e4fD6E585B055755a8fE6E5083Ed6dddD53a1f2',
      blockCreated: 10,
    }
  }
})