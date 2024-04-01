import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, Text, Link, VStack, HStack, Divider, Spinner } from "@chakra-ui/react";

const API_URL = "https://hn.algolia.com/api/v1/search?tags=story";

const Index = () => {
  const [keywords, setKeywords] = useState("codegen, code, llm");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    const keywordList = keywords.split(",").map((keyword) => keyword.trim());
    const requests = keywordList.map((keyword) => fetch(`${API_URL}&query=${encodeURIComponent(keyword)}`));

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

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px">
      <Heading as="h1" size="xl" marginBottom="20px">
        Hacker News Story Tracker
      </Heading>
      <HStack marginBottom="20px">
        <Input value={keywords} onChange={handleKeywordsChange} placeholder="Enter keywords (comma-separated)" flex="1" />
        <Button onClick={handleSearch} colorScheme="blue">
          Search
        </Button>
      </HStack>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing="20px" align="stretch">
          {stories.map((story) => (
            <Box key={story.objectID} borderWidth="1px" borderRadius="md" padding="20px">
              <Link href={story.url} isExternal>
                <Heading as="h2" size="md">
                  {story.title}
                </Heading>
              </Link>
              <Text>Points: {story.points}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Index;
