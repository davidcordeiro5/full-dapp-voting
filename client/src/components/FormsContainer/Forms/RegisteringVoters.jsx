import { useState } from "react";
import { useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import {
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  Heading,
} from "@chakra-ui/react";

import { AlertError } from "../../Utils";

const RegisteringVoters = ({ context }) => {
  // const [isError, setIsError] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const { web3, contract, user } = context;

  const formik = useFormik({
    initialValues: {
      address: "",
    },
    onSubmit: async (values) => {
      const isAddress = web3.utils.isAddress(values.address);

      if (!isAddress) setIsOpenAlert(true);

      await contract.methods
        .addVoter(values.address)
        .send({ from: user.address });
    },
  });

  const onChange = (e) => {
    setIsOpenAlert(false);
    formik.handleChange(e);
  };

  return (
    <>
      {user.isOwner ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Heading as="h4" size="md" style={{ marginBottom: 4 }}>
              Enter an address
            </Heading>
            <InputGroup size="lg">
              <InputLeftAddon children="address" />
              <Input
                id="address"
                placeholder="0x..."
                value={formik.values.address}
                onChange={onChange}
              />
            </InputGroup>
            <Button
              style={{ marginTop: 24 }}
              size="lg"
              colorScheme="teal"
              type="submit"
              rightIcon={<AddIcon />}
            >
              Add voter
            </Button>
          </form>
          <AlertError
            isOpen={isOpenAlert}
            errorMessage="Empty value or value is not an address"
            onClickAlert={() => {
              setIsOpenAlert(false);
            }}
          />
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
