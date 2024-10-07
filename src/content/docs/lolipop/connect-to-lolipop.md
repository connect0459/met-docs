---
title: サーバーに接続する方法
description: 接続方法の解説
sidebar:
  label: 接続方法
  order: 2
---

## コンソール画面

<https://user.lolipop.jp/> からログインします。「独自ドメイン」タブを選択し、ドメインとパスワードを入力してください。

## FTP接続

ここではWinSCPをインストールして接続設定を行う手順を示します。

1. WinSCPをダウンロードしてインストールします。公式サイト(<https://winscp.net/eng/download.php>)からインストーラをダウンロードできます。

2. WinSCPを起動し、新しいセッションを作成します。

3. 以下の情報を入力します。
   - ホスト名：コンソール画面から取得したFTPホスト名
   - ユーザー名：コンソール画面から取得したFTPユーザー名
   - パスワード：コンソール画面から取得したFTPパスワード
   - プロトコル：FTP

4. 「保存」ボタンをクリックして、セッションを保存します。

5. 保存したセッションを選択し、「ログイン」ボタンをクリックしてサーバーに接続します。

## SSH接続

セキュリティの観点から、GitHubとサーバーを連携させるためにサーバーのssh-agentに鍵を置いておくことは推奨されていません。そこで、「エージェント転送機能」と呼ばれるものを使って、鍵はローカルで保管し、ローカルからその鍵を使ってGitHubとサーバーで情報のやり取りをさせることができます。ここでは、`SSH`セクションに沿ってセットアップしたことを前提として説明しています。

### 1. `~/.ssh/config`を編集する

`vim ~/.ssh/config`で設定ファイルを開き、以下を記述してください。Lolipop用の具体的な設定はコンソール画面から取得してください。

```vim
# GitHub用の設定
Host github.com
  HostName     github.com
  User         git
  IdentityFile ~/.ssh/id_ed25519

# Lolipop用の設定
Host lolipop
  HostName     <サーバー>
  Port         <接続ポート>
  User         <アカウント>
  IdentityFile ~/.ssh/id_ed25519
```

### 2. サーバーにSSHでログイン

次のコマンドを実行してSSH接続を行います。

```bash
ssh lolipop
```

### 3. サーバー上で`~/.ssh/config`を編集

サーバーにSSH接続したら、`vim ~/.ssh/config`でconfigを開き、以下を記述します。

```vim
Host github
  HostName github.com
  Port 22
  User git
  ForwardAgent yes
```

※Lolipop用の設定に`ForwardAgent yes`を追加してください。ログイン時に`-A`オプションをつけるとエージェント転送機能が有効になります。

```bash
ssh -A lolipop
```

これで、サーバー上でGitHubと連携するための設定が完了しました。エージェント転送機能により、ローカルの鍵を使ってGitHubとの通信が行われます。
