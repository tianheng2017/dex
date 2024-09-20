require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();

module.exports = {
    defaultNetwork: 'ganache',
    networks: {
        ganache: {
            chainId: 1337,
            url: 'http://127.0.0.1:8545',
            accounts: [
                '4b23e5ca951b3219a66f9f51ebccb6354e60207f773fb5319f53c9ea5788b7cb',
                '84d63d75de0d31b43c2dc58e671bf63e16a98cd0ba70222826a93a0341365a02',
                '050facce85e664f54361a02eed0425401de52363072c3f44267ccbaabd443c95',
            ],
            defaultAccount:
                '4b23e5ca951b3219a66f9f51ebccb6354e60207f773fb5319f53c9ea5788b7cb',
        },
    },
    solidity: {
        // 合约用到了多个编译器，其中工厂合约和路由合约需要开启优化，值999999
        compilers: [
            {
                version: '0.4.18',
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200,
                    },
                },
            },
            {
                version: '0.5.16',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
            {
                version: '0.6.6',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
            {
                version: '0.8.4',
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200,
                    },
                },
            },
        ],
    },
    etherscan: {
        apiKey: 'WRIA3TSVFBPXHTNHYH8D8KKX4HAFVHPDV8',
    },
    paths: {
        sources: './contracts',
        tests: './test',
        cache: './cache',
        artifacts: './artifacts',
    },
};
