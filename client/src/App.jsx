import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import {
  ChakraProvider,
  Heading,
  Center,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

import { EthProvider } from "./contexts/EthContext";
import WorkflowStatus from "./components/WorkflowStatus/WorkflowStatus";
import FromsContainer from "./components/FromsContainer";

import theme from "./theme.js";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: auto;
  margin: auto;
  padding: ${({ theme }) => theme.space.four};
`;

function App() {
  // change this var to change the work flow
  const MockedEnumSC = 0;

  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <EthProvider>
          <Layout>
            <VStack>
              <Center>
                <Heading as="h1" size="4xl">
                  🗳️ Voting dApp
                </Heading>
              </Center>
              <Center>
                <Text fontSize="xl" as="i">
                  Project 3 for Alyra.
                </Text>
              </Center>
            </VStack>
            <Flex justify="space-between" style={{ marginTop: 68 }}>
              <WorkflowStatus currentStatus={MockedEnumSC} />
              <FromsContainer currentStatus={MockedEnumSC} />
            </Flex>
          </Layout>
        </EthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
