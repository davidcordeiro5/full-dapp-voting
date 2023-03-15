import { useState } from "react";
import { useFormik } from "formik";
import { AddIcon } from "@chakra-ui/icons";
import { Input, Button, Heading } from "@chakra-ui/react";

import { AlertError } from "../../Utils";

const ProposalRegistrationStart = ({ context }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const isVoter = true;

  const formik = useFormik({
    initialValues: {
      proposal: "",
    },
    onSubmit: async (values) => {
      if (!values.proposal) setIsOpenAlert(true);
    },
  });

  const onChange = (e) => {
    setIsOpenAlert(false);
    formik.handleChange(e);
  };

  return (
    <>
      {isVoter ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Heading as="h4" size="md" style={{ marginBottom: 4 }}>
              Enter your proposal
            </Heading>
            <Input
              size="lg"
              id="proposal"
              placeholder="My proposal"
              value={formik.values.proposal}
              onChange={onChange}
            />
            <Button
              style={{ marginTop: 24 }}
              size="lg"
              colorScheme="teal"
              type="submit"
              rightIcon={<AddIcon />}
            >
              Add propsal
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
          ❌ Soory, but you are not registered
        </Heading>
      )}
    </>
  );
};

export default ProposalRegistrationStart;
