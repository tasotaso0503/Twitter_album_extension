// frontend/src/app/folders/page.tsx

import { getFolders } from "@/lib/mock-data";
import { FolderGrid } from "@/components/folder-grid";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default async function FoldersPage() {
  // サーバーサイドでデータを取得
  const folders = await getFolders();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            📂 My Folders
          </h1>
          <Button variant="ghost" size="sm" asChild className="text-slate-600">
            <Link href="/">
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Link>
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">フォルダー一覧</h2>
          {/* 新規作成ボタンなどはここに追加 */}
        </div>

        {/* クライアントコンポーネントにデータを渡す */}
        <FolderGrid initialFolders={folders} />
      </main>
    </div>
  );
}