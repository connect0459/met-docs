---
title: Evergreenなテスト
description: リファクタリングしても壊れない、長期的に価値を持ち続けるテストの書き方を解説します。
sidebar:
  label: Evergreenなテスト
  order: 4
---

**Evergreen（エバーグリーン）** とは「常緑」の意味です。Evergreenなテストとは、コードのリファクタリングや内部実装の変更があっても壊れず、長期にわたって価値を持ち続けるテストのことです。

## なぜテストは「腐る」のか

テストが壊れやすい主な原因は、 **ビジネスルールではなく実装の詳細をテストしてしまう** ことです。

```python
# 悪い例：内部実装の詳細をテストしている
def test_clean_weather_data():
    df = pd.DataFrame({"temp_c": [20.0, None], "humidity": [60, 70]})

    result = clean_weather_data(df)

    # リストの内部構造や中間状態に依存したアサーション
    assert result._data is not None          # 内部属性への依存
    assert list(result.index) == [0]         # インデックスの具体的な値に依存
    assert result.shape == (1, 2)            # 列数に依存（列が増えたら壊れる）
```

内部の実装が変わると（インデックスのリセット方法、列の追加など）、ビジネスルールは変わっていないのにテストが失敗します。

## 解決策：ビジネスルールをテストする

```python
# 良い例：「欠損値を含む行は除外される」というビジネスルールをテストしている
def test_欠損値を含む行が除外される():
    input_df = pd.DataFrame({
        "temp_c": [20.0, None, 25.0],
        "humidity": [60, None, 80],
    })

    result = clean_weather_data(input_df)

    assert not result.isnull().any().any(), "結果に欠損値が残っていてはならない"
    assert len(result) < len(input_df), "欠損値のある行が除外されていること"
```

「何行目が残るか」ではなく「欠損値が残らない」というルールに着目することで、実装を変えてもテストは壊れません。

## テスト名で仕様を表現する

テスト名は「コードが何をするか」ではなく、「 **どんなビジネスルールを保証するか** 」を表現します。

```python
# 悪い例：実装内容の説明になっている
def test_dropna():  # 「dropnaを呼ぶ」という実装の説明
    ...

def test_process():  # 何をテストしているか不明
    ...

# 良い例：ビジネスルールを日本語で表現する
def test_欠損値を含む行が除外される():
    ...

def test_気温データが0件のときは空のDataFrameを返す():
    ...

def test_摂氏マイナス273度未満の値は無効として扱われる():
    ...
```

テスト名がドキュメントになるため、コードを読まなくても仕様が理解できます。これを **Living Documentation（生きたドキュメント）** と呼びます。

## 実装の詳細に依存しないアサーション

| 避けるべきアサーション | 代わりに使うアサーション |
| --- | --- |
| `assert result.shape == (10, 5)` | `assert len(result) == 10` |
| `assert list(result.index) == [0, 1, 2]` | `assert len(result) == 3` |
| `assert result._internal_cache is not None` | 公開されたメソッドの結果を検証する |
| `assert mock.called_once_with(...)` | 関数の出力や状態変化を検証する |

## 境界値をテストする

ビジネスルールは往々にして「ある条件を満たすとき」に発動します。その境界をテストするとロバストなテストになります。

```python
def test_有効な気温範囲の下限値が正しく処理される():
    df = pd.DataFrame({"temp_c": [-89.2]})  # 地球上の最低気温記録
    result = validate_temperature(df)
    assert len(result) == 1

def test_有効な気温範囲を下回る値は除外される():
    df = pd.DataFrame({"temp_c": [-89.3]})  # 最低気温記録を下回る値
    result = validate_temperature(df)
    assert len(result) == 0

def test_空のDataFrameを入力しても安全に処理される():
    df = pd.DataFrame({"temp_c": pd.Series([], dtype=float)})
    result = validate_temperature(df)
    assert len(result) == 0
```

## Evergreenなテストのチェックリスト

テストを書いたら、以下を確認してみてください。

- [ ] テスト名を読めば、何のビジネスルールを守っているか分かるか？
- [ ] 関数の内部実装を変えた（アルゴリズムの最適化、変数名の変更など）とき、このテストは引き続きパスするか？
- [ ] 何かが壊れたとき、このテストのエラーメッセージだけで原因を特定できるか？
- [ ] テストデータは最小限（ビジネスルールを示すのに必要な量だけ）になっているか？

## まとめ

Evergreenなテストは、 **実装ではなく意図** をテストします。

- テスト名でビジネスルールを表現する
- 「どう実装されているか」ではなく「何を保証するか」を書く
- 実装を変えたときにテストが壊れないことが、良いテストの証拠

コードは変わり続けますが、ビジネスルールは比較的安定しています。ビジネスルールを守るテストは、コードの変化に耐えながら長く価値を提供し続けます。
