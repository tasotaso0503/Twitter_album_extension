"use client";

import { Folder } from "@/lib/mock-data";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder as FolderIcon, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface FolderGridProps {
  initialFolders: Folder[];
}

export function FolderGrid({ initialFolders }: FolderGridProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  // 新規作成用のステート
  const [newFolderName, setNewFolderName] = useState("");

  // 編集・削除用のステート
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  // フォルダー新規作成処理 (モック)
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    // 重複チェック
    if (folders.some(f => f.name === newFolderName)) {
      alert("同じ名前のフォルダーは既に存在します");
      return;
    }

    const newFolder: Folder = {
      id: `new-${Date.now()}`,
      name: newFolderName,
      tweetCount: 0,
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    setFolders([newFolder, ...folders]); // 先頭に追加
    setNewFolderName("");
  };

  // フォルダー削除処理 (モック)
  const handleDelete = (id: string) => {
    if (confirm("本当にこのフォルダーを削除しますか？")) {
      setFolders(folders.filter((f) => f.id !== id));
    }
  };

  // フォルダー編集処理 (モック)
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFolder) return;

    setFolders(folders.map(f => f.id === editingFolder.id ? editingFolder : f));
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* 新規作成エリア */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grid w-full gap-2">
            <Label htmlFor="new-folder-name" className="text-slate-600 font-medium">
              新しいフォルダーを作成
            </Label>
            <Input
              id="new-folder-name"
              placeholder="例: 技術記事まとめ、後で読む..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="bg-slate-50"
            />
          </div>
          <Button
            type="submit"
            disabled={!newFolderName.trim()}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            作成する
          </Button>
        </form>
      </div>

      {/* フォルダー一覧グリッド */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <Card key={folder.id} className="hover:shadow-md transition-shadow group relative bg-white border-slate-200">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <FolderIcon className="w-6 h-6 text-slate-500 group-hover:text-blue-600" />
                </div>

                {/* 編集メニュー (Dropdown) */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* relative z-10 を追加してリンクの上に表示させる */}
                    <Button variant="ghost" size="icon" className="relative z-10 h-8 w-8 -mr-2 text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setEditingFolder(folder); setIsEditDialogOpen(true); }}>
                      <Pencil className="w-4 h-4 mr-2" /> 名前を変更
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(folder.id)}
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> 削除する
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            {/* カード全体をリンクにする (z-0 で一番下に配置) */}
            <Link href={`/folders/${folder.id}`} className="absolute inset-0 z-0" />

            <CardContent>
              <CardTitle className="text-lg font-bold text-slate-900 truncate">
                {folder.name}
              </CardTitle>
            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-sm text-slate-500">
                {folder.tweetCount} 件のツイート
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>フォルダー名の変更</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">フォルダー名</Label>
                <Input
                  id="name"
                  value={editingFolder?.name || ""}
                  onChange={(e) => setEditingFolder(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">保存する</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}