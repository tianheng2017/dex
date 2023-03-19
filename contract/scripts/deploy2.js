const hre = require("hardhat");

async function main() {
    const Router = await hre.ethers.getContractFactory("MyRouter");

    // 传入deploy1部署后得到的工厂合约和WETH合约地址
    const router = await Router.deploy("0xDda6a3645BdDB0C11369B207eC504aC62b2da218", "0xF2C1A22AcEd2eDE0ede9fE130278Ec2d91edD817");

    // 部署路由合约
    await router.deployed();

    // 打印信息
    console.log(`\n-----------------合约部署结果------------------`)
    console.log(`路由合约: ${router.address}`)
    console.log(`-----------------合约部署结果------------------\n`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
