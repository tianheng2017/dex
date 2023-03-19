const hre = require("hardhat");

async function main() {
    const Router = await hre.ethers.getContractFactory("MyRouter");

    // 传入deploy1部署后得到的工厂合约和WETH合约地址
    const router = await Router.deploy("0x5bcFC70E36C384c4D1fe425b367A0D55a4fd52Ad", "0x19086A799BB8D538bd071AE29ff68AB6086a5274");

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
