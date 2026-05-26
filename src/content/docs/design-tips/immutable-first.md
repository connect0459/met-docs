---
title: Immutable First — データを変えない設計
description: イミュータブル（不変）なデータ設計の利点と、Pythonでの実践方法を解説します。
sidebar:
  label: Immutable First
  order: 1
---

「Immutable First（イミュータブルファースト）」とは、データをできる限り **変更しない** ことを優先する設計方針です。

## なぜ「変えない」ことが重要か

分析コードでよくある問題を見てみましょう。

```python
temperatures = [22.1, 24.5, 19.8, 27.3]

def celsius_to_fahrenheit(data):
    for i in range(len(data)):
        data[i] = data[i] * 9 / 5 + 32  # 元のリストを書き換えている
    return data

fahrenheit = celsius_to_fahrenheit(temperatures)

print(temperatures)  # [71.78, 76.1, 67.64, 81.14] — 元データが変わってしまった！
print(fahrenheit)    # [71.78, 76.1, 67.64, 81.14]
```

`temperatures` を渡したつもりが、関数内で書き換えられてしまいました。後で元のデータが必要になっても、取り出せません。

## 解決策：新しいデータを返す

```python
temperatures = [22.1, 24.5, 19.8, 27.3]

def celsius_to_fahrenheit(data):
    return [t * 9 / 5 + 32 for t in data]  # 新しいリストを返す

fahrenheit = celsius_to_fahrenheit(temperatures)

print(temperatures)  # [22.1, 24.5, 19.8, 27.3] — 元データは変わっていない
print(fahrenheit)    # [71.78, 76.1, 67.64, 81.14]
```

元のデータを書き換えず、変換結果を **新しい値として返す** ことで、両方を独立して使えます。

## 設定情報には frozen dataclass を使う

分析の設定（閾値やパラメータなど）は、処理の途中で変わると困ります。 `@dataclass(frozen=True)` を使うと、作成後に変更できないオブジェクトを定義できます。

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class AnalysisConfig:
    threshold: float
    window_size: int
    output_dir: str

config = AnalysisConfig(threshold=0.05, window_size=10, output_dir="./results")

# 途中で変えようとするとエラーになる
config.threshold = 0.01  # FrozenInstanceError: cannot assign to field 'threshold'
```

エラーになることで、「意図しない変更」を未然に防げます。

## 変更できないコレクションを活用する

状態を持つべきでないデータには、`tuple` や `frozenset` を使いましょう。

```python
# 分析対象の列名（変えるべきでない）
TARGET_COLUMNS = ("temperature", "humidity", "pressure")  # tupleは変更不可

# 処理済みステーションのID（追加・削除はするが、個々のIDは変えない）
processed_stations = frozenset(["ST001", "ST002", "ST003"])
```

## pandas でのイミュータブルな操作

pandasの `DataFrame` を操作するとき、`inplace=True` は避けると安全です。

```python
import pandas as pd

df = pd.read_csv("weather_data.csv")

# 悪い例：元のDataFrameを変更してしまう
df.dropna(inplace=True)
df.rename(columns={"temp": "temperature"}, inplace=True)

# 良い例：新しいDataFrameを返す
cleaned_df = df.dropna()
renamed_df = cleaned_df.rename(columns={"temp": "temperature"})
```

後者のスタイルなら、 `df` は常に元の状態を保つため、どの段階でも見直しができます。

## まとめ

| 状況 | 推奨する方法 |
| --- | --- |
| リストや辞書を変換する | 新しいオブジェクトを返す関数を書く |
| 設定情報を表すクラス | `@dataclass(frozen=True)` を使う |
| 変えるべきでないコレクション | `tuple` / `frozenset` を使う |
| DataFrameの加工 | `inplace=True` を避け、新しい変数に代入する |

「元のデータを変えない」というシンプルなルールを守るだけで、バグの多くを防ぐことができます。
