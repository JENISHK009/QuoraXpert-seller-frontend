/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const Notifications = ({ listActivityData, isLoading }) => {
  const ListItemPrimary = ({ listActivity }) => (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{listActivity.type}</Typography>
        <Typography>{dayjs(listActivity.performAt).fromNow()}</Typography>
      </Box>
    </React.Fragment>
  );

  const ListItemSecondary = ({ listActivity }) => (
    <React.Fragment>
      {listActivity.cardId && (
        <Typography
          sx={{ display: "inline", marginRight: "10px" }}
          component="span"
          variant="body2"
          color="text.primary"
        >{`Card ID: ${listActivity.cardId}`}</Typography>
      )}
      <Typography
        sx={{ display: "flex", marginRight: "10px" }}
        component="span"
        variant="body2"
        color="text.primary"
      >
        {listActivity?.notification || ""}
      </Typography>
      {listActivity.type === "Success" ? null : (
        <Typography
          sx={{ display: "inline", marginRight: "10px" }}
          component="span"
          variant="body2"
          color="text.primary"
        >
          {`Reason: ${listActivity?.apiResponse || ""}`}
        </Typography>
      )}
    </React.Fragment>
  );

  return (
    <>
      <List
        sx={{
          width: "400px",
          bgcolor: "background.paper",
          padding: 0,
          margin: "0px 10px 0px 10px",
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#0069BF" }} />
          </Box>
        ) : (
          <>
            {listActivityData?.map((listActivity) => (
              <>
                <ListItem
                  key={listActivity.id}
                  alignItems="flex-start"
                  sx={{
                    margin: "10px 0px 10px 0px",
                    border:
                      listActivity.type === "Success"
                        ? "1px solid rgba(102, 190, 42, 1)"
                        : "1px solid rgba(255, 75, 75, 1)",
                    borderRadius: "10px",
                    backgroundColor:
                      listActivity.type === "Success"
                        ? "rgba(102, 190, 42, 0.1)"
                        : "rgba(255, 75, 75, 0.1)",
                  }}
                >
                  <ListItemText
                    primary={<ListItemPrimary listActivity={listActivity} />}
                    secondary={
                      <ListItemSecondary listActivity={listActivity} />
                    }
                  />
                </ListItem>
              </>
            ))}
          </>
        )}
      </List>
    </>
  );
};

export default Notifications;
