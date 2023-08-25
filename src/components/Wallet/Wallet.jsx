import "./Wallet.css";
import Web3 from "web3";
import abi from "../../constants/Portfolio.json";
import addresses from "../../constants/networkMapping";
import { useState } from "react";
const Wallet = ({ saveState }) => {
  const [connected, setConnected] = useState(true);
  const [account, setAccount] = useState("Connect Metamask");
  const isAndroid = /android/i.test(navigator.userAgent);
  const init = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const chainId = await web3.eth.getChainId();
      const address = addresses[chainId]["Portfolio"][0];
      const account = (
        await window.ethereum.request({ method: "eth_requestAccounts" })
      ).toString();
      let accountStr =
        account.substring(0, 6) +
        "..." +
        account.substring(account.length - 5, account.length);
      const contract = new web3.eth.Contract(abi, address);
      saveState({ web3: web3, contract: contract });
      setConnected(false);
      setAccount(accountStr);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="header">
        {isAndroid && (
          <button className="connectBTN">
            <a href="https://metamask.app.link/dapp/connectharsh.netlify.app">
              Click For Mobile
            </a>
          </button>
        )}
        <button className="connectBTN" onClick={init} disabled={!connected}>
          {account}
        </button>
      </div>
    </>
  );
};
export default Wallet;
