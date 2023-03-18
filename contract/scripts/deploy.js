const hre = require("hardhat");

async function main() {
    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
    const WETH = await hre.ethers.getContractFactory("WETH");
    const Router = await hre.ethers.getContractFactory("UniswapV2Router");
    const Multicall = await hre.ethers.getContractFactory("Multicall");
    const MockERC20 = await hre.ethers.getContractFactory("MockERC20");

    // 工厂合约传参（_feeToSetter），我填的hardhat.config.js的accounts私钥对应的钱包
    const factory = await Factory.deploy("0x8E24F1f19BeB833C3758434DdE7BfA96b2977CD4");
    const weth = await WETH.deploy();
    const router = await Router.deploy(factory.address, weth.address);
    const multicall = await Multicall.deploy();
    const mockERC20A = await MockERC20.deploy("AAA", "AAA Token", 21000000000000000000000000);
    const mockERC20B = await MockERC20.deploy("BBB", "BBB Token", 21000000000000000000000000);

    // 部署工厂合约
    await factory.deployed();
    // 部署WETH
    await weth.deployed();
    // 部署路由合约
    await router.deployed();
    // 部署multical合约
    await multicall.deployed();
    // 部署TokenA
    await mockERC20A.deployed();
    // 部署TokenB
    await mockERC20B.deployed();

    // 查询工厂合约的INIT_CODE_PAIR_HASH
    const init_code_pair_hash = await factory.INIT_CODE_PAIR_HASH.call()

    // 打印信息
    console.log(`\n-----------------合约部署结果------------------`)
    console.log(`工厂合约: ${factory.address}`)
    console.log(`INIT_CODE_PAIR_HASH: ${init_code_pair_hash}`)
    console.log(`WETH合约: ${weth.address}`)
    console.log(`路由合约: ${router.address}`)
    console.log(`multicall合约: ${multicall.address}`)
    console.log(`TokenA合约: ${mockERC20A.address}`)
    console.log(`TokenB合约: ${mockERC20B.address}`)
    console.log(`-----------------合约部署结果------------------\n`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
