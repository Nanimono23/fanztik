import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0'; // すべてのネットワークインターフェイスでリスン

// __dirnameを定義
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// JSONファイルを提供するルートを追加
app.get('/videos.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'videos.json'));
});

// ビルド済みの静的ファイルを提供する設定を追加
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, host, () => {
  console.log(`Server running on port ${port}`);
});
