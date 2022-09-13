const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"votedEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"candidatesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
const web3 =new Web3('https://eth-rinkeby.alchemyapi.io/v2/wYvRy6x_HmmeBWv9OD-Is9GhRr6waC-4');

const contractAddress = '0x6639536B57D3D3153EA303845A04116d2E94b745';
const contract = new web3.eth.Contract(abi, contractAddress);
var account1 = '0x3769C1F158DB28A5a098C00ACC8EE6cdF91B27E3'

const privateKey1 = Buffer.from('<privateKey>','hex');


async function sendtx() {
    

    let  txCount=await web3.eth.getTransactionCount(account1);
    
        const myData = contract.methods.vote(web3.utils.toHex(1)).encodeABI();
        
        const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:contractAddress,
        gasLimit:web3.utils.toHex(210000),
        gasPrice: web3.utils.toHex(67 * 1e9), 
        value:0,
        data:myData,
        }
        console.log(txObject);
        const tx = new Tx(txObject, { chain: 'rinkeby' });
        tx.sign(privateKey1);

        const serializedTransaction = tx.serialize()
        const raw = '0x'+serializedTransaction.toString('hex')

        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log(err);
        console.log(txHash);
        })
        txCount++;

    
    
}

sendtx();