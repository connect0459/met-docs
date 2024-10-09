---
title: WSL2のセットアップ
description: Windows Subsystem for Linuxのセットアップ
sidebar:
  label: WSL
  order: 2
---

WSL2 (Windows Subsystem for Linux 2) を Windows PCにセットアップし、Ubuntu 24.04 LTSを使用する手順は以下の通りです。

※この記事はLinux環境を使用したい方向けに紹介しています。Windows上で環境を構築したい場合は本手順を飛ばして次に進んでください。

## 手順

### 1. Windowsの更新

Windowsを最新のバージョンに更新します。

### 2. WSL2の有効化

1. 管理者権限でPowerShellを開きます。
2. 以下のコマンドを実行して、WSL機能を有効にします:

    ```bash
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    ```

3. 次に、以下のコマンドを実行して、仮想マシン機能を有効にします:

     ```bash
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```

4. PCを再起動します。

### 3. Linux カーネル更新プログラムのインストール

以下のリンクから最新のLinux カーネル更新プログラムをダウンロードしてインストールします:  

- <https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi>

### 4. WSL2を既定のバージョンに設定

管理者権限でPowerShellを開き、以下のコマンドを実行します:

```bash
wsl --set-default-version 2
```

以下のコマンドでWSLのバージョンが`2`になっていることを確認してください。

```bash
wsl -v
```

### 5. Ubuntu 24.04 LTSのインストール

Microsoft StoreからUbuntu 24.04 LTSを検索してインストールします。最新版が出ている場合は 24.04 でなくとも構いません。

### 6. Ubuntuの初期設定

Ubuntuを起動し、ユーザー名とパスワードを設定します。

### 7. パッケージのアップデート

1. `sudo apt update`を実行し、インストール可能なパッケージのリストを更新します。このコマンドは、新しいパッケージのバージョン情報を取得します。

    ```bash
    sudo apt update
    ```

2. `sudo apt upgrade`を実行し、前のステップで取得した情報に基づいて、インストール済みのパッケージを最新のバージョンにアップグレードします。

    ```bash
    sudo apt upgrade
    ```

これらのコマンドを定期的に実行することで、システムを最新の状態に保ち、セキュリティ更新や機能改善を適用することができます。

## 追加のヒント

- 基本的なコマンドを打ってみましょう。以下はカレントディレクトリ (現在いるフォルダ) の一覧を表示するコマンドです。

    ```bash
    ls
    ```

    `ls`コマンドにはオプションがあり、より詳細な情報を取得することができます。例えば、`-l`オプションと`-a`オプションを組み合わせると、すべてのファイルやディレクトリを詳細情報付きで表示することができます。

    ```bash
    ls -la
    ```

これで、WSL2上でUbuntu 24.04 LTSが使用可能になりました。Ubuntuを起動すると、Linux環境でコマンドを実行できます。

WSL2の詳細や高度な設定については、以下のMicrosoftの公式ドキュメントを参照してください:

- WSL2の概要: <https://docs.microsoft.com/ja-jp/windows/wsl/about>
- WSL2のインストール: <https://docs.microsoft.com/ja-jp/windows/wsl/install-win10>
