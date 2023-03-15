import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import useEth from "../../contexts/EthContext/useEth";

import WorkflowStatus from "../../components/WorkflowStatus/WorkflowStatus";
import FormsContainer from "../../components/FormsContainer";

const Voting = () => {
  const {
    state: { contract },
  } = useEth();

  const [workflowStatus, setWorkflowStatus] = useState(-1);

  useEffect(() => {
    const getWorkflowStatus = async () => {
      if (contract) {
        const value = await contract.methods.workflowStatus().call();
        setWorkflowStatus(parseInt(value));
      }
    };

    getWorkflowStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  // const changeStatus = async () => {
  //   // ERROR VM Exception while processing transaction: revert Ownable: caller is not the owner
  //   await contract.methods.startProposalsRegistering().call();
  //};

  //IF WE NEED MOCK
  // const mock = 1;
  return (
    <Flex justify="space-between" style={{ marginTop: 68 }}>
      <WorkflowStatus currentStatus={workflowStatus} />
      <FormsContainer currentStatus={workflowStatus} />
    </Flex>
  );
};

export default Voting;
