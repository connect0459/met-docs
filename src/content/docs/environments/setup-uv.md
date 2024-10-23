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

## アンインストール方法

uv環境が必要でない人に向けて、uvのアンインストール方法を説明します。

### macOS または Linux

```bash
sudo rm ~/.cargo/bin/uv
```

上記のパスにuvがなかった場合は、以下のコマンドを実行してuvの実行ファイルのパスを検索します。

```bash
which uv
```

### Windows

```powershell
# ユーザーフォルダの.uvディレクトリを削除
rmdir /s /q %LOCALAPPDATA%\uv

# 実行ファイルを削除
del %USERPROFILE%\.cargo\bin\uv.exe
```

上記のパスにuvがなかった場合は、以下のコマンドを実行してuvの実行ファイルのパスを検索します。

```bash
where.exe uv
```

### 注意点

1. uvをインストールした方法によって、実行ファイルの場所が異なる場合があります
2. 環境変数のPATHに追加した設定がある場合は、それも削除する必要があります
3. pipやcondaなど他のパッケージマネージャーで管理されているPythonパッケージには影響ありません

完全に削除したことを確認するには、以下のコマンドを実行してください：

```bash
# バージョン確認でコマンドが見つからないことを確認
uv --version
```

## トラブルシューティング

インストールに問題がある場合：

1. インターネット接続を確認してください。
2. ファイアウォールやアンチウイルスソフトが妨げていないか確認してください。
3. 管理者権限でインストールを試みてください。
4. 公式のuvドキュメント（<https://github.com/astral-sh/uv）を参照してください。>
