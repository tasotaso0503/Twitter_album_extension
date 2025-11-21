// frontend/src/app/folders/[folderId]/page.tsx

import { getFolders, getTweets } from "@/lib/mock-data";
import { TweetList } from "@/components/tweet-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ folderId: string }>;
}

export default async function FolderDetailPage({ params }: PageProps) {
  const { folderId } = await params;

  // 並行データフェッチ
  const foldersData = getFolders();
  const tweetsData = getTweets(folderId);

  const [folders, tweets] = await Promise.all([foldersData, tweetsData]);

  // 現在のフォルダー名を特定 (本来はAPIで詳細を取得)
  const currentFolder = folders.find(f => f.id === folderId);
  const folderName = currentFolder?.name || "フォルダー";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="-ml-2 text-slate-600">
            <Link href="/folders">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-slate-800 truncate">
            {folderName}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <TweetList initialTweets={tweets} />
      </main>
    </div>
  );
}