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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useState } from "react";

import { useEth } from "../../../contexts/EthContext";

const RegisteringVoters = ({ user }) => {
  const {
    state: { web3 },
  } = useEth();

  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: (values) => {
      const isAddress = web3.utils.isAddress(values.address);
      setIsError(!isAddress);

      if (isAddress) {
        //TODO: CALL WEB3 TO PUSH THE ADDR TO VOTER MAPPING
      } else {
        setIsOpen(true);
      }
    },
  });

  const onChange = (e) => {
    setIsOpen(false);
    formik.handleChange(e);
  };

  const isVisible = isOpen && isError;

  return (
    <>
      {user.isOwner ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <VStack align="start" spacing="24px">
              <InputGroup size="lg">
                <InputLeftAddon children="address" />
                <Input
                  errorBorderColor="red.300"
                  id="address"
                  placeholder="0x..."
                  value={formik.values.address}
                  onChange={onChange}
                />
              </InputGroup>
              {isError && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
              <Button
                size="lg"
                colorScheme="teal"
                type="submit"
                rightIcon={<AddIcon />}
              >
                Add voter
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
                Empty value or value is not an address
              </AlertDescription>
            </Alert>
          )}
        </>
      ) : (
        <Heading as="h3" size="lg">
          ⏳ The owner is registering voters
        </Heading>
      )}
    </>
  );
};

export default RegisteringVoters;
