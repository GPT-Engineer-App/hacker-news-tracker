import React from "react";
import { Box, Heading, Input, Checkbox, Stack } from "@chakra-ui/react";

const Config = ({ keywords, onKeywordsChange, selectedWeeks, onWeekChange }) => {
  const weeks = [
    { label: "Current Week", value: 0 },
    { label: "Last Week", value: 1 },
    { label: "2 Weeks Ago", value: 2 },
    { label: "3 Weeks Ago", value: 3 },
    { label: "4 Weeks Ago", value: 4 },
  ];

  return (
    <Box marginBottom="20px">
      <Heading as="h2" size="md" marginBottom="10px">
        Configuration
      </Heading>
      <Input value={keywords} onChange={onKeywordsChange} placeholder="Enter keywords (comma-separated)" marginBottom="10px" />
      <Stack spacing={2}>
        {weeks.map((week) => (
          <Checkbox key={week.value} isChecked={selectedWeeks.includes(week.value)} onChange={() => onWeekChange(week.value)}>
            {week.label}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};

export default Config;
