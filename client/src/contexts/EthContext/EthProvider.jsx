import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();

      // The accounts[0] is always the current connected wallet
      const user = {
        address: accounts[0],
        isOwner: false
      }
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;

      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        const owner = await contract.methods.owner().call();
        user.isOwner = owner == user.address;
        console.log(user);
      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, user, networkID, contract },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Voting.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = [
      "VoterRegistered",
      "WorkflowStatusChange",
      "ProposalRegistered",
      "Voted",
    ];
    const handleChange = () => {
      init(state.artifact);
    };

    // Manage switching connected wallet
    window.ethereum.on('accountsChanged', function (accounts) {
      init(state.artifact);
    });

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
