---
title: SSHキーの作成
description: SSHキーの作成方法について解説しています。
sidebar:
  label: SSHキー
  order: 1
---


以下は、SSHキーの作成からGitHub (GitLab) アカウントへの登録までの手順です。

## 新しいSSHキーの作成

1. WSLのUbuntuを起動します。

2. 以下のコマンドを実行して、新しいSSHキーを作成します。`your@email.com`の部分は、GitHubに登録しているメールアドレスに置き換えてください。

   ```bash
   ssh-keygen -t ed25519 -C "your@email.com"
   ```

3. SSHキーの保存先を聞かれるので、特に変更する必要がなければ、そのまま`Enter`を押します。

   ```bash
   Enter file in which to save the key (/home/you/.ssh/id_ed25519): [Press enter]
   ```

4. パスフレーズの入力を求められるので、安全なパスフレーズを入力します。

   ```bash
   Enter passphrase (empty for no passphrase): [Type a passphrase]
   Enter same passphrase again: [Type passphrase again]
   ```

これで、SSHキーの作成が完了しました。

## GitHubアカウントへのSSHキーの登録

1. 以下のコマンドを実行して、`~/.ssh/id_ed25519.pub`の内容をクリップボードにコピーします。

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. GitHubにログインし、右上のプロフィールをクリックして、設定画面に遷移します。

3. 左のメニューから`SSH and GPG keys`をクリックします。

4. `New SSH Key`をクリックします。

5. `Title`に識別できる文字列を入力します。`Key Type`は"Authentication Key"を選択し、`Key`に先ほどクリップボードにコピーしたSSHキーをペーストします。

6. `Add SSH Key`をクリックして、SSHキーを登録します。

## GitLabアカウントへのSSHキーの登録

UIの説明は日本語化されていることを前提としています。

1. 以下のコマンドを実行して、`~/.ssh/id_ed25519.pub`の内容をクリップボードにコピーします。

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. GitLabにログインし、右上のプロフィールをクリックして、設定画面に遷移します。

3. 左のメニューから`SSHキー`をクリックします。

4. `新しいキーを追加`をクリックします。

5. `タイトル`に識別できる文字列を入力します。`使用タイプ`は"認証と署名"を選択し、`キー`に先ほどクリップボードにコピーしたSSHキーをペーストします。有効期限はの設定は任意でよいですが、自分のPCであれば設定しなくても構いません。

6. `キーを追加`をクリックして、SSHキーを登録します。

## 確認

1. ターミナル上で以下のコマンドをそれぞれ入力します。

   ```bash
   ssh -T git@github.com
   ```

   ```bash
   ssh -T git@gitlab.com
   ```

2. 以下のようなメッセージが表示されたら、GitHub's SSH key fingerprintsに記述されているfingerprintsと一致することを確認してから、`yes`と入力します。

   ```bash
   The authenticity of host 'github.com (207.97.227.239)' can't be established.
   RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
   Are you sure you want to continue connecting (yes/no)?
   ```

3. 以下のようなメッセージが表示されれば、SSHキーの登録が成功しています。

   ```bash
   Hi username! You've successfully authenticated, but GitHub does not
   provide shell access.
   ```

これで、GitHub・GitLabアカウントにSSHキーが登録され、`git@`を使用してアクセスできるようになりました。

以上が、SSHキーの作成とGitHub・GitLabアカウントへの登録手順です。
