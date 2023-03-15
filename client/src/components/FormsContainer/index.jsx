import { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, Spinner, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import useEth from "../../contexts/EthContext/useEth";

import RegisteringVoters from "./Forms/RegisteringVoters";
import VotingSessionStarted from "./Forms/VotingSessionStarted";
import ProposalRegistrationStart from "./Forms/ProposalRegistrationStart";
import ProposalRegistrationEnded from "./Forms/ProposalRegistrationEnded";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  min-height: 100%;
  width: 100%;

  h2 {
    margin: ${({ theme }) => theme.space.three} 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;

  ${({ theme }) => `
    padding: ${theme.space.two};
    border-radius: ${theme.space.one};

    border: 1px solid ${theme.colors.borderGrey};
    box-shadow: ${theme.shadow};
  `}
  width: 100%;
`;

const SwitchForms = (currentStatus, ethContext) => {
  switch (currentStatus) {
    case 0:
      return <RegisteringVoters context={ethContext} />;
    case 1:
      return <ProposalRegistrationStart context={ethContext} />;
    case 2:
      return <ProposalRegistrationEnded />;
    case 3:
      return <VotingSessionStarted context={ethContext} />;
    default:
      return null;
  }
};

const FormsContainer = ({ currentStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useEth();

  // const [eventValue, setEventValue] = useState();
  // const [oldEvents, setOldEvents] = useState();

  // const { contract } = ethContext;

  // CREATRE form proposal start
  // TODO handling ERRORS => check .incles (js)

  // useEffect(() => {
  //   const waitingFunctions = async () => {
  //     const oldEvents = await state.contract.getPastEvents("VoterRegistered", {
  //       fromBlock: 0,
  //       toBlock: "latest",
  //     });

  //     let oldies = [];
  //     oldEvents.forEach((event) => {
  //       oldies.push(event.returnValues._val);
  //     });
  //     setOldEvents(oldies);

  //     await state.contract.events
  //       .VoterRegistered({ fromBlock: "earliest" })
  //       .on("data", (event) => {
  //         console.log("event", event);
  //         let lesevents = event.returnValues._val;
  //         setEventValue(lesevents);
  //       })
  //       .on("changed", (changed) => console.log("changed", changed))
  //       .on("error", (err) => console.log(err))
  //       .on("connected", (str) => console.log("connected"));
  //   };

  //   if (state.contract) {
  //     console.log("in");
  //     waitingFunctions();
  //   }
  // }, [state.contract]);

  useEffect(() => {
    if (state.user && state.web3) {
      setIsLoading(false);
    }
  }, [state]);

  const onChangeWorkflow = async (currentStatus) => {
    console.log("currentStatus", currentStatus);
    await state.contract.methods
      .startProposalsRegistering()
      .call({ from: state.user.address });
  };

  return (
    <Container>
      <Heading as="h2" size="xl">
        📄 Forms
      </Heading>
      {isLoading ? (
        <Spinner style={{ alignSelf: "center" }} size="xl" />
      ) : (
        <Card>{SwitchForms(currentStatus, state)}</Card>
      )}

      {!isLoading && state.user.isOwner && (
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="orange"
          size="lg"
          style={{ marginTop: 24, width: "fit-content", alignSelf: "end" }}
          onClick={() => onChangeWorkflow(currentStatus)}
        >
          Change workflow
        </Button>
      )}
    </Container>
  );
};

export default FormsContainer;
