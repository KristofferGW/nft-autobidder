// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Safe_Math.sol";
import "./Balance_And_Amount.sol";

contract NFTBiddingContract is BalanceAndAmount {
    using SafeMath for uint256;
    IERC20 public weth;
    address public openseaProxy;

    constructor(address _weth, address _openseaProxy) {
        weth = IERC20(_weth);
        openseaProxy = _openseaProxy;
    }

    mapping (address => Wallet) private wallets;

    BalanceAndAmount controller = new BalanceAndAmount();

    event LogError(string reason);

    event UserHasSufficientAllowance(address indexed user);

    struct Wallet {
        address owner;
        uint balance;
    }

    function approveWeth(uint amount) public {
        uint senderBalance = weth.balanceOf(msg.sender);
        require(amount <= senderBalance, "Not enough WETH balance");

        if (weth.allowance(msg.sender, address(this)) < amount) {
            weth.approve(address(this), amount);
        } else {
            emit UserHasSufficientAllowance(msg.sender);
        }
    }
    //deposit function
    function deposit(uint amount) public {
        require(weth.allowance(msg.sender, address(this)) >= amount, "Not enough allowance");

        bool success = weth.transferFrom(msg.sender, address(this), amount);
        require(success, "WETH transfer failed");

        wallets[msg.sender].balance = wallets[msg.sender].balance.add(amount);
    }

    //withdraw function
    function withdraw(uint amount) public {
        uint senderBalance = wallets[msg.sender].balance;
        try controller.amountController(amount, senderBalance) {
            approveWeth(amount);
            wallets[msg.sender].balance = wallets[msg.sender].balance.sub(amount);
            weth.transferFrom(address(this), msg.sender, amount);
        } catch Error(string memory reason) {
            emit LogError(reason);
        }
    }

    //bid function

    // function placeCollectionBid(address nftContract, uint256 bidPrice) public {
    //     weth.approve(openseaProxy, bidPrice);

    //     openseaProxy.placeCollectionBid(nftContract, bidPrice);
    // }

    //show balance function
    function showBalance() public view returns(uint) {
        return wallets[msg.sender].balance;
    }
}