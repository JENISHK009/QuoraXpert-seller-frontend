import React, { ReactNode } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  Typography,
  SxProps,
} from "@mui/material";
import ButtonComponent from "./ButtonComponent";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  "&:focus-visible": {
    outline: "none",
  },
};

const ModalComponent = ({
  handleClose,
  open,
  headerTitle = "",
  submitBtnTitle = "",
  closeBtnTitle = "",
  onSubmitBtnClick,
  onCloseBtnClick,
  children,
  isFooterShow = false,
  isHeaderAction = false,
  modalCardContainerStyle = {},
  contentSx,
  isHeaderCustomTitle = null,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={{ ...style, ...modalCardContainerStyle }}>
        {headerTitle !== "" && (
          <CardHeader
            sx={{
              borderBottom: "1px solid #C2C2C2",
            }}
            action={
              <Box>
                {isHeaderAction && (
                  <>
                    <CloseIcon
                      sx={{
                        cursor: "pointer",
                        color: "#6B7280",
                        margin: "7px 10px 0 10px",
                      }}
                      onClick={handleClose}
                    />
                  </>
                )}
              </Box>
            }
            title={
              isHeaderCustomTitle === null ? (
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "20px",
                    fontFamily: "Roboto Bold",
                    lineHeight: "30px",
                  }}
                >
                  {headerTitle}
                </Typography>
              ) : (
                <>{isHeaderCustomTitle}</>
              )
            }
          />
        )}
        <CardContent sx={{ ...contentSx }}>{children}</CardContent>
        {isFooterShow && (
          <CardActions sx={{ p: "0px 20px 20px 6px !important" }}>
            <Box sx={{ flexGrow: 1 }} />
            {closeBtnTitle && (
              <ButtonComponent
                btnTitle={closeBtnTitle}
                onBtnClick={(e) => onCloseBtnClick?.(e)}
                sx={{
                  backgroundColor: "#F7F7F9",
                  borderRadius: "7px",
                  color: "#000000",
                  padding: "8px, 16px, 8px, 16px",
                  marginLeft: "10px !important",
                  "&:hover": {
                    backgroundColor: "#F7F7F9",
                  },
                }}
              />
            )}
            {submitBtnTitle && (
              <ButtonComponent
                btnTitle={submitBtnTitle}
                onBtnClick={(e) => onSubmitBtnClick?.(e)}
                sx={{
                  backgroundColor: "#0069BF",
                  borderRadius: "7px",
                  marginLeft: "10px !important",
                }}
                loading={loading}
                disabled={loading}
              />
            )}
          </CardActions>
        )}
      </Card>
    </Modal>
  );
};

export default ModalComponent;
