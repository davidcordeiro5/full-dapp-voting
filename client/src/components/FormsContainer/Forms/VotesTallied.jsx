import {
  VStack,
  Heading,
  Card,
  Text,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import useEth from "../../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";
import { errorManager } from "../../../utils.js";

const VotesTallied = (context) => {

  const { user, contract } = context;
  const toast = useToast();

  const [winningProposal, setWinningProposal] = useState({
    id: -1,
    description: "",
    voteCount: 0,
    isVisible: false,
  });

  useEffect(() => {
    (async function () {

      try {

        setWinningProposal({
          id: 12,
          description: "Proposal de test",
          voteCount: 6,
          isVisible: true,
        });

        if (contract) {

          const winningProposalID = await contract.methods
            .winningProposalID()
            .call();

          console.log(winningProposalID);

          var result = await contract.methods
            .getOneProposal(winningProposalID)
            .call({ from: user.address });

          console.log(result);
        }
      }
      catch (error) {

        toast({
          position: "bottom-left",
          title: "Get winner error.",
          description: `${errorManager(error)}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });

      }
    })();
  }, [context])


  return (
    <>
      {
        <>
          <VStack align="center" spacing="24px">

            <Heading as="h3" size="lg">
              🏆 La proposition {winningProposal.id} remporte le vote ! 🏆
            </Heading>

            <Card hidden={!winningProposal.isVisible} style={{ alignSelf: "center" }}>
              <CardBody>
                <Text fontSize="xl" as="b">
                  Proposal N° {winningProposal.id}.
                </Text>
                <Text fontSize="xl">{winningProposal.description}</Text>
                <Text fontSize="xl" as="i">
                  (Nombre de vote: {winningProposal.voteCount})
                </Text>
              </CardBody>
            </Card>

          </VStack>
        </>
      }
    </>
  );
};

export default VotesTallied;
