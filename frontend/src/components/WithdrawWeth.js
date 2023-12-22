import React from 'react';
import { useState } from "react";

function WithdrawWeth() {
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);

    function withdrawWeth() {
        console.log("You tried to withdraw " + withdrawalAmount + " ETH from your account.");
    }

    function handleChangeOfAmount(event) {
        setWithdrawalAmount(event.target.value);
    }

    return (
        <div className="App">
            <h3>Withdraw WETH from your account</h3>
            <label for="withdrawal-amount">WETH to withdraw: </label>
            <input type='number' id='withdraw-amount' onChange={handleChangeOfAmount}></input>
            <button onClick={withdrawWeth}>Withdraw WETH</button>
        </div>
    )
}

export default WithdrawWeth;