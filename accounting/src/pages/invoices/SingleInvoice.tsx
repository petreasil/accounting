import React from "react";
import { useParams, useNavigate } from "react-router";
import { useGetSingleInvoiceQuery } from "../../slice/invoicesApiSlice";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const SingleInvoice = () => {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetSingleInvoiceQuery(params.id);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const closeModal = () => {
    navigate("/home/invoices");
    setOpen(!open);
  };

  if (isLoading || isFetching) {
    return <div> Loading ....</div>;
  }
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">
            <strong>city:</strong> {data?.data?.contact_city ?? "--"}
          </h2>
          <h2 id="parent-modal-title">
            <strong>phone:</strong>: {data?.data?.contact_phone ?? "--"}
          </h2>
          <h2 id="parent-modal-title">
            <strong>county:</strong> {data?.data?.contact_county}
          </h2>
          <h2 id="parent-modal-title">
            <strong>email:</strong> {data?.data?.contact_email}
          </h2>
          <h2 id="parent-modal-title">
            <strong>contract:</strong> {data?.data?.contact_name}
          </h2>
          <h2 id="parent-modal-title">
            <strong>id:</strong> {data?.data?.id}
          </h2>
          <p id="parent-modal-description">
            <strong>issue date:</strong> {data?.data?.issued_at ?? " --"}
          </p>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default SingleInvoice;
