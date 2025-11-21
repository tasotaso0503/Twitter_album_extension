// ページの読み込み完了後に実行されます
console.log("🚀 Twitter Bookmark Manager: Extension Loaded!!!!!!");

// 状態管理用の変数
let currentUrl = window.location.href;
let hasLogged = false; // そのページで既にログを出したかどうかのフラグ

function isPostDetailPage(): boolean {
  // URLに "/status/" が含まれていれば詳細ページとみなす
  return window.location.pathname.includes("/status/");
}

async function api(): Promise<boolean> {
  const response = await fetch("http://localhost:8080/api/health")
  if (!response.ok) {
    console.log("エラーが発生しました")
    return false
  }

  const data = await response.json()
  console.log(data)
  return true
}

// MutationObserverを使って「画面の変化」を監視する
const observer = new MutationObserver(async (mutations: MutationRecord[]) => {
  const newUrl = window.location.href;

  // URLが変わったかチェック
  if (newUrl !== currentUrl) {
    currentUrl = newUrl;
    hasLogged = false; // 新しいページに来たのでフラグをリセット
  }

  // 既にログを出したページなら、何もしない
  if (hasLogged) {
    return;
  }

  // 詳細ページじゃなかったら、何もせずに帰る
  if (!isPostDetailPage()) {
    return;
  }

  // 詳細ページにいる場合だけ、ポストを探す
  const post = document.querySelectorAll('article[data-testid="tweet"]');

  // post が存在する時だけログを出力する。
  if (post.length > 0) {
    hasLogged = true;
    console.log("✅ 今、ツイート詳細ページを見ています！");
    console.log(`現在のURL: ${window.location.href}`);

    const response = await api()
    // そのページで処理をしたらフラグをリセット
  }
});

// 監視を開始 (document.body が null の可能性を考慮する場合は ? をつけるかチェックを入れる)
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}