---
title: Pythonプログラムのパッケージ化
description: uvを使用してFileHandlerクラスを含むPythonパッケージを作成し、構造化する手順を説明します。
sidebar:
  label: パッケージ化
  order: 3
---

このガイドでは、uvを使用してFileHandlerクラスを含むPythonパッケージを作成する手順を説明します。

## 前提条件

- uvがインストールされていること
- 基本的なPythonの知識があること

## 1. プロジェクトの初期化

新しいプロジェクトディレクトリを作成し、uvを使用して初期化します。

```bash
uv init file_handler_package
cd file_handler_package
```

必要なパッケージをインストールします。

```bash
uv add --dev hatching pytest
```

## 2. 仮想環境の作成

プロジェクト用の仮想環境を作成します。

```bash
. .venv/bin/activate  # Unix系の場合
# または
.venv\Scripts\activate.bat  # Windowsの場合
```

## 3. プロジェクト構造の設定

以下のようなプロジェクト構造を作成してください。

```txt
file_handler_package/
│
├── src/
│   └── file_handler/
│       ├── __init__.py
│       └── handler.py
│
├── tests/
│   └── test_handler.py
│
├── pyproject.toml
└── README.md
```

コマンドで作成する場合は下記コマンドを実行してください。

```bash
mkdir -p src/file_handler tests
touch src/file_handler/__init__.py src/file_handler/handler.py tests/test_handler.py README.md
```

## 4. pyproject.tomlの設定

`pyproject.toml`ファイルを編集して、プロジェクトの情報を設定します：

```toml
[project]
name = "file_handler"
version = "0.1.0"
description = "A simple file handling package"
authors = [
  {name = "Your Name", email = "your.email@example.com"},
]
dependencies = []

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src/file_handler"]


[tool.uv]
dev-dependencies = [
  "hatching>=0.0.1",
  "pytest>=8.3.3",
]
```

## 5. パッケージコードの作成

`src/file_handler/handler.py`にFileHandlerクラスを作成します：

```python
class FileHandler:
    def __init__(self, filename):
        self.filename = filename

    def write_file(self, content):
        try:
            with open(self.filename, 'w') as file:
                file.write(content)
            return f"Successfully wrote to '{self.filename}'."
        except Exception as e:
            return f"Error: {str(e)}"

    def read_file(self):
        try:
            with open(self.filename, 'r') as file:
                content = file.read()
            return content
        except FileNotFoundError:
            return f"Error: File '{self.filename}' not found."
        except Exception as e:
            return f"Error: {str(e)}"

    def append_file(self, content):
        try:
            with open(self.filename, 'a') as file:
                file.write(content)
            return f"Successfully appended to '{self.filename}'."
        except Exception as e:
            return f"Error: {str(e)}"
```

`src/file_handler/__init__.py`にインポート文を追加します：

```python
from .handler import FileHandler
```

## 6. テストの作成

`tests/test_handler.py`にテストを追加します：

```python
import pytest
from file_handler import FileHandler
import os

@pytest.fixture
def temp_file(tmp_path):
    return tmp_path / "test_file.txt"

def test_write_file(temp_file):
    handler = FileHandler(str(temp_file))
    result = handler.write_file("Hello, World!")
    assert result == f"Successfully wrote to '{temp_file}'"
    assert temp_file.read_text() == "Hello, World!"

def test_read_file(temp_file):
    temp_file.write_text("Hello, World!")
    handler = FileHandler(str(temp_file))
    assert handler.read_file() == "Hello, World!"

def test_append_file(temp_file):
    temp_file.write_text("Hello, ")
    handler = FileHandler(str(temp_file))
    result = handler.append_file("World!")
    assert result == f"Successfully appended to '{temp_file}'"
    assert temp_file.read_text() == "Hello, World!"

def test_read_nonexistent_file():
    handler = FileHandler("nonexistent.txt")
    assert "Error: File 'nonexistent.txt' not found." in handler.read_file()
```

## 7. テストの実行

テストを実行して、パッケージが正しく動作することを確認します：

```bash
pytest
```

## 8. パッケージのビルド

パッケージをビルドします：

```bash
uv run hatchling build
```

これにより、`dist/`ディレクトリにパッケージのdistributionファイルが作成されます。

## 9. ローカルでのインストールテスト

作成したパッケージをローカルでインストールしてテストします：

```bash
uv add ./dist/file_handler-0.1.0-py3-none-any.whl
```

## まとめ

以上の手順で、uvを使用してFileHandlerクラスを含むPythonパッケージを作成し、構造化することができました。このパッケージはnowPyPIにアップロードしたり、他のプロジェクトで使用したりすることができます。

uvを使用することで、依存関係の管理や仮想環境の作成が簡単になり、効率的にパッケージ開発を行うことができます。FileHandlerクラスのような実用的な例を通じて、パッケージの作成から、テスト、ビルド、そしてローカルでのインストールまでの一連の流れを学ぶことができました。
