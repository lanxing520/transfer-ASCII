import privateKey from "../privateKey";
import infura from "../privateKey";

const {ethers} = require('ethers')

const provider = ethers.getDefaultProvider("rinkeby", {
  infura
});

// var provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/32cf0afd38a84af3afb52c8fdc5ba153')
let privateKey = privateKey;
var wallet = new ethers.Wallet(privateKey, provider)   //拥有私钥的钱包，可以进行读写操作
console.log(wallet);

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "ascii",
        "type": "string"
      }
    ],
    "name": "store",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "print",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "setPrice",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; //ABI 二进制接口
const contractAddress = '0xE67D1f4F6e9D19EFb4d6646230eB69077e66f548'; //erc20智能合约地址
const Contract = new ethers.Contract(contractAddress, abi, wallet);   //合约和钱包互动连接
console.log(Contract);

//对钱包进行一些操作
async function test() {
  try {
    let asccii =
        '    * * *   * * *\n' +
        '  * *   * * *   * *\n' +
        '  *       *       *\n' +
        '  * *           * *\n' +
        '    * *       * *\n' +
        '      * *   * *\n' +
        '        * * *\n' +
        '          *'
    let storeAsc = await Contract.store(asccii)
    let setPrice = await Contract.setPrice(10000)
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))
    await timer(10000);  //delay, wait chain change the data
    
    console.log(await Contract.print());
    
  } catch (e) {
    console.log(e);
  }
}

test()