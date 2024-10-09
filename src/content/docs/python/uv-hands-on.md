---
title: uvハンズオン
description: uvを使用してPythonプロジェクトを作成し、パッケージをインストールし、コードを実行するまでの手順を実践的に学びます。
sidebar:
  label: uvハンズオン
  order: 1
---

このハンズオンでは、uvを使用してPythonプロジェクトを作成し、パッケージやツールをインストールし、Pythonファイルを実行するまでの一連の流れを学習します。

## 1. プロジェクトの作成

まず、新しいプロジェクトを作成します。

```bash
uv init uv-hands-on
cd uv-hands-on
```

これにより、`uv-hands-on`というディレクトリが作成され、その中に移動します。

## 2. Pythonバージョンの指定

プロジェクトで使用するPythonのバージョンを指定します。今回は`3.11`を使用します。

```bash
uv python pin 3.11
```

## 3. 環境のセットアップ

指定したPythonバージョンをインストールし、仮想環境をセットアップします。

```bash
uv sync
```

## 4. パッケージのインストール

例として、データ分析によく使われる`pandas`をインストールしてみましょう。

```bash
uv add pandas
```

## 5. 開発ツールのインストール

Pythonのコードフォーマッターである`ruff`をインストールします。

```bash
uv tool install ruff
```

## 6. Pythonファイルの作成と編集

サンプルのPythonファイルを`sample.py`という名前で作成し、編集します。

```py
import pandas as pd

df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
print(df)
```

## 7. コードの実行

作成したPythonファイルを実行します。

```bash
uv run python sample.py
```

出力例：

```txt
   A  B
0  1  4
1  2  5
2  3  6
```

## 8. 仮想環境の有効化（オプション）

従来の方法で仮想環境を有効化する場合：

```bash
. .venv/bin/activate
```

これにより、プロンプトの先頭に`(.venv)`が表示されます。

仮想環境が有効化された状態で、通常のpythonコマンドを使用できます：

```bash
python sample.py
```

仮想環境を無効化するには：

```bash
deactivate
```

## 9. 依存関係の確認

インストールしたパッケージとその依存関係を確認します。

```bash
uv tree
```

これにより、`pandas`とその依存パッケージが表示されます。

## 10. pyproject.tomlの確認

エディタで`pyproject.toml`を開き、内容を確認します。`pandas`が`dependencies`に、`ruff`が`dev-dependencies`に追加されていることを確認できます。

```toml
[project]
name = "uv-hands-on"
version = "0.1.0"
dependencies = [
  "pandas",
]

[tool.uv]
dev-dependencies = [
  "ruff>=0.6.8",
]
```

## まとめ

このハンズオンを通じて、以下のuvの基本的な使い方を学びました：

1. プロジェクトの作成
2. Pythonバージョンの指定
3. 環境のセットアップ
4. パッケージのインストール
5. 開発ツールのインストール
6. Pythonファイルの実行
7. 仮想環境の有効化と無効化
8. 依存関係の確認
9. pyproject.tomlの構造

uvを使用することで、Pythonプロジェクトの管理が簡単かつ効率的になります。このハンズオンで学んだ基本を応用して、より複雑なプロジェクトにも取り組んでみてください。
