import { useState } from "react";
import { useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
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

const RegisteringVoters = ({ context }) => {
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { web3, contract, user } = context;

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: async (values) => {
      const isAddress = web3.utils.isAddress(values.address);
      setIsError(!isAddress);

      if (isAddress) {
        console.log("isAddress", values.address, user.address);
        await contract.methods
          .addVoter(values.address)
          .send({ from: user.address });
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
