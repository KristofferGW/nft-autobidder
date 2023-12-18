// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./Safe_Math.sol";

contract NFTBiddingContract {
    using SafeMath for uint256;

    mapping (address => Wallet) private wallets;

    struct Wallet {
        address owner;
        uint balance;
    }
    //deposit function
    function deposit() public payable {
        wallets[msg.sender].balance = wallets[msg.sender].balance.add(msg.value);
    }

    //withdraw function

    //bid function

    //show balance function
    function showBalance() public view returns(uint) {
        return wallets[msg.sender].balance;
    }
}