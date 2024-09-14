import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Styled components
const StyledPaper = styled(Paper)`
  margin-top: 25px;
  box-shadow: 0px -4px 3px rgba(0, 0, 0, 0.1), 0px 4px 3px rgba(0, 0, 0, 0.1),
    -4px 0px 3px rgba(0, 0, 0, 0.1), 4px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow-x: auto; /* Make table scrollable on small screens */
  width: 100%;
`;

const StyledTableContainer = styled(TableContainer)`
  border-radius: 10px;
`;

const StyledTableCell = styled(TableCell)`
  background-color: white;
  border-right: 1px solid #c2c2c2;
  color: #181623;
  font-size: 16px;
  font-family: "Poppins Medium";
`;

const StyledTableBodyCell = styled(TableCell)`
  border-right: 1px solid #c2c2c2;
  color: #181623;
  font-size: 14px;
  font-family: "Poppins Regular";
  ${({ additionalcellstyles }) => additionalcellstyles && additionalcellstyles};
`;

const StyledTableRow = styled(TableRow)`
  background-color: ${({ index }) => (index % 2 === 0 ? "#F6F6F6" : "#EFEEEE")};
  z-index: 1;
  &:hover {
    z-index: 10000000;
    background-color: #ffffff;
  }
  ${({ additionalrowstyles }) => additionalrowstyles && additionalrowstyles};
`;

const TableComponent = ({
  rows = [],
  handleRowClick,
  handleCellClick,
  isDataNotFoundShow = true,
  sxContainer,
  noDataFoundText = "No data available",
  onStatusClick = () => {},
  headerForSorting = [],
  onHandleSorting = () => {},
  isActiveSortingData = { key: "", direction: "asc" },
  additionalRowStyles = "",
  pointerColumnIndex = [],
}) => {
  const initialSortingData = isActiveSortingData
    ? {
        key: isActiveSortingData.key.toString(),
        direction: isActiveSortingData.direction.toString(),
      }
    : { key: "", direction: "asc" };

  const [sorting, setSorting] = useState(initialSortingData);

  const handleSorting = (header) => {
    setSorting((prevSorting) => ({
      key: header,
      direction:
        prevSorting.key === header && prevSorting.direction === "asc"
          ? "desc"
          : "asc",
    }));
    const direction =
      sorting.key === header && sorting.direction === "asc" ? "desc" : "asc";
    onHandleSorting(header, direction);
  };

  function camelCaseToTitleCase(str) {
    // Handle the specific case for "fedEx"
    if (str === "fedEx") return "FedEx";
    // General case for camelCase to Title Case conversion
    let spacedString = str.replace(/([A-Z])/g, " $1");
    let titleCaseString = spacedString.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    return titleCaseString;
  }

  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
  const HtmlContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  const StatusComponent = ({ status, handleOnViewDetails }) => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {status === "Declined" ? (
          <>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  height: "8px",
                  width: "8px",
                  borderRadius: "4px",
                },
              }}
              color="error"
              badgeContent=" "
              variant="dot"
            />
            <span
              style={{
                padding: "0px 0px 0px 7px",
                color: "#181623",
                fontSize: "16px",
                fontFamily: "Poppins Regular",
                lineHeight: "26px",
              }}
            >
              {status}
            </span>
            <Button
              disableRipple
              variant="text"
              sx={{
                padding: "0px 0px 0px 7px",
                fontSize: "12px",
                fontFamily: "Poppins Regular",
                lineHeight: "22px",
                margin: 0,
                color: "#0069BF",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={handleOnViewDetails}
            >
              View Details
            </Button>
          </>
        ) : (
          <span
            style={{
              // padding: '0px 0px 0px 7px',
              color: "#181623",
              fontSize: "16px",
              fontFamily: "Poppins Regular",
              lineHeight: "26px",
            }}
          >
            {status}
          </span>
        )}
      </Box>
    );
  };
  return (
    <>
      {rows.length > 0 ? (
        <StyledPaper>
          <StyledTableContainer sx={sxContainer}>
            <Table sx={{ minWidth: 650 }} aria-label="dynamic table">
              <TableHead>
                <TableRow>
                  {headers?.map(
                    (header) =>
                      header !== "id" && (
                        <StyledTableCell key={header}>
                          {headerForSorting?.includes(header) ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                              }}
                            >
                              {camelCaseToTitleCase(header)}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                                onClick={() => handleSorting(header)}
                              >
                                <ArrowDropUpIcon
                                  style={{
                                    fontSize: "24px",
                                    marginBottom: -8,
                                    opacity:
                                      sorting.key === header &&
                                      sorting.direction === "asc"
                                        ? 1
                                        : 0.3,
                                  }}
                                />
                                <ArrowDropDownIcon
                                  style={{
                                    fontSize: "24px",
                                    marginTop: -8,
                                    opacity:
                                      sorting.key === header &&
                                      sorting.direction === "desc"
                                        ? 1
                                        : 0.3,
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            camelCaseToTitleCase(header)
                          )}
                        </StyledTableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, rowIndex) => (
                  <StyledTableRow
                    key={rowIndex}
                    index={rowIndex}
                    onClick={(event) => handleRowClick(event, row)}
                    additionalrowstyles={additionalRowStyles}
                  >
                    {headers.map((header, colIndex) => (
                      <>
                        {header !== "id" && (
                          <>
                            {typeof row[header] === "object" &&
                            row[header]?.customfield ? (
                              <StyledTableBodyCell
                                key={header}
                                onClick={(event) =>
                                  handleCellClick(
                                    event,
                                    row,
                                    rowIndex,
                                    colIndex
                                  )
                                }
                                additionalcellstyles={
                                  pointerColumnIndex.includes(colIndex)
                                    ? `cursor:pointer;`
                                    : `cursor:default;`
                                }
                              >
                                {row[header]?.typeText === "htmlString" && (
                                  <HtmlContent html={row[header].value} />
                                )}
                                {row[header]?.typeText === "status" && (
                                  <StatusComponent
                                    status={row[header].value}
                                    handleOnViewDetails={(e) =>
                                      onStatusClick(e, row[header])
                                    }
                                  />
                                )}
                              </StyledTableBodyCell>
                            ) : (
                              <StyledTableBodyCell
                                key={header}
                                onClick={(event) =>
                                  handleCellClick(
                                    event,
                                    row,
                                    rowIndex,
                                    colIndex
                                  )
                                }
                                additionalcellstyles={
                                  pointerColumnIndex.includes(colIndex)
                                    ? `cursor:pointer;`
                                    : `cursor:default;`
                                }
                              >
                                {row[header]}
                              </StyledTableBodyCell>
                            )}
                          </>
                        )}
                      </>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>
      ) : (
        <>{isDataNotFoundShow ? <div>{noDataFoundText}</div> : null}</>
      )}
    </>
  );
};

export default TableComponent;
