import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractAbi from '../conctractABI.json'
import {CONTRACT_ADDRESS} from '../utils/contractAddress.js';

function CheckBalance(props) {
    const web3 = props.web3;
    const currentAccount = props.currentAccount;
    const contract = props.contract;
    const [contractBalance, setContractBalance] = useState(0);

    const checkBalance = async () => {
        try {
            if (!web3 || !currentAccount || !contract) {
                console.error('Web3, account, or contract not available');
                return;
            }

            const balanceInWei = await contract.methods.showBalance().call({from: currentAccount});
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
            setContractBalance(balanceInEther);

            console.log('Contract Balance', balanceInEther);
        } catch (error) {
            console.error('Error checking balance:', error);
        }
    };

    return (
        <div>
            <button onClick={checkBalance}>Check Contract Balance</button>
            <div>
                <h3>Contract Balance: {contractBalance}</h3>
            </div>
        </div>
    )
}

export default CheckBalance;