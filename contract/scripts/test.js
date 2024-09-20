const hre = require('hardhat');
const ethers = hre.ethers;
// const tokenJson = require('../artifacts/contracts/MockERC20.sol/MockERC20.json');
// const factoryJson = require('../artifacts/contracts/MyFactory.sol/MyFactory.json');
// const routerJson = require('../artifacts/contracts/MyRouter.sol/MyRouter.json');
// const pairJson = require('../artifacts/contracts/MyRouter.sol/IMyPair.json');

async function main() {
    const accounts = await ethers.getSigners();
    console.log('\n');

    // // 获取其他合约实例
    // const token = await ethers.getContractAt(tokenJson.abi, process.env.TokenA);
    // const token2 = await ethers.getContractAt(
    //     tokenJson.abi,
    //     process.env.TokenB
    // );
    // const factory = await ethers.getContractAt(
    //     factoryJson.abi,
    //     process.env.Factory
    // );
    // const router = await ethers.getContractAt(
    //     routerJson.abi,
    //     process.env.Router
    // );

    // // AAA、BBB授权路由合约
    // await token.approve(router.address, ethers.utils.parseEther('100000000'));
    // await token2.approve(router.address, ethers.utils.parseEther('100000000'));

    // // 查询AAA授权金额
    // const allowanceAAA = await token.allowance(
    //     accounts[0].address,
    //     router.address
    // );
    // console.log('AAA授权路由: ', ethers.utils.formatEther(allowanceAAA));
    // // 查询BBB授权金额
    // const allowanceBBB = await token2.allowance(
    //     accounts[0].address,
    //     router.address
    // );
    // console.log('BBB授权路由: ', ethers.utils.formatEther(allowanceBBB), '\n');

    // // 添加AAA-BBB流动性
    // await router.addLiquidity(
    //     token.address,
    //     token2.address,
    //     ethers.utils.parseEther('1000000'),
    //     ethers.utils.parseEther('1000000'),
    //     0,
    //     0,
    //     accounts[0].address,
    //     9999999999
    // );
    // console.log('向AAA-BBB池子分别添加1000000个AAA和1000000个BBB\n');

    // // 获取Pair
    // const pairAAABBB = await factory.getPair(token.address, token2.address);
    // // 实例化Pair
    // const pair = await ethers.getContractAt(pairJson.abi, pairAAABBB);
    // console.log('Pair AAA-BBB: ', pairAAABBB);

    // // 查询池子情况
    // const reserves = await pair.getReserves();
    // console.log('池子AAA储备: ', ethers.utils.formatEther(reserves[0]));
    // console.log('池子BBB储备: ', ethers.utils.formatEther(reserves[1]), '\n');

    // // 测试AAA 兑换 BBB
    // await router.swapExactTokensForTokens(
    //     ethers.utils.parseEther('10000'),
    //     0,
    //     [token.address, token2.address],
    //     accounts[0].address,
    //     9999999999,
    //     { gasLimit: 300000 }
    // );
    // console.log('10000个AAA兑换BBB成功');

    // // 测试BBB 兑换 AAA
    // await router.swapExactTokensForTokens(
    //     ethers.utils.parseEther('10000'),
    //     0,
    //     [token2.address, token.address],
    //     accounts[0].address,
    //     9999999999,
    //     { gasLimit: 300000 }
    // );
    // console.log('10000个BBB兑换AAA成功', '\n');

    // // account[0]TokenA余额
    // const balance1 = await token.balanceOf(accounts[0].address);
    // console.log(
    //     'account[0]TokenA余额: ',
    //     ethers.utils.formatEther(balance1),
    //     '\n'
    // );
    // // account[0]TokenB余额
    // const balance2 = await token.balanceOf(accounts[0].address);
    // console.log(
    //     'account[0]TokenB余额: ',
    //     ethers.utils.formatEther(balance2),
    //     '\n'
    // );

    console.log(
        'bscscantest合约验证脚本: ',
        `
        npx hardhat verify --network bsctestnet "${process.env.TokenA}" "AAA" "AAA"
        npx hardhat verify --network bsctestnet "${process.env.TokenB}" "BBB" "BBB"
        npx hardhat verify --network bsctestnet "${process.env.WETH}"
        npx hardhat verify --network bsctestnet "${process.env.Factory}" "${accounts[0].address}"
        npx hardhat verify --network bsctestnet "${process.env.Router}" "${process.env.Factory}" "${process.env.WETH}"
        `,
        '\n'
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
