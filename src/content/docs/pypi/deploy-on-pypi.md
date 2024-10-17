---
title: パッケージを公開する
description: uvを使用して作成したPythonプロジェクトをPyPIに公開する手順を説明します。
sidebar:
  label: パッケージの公開
  order: 2
---

このガイドでは、uvを使用して作成したPythonプロジェクトをPyPIに公開する手順を説明します。PyPIのAPIトークンを既に取得していることを前提としています。

## 注意

この手順で登録すると、ほかのユーザーからもアカウントの閲覧や、公開パッケージのダウンロードが可能となります。手順のテストなどは、公式が公開しているテスト用サイト（<https://test.pypi.org/>）で行うことを推奨します。このドキュメントのリンクを適宜読み替えて実施してください。

また、セキュリティやインデックスの汚染などの観点から、必要に迫られない限りはパッケージの公開を行わないでください。

## 手順

### 1. プロジェクト情報の確認と編集

`pyproject.toml`ファイルを開き、必要な情報が正しく記載されているか確認します。特に、デプロイにはバージョン情報（`0.1.0`など）が必要ですので、セマンティックバージョニングに基づいてバージョンアップしてください。

```toml
[project]
name = "your-package-name"
version = "0.1.0"
description = "A brief description of your package"
authors = [
  {name = "Your Name", email = "your.email@example.com"},
]
dependencies = [
  "dependency1",
  "dependency2",
]

[project.urls]
Homepage = "https://github.com/yourusername/your-repo"
"Bug Tracker" = "https://github.com/yourusername/your-repo/issues"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

`src/<パッケージ名>/__init__.py`でバージョン情報を定義している場合は、`pyproject.toml`に記述したものを反映させてください。

```py
from .eddydata_preprocessor import EddyDataPreprocessor

__all__ = [
    "EddyDataPreprocessor",
]

__version__ = "0.1.0"
```

### 2. READMEファイルの作成

プロジェクトのルートディレクトリに`README.md`ファイルを作成し、パッケージの説明や使用方法を記述します。

### 3. パッケージのビルド

パッケージのビルドに必要なツールをインストールします。

```bash
uv add --dev hatchling
```

パッケージをビルドします。

```bash
uv run hatchling build
```

これにより、`dist`ディレクトリにビルドされたパッケージが作成されます。

### 4. PyPIへのアップロード

PyPIへのアップロードに使用する`twine`をインストールします。

```bash
uv add --dev twine
```

ビルドしたパッケージをPyPIにアップロードします。

```bash
uv run twine upload dist/*
```

プロンプトが表示されたら、PyPIのユーザー名とパスワード（またはAPIトークン）を入力します。

### 5. アップロードの確認とテスト

ブラウザでPyPIの公開ページ（<https://pypi.org/project/your-package-name/>）を開き、パッケージが正しくアップロードされたことを確認します。

別の環境を作成して、公開したパッケージをインストールしてテストします。

```bash
uv init pypi-test && cd pypi-test
uv add your-package-name
```

## まとめ

このガイドでは、以下の手順でuvプロジェクトをPyPIに公開する方法を学びました：

1. プロジェクトの準備
2. pyproject.tomlの確認と編集
3. READMEファイルの作成
4. ビルドツールのインストール
5. パッケージのビルド
6. Twineのインストール
7. PyPIへのアップロード
8. アップロードの確認
9. インストールのテスト

これらの手順に従うことで、uvを使用して作成したPythonプロジェクトを簡単にPyPIで公開し、他の開発者が利用できるようになります。
