import { ChainId, JSBI, Percent, Token, WETH } from '@tianheng2017/dex-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected } from '../connectors'

// 路由合约地址，部署合约后修改
export const ROUTER_ADDRESS = '0xceBf2F2542E651CfD27fc4453458a9c4B2e01523'

type ChainTokenList = {
    readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')

const WETH_ONLY: ChainTokenList = {
    [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
    [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
    [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
    [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
    [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
    [ChainId.BSCTEST]: [WETH[ChainId.BSCTEST]],
}

// 用于构建交易的中介对
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR]
}

// 一些代币只能通过特定的交易对进行兑换，因此我们覆盖了考虑这些代币的基础代币列表。
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
    [ChainId.MAINNET]: {
        [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
    }
}

// 用于默认列表中的显示，当添加流动性时。
export const SUGGESTED_BASES: ChainTokenList = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

// 用于前端构建默认 pair 列表的函数
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
    ...WETH_ONLY,
    [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
    [ChainId.MAINNET]: [
        [
            new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
            new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
        ],
        [USDC, USDT],
        [DAI, USDT]
    ]
}

export interface WalletInfo {
    connector?: AbstractConnector
    name: string
    iconName: string
    description: string
    href: string | null
    color: string
    primary?: true
    mobile?: true
    mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    INJECTED: {
        connector: injected,
        name: 'Injected',
        iconName: 'arrow-right.svg',
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true
    },
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconName: 'metamask.png',
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D'
    },
}

export const NetworkContextName = 'NETWORK'

// 默认允许的滑点范围，以bips（基础计量单位）为单位
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20分钟，用秒表示的时间单位
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// 一个基点，通常用于表示比例数（如交易费率、自动化市场制造商的价格偏差等），相当于0.01%。
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// 用于警示状态的常量值定义
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// 如果价格下滑超过此数字，则强制用户输入“confirm”来执行
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// 在非专家模式下，禁止超过此数量的交易
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// 用于确保用户不会发送过多的 ETH 导致其小于最小值，单位为 wei（Eth 的一个十八次方）
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
