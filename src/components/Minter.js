import React, { useEffect, useState } from 'react'

const Minter = ({state}) => {

    console.log('state mibter', state)

    const [account, setAccount] = useState("");
	const [minted, setMinted] = useState(false);

    const mintNFT = ()=>{
        const {contract} = state;
        contract.methods.mint(account).send({ from: account }).then((tx) => {
            console.log(tx);
            setMinted(true);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        setAccount(state.account);
      }, [state]);

    return (
        <div className="container mt-5">
            <div>Account : {state.account}</div>
            <button className="btn btn-primary" onClick={mintNFT} disabled={!state.isConnected}>Mint</button>
            { minted && <p>Token minted successfully!</p>}
        </div>
    );
}

export default Minter