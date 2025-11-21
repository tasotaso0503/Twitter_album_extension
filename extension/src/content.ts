// ページの読み込み完了後に実行されます
console.log("🚀 Twitter Bookmark Manager: Extension Loaded!!!!!!");

// 状態管理用の変数
let currentUrl = window.location.href;
let hasLogged = false; // そのページで既にログを出したかどうかのフラグ

function isPostDetailPage(): boolean {
  // URLに "/status/" が含まれていれば詳細ページとみなす
  return window.location.pathname.includes("/status/");
}

// ツイート情報を抽出する関数
function extractTweetData() {
  // ツイート全体を囲む要素を取得
  const article = document.querySelector('article[data-testid="tweet"]');
  if (!article) return null;

  // 1. 投稿者の名前
  // data-testid="User-Name" の中には名前、ID(@xxx)、バッジなどが含まれます。
  const userNameElement = article.querySelector('div[data-testid="User-Name"]');
  const rawAuthorName = userNameElement?.textContent || "不明";
  const authorName = rawAuthorName.split('@')[0].trim();

  // 2. ツイート内容
  const textElement = article.querySelector('div[data-testid="tweetText"]');
  const postContent = textElement?.textContent || "";

  // 3. 投稿日時
  // timeタグの datetime 属性に ISO形式の日付が入っています
  const timeElement = article.querySelector('time');
  const postedAt = timeElement?.getAttribute('datetime') || "";

  // 4. ツイートのURL
  const postUrl = window.location.href;

  return {
    authorName,
    postContent,
    postedAt,
    postUrl
  };
}

async function api(): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/api/health");
    if (!response.ok) {
      console.log("エラーが発生しました");
      return false;
    }
    const data = await response.json();
    console.log("API Response:", data);
    return true;
  } catch (error) {
    console.error("API Request Error:", error);
    return false;
  }
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
    // フラグをリセット
    hasLogged = true;
    console.log("✅ 今、ツイート詳細ページを見ています！");
    console.log(`現在のURL: ${window.location.href}`);

    // データを抽出してコンソールに出力
    const tweetData = extractTweetData();
    if (tweetData) {
        console.log("📊 取得したツイートデータ:", tweetData);
    } else {
        console.warn("⚠️ ツイートデータの取得に失敗しました");
    }

    const response = await api()
  }
});

// 監視を開始 (document.body が null の可能性を考慮する場合は ? をつけるかチェックを入れる)
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}