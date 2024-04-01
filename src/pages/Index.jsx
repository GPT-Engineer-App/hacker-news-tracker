import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Text, Link, Grid, Spinner } from "@chakra-ui/react";
import Config from "../components/Config";

const API_URL = "https://hn.algolia.com/api/v1/search?tags=story";

const Index = () => {
  const [keywords, setKeywords] = useState("codegen, code, llm");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState([0]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    const keywordList = keywords.split(",").map((keyword) => keyword.trim());
    const currentDate = new Date();
    const requests = keywordList.flatMap((keyword) =>
      selectedWeeks.map((week) => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const startTimestamp = currentTimestamp - week * 7 * 24 * 60 * 60;
        const endTimestamp = startTimestamp + 7 * 24 * 60 * 60;
        return fetch(`${API_URL}&query=${encodeURIComponent(keyword)}&numericFilters=created_at_i>=${startTimestamp},created_at_i<=${endTimestamp}`);
      }),
    );

    try {
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));
      const mergedStories = data.flatMap((result) => result.hits);
      const uniqueStories = mergedStories.filter((story, index, self) => index === self.findIndex((s) => s.objectID === story.objectID));
      const sortedStories = uniqueStories.sort((a, b) => b.points - a.points);
      setStories(sortedStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }

    setLoading(false);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleSearch = () => {
    fetchStories();
  };

  const handleWeekChange = (week) => {
    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px">
      <Heading as="h1" size="xl" marginBottom="20px">
        Hacker News Story Tracker
      </Heading>
      <Config keywords={keywords} onKeywordsChange={handleKeywordsChange} selectedWeeks={selectedWeeks} onWeekChange={handleWeekChange} />
      <Button onClick={handleSearch} colorScheme="blue" marginBottom="20px">
        Search
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <Grid templateColumns="1fr" gap={6}>
          {stories.map((story) => (
            <Box key={story.objectID} borderWidth="1px" borderRadius="md" padding="10px">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Link href={story.url} isExternal>
                  <Heading as="h2" size="md">
                    {story.title}
                  </Heading>
                </Link>
                <Box display="flex" alignItems="center">
                  <Text marginRight="10px">Points: {story.points}</Text>
                  <Text>Comments: {story.num_comments}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Index;
