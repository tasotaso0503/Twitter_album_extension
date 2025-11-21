// frontend/src/lib/mock-data.tsfrontend/src/lib/mock-data.ts

// 開発用のモックデータとデータ取得関数
// 本来はここで fetch('http://localhost:8080/...') を行います

export interface Folder {
  id: string;
  name: string;
  tweetCount: number;
  createdAt: string;
}

export interface Tweet {
  id: string;
  folderId: string; // どのフォルダのツイートか識別用
  originalTweetId: string;
  authorName: string;
  content: string;
  postedAt: string;
  postUrl: string;
}

const MOCK_FOLDERS: Folder[] = [
  { id: "f1", name: "後で読む", tweetCount: 2, createdAt: "2025-11-01" },
  { id: "f2", name: "Python勉強用", tweetCount: 1, createdAt: "2025-11-05" },
  { id: "f3", name: "ネタ帳", tweetCount: 0, createdAt: "2025-11-10" },
  { id: "f4", name: "React/Next.js", tweetCount: 2, createdAt: "2025-11-15" },
];

const MOCK_TWEETS: Tweet[] = [
  // フォルダー f1 (後で読む) 用
  {
    id: "t1",
    folderId: "f1",
    originalTweetId: "1001",
    authorName: "遠藤@エンジニア",
    content: "Next.jsのServer Actions便利すぎる。APIルート書かなくていいのが革命的。",
    postedAt: "2025-11-20T10:00:00Z",
    postUrl: "https://twitter.com",
  },
  {
    id: "t2",
    folderId: "f1",
    originalTweetId: "1002",
    authorName: "Tech News JP",
    content: "2025年のWeb開発トレンドまとめ。Rust製のツールチェーンが完全に標準化しました。",
    postedAt: "2025-11-19T15:30:00Z",
    postUrl: "https://twitter.com",
  },

  // フォルダー f2 (Python勉強用) 用
  {
    id: "t3",
    folderId: "f2",
    originalTweetId: "1003",
    authorName: "Python Daily",
    content: "List comprehension is a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence.",
    postedAt: "2025-11-18T09:00:00Z",
    postUrl: "https://twitter.com",
  },

  // フォルダー f4 (React/Next.js) 用
  {
    id: "t4",
    folderId: "f4",
    originalTweetId: "1004",
    authorName: "Vercel",
    content: "Developing with Next.js gives you the best developer experience with all the features you need for production.",
    postedAt: "2025-11-19T15:30:00Z",
    postUrl: "https://twitter.com",
  },
  {
    id: "t5",
    folderId: "f4",
    originalTweetId: "1005",
    authorName: "React Team",
    content: "React 19 is now available in RC. Try out the new hooks and compiler optimizations.",
    postedAt: "2025-11-10T12:00:00Z",
    postUrl: "https://twitter.com",
  },
];

// サーバーコンポーネントから呼ぶことを想定した非同期関数
export async function getFolders(): Promise<Folder[]> {
  // 擬似的な遅延
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_FOLDERS;
}

export async function getTweets(folderId: string): Promise<Tweet[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 指定された folderId に一致するツイートだけを返す
  return MOCK_TWEETS.filter(tweet => tweet.folderId === folderId);
}