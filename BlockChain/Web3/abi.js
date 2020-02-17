var contractAddress = "0x551628aefa318391cff19f1eb93e121288b49f9b";
var contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_info",
				"type": "string"
			}
		],
		"name": "setInfo",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "certificateInformation",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var contract = {
    abi : contractABI,
    address : contractAddress
}

module.exports = contract;