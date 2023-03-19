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

  const { state: { user } } = useEth();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isVisible = isOpen && isError;

  return (
    <>
      {user.isOwner ? (

        <VStack align="start" spacing="24px">
          <Heading as="h3" size="lg">
            ⏳ Voting session is now closed.
            Voters are waiting for the result !
          </Heading>
        </VStack>

      ) : (

        user.isVoter ? (
          <>
            <Heading as="h3" size="lg">
              ⏳ The voting session is now closed.
              Wait for the results !
            </Heading>
          </>
        ) : (
          <Heading as="h3" size="lg">
            ❌ Sorry, but you are not registered.
          </Heading>
        )
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
