---
title: ssh-agentの設定
description: ssh-agentの設定を解説しています。
sidebar:
  label: ssh-agent
  order: 2
---

「ssh」コマンドの公開鍵認証で使用する鍵ファイルにパスフレーズが設定されているときは、使用するごとにパスフレーズを入力する必要があります。このパスフレーズの入力を省略することができます。以下は、`.bashrc`に追加することで、ssh-agentへの鍵登録を省略する方法です。

## 手順

1. `.bashrc`ファイルを開きます。

   ```bash
   vim ~/.bashrc
   ```

2. ファイルの最後に以下のコードを追加します。

   ```bash
   # ssh-agent
   if [ -z "$SSH_AUTH_SOCK" ]; then
      # Check for a currently running instance of the agent
      RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
      if [ "$RUNNING_AGENT" = "0" ]; then
           # Launch a new instance of the agent
           ssh-agent -s &> $HOME/.ssh/ssh-agent
      fi
      eval `cat $HOME/.ssh/ssh-agent`
   fi

   ssh-add $HOME/.ssh/id_ed25519
   ```

   このコードは以下の処理を行います。
   - `SSH_AUTH_SOCK`環境変数が設定されているかどうかを確認します。
   - ssh-agentが現在実行されているかどうかを確認します。
   - ssh-agentが実行されていない場合は、新しいインスタンスを起動します。
   - ssh-agentの情報を評価して、必要な環境変数を設定します。
   - `$HOME/.ssh/id_ed25519`の鍵をssh-agentに追加します。

3. ファイルを保存して閉じます。
   - vimエディタを使用している場合は、`Esc`を押して、`:wq`を入力し、`Enter`を押します。

4. 以下のコマンドを実行して、変更を適用します。

   ```bash
   source ~/.bashrc
   ```

これで、新しいターミナルセッションを開始するたびに、ssh-agentが自動的に起動され、指定した鍵が追加されます。パスフレーズの入力を求められずに、SSHを使用できるようになります。

## 注意

- この方法では、`$HOME/.ssh/id_ed25519`の鍵がssh-agentに追加されます。異なる名前の鍵を使用している場合は、適宜変更してください。
- パスフレーズを設定している場合は、ssh-addコマンドの実行時にパスフレーズの入力が必要になります。

以上が、ssh-agentへの鍵登録を自動化する方法です。これにより、SSHを使用する際の利便性が向上します。
