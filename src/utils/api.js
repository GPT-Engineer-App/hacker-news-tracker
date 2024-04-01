import { useState, useEffect } from "react";

export const useFetchStories = (keywords, selectedWeeks) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          query: keywords.join(" "),
          tags: "story",
        });

        const response = await fetch(`https://hn.algolia.com/api/v1/search?${queryParams}`);
        const data = await response.json();
        setStories(data.hits);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [keywords, selectedWeeks]);

  return { stories, loading, error };
};
