import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BasicComponent from "./BasicComponent";
import AdvancedComponent from "./AdvancedComponent";
import ViewTopics from "../BasicComponent/ViewTopics";

export default function Home() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      className="p-3 mb-2 bg-light bg-gradient text-white-50 rounded-2"
      sx={{ width: "100%", typography: "body1" }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            className="p-3 mb-2 bg-secondary bg-gradient text-white-50 shadow-1-strong bg-opacity-10"
            onChange={handleChange}
            centered
          >
            <Tab label="Overview" value="1" />
            <Tab label="Basic Components" value="2" />
            <Tab label="Advanced Components" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ViewTopics />
        </TabPanel>
        <TabPanel value="2">
          <BasicComponent />
        </TabPanel>
        <TabPanel value="3">
          <AdvancedComponent />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
