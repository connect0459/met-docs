---
title: サーバーの仕様一覧
description: サーバー仕様の解説
sidebar:
  label: サーバー仕様
  order: 1
---

※2024年6月14日時点の情報です。詳細は <https://lolipop.jp/service/server-spec/> から確認してください。

## システム構成

| 項目 | 仕様 |
| --- | --- |
| OS | UNIX系OS (Linux CentOS) |
| サーバーの種類 | 共用サーバー (1つのサーバーを複数のユーザーで利用) |
| RAID構成(ユーザー領域) | RAID50 (分散パリティ + ストライピング) |
| RAID構成(システム領域) | RAID10 (ミラーリング + ストライピング) |
| 回線速度 | 1000Mbps |
| 文字コード | utf-8 |
| ログインシェル | bash |
| cron | ○ |
| テキストエディタ | vi, vim, emacs |
| root権限 | - |
| SSH認証方式 | 公開鍵認証 / パスワード認証 |
| 対応プロトコル | SSH2 |
| sftp | ○ |

**注:** SSHはスタンダードプラン以上でご利用いただけます。

## Webサーバー

| 項目 | 仕様 |
| --- | --- |
| サーバーソフトウェア名 | Apache 2.4.x <br> ハイスピードプラン・エンタープライズプランの場合 LiteSpeed 5.4 |
| JAVA Servlet / ASP.NET | - |
| .htaccessの作成/編集 | ○ (Optionsの指定は可) |
| mod_rewrite | ○ |
| HTTPアクセスログの保存 | ○ |
| HTTPアクセスログの保存期間 | 1〜3ヶ月 |
| アクセス解析ツール | analog <br> ※ハイスピードプラン・エンタープライズプランでは提供していません。 |
| ドメイン別アクセスログの保存 | ○ |
| SSL認証局(独自SSL) | 有料SSL(GlobalSign) / 無料SSL(Let's Encrypt) |
| 認証局(ロリポップ!のドメインのSSL) | Let's Encrypt |
| 対応プロトコル | TLS1.2, TLS1.3 |

## メールサーバー

| 項目 | 仕様 |
| --- | --- |
| SMTP | ○ |
| POP3 | ○ |
| IMAP4 | ○ |
| ウェブメール | ○ |
| メールウイルスチェック機能 | F-Secure |
| 受信拒否/許可リスト | ○ |
| メール送信サーバーソフトウェア名 | postfix |
| 暗号化通信(送信) | ○ (465番ポート) |
| 接続ポート番号(送信) | 465 (Port587も可) |
| SMTP認証 | ○ |
| メール受信サーバーソフトウェア名 | Courier IMAP |
| 暗号化通信(受信) | ○ |
| 接続ポート番号(POP3) | 110 (POP3S使用時は995) |
| 接続ポート番号(IMAP4) | 143 (IMAPS使用時は993) |
| 受信拒否リスト | ○ |
| 迷惑メールフィルタ | ○ |
| メール転送設定 | ○ |
| メール転送設定可能数 | 5 |
| メーリングリストマネージャー名 | ezmlm |
| 登録できるリストメンバー数 | 500 |
| 匿名での投稿 | ○ |
| 署名(シグネチャ)の付与 | ○ |

## FTPサーバー  

| 項目 | 仕様 |
| --- | --- |
| サーバーソフトウェア名 | ProFTPD |
| 暗号化通信(FTPS接続) | ○ |
| 接続ポート番号 | 21 |
| .ftpaccessの作成/編集 | ○ |
| FTPアカウントの利用できる数 | 1サーバー契約につき1つ |

## CGI / PHP

| 項目 | 仕様 |
| --- | --- |
| Perl | ver5.30 |
| Ruby | ver2.6 |
| Python | ver3.7 |
| PHP(エコノミープラン) | ver7.4(CGI版)・ver8.0(CGI版)・ver8.1(CGI版)・ver8.2(CGI版)・ver8.3(CGI版) |
| PHP(ライトプラン・スタンダードプラン) | ver7.4(CGI版)・ver8.0(CGI版)・ver8.1(CGI版)・ver8.2(CGI版/モジュール版)・ver8.3(CGI版) |
| PHP(ハイスピードプラン・エンタープライズプラン) | ver7.4(LiteSpeed版)・ver8.0(LiteSpeed版)・ver8.1(LiteSpeed版)・ver8.2(LiteSpeed版)・ver8.3(LiteSpeed版) |
| サーバーの標準文字コード | utf-8 |
| GD | ○ |
| ImageMagick(PerlMagick) | ○ |
| Jcode.pm(Perlモジュール) | ○ |
| suEXEC | ○ |

**注:** 詳細についてはCGI・SSI・PHP・SENDMAILの詳細についてをご参照ください。

### PHP関連

| 項目 | 仕様 |
| --- | --- |
| 動作モード(エコノミープラン) | CGI版 |
| 動作モード(ライトプラン・スタンダードプラン) | CGI版/モジュール版 |
| 動作モード(ハイスピードプラン・エンタープライズプラン) | LiteSpeed版 |
| php.iniの編集 | ○ (モジュール版は不可)  <br> ハイスピードプラン・エンタープライズプランの場合 順次リリース予定 |
| FTP関数の使用 | ○ |
| IMAP関数の使用 | ○ |
| ZIP関数の使用 | ○ |
| PHPによるHTTP認証 | - |
| マルチバイト文字列関数(mbstring)の使用 | ○ |
| ImageMagick | ○ |
| GD | ○ |
| PEAR | ○ |
| SMARTY | ○ |
| GD Support | ○ |
| FreeType Support | ○ |
| GIF Read Support | ○ |
| GIF Create Support | ○ |
| JPG Support | ○ |
| PNG Support | ○ |
| Multibyte Support | ○ |

**注:** 詳細についてはphp.iniの設定をご参照ください。

## データベースサーバー

| 項目 | 仕様 |
| --- | --- |
| サーバーソフトウェア名 | MySQL8.0 |
| データベースの形式 | MyISAM / InnoDB |
| MySQLデータベース管理ツール | ○ (phpMyAdmin) |
| MySQLの文字コード | utf-8 (MySQL4.0ではEUC-JP) |
| MySQLiの利用 | ○ |
| SQLiteの利用 | ○ |

## Webアプリケーションファイアウォール(WAF)  

| 項目 | 仕様 |
| --- | --- |
| ソフトウェア | SiteGuard Server Edition |
| 監視対象プロトコル | HTTP, HTTPS |
| ログの保存期間 | 3ヶ月 |
| ログの保存件数 | 制限なし |

**注:** ハイスピードプランではログ機能は提供していません。

## サーバー接続制限

| 項目 | 仕様 |
| --- | --- |
| ウェブサーバー | http 80/tcp, https 443/tcp |
| メール送信サーバー | smtp 25/tcp, submission 587/tcp, smtps 465/tcp |
| メール受信サーバー | pop 110/tcp, imap 143/tcp, imaps 993/tcp, pop3s 995/tcp |
| FTP / WebDAVサーバー | ftp 21/tcp, ftp-data, webdav ssl 443/tcp <br> ハイスピードプラン・エンタープライズプランの場合 ftp 21/tcp, ftp-data |
| SSH(SCP)サーバー | ssh 2222/tcp |
