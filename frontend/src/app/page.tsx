// frontend/src/app/page.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Bookmark className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Twitter Bookmark Manager
          </CardTitle>
          <CardDescription>
            散らばったブックマークを、フォルダで整理しよう。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6">
              <Link href="/folders">
                Googleでログインして始める
              </Link>
            </Button>
            <p className="text-xs text-center text-slate-500 mt-4">
              ※現在はデモモードのため、認証なしで利用できます
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}