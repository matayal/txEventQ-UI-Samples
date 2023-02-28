import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../Component/Table";
import Pagination from "../Component/Pagination";

const ViewSubscriberTable = ({ subscriberData, loading }) => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  var subsCurrentRecords;
  if (subscriberData) {
    subsCurrentRecords = subscriberData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
  }
  var nPages;
  if (
    subscriberData &&
    subscriberData !== undefined &&
    subscriberData !== null
  ) {
    nPages = Math.ceil(subscriberData.length / recordsPerPage);
  }

  //loading and header
  const [header, setHeader] = useState([
    { title: "Sr. no.", accessor: "index" },
    { title: "Subscriber Name", accessor: "consumer_group_id" },
    { title: "Topic Name", accessor: "topic" },
    { title: "Kind", accessor: "kind" },
    { title: "State", accessor: "state" },
  ]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {header.map((state, index) => (
                <StyledTableCell key={state.title} scope="col">
                  {state.title}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center" size="large">
                  <Card
                    bg="Secondary"
                    className="text-center shadow-lg p-3 mb-5 bg-white rounded"
                    sx={{ minWidth: 700 }}
                  >
                    <CardContent>
                      <Spinner animation="border" variant="primary" />
                    </CardContent>
                  </Card>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              subscriberData &&
              subscriberData !== undefined &&
              subscriberData !== null &&
              subscriberData.length > 0 && (
                <>
                  {subsCurrentRecords.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell key="SrNo.">{index + 1}</StyledTableCell>
                      <StyledTableCell key={item.consumer_group_id}>
                        {item.consumer_group_id}
                      </StyledTableCell>
                      <StyledTableCell key={item.topic}>
                        {item.topic}
                      </StyledTableCell>
                      <StyledTableCell key={item.kind}>
                        {item.kind}
                      </StyledTableCell>
                      <StyledTableCell key={item.state}>
                        {item.state}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              )}
            {!loading &&
              subscriberData &&
              subscriberData !== undefined &&
              subscriberData !== null &&
              subscriberData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" size="large">
                    <Card
                      bg="Secondary"
                      className="text-center shadow-lg p-3 mb-5 bg-white rounded"
                      sx={{ minWidth: 700 }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                          No records found!!!
                        </Typography>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading &&
        subscriberData &&
        subscriberData !== undefined &&
        subscriberData !== null &&
        subscriberData.length > recordsPerPage && (
          <div>
            <br />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
    </div>
  );
};

export default ViewSubscriberTable;
