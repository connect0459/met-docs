---
title: Gitのセットアップ
description: Gitのセットアップ
sidebar:
  label: Git
  order: 5
---

以下は、WSL内にGitをセットアップする手順です。

※2024年10月現在、研究でGitを使用することはないと思いますが、興味のある人向けに紹介しています。

## 前提条件

- WSL2とUbuntuがセットアップ済みであること。

## 手順

### 1. Gitのインストール

1. 以下のコマンドを実行して、パッケージリストを更新します。

     ```bash
     sudo apt update
     ```

2. 以下のコマンドを実行して、Gitをインストールします。

     ```bash
     sudo apt install git
     ```

3. インストールが完了したら、以下のコマンドを実行して、Gitのバージョンを確認します。

     ```bash
     git --version
     ```

### 2. Gitの初期設定

1. 以下のコマンドを実行して、ユーザー名を設定します。`"Your Name"`の部分を実際のユーザー名に置き換えてください。

     ```bash
     git config --global user.name "Your Name"
     ```

2. 以下のコマンドを実行して、メールアドレスを設定します。`"your@email.com"`の部分を実際のメールアドレスに置き換えてください。

     ```bash
     git config --global user.email "your@email.com"
     ```

3. 以下のコマンドを実行して、Gitの色付け出力を有効にします。

     ```bash
     git config --global color.ui auto
     ```

これで、WSL内にGitがセットアップされました。Gitのコマンドを使用して、リポジトリのクローン、変更の追跡、コミットの作成などを行うことができます。

## 追加のヒント

- `.gitconfig`ファイルを編集することで、Gitの設定を変更できます。`.gitconfig`ファイルは、ホームディレクトリ (`~/.gitconfig`) に存在します。
- Gitの基本的なワークフローは以下の通りです。
  1. `git clone`コマンドを使用して、リポジトリをクローンします。
  2. `git add`コマンドを使用して、変更をステージングエリアに追加します。
  3. `git commit`コマンドを使用して、ステージングエリアの変更をコミットします。
  4. `git push`コマンドを使用して、ローカルのコミットをリモートリポジトリにプッシュします。

参考リンク：

- [Git - 公式サイト](https://git-scm.com/)
- [Git - ドキュメント](https://git-scm.com/doc)

以上が、WSL内へのGitのセットアップ手順です。これにより、WSL内でGitを使用したバージョン管理が可能になります。
