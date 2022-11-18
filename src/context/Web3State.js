
import React, { useState } from 'react'
import Web3Context from './Web3Context'
import abi from '../abi/nft.json';
import Web3 from "web3";

const Web3State = (props) => {

    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [isConnected, setIsConnected] = useState(false);

    const setAccountListener = (web3) => {
        web3.givenProvider.on("accountsChanged", async (accounts) => {
            setAccount(accounts[0]);
            if (accounts[0]) {
                const balance = await web3.eth.getBalance(accounts[0]);
                setBalance(web3.utils.fromWei(balance, "ether"));
            }
            else {
                setBalance(null);
                setIsConnected(false);
            }
        })
    };

    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("Non-ethereum browser detected. You should install Metamask");
        }
        return provider;
    };

    const onConnect = async () => {

        try {
            const currentProvider = detectCurrentProvider();
            if (currentProvider) {
                await currentProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currentProvider);
                setWeb3(web3);
                const userAccount = await web3.eth.getAccounts();
                const account = userAccount[0];
                setAccount(account);
                setAccountListener(web3);
                let balance = await web3.eth.getBalance(account);
                setBalance(web3.utils.fromWei(balance, "ether"));
                setIsConnected(true);
                const contract = new web3.eth.Contract(
                    abi,
                    '0x7fdC0a93dB8cD73c49F500133251551954d4BA2e'
                );
                setContract(contract);
            }

        } catch (error) {
            alert("Falied to load web3.");
            console.log(error);
        }
    };

    const onDisconnect = () => {
        setIsConnected(false);
        setBalance(null);
        setAccount(null);
    }

    return (
        <Web3Context.Provider value={{ onConnect, onDisconnect, web3, contract, account, balance, isConnected }}>
            {props.children}
        </Web3Context.Provider>
    )
}

export default Web3State;