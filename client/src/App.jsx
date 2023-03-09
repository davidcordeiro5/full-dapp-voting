import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { ChakraProvider } from "@chakra-ui/react";

import { EthProvider } from "./contexts/EthContext";
import WorkflowStatus from "./components/WorkflowStatus/WorkflowStatus";
import { Heading, Center, Flex } from "@chakra-ui/react";

import theme from "./theme.js";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: auto;
  margin: auto;
`;

const FromContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `
    padding: ${theme.space.two};
    border-radius: ${theme.space.two};

    border: 1px solid ${theme.colors.borderGrey};
    box-shadow: ${theme.shadow};
  `}

  overflow: hidden scroll;
  width: 100%;
  max-width: 600px;
  min-height: 100%;
`;

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <EthProvider>
          <Layout>
            <Center>
              <Heading as="h1" size="4xl">
                🗳️ Voting dApp
              </Heading>
            </Center>
            <Flex justify="space-between" style={{ marginTop: 68 }}>
              <WorkflowStatus currentStatus={1} />
              <FromContainer>
                <div>{/* HERE do all from */}</div>
              </FromContainer>
            </Flex>
          </Layout>
        </EthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
