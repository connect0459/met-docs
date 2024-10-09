---
title: VS Codeのセットアップ
description: Visual Studio Codeのセットアップ
sidebar:
  label: Visual Studio Code
  order: 3
---

Windows上にVisual Studio Code (VS Code) をセットアップする方法は以下の通りです。

## 手順

### 1. VS Codeのダウンロード

1. 公式サイト (<https://code.visualstudio.com/>) にアクセスします。
2. "Download for Windows" ボタンをクリックして、インストーラをダウンロードします。

### 2. インストール

1. ダウンロードしたインストーラ (VSCodeUserSetup-x64-{version}.exe) を実行します。
2. ライセンス条項に同意し、インストール先を選択して、インストールを開始します。
3. インストールが完了したら、VS Codeを起動します。

### 3. 日本語化を行う

1. `Ctrl + Shift + P` で コマンドパレットを開き、"Configure Display Language" を検索します。
2. 言語の選択画面が出るので、日本語を選択した後指示に従って再起動します。

### 4. WSL2とUbuntuの拡張機能をインストール

1. VS Codeを開き、左側のサイドバーから拡張機能アイコン (四角に分かれたブロックのようなアイコン) をクリックします。
2. 検索バーに "WSL" と入力し、"WSL" 拡張機能を探してインストールします (拡張機能ID: "ms-vscode-remote.remote-wsl") 。
3. 同様に、"Remote Development" をインストールします (拡張機能ID: "ms-vscode-remote.vscode-remote-extensionpack") 。

### 5. WSL2上のUbuntuでVS Codeを使用

1. VS Codeを再起動します。
2. 左下の青色 (使用環境によっては青以外の色) のリモートアイコンをクリックし、 "ディストリビューションを使用してWSLに接続..." を選択します。
3. ディストリビューションの一覧が表示されるので、 "Ubuntu-24.04" を選択します。
4. 新しいウィンドウが開き、WSL2上のUbuntuに接続されます。
5. 必要に応じて、Ubuntuのファイルシステムを操作したり、ターミナルでLinuxコマンドを実行したりできます。

## 追加のヒント

- UbuntuをCLI (ターミナル) で起動して、`code .`を実行するとカレントディレクトリでVS Codeを起動します。
- `Ctrl + Shift + @`の順でキーを押し続けると、VS Code上でターミナルを起動できます。

これで、Windows上でVS Codeが使用可能になり、WSL2上のUbuntu環境と連携できるようになりました。VS Codeを使用して、Ubuntuでのファイル編集、プログラミング、デバッグなどを行うことができます。

VS CodeとWSL2の連携については、以下の公式ドキュメントを参照してください:

- VS CodeとWSLの使用: <https://code.visualstudio.com/docs/remote/wsl>
- WSL拡張機能: <https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl>
