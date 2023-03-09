import styled from "styled-components";
import { Heading } from "@chakra-ui/react";

import RegisteringVoters from "./Forms/RegisteringVoters";

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

const SwitchForms = (currentStatus) => {
  //TODO: CREATE USER CONTEXT

  const user = {
    isOwner: !true,
  };
  switch (currentStatus) {
    case 0:
      return <RegisteringVoters user={user} />;
    // case 1:
    //   return ...
    // ...
    default:
      return null;
  }
};

const FormsContainer = ({ currentStatus }) => {
  return (
    <Container>
      <Heading as="h2" size="xl">
        📄 Forms
      </Heading>
      <Card>{SwitchForms(currentStatus)}</Card>
    </Container>
  );
};

export default FormsContainer;
