// import React from "react";
// import { useState } from "react";

// function ConnectWalletButton() {

//     const [walletAddress, setWalletAddress] = useState("");

//     async function requestAccount() {
//         console.log('Requesting account.');
//         if(window.ethereum) {
//             console.log('metamask detected');
    
//             try {
//                 const accounts = await window.ethereum.request({
//                     method: 'eth_requestAccounts',
//                 }); 
//                 setWalletAddress(accounts[0]);
//             } catch(error) {
//                 console.log('Error connecting...');
//             }
    
//         } else {
//             console.log('metamask not detected');
//         }
//     }

//     return (
//         <div>
//             <button onClick={requestAccount}>Connect Wallet</button>
//             <h3>Wallet Address: {walletAddress}</h3>
//         </div>
//     );
// }

// export default ConnectWalletButton;