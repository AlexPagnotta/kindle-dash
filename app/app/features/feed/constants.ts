export type RssFeedItem = {
  name: string;
  url: string;
};

export const RSS_FEEDS: RssFeedItem[] = [
  {
    name: "The Verge",
    url: "http://theverge.com/rss/index.xml",
  },
  {
    name: "CNN",
    url: "http://rss.cnn.com/rss/cnn_topstories.rssd",
  },
];
