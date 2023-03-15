import {
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import useEth from "../../../contexts/EthContext/useEth";
import { useEffect, useState } from "react";

const VotingSessionEnded = () => {

  const { state: { contract, user } } = useEth();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onTallyingVoteRequested = async () => {
    let callOK = true;
    try {
      await contract.methods.tallyVotes().send({ from: user.address });
    }
    catch (error) {
      callOK = false;
      console.log(error);
      manageCallError(error);
    }

    manageError(!callOK);
  }

  const manageError = (isInError) => {
    setIsError(isInError);
    setIsOpen(isInError);
  }

  const manageCallError = async (error) => {
    const keyMessage = error.message.indexOf("message:" - 1);
    if (keyMessage != -1) {

      const message = error.message.substring(keyMessage);
      const endMessage = message.indexOf("\n");
      const errorMessage = message.substring(0, endMessage);
      setErrorMessage(errorMessage);
    }
    else {

      setErrorMessage(error.message);
    }
  }

  const isVisible = isOpen && isError;

  return (
    <>
      {user.isOwner ? (

        <VStack align="start" spacing="24px">
          <Heading as="h3" size="lg">
            ⏳ Voting session is now closed.
            Voters are waiting for the result !
          </Heading>

          <Button
            size="lg"
            colorScheme="teal"
            type="submit"
            rightIcon={<CheckIcon />}
            onClick={onTallyingVoteRequested}
          >
            Tally votes
          </Button>
        </VStack>

      ) : (
        <>
          <Heading as="h3" size="lg">
            ⏳ The voting session is now closed.
            Wait for the results !
          </Heading>
        </>
      )}
      {isVisible && (
        <Alert
          onClick={() => {
            setIsOpen(false);
          }}
          style={{ borderRadius: 4, marginTop: 24, cursor: "pointer" }}
          status="error"
        >
          <AlertIcon />
          <AlertTitle>ERROR !</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default VotingSessionEnded;
