import { Heading, Center, Text, VStack } from "@chakra-ui/react";

const Header = () => {
  return (
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
  );
};

export default Header;
