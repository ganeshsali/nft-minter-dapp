import { Link } from "react-router-dom";

const Navbar = ({state}) => {

  const connetWallet = async () => {
    await state.onConnect();
  }

  const dicconnetWallet = async () => {
    await state.onDisconnect();
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NFT Minter</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/mint">Mint</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/portfolio">My NFTs</Link></li>
            </ul>
            <div className="d-flex">
              {state.isConnected ?
                <>{state.balance && <p className="text-light m-2">{state.balance}</p>}
                <p className="text-light m-2">{state.isConnected ? state.account : ''}</p>
                <button className="app-buttons__logout" onClick={dicconnetWallet}>Disconnect</button></> :
                <button onClick={connetWallet}>Connect</button>
              }
            </div>
          </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar
