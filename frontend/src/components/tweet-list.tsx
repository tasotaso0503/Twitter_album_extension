"use client";

import { Tweet } from "@/lib/mock-data";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2, User } from "lucide-react";

interface TweetListProps {
  initialTweets: Tweet[];
}

export function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);

  const handleDelete = (id: string) => {
    // 本来はAPIコールを行う
    setTweets(tweets.filter((t) => t.id !== id));
  };

  if (tweets.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>保存されたツイートはありません</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <Card key={tweet.id} className="bg-white border-slate-200 overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{tweet.authorName}</span>
                <span className="text-xs text-slate-500">
                  {new Date(tweet.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
              onClick={() => handleDelete(tweet.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap mb-3">
              {tweet.content}
            </p>

            {/* 元ツイートへのリンク */}
            <a
              href={tweet.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-600 hover:underline"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Twitterで見る
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}