import {
  FormErrorMessage,
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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import { useFormik } from "formik";
import { useState } from "react";
import Web3 from "web3";

const VotingSessionStarted = ({ user }) => {
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const proposals = [0, 1, 2, 3, 4, 5];

  console.log("user", user);
  const formik = useFormik({
    initialValues: {
      id: 0,
    },
    onSubmit: (values) => {

      // TODO: check if number
      // TODO: CALL WEB 3 TO "getOneProposal" TO CHECK IF THE PROPOSAL EXIST

      var isNumber = /^\d+$|^$/.test(values.id);
      setIsError(!isNumber);
      if (isNumber) {
        //TODO: CALL WEB3 TO "setVote" WITH PROPOSAL ID

      }
      else {
        setIsOpen(true);
      }
    },
  });

  const onChange = (e) => {

    setIsOpen(false);
    formik.handleChange(e);
  };

  const onSelectedChange = (e) => {


  };

  const isVisible = isOpen && isError;

  return (
    <>
      {user.isOwner ? (

        <form onSubmit={formik.handleSubmit}>
          <VStack align="start" spacing="24px">
            <Heading as="h3" size="lg">
              ⏳ Voters are voting...
            </Heading>
            {/* {isError && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )} */}
            <Button
              size="lg"
              colorScheme="teal"
              type="submit"
              rightIcon={<CheckIcon />}
            >
              Close voting session
            </Button>
          </VStack>
        </form>

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
                  value={formik.values.address}
                  onChange={onChange}
                />
              </InputGroup>
              {/* {isError && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )} */}


              <List spacing={3}>
                <ListItem style={{ cursor: "pointer" }} oncli>
                  <ListIcon color='green.500' />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                  <ListIcon color='green.500' />
                  Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                  <ListIcon color='green.500' />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  <ListIcon color='green.500' />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>


                {workflows.map((workflow, index) => (
                  <li key={index}>
                    <StatusTag
                      workflowStatus={workflow}
                      status={getStatusLabel(currentStatus, workflow)}
                    />
                    {getStatusLabel(currentStatus, workflow) === "old" && (
                      <CheckCircleIcon
                        className="check-circle"
                        w={6}
                        h={6}
                        color="#57b47e"
                      />
                    )}
                  </li>
                ))}

              </List>







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
                The proposal does not exist !
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default VotingSessionStarted;
