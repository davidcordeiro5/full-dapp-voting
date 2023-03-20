import {
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  VStack,
  Heading,
  Card,
  Text,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { errorManager } from "../../../utils.js";

const VotingSessionStarted = ({ context }) => {
  const { user, contract } = context;
  const toast = useToast();
  const [displayedProposal, setDisplayedProposal] = useState(
    {
      id: -1,
      description: "",
      isVisible: false
    });

  const formik = useFormik({
    initialValues: {
      id: 0,
    },

    onSubmit: async () => {

      if (!isValidProposal(displayedProposal.id)) {
        toast({
          position: "bottom-left",
          title: "Propsal error.",
          description: "The proposal does not exist !",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        return;
      }

      try {
        // Set vote
        await contract.methods.setVote(displayedProposal.id).send({ from: user.address });

        toast({
          position: "bottom-left",
          title: "Voted !",
          description: "Successfully voted !",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      catch (error) {

        console.log(error.message);

        toast({
          position: "bottom-left",
          title: "Voting call error.",
          description: `${errorManager(error)}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

    },
  });

  const onProposalIdChange = async (e) => {

    const unknownPropToast = {
      position: "bottom-left",
      title: "Propsal error.",
      description: "The proposal does not exist !",
      status: "error",
      duration: 5000,
      isClosable: true,
    };

    if (!isValidProposal(e.target.value)) {
      toast(unknownPropToast);
      return;
    }

    // Get the proposal informations from the proposal id and display them
    try {
      const result = await contract.methods.getOneProposal(e.target.value).call({ from: user.address });
      setDisplayedProposal({
        id: e.target.value,
        description: result.description,
        isVisible: true
      });
    } catch (error) {
      toast(unknownPropToast);
    }
  };

  const isValidProposal = (e) => {
    // Check if the value entered by the user is a number and if it's not the default proposal at index 0
    var isNumber = /^\d+$|^$/.test(e);
    var isGenesisProp = e == 0;
    const isValid = isNumber && !isGenesisProp;
    return isValid;
  };

  return (
    <>
      {user.isOwner && !user.isVoter ? (
        <VStack align="start" spacing="24px">
          <Heading as="h3" size="lg">
            ⏳ Voters are voting...
          </Heading>
        </VStack>
      ) : (
        <>
          {user.isVoter ? (

            <form onSubmit={formik.handleSubmit}>
              <VStack align="start" spacing="24px">
                <InputGroup size="lg">
                  <InputLeftAddon children="id" />
                  <Input
                    errorBorderColor="red.300"
                    id="id"
                    placeholder="Proposal ID"
                    onBlur={onProposalIdChange}
                  />
                </InputGroup>

                <Card hidden={!displayedProposal.isVisible}>
                  <CardBody>
                    <Text fontSize="xl" as="b" >Proposal N° {displayedProposal.id}.</Text>
                    <Text fontSize="xl" >{displayedProposal.description}</Text>
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

          ) : (
            <Heading as="h3" size="lg">
              ❌ Sorry, but you are not registered.
            </Heading>
          )
          }
        </>
      )}
    </>
  );
};

export default VotingSessionStarted;
