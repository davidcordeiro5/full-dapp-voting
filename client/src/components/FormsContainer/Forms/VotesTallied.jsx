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
  const { state } = useEth();


  const [winningProposal, setWinningProposal] = useState({
    id: -1,
    description: "",
    voteCount: 0,
    isVisible: false,
  });

  useEffect(() => {
    (async function () {

      try {

        if (!state.contract) {
          return;
        }

        const winningProposalID = await state.contract.methods
          .winningProposalID()
          .call();

        if (state.user.isVoter) {

          var result = await state.contract.methods
            .getOneProposal(winningProposalID)
            .call({ from: state.user.address });
        }

        setWinningProposal({
          id: winningProposalID,
          description: result ? result.description : "",
          voteCount: result ? result.voteCount : 0,
          isVisible: true,
        });
      }
      catch (error) {
        console.log(error.message);
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
  }, [state])


  return (
    <>
      {
        <>
          <VStack align="center" spacing="24px">

            <Heading as="h3" size="lg">
              🏆 La proposition {winningProposal.id} remporte le vote ! 🏆
            </Heading>

            {state.user.isVoter ? (
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
            ) : (
              <>
              </>)}

          </VStack>
        </>
      }
    </>
  );
};

export default VotesTallied;
