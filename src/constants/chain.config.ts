type ChainIndex = keyof typeof ChainConfig

export const defaultChainId: ChainIndex = process.env.NEXT_PUBLIC_DEFAULT_CHAIN ? (Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN) as ChainIndex) : 80001


export const ChainConfig = {
    // Ethereum Mainnet
    1: {
        unlockAddress: '0x3d5409CcE1d45233dE1D4eBDEe74b8E004abDD13',
        provider: 'https://rpc.unlock-protocol.com/1',
        chainId: '0x1',
        network: 'homestead',
        explorer: 'https://etherscan.io',
        name: 'Ethereum',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/mainnet-v2"
    },
    // Goerli (Testnet)
    5: {
        unlockAddress: '0x627118a4fB747016911e5cDA82e2E77C531e8206',
        provider: 'https://rpc.unlock-protocol.com/5',
        chainId: '0x5',
        network: 'goerli',
        explorer: 'https://goerli.etherscan.io',
        name: 'Goerli',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/goerli-v2"
    },
    // Optimism
    10: {
        unlockAddress: '0x99b1348a9129ac49c6de7F11245773dE2f51fB0c',
        provider: 'https://rpc.unlock-protocol.com/10',
        chainId: '0xa',
        network: 'optimism',
        explorer: 'https://optimistic.etherscan.io',
        name: 'Optimism',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/optimism-v2"
    },
    // Binance Smart Chain
    56: {
        unlockAddress: '0xeC83410DbC48C7797D2f2AFe624881674c65c856',
        provider: 'https://rpc.unlock-protocol.com/56',
        chainId: '0x38',
        network: '',
        explorer: 'https://bscscan.com',
        name: 'Binance Smart Chain',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/bsc-v2"
    },
    // Gnosis Chain
    100: {
        unlockAddress: '0x1bc53f4303c711cc693F6Ec3477B83703DcB317f',
        provider: 'https://rpc.unlock-protocol.com/100',
        chainId: '0x64',
        network: '',
        explorer: 'https://gnosis-safe.io',
        name: 'Gnosis Chain',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/gnosis-v2"
    },
    // Polygon
    137: {
        unlockAddress: '0xE8E5cd156f89F7bdB267EabD5C43Af3d5AF2A78f',
        provider: 'https://rpc.unlock-protocol.com/137',
        chainId: '0x89',
        network: 'matic',
        explorer: 'https://polygonscan.com',
        name: 'Polygon',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/polygon-v2"
    },
    // Arbitrum
    42161: {
        unlockAddress: '0x1FF7e338d5E582138C46044dc238543Ce555C963',
        provider: 'https://rpc.unlock-protocol.com/42161',
        chainId: '0xa4b1',
        network: 'arbitrum',
        explorer: 'https://arbiscan.io',
        name: 'Arbitrum',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/arbitrum-v2"
    },
    // Celo
    42220: {
        unlockAddress: '0x1FF7e338d5E582138C46044dc238543Ce555C963',
        provider: 'https://rpc.unlock-protocol.com/42220',
        chainId: '0xa4ec',
        network: '',
        explorer: 'https://explorer.celo.org',
        name: 'Celo',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/celo-v2"
    },
    // Avalanche (C-Chain)
    43114: {
        unlockAddress: '0x70cBE5F72dD85aA634d07d2227a421144Af734b3',
        provider: 'https://rpc.unlock-protocol.com/43114',
        chainId: '0xa86a',
        network: '',
        explorer: 'https://cchain.explorer.avax.network',
        name: 'Avalanche',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/avalanche-v2"
    },
    // Mumbai (Polygon)
    80001: {
        unlockAddress: '0x1FF7e338d5E582138C46044dc238543Ce555C963',
        provider: 'https://rpc.unlock-protocol.com/80001',
        chainId: '0x13881',
        network: 'maticmum',
        explorer: 'https://mumbai.polygonscan.com',
        name: 'Mumbai',
        subgraph: "https://api.thegraph.com/subgraphs/name/unlock-protocol/mumbai-v2"
    },
}
