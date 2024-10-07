---
title: uvのセットアップ
description: uvのセットアップ
sidebar:
  label: uvのセットアップ
  order: 0
---

## はじめに

uvは、Pythonのバージョン管理とパッケージ管理のための高速なツールです。2024年8月の更新により、Python自体のバージョン管理も可能になりました。本ガイドでは、uvを使用してPython環境を構築する方法を説明します。

## インストール方法

### macOS または Linux

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows

```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

インストール成功の確認：ターミナルで`uv`と入力し、使用方法が表示されることを確認します。

## プロジェクトの作成/プロジェクトへの導入

1. 新しいプロジェクトの作成：

   ```bash
   uv init [プロジェクト名]
   ```

   これにより、README.md、hello.py、pyproject.toml、.python-versionファイルが作成されます。

2. Pythonバージョンの指定：

   ```bash
   uv python pin 3.12
   ```

   （バージョンは必要に応じて変更してください）

3. 環境のセットアップ：

   ```bash
   uv sync
   ```

## パッケージのインストール方法

- パッケージのインストール：

  ```bash
  uv add [パッケージ名]
  ```

- パッケージの削除：

  ```bash
  uv remove [パッケージ名]
  ```

- 依存関係の表示：

  ```bash
  uv tree
  ```

## コードの実行方法

1. uvを使用して直接実行：

   ```bash
   uv run python [ファイル名]
   ```

2. 特定のPythonバージョンで実行：

   ```bash
   uv run --python 3.11 python [ファイル名]
   ```

3. 仮想環境の有効化（従来の方法）：

   ```bash
   . .venv/bin/activate
   python [ファイル名]
   ```

## Visual Studio Codeでの使用

1. コマンドパレットを開く（Command + Shift + P）
2. "Python: Select Interpreter" を選択
3. `./.venv/bin/python` のパスを選択

## ツールのインストール方法

Python共通のツール（例：ruff）のインストール：

```bash
uv tool install [ツール名]
```

## 既存プロジェクトのuvへの移行

1. `uv init` を実行
2. 必要なパッケージを `pyproject.toml` に追記または `uv add` でインストール
3. `uv sync` で環境を同期

Poetry や Rye からの移行の場合、既存の `pyproject.toml` があれば `uv sync` のみで開始可能です。

## 注意点

- uvでは `pip` コマンドの代わりに `uv` コマンドを使用します。
- pip互換のコマンドとして `uv pip` も利用可能です（例：`uv pip install [パッケージ名]`）

uvは高速で効率的なパッケージ管理を提供し、他の環境構築ツールとの互換性も高いため、多くのPythonプロジェクトで採用することができます。
