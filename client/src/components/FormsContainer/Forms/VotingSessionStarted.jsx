import {
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Heading,
  Card,
  Text,
  CardBody
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import useEth from "../../../contexts/EthContext/useEth";
import { useFormik } from "formik";
import { useState } from "react";

const VotingSessionStarted = () => {

  const { state: { contract, user } } = useEth();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [displayedProposal, setDisplayedProposal] = useState(
    {
      id: -1,
      description: "",
      voteCount: 0,
      isVisible: false
    });

  const formik = useFormik({
    initialValues: {
      id: 0,
    },

    onSubmit: async () => {

      if (isValidProposal(displayedProposal.id)) {
        const callOK = true;
        try {

          // Set vote and refresh UI
          await contract.methods.setVote(displayedProposal.id).send({ from: user.address });
          const result = await contract.methods.getOneProposal(displayedProposal.id).call({ from: user.address });
          setDisplayedProposal((currentState) => ({ ...currentState, voteCount: result.voteCount }))
        }
        catch (error) {
          callOK = false;
          manageCallError(error);
        }

        manageError(!callOK);
      }
    },
  });

  const onChange = async (e) => {

    if (isValidProposal(e.target.value)) {

      const callOK = true;
      // Get the proposal informations from the proposal id and display them
      try {
        const result = await contract.methods.getOneProposal(e.target.value).call({ from: user.address });
        setDisplayedProposal({
          id: e.target.value,
          description: result.description,
          voteCount: result.voteCount,
          isVisible: true
        });
      }
      catch (error) {
        callOK = false;
        manageCallError(error);
      }

      manageError(!callOK);
    }
  };

  const isValidProposal = (e) => {
    // Check if the value entered by the user is a number and if it's not the default proposal at index 0
    const isNumber = /^\d+$|^$/.test(e);
    const isGenesisProp = e == 0;
    setErrorMessage("The proposal does not exist !");
    const isValid = isNumber && !isGenesisProp;
    manageError(!isValid);
    return isValid;
  }

  const manageError = (isInError) => {
    if (isInError)
      displayedProposal.isVisible = false;

    setIsError(isInError);
    setIsOpen(isInError);
  }

  const onClosingVotingSession = async () => {
    const callOK = true;
    try {
      await contract.methods.endVotingSession().send({ from: user.address });
    }
    catch (error) {
      callOK = false;
      manageCallError(error);
    }

    manageError(!callOK);
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
            ⏳ Voters are voting...
          </Heading>

          <Button
            size="lg"
            colorScheme="teal"
            type="submit"
            rightIcon={<CheckIcon />}
            onClick={onClosingVotingSession}
          >
            Close voting session
          </Button>
        </VStack>

      ) : (
        <>
          <form onSubmit={formik.handleSubmit}>
            <VStack align="start" spacing="24px">
              <InputGroup size="lg">
                <InputLeftAddon children="id" />
                <Input
                  errorBorderColor="red.300"
                  id="id"
                  placeholder="Proposal ID"
                  onBlur={onChange}
                />
              </InputGroup>

              <Card hidden={!displayedProposal.isVisible}>
                <CardBody>
                  <Text fontSize="xl" as="b" >Proposal N° {displayedProposal.id}.</Text>
                  <Text fontSize="xl" >{displayedProposal.description}</Text>
                  <Text fontSize="xl" as="i">(Nombre de vote: {displayedProposal.voteCount})</Text>
                </CardBody>
              </Card>

              <Button
                size="lg"
                colorScheme="teal"
                type="submit"
                rightIcon={<CheckIcon />}
              >
                Vote
              </Button>
            </VStack>
          </form>
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

export default VotingSessionStarted;
