# hacker-news-tracker

Make an app that can help me track relevant stories of a given week from hacker news using the algolia API. 

For me relevant stories are ones that contain a mention of the following keywords codegen, code, llm. I want to potentially be able to edit these keywords

I want to be able to see the storeis rankes by number of votes, the title, the linked page

Here are some examples of how algolia HN API can be used: 

Examples
All stories matching foo
http://hn.algolia.com/api/v1/search?query=foo&tags=story
All comments matching bar
http://hn.algolia.com/api/v1/search?query=bar&tags=comment
All URLs matching bar
http://hn.algolia.com/api/v1/search?query=bar&restrictSearchableAttributes=url
All stories that are on the front/home page right now
http://hn.algolia.com/api/v1/search?tags=front_page
Last stories
http://hn.algolia.com/api/v1/search_by_date?tags=story
Last stories OR polls
http://hn.algolia.com/api/v1/search_by_date?tags=(story,poll)
Comments since timestamp X (in second)
http://hn.algolia.com/api/v1/search_by_date?tags=comment&numericFilters=created_at_i>X
Stories between timestamp X and timestamp Y (in second)
http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>X,created_at_i<Y
Stories of pg
http://hn.algolia.com/api/v1/search?tags=story,author_pg
Comments of story X
http://hn.algolia.com/api/v1/search?tags=comment,story_X




## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/hacker-news-tracker.git
cd hacker-news-tracker
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
