// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./Safe_Math.sol";
import "./Balance_And_Amount.sol";

contract NFTBiddingContract is BalanceAndAmount {
    using SafeMath for uint256;

    mapping (address => Wallet) private wallets;

    BalanceAndAmount controller = new BalanceAndAmount();

    event LogError(string reason);

    struct Wallet {
        address owner;
        uint balance;
    }
    //deposit function
    function deposit() public payable {
        wallets[msg.sender].balance = wallets[msg.sender].balance.add(msg.value);
    }

    //withdraw function
    function withdraw(uint amount) public {
        uint senderBalance = wallets[msg.sender].balance;
        try controller.amountController(amount, senderBalance) {
            wallets[msg.sender].balance = wallets[msg.sender].balance.sub(amount);
            payable(msg.sender).transfer(amount);
        } catch Error(string memory reason) {
            emit LogError(reason);
        }
    }

    //bid function

    //show balance function
    function showBalance() public view returns(uint) {
        return wallets[msg.sender].balance;
    }
}