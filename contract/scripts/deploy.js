const hre = require('hardhat');
const ethers = hre.ethers;
const fs = require('fs');

function replaceInFile(filePath, searchString, replaceString) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const newFileContent = fileContent.replace(searchString, replaceString);
    fs.writeFileSync(filePath, newFileContent);
    console.log(`成功将 "${searchString}" 替换为 "${replaceString}"`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

async function main() {
    const Factory = await hre.ethers.getContractFactory('MyFactory');
    const WETH = await hre.ethers.getContractFactory('WETH');
    const Multicall = await hre.ethers.getContractFactory('Multicall');
    const MockERC20 = await hre.ethers.getContractFactory('MockERC20');
    const Router = await hre.ethers.getContractFactory('MyRouter');

    const accounts = await ethers.getSigners();
    console.log('\n');

    // 还原路由INIT_CODE_PAIR_HASH
    replaceInFile(
        './contracts/MyRouter.sol',
        process.env.INIT_CODE_PAIR_HASH,
        '07de0cb5b800b79646c0c07a5820e21692255238a43c6f35d00404ca614abcff'
    );

    // 部署工厂合约
    const factory = await Factory.deploy(accounts[0].address);
    await factory.deployed();
    // 部署WETH
    const weth = await WETH.deploy();
    await weth.deployed();
    // 部署multical合约
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    // 部署TokenA
    const mockERC20A = await MockERC20.deploy('AAA', 'AAA Token');
    await mockERC20A.deployed();
    // 部署TokenB
    const mockERC20B = await MockERC20.deploy('BBB', 'BBB Token');
    await mockERC20B.deployed();

    // 查询工厂合约的INIT_CODE_PAIR_HASH
    const init_code_pair_hash = (
        await factory.INIT_CODE_PAIR_HASH.call()
    ).slice(2);

    // 更新路由合约INIT_CODE_PAIR_HASH
    replaceInFile(
        './contracts/MyRouter.sol',
        '07de0cb5b800b79646c0c07a5820e21692255238a43c6f35d00404ca614abcff',
        init_code_pair_hash
    );

    // 部署路由合约
    const router = await Router.deploy(factory.address, weth.address);
    await router.deployed();

    // 定义env数据
    const data = {
        Factory: factory.address,
        INIT_CODE_PAIR_HASH: init_code_pair_hash,
        WETH: weth.address,
        Router: router.address,
        multicall: multicall.address,
        TokenA: mockERC20A.address,
        TokenB: mockERC20B.address,
    };
    // 将数据转换成 .env 文件格式的字符串
    const envContent = Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    // 写入 .env 文件
    fs.writeFileSync('.env', envContent);
    console.log('.env 文件已更新', '\n');

    // 打印信息
    console.log(`\n-----------------合约部署结果------------------`);
    console.log(`工厂合约: ${factory.address}`);
    console.log(`INIT_CODE_PAIR_HASH: ${init_code_pair_hash}`);
    console.log(`WETH合约: ${weth.address}`);
    console.log(`Router合约: ${router.address}`);
    console.log(`multicall合约: ${multicall.address}`);
    console.log(`TokenA合约: ${mockERC20A.address}`);
    console.log(`TokenB合约: ${mockERC20B.address}`);
    console.log(`-----------------合约部署结果------------------\n`);
}
