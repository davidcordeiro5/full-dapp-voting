
const Voting = artifacts.require("Voting");

module.exports = async (deployer, network) => {

    var accounts = await web3.eth.getAccounts();
    var owner = accounts[0];
    var voter1 = accounts[1];
    var voter2 = accounts[2];
    var proposal1 = "Proposal N°1: Proposal number 1";
    var proposal2 = "Proposal N°2: Proposal number 2";
    var proposal3 = "Proposal N°3: Proposal number 3";

    const votingInstance = await Voting.deployed();
    // console.log((await votingInstance.workflowStatus()).toNumber());
    // console.log(await votingInstance.owner());
    // console.log(accounts[0]);


    // await votingInstance.addVoter(voter1, { from: owner });
    // await votingInstance.addVoter(voter2, { from: owner });

    // await votingInstance.startProposalsRegistering({ from: owner });
    // var value = await votingInstance.workflowStatus();
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // await votingInstance.addProposal(proposal1, { from: voter1 });
    // await votingInstance.addProposal(proposal2, { from: voter2 });
    // await votingInstance.addProposal(proposal3, { from: voter1 });

    // await votingInstance.endProposalsRegistering({ from: owner });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    // await votingInstance.startVotingSession({ from: owner });
    // console.log((await votingInstance.workflowStatus()).toNumber());

    var p1 = await votingInstance.getOneProposal(0, { from: voter1 });
    console.log(p1);

};
