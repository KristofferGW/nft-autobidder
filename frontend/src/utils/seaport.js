const { ethers } = require("ethers");
const seaport_1_5_abi = require("./seaport_1_5_abi.json");

const seaportInterface = new ethers.utils.Interface(seaport_1_5_abi);
const seaportContractAddress = "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC";
const seaportName = "Seaport";
const seaportVersion = "1.5";

console.log(seaportInterface);

module.exports = { seaportInterface, seaportContractAddress, seaportName, seaportVersion}