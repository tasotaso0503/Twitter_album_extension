Twitter拡張機能

◯セットアップ手順
必要なenvファイルを作成し、
frontend/
の階層で
npm run dev 
コマンド


backend/
の階層で
source .venv/bin/activate
で仮想環境を有効化。その後
uvicorn app:app --reload