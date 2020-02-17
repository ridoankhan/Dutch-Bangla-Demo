var Tx = require("ethereumjs-tx");
var Web3 = require("web3");
var rpcUrl = "https://ropsten.infura.io/v3/9d005ea80c06414585a5c8fa9e252816";
var web3 = new Web3(rpcUrl);
var contractDetails = require("./abi");
var account1PrivateKey = "d1ba618a57b8c94cab2806b5b4864aabb7fea0c6a0602b7e992a2039d066038a";
var account1PrivateKeyHex = Buffer.from(account1PrivateKey, "hex");
var contract = new web3.eth.Contract( contractDetails.abi, contractDetails.address);
function doTransaction(info, nonceNo) {
        var rawTxObj = {
            nonce:    web3.utils.toHex(nonceNo),
            gasLimit: web3.utils.toHex(800000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('15', 'gwei')),
            to: contractDetails.address,
            data: contract.methods.setInfo(info).encodeABI()
        };
		var tx = new Tx(rawTxObj);
        tx.sign(account1PrivateKeyHex);
        var serializedTx = tx.serialize();
        var txHex = "0x" + serializedTx.toString("hex");
		return web3.eth.sendSignedTransaction(txHex ).then(resultTx => {
		    return resultTx;
        }).catch(err => {
		    return err;
        });    
}
function getNonceForAddress(address){
    return web3.eth.getTransactionCount(address).then((txCount)=>{
        return txCount;
    }).catch((err=>{
        return err;
    }));
}

function getInfo(txHash){
    return web3.eth.getTransaction(txHash).then((value)=>{
        var informationArray =   web3.utils.hexToAscii(value.input);
        
        return "{" + informationArray.split('{').pop().split('}')[0] + "}";
    }).catch((error)=>{
        console.log("error getting info : " + error);
        return PromiseRejectionEvent;
        
    });
    
}


var contractInteraction={};
contractInteraction.doTransaction = doTransaction;
contractInteraction.getNonceForAddress = getNonceForAddress;
contractInteraction.getInfo = getInfo;
module.exports = contractInteraction;