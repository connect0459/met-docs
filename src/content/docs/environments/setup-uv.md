---
title: uvのセットアップ
description: uvのインストールと初期設定の詳細ガイド
sidebar:
  label: uv
  order: 4
---

uvは、Pythonのバージョン管理とパッケージ管理のための高速なツールです。このガイドでは、uvをセットアップする方法を詳しく説明します。

## uvとは

uvは、Astral社が開発した新しいPythonツールで、以下の特徴があります：

- 高速なパッケージインストールと依存関係解決
- Pythonのバージョン管理機能（2024年8月のアップデートで追加）
- pip、venv、poetryなど他のツールとの高い互換性

## インストール方法

お使いのOSに応じて、以下の手順に従ってください。

### macOS または Linux の場合

1. ターミナルを開きます。
2. 以下のコマンドをコピーしてターミナルに貼り付け、Enterキーを押します：

   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

### Windows の場合

1. PowerShellを管理者権限で開きます。
2. 以下のコマンドをコピーしてPowerShellに貼り付け、Enterキーを押します：

   ```bash
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

## インストールの確認

インストールが成功したかどうかを確認するには：

1. 新しいターミナルウィンドウまたはPowerShellウィンドウを開きます。
2. 以下のコマンドを入力し、Enterキーを押します：

   ```bash
   uv --version
   ```

3. uvのバージョン情報が表示されれば、インストールは成功です。

## トラブルシューティング

インストールに問題がある場合：

1. インターネット接続を確認してください。
2. ファイアウォールやアンチウイルスソフトが妨げていないか確認してください。
3. 管理者権限でインストールを試みてください。
4. 公式のuvドキュメント（<https://github.com/astral-sh/uv）を参照してください。>
