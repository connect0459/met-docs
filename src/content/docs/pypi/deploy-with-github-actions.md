---
title: パッケージの自動公開を設定する
description: GitHub Actionsを使用してPythonパッケージをPyPIに自動的に公開する方法を説明します。
sidebar:
  label: 自動公開の設定
  order: 3
---

このガイドでは、GitHub Actionsを使用してPythonパッケージをPyPIに自動的に公開する方法を説明します。リリース作成時にトリガーされ、バージョン検証を行った後にデプロイするワークフローを設定します。

※このドキュメントはGitやCI/CDに精通した上級者向けの内容となるので、この手順は必要な方のみ参照してください。

## 前提条件

1. GitHubアカウントとリポジトリ
2. PyPIアカウントとAPIトークン
3. 正しく設定されたPythonプロジェクト（`pyproject.toml`、`__init__.py`など）

## 手順

### 1. PyPI APIトークンの設定

1. PyPIにログインし、APIトークンを生成します。
2. GitHubリポジトリの設定で、"Secrets and variables" > "Actions"に移動します。
3. "New repository secret"をクリックし、以下のように設定します：
   - Name: `PYPI_API_TOKEN`
   - Value: 生成したPyPI APIトークン

### 2. ワークフローファイルの作成

1. リポジトリに`.github/workflows`ディレクトリを作成します（存在しない場合）。
2. このディレクトリに`publish-to-pypi.yml`ファイルを作成し、以下の内容を記述します：

    ```yaml
    name: Publish Python Package to PyPI

    on:
      release:
        types: [created]

    # ここはプロジェクトの設定によって適宜変更する
    env:
      PYTHON_VERSION: '3.x'  # プロジェクトののPythonバージョン
      PACKAGE_NAME: 'your_package_name'  # プロジェクトのパッケージ名

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - name: Set up Python
          uses: actions/setup-python@v4
          with:
            python-version: ${{ env.PYTHON_VERSION }}
        - name: Install dependencies
          run: |
            python -m pip install --upgrade pip
            pip install build twine
        - name: Verify version consistency
          run: |
            # Extract version from tag
            TAG_VERSION=${GITHUB_REF#refs/tags/v}
            
            # Extract version from pyproject.toml
            PYPROJECT_VERSION=$(grep -m 1 'version = ' pyproject.toml | cut -d '"' -f2)
            
            # Extract version from __init__.py
            INIT_VERSION=$(grep -m 1 '__version__ = ' src/${{ env.PACKAGE_NAME }}/__init__.py | cut -d '"' -f2)
            
            # Compare versions
            if [ "$TAG_VERSION" != "$PYPROJECT_VERSION" ] || [ "$TAG_VERSION" != "$INIT_VERSION" ]; then
              echo "Version mismatch detected!"
              echo "Tag version: $TAG_VERSION"
              echo "pyproject.toml version: $PYPROJECT_VERSION"
              echo "__init__.py version: $INIT_VERSION"
              exit 1
            fi
            
            echo "Versions are consistent: $TAG_VERSION"
        - name: Build package
          run: python -m build
        - name: Publish package
          uses: pypa/gh-action-pypi-publish@27b31702a0e7fc50959f5ad993c78deac1bdfc29
          with:
            user: __token__
            password: ${{ secrets.PYPI_API_TOKEN }}
    ```

3. `your_package_name`を実際のパッケージ名に置き換えてください。

### 3. バージョン情報の管理

1. `pyproject.toml`ファイルにバージョン情報を記載します：

   ```toml
   [project]
   name = "your_package_name"
   version = "0.1.0"
   # その他の設定...
   ```

2. `src/your_package_name/__init__.py`ファイルにバージョン情報を記載します：

   ```python
   __version__ = "0.1.0"
   ```

### 4. リリースの作成とデプロイ

1. プロジェクトの変更をコミットし、GitHubにプッシュします。
2. GitHubリポジトリページで"Releases"セクションに移動します。
3. "Create a new release"をクリックします。
4. タグバージョンを入力します（例：`v0.1.0`）。
   - このタグバージョンは`pyproject.toml`と`__init__.py`のバージョンと一致する必要があります。
5. リリースのタイトルと説明を入力します。
6. "Publish release"をクリックします。

これでリリースが作成され、GitHub Actionsワークフローが自動的にトリガーされます。ワークフローは以下の手順を実行します：

1. バージョンの一貫性を検証
2. パッケージをビルド
3. PyPIに公開

### 5. デプロイの確認

1. GitHubリポジトリの"Actions"タブでワークフローの実行状況を確認できます。
2. ワークフローが成功したら、PyPIの公開ページ（<https://pypi.org/project/your_package_name/）を確認し、新しいバージョンが公開されていることを確認します。>

## トラブルシューティング

- GitHub Actionsでバージョンの不一致エラーが発生した場合は、`pyproject.toml`、`__init__.py`、およびGitタグのバージョンが一致していることを確認してください。
- PyPIへの公開に失敗した場合は、APIトークンが正しく設定されていることを確認してください。
- その他のエラーについては、GitHub Actionsの実行ログを確認し、エラーメッセージに基づいて対処してください。

以上の手順に従うことで、GitHub Actionsを使用してPythonパッケージを自動的にPyPIに公開することができます。この自動化により、リリースプロセスが簡素化され、人為的ミスを減らすことができます。
