export type RssFeedItem = {
  name: string;
  url: string;
};

export const RSS_FEEDS: RssFeedItem[] = [
  {
    name: "IlPost",
    url: "https://www.ilpost.it/feed",
  },
  {
    name: "HDBlog",
    url: "https://www.hdblog.it/feed",
  },
  {
    name: "Ansa",
    url: "https://www.ansa.it/sito/ansait_rss.xml",
  },
];
