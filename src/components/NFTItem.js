
import React from 'react'

const NFTItem = ({nft}) => {

    const {name, image, desc} = nft;

    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{desc}</p>
            </div>
        </div> 
    )
}

export default NFTItem