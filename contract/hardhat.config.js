require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    // 默认网络bsctest
    defaultNetwork: "bsctest",
    networks: {
        bsctest: {
            url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
            chainId: 97,
            accounts: [
                // 钱包0xC38967AF63Ab031DBC6aBf41b14f84A09eF8452c私钥，用他身份部署合约
                '0xe4d30f19888cde4786cfc8900af6850864d63a26e125c5c9cdc7466cc024fb87'
            ],
        },
    },
    solidity: {
        // 合约用到了多个编译器，其中工厂合约和路由合约需要开启优化，值999999
        compilers: [
            {
                version: "0.4.18",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: false,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
};
