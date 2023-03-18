require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    // 使用ganache搭建本地区块链测试环境，下载地址：https://trufflesuite.com/ganache
    // 默认网络ganache
    defaultNetwork: "ganache",
    networks: {
        ganache: {
            // 和ganache的端口和链ID保持一致
            url: "http://127.0.0.1:7545/",
            chainId: 1337,
            accounts: [
                // 钱包私钥，用来部署合约，必填
                '0x4453a91a47aec8bf9201fdb120211c247d5daa04890c407b83b8b5bd41e52980'
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
