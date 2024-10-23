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

下記のようなエラーが出た場合は、`pyproject.toml`の`requires-python`を`>= 3.11`に修正して保存してください。

```txt
error: The requested Python version `3.11` is incompatible with the project `requires-python` value of `>=3.12`.
```

保存後に再度バージョン指定を行うと、`.python-version`が正常に更新されます。

## 3. 環境のセットアップ

指定したPythonバージョンをインストールし、仮想環境をセットアップします。

```bash
uv sync
```

プロジェクトルートに`.venv`ディレクトリが作成されました。`.venv/bin`にはPythonや仮想環境の実行ファイルが、`.venv/lib`にはインストールしたパッケージの実体などが入ります。

ここから、実際に使用するパッケージをインストールしていきます。

## 4. パッケージのインストール

例として、データ分析によく使われる`pandas`をインストールしてみましょう。

```bash
uv add pandas
```

`.venv/lib/python3.11/site-packages`配下に、pandasやその依存関係であるnumpyなどが追加されます。

## 5. 開発ツールのインストール

Pythonのコードフォーマッターであるruffをインストールします。

```bash
uv tool install ruff
```

ruffを実行する際は、次のコマンドを実行します。

```bash
ruff check
```

プロジェクトの`.py`ファイルの記法に問題がなかった場合、以下のようなログが出ます。

```txt
All checks passed!
```

一方で、誤った記法のファイルがあった場合、エラーログが表示されます。以下は`hello.py`に、初期化子を設定していない変数`wrong_notation`を記述した際のエラーです。

```txt
hello.py:8:18: SyntaxError: Expected an expression
  |
6 |     main()
7 | 
8 | wrong_notation = 
  |                  ^
  |

Found 1 error.
```

## 6. Pythonファイルの作成と編集

サンプルのPythonファイルを`sample.py`という名前で作成し、編集します。

```py
import pandas as pd

df: pd.DataFrame = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
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
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.11"
dependencies = [
  "pandas>=2.2.3",
]

[tool.uv]
dev-dependencies = [
  "ruff>=0.7.0",
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
