import { useState, useEffect } from "react";
import NFTItem from "./NFTItem";

const Portfolio = ({ state }) => {

    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const fetchNfts = async () => {
            const { account, contract } = state;
            let incomingTokenTransferEvents = await contract.getPastEvents('Transfer', { filter: { 'to': account }, fromBlock: 0, toBlock: 'latest' })
            const data = []
            incomingTokenTransferEvents.forEach((event) => {
                data.push({
                    "token_id": event.returnValues.tokenId,
                    "name": "BAYC #" + event.returnValues.tokenId,
                    "image": "https://miro.medium.com/max/1200/1*qGqMY0LcqT1xgdz0z9r8EA.png",
                    "desc": "description",
                });
            });
            console.log("NFT data ==> ", data)
            setNfts(data);
        };
        if (state.contract && state.account) {
            fetchNfts();
        }
        else{
            setNfts([]);
        }
        // eslint-disable-next-line
    }, [state])

    return (
        <div className="container my-5">
            <div className="container">
                <div className="row">
                    {nfts.map((element, index) => {
                        return (
                            <div className="col-md-3" key={index}>
                                <NFTItem nft={element} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
