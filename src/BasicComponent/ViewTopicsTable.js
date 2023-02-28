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

const ViewTopicsTable = ({ topicData, subscriberData, loading }) => {
  const SubsPrinter = (topic_name) => {
    var array = [];
    if (subscriberData && typeof subscriberData.length !== "undefined") {
      for (var i = 0; i < subscriberData.length; i++) {
        if (topic_name === subscriberData[i].topic) {
          array.push(subscriberData[i].consumer_group_id);
        }
      }
    }
    return array.join(", ");
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  var topicCurrentRecords;
  if (topicData) {
    topicCurrentRecords = topicData.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );
  }
  var nPages;
  if (topicData && topicData !== undefined && topicData !== null) {
    nPages = Math.ceil(topicData.length / recordsPerPage);
  }
  //loading and header
  const [header, setHeader] = useState([
    { title: "Sr. no.", accessor: "index" },
    { title: "Topic Name", accessor: "topic_name" },
    { title: "Subscriber Name", accessor: "consumer_group_id" },
    { title: "Kind", accessor: "kind" },
    { title: "Partitions count", accessor: "partitions_count" },
    { title: "is_internal", accessor: "is_internal" },
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
              topicData &&
              topicData !== undefined &&
              topicData !== null &&
              topicData.length > 0 && (
                <>
                  {topicCurrentRecords.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell key="SrNo.">{index + 1}</StyledTableCell>
                      <StyledTableCell key={item.topic_name}>
                        {item.topic_name}
                      </StyledTableCell>
                      <StyledTableCell
                        key="subscriberName"
                        style={{
                          maxWidth: "100px",
                          wordWrap: "break-word",
                        }}
                      >
                        {SubsPrinter(item.topic_name)}
                      </StyledTableCell>
                      <StyledTableCell key={item.kind}>
                        {item.kind}
                      </StyledTableCell>
                      <StyledTableCell key={item.partitions_count}>
                        {item.partitions_count}
                      </StyledTableCell>
                      <StyledTableCell key={item.is_internal.toString()}>
                        {item.is_internal.toString()}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              )}
            {!loading &&
              topicData &&
              topicData !== undefined &&
              topicData !== null &&
              topicData.length === 0 && (
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
        topicData &&
        topicData !== undefined &&
        topicData !== null &&
        topicData.length > recordsPerPage && (
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

export default ViewTopicsTable;
