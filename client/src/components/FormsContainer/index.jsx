import { useEffect, useState } from "react";
import styled from "styled-components";
import { Heading, Spinner } from "@chakra-ui/react";
import useEth from "../../contexts/EthContext/useEth";
import RegisteringVoters from "./Forms/RegisteringVoters";
import VotingSessionStarted from "./Forms/VotingSessionStarted";

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
  // CREATRE form proposal start

  //TODO handling ERRORS

  switch (currentStatus) {
    case 0:
      return <RegisteringVoters context={ethContext} />;
    // case 1:
    //   return ...
    // ...
    case 3:
      return <VotingSessionStarted />;
    default:
      return null;
  }
};

const FormsContainer = ({ currentStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useEth();

  console.log("state", state);

  useEffect(() => {
    if (state.user && state.web3) {
      setIsLoading(false);
    }
  }, [state]);

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
    </Container>
  );
};

export default FormsContainer;
