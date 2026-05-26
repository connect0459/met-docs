---
title: 副作用の分離
description: 純粋な計算処理とファイルI/OやAPI呼び出しなどの副作用を分離する設計について解説します。
sidebar:
  label: 副作用の分離
  order: 2
---

**副作用（Side Effect）** とは、関数の実行によって「計算以外の何か」が起きることです。ファイルへの書き込み、APIへのリクエスト、画面への出力などが代表例です。

副作用を計算処理と混ぜると、テストが難しくなり、バグの原因も追いにくくなります。

## 問題のあるコード

```python
import pandas as pd

def process_weather_data(filepath):
    df = pd.read_csv(filepath)                    # 副作用：ファイル読み込み
    df = df.dropna()                              # 計算：欠損値除去
    df["temp_f"] = df["temp_c"] * 9 / 5 + 32     # 計算：単位変換
    df.to_csv("output.csv", index=False)          # 副作用：ファイル書き込み
    print(f"処理完了: {len(df)} 行")               # 副作用：標準出力
    return df
```

この関数は「読み込み・計算・書き込み・出力」を一箇所でやっています。テストするためには実際のファイルが必要で、出力先も決め打ちになっています。

## 解決策：計算を副作用から切り離す

```python
import pandas as pd

# 純粋な計算のみ（副作用なし）
def clean_weather_data(df: pd.DataFrame) -> pd.DataFrame:
    return df.dropna()

def add_fahrenheit(df: pd.DataFrame) -> pd.DataFrame:
    result = df.copy()
    result["temp_f"] = result["temp_c"] * 9 / 5 + 32
    return result

# 副作用をまとめた呼び出し元
def run_pipeline(input_path: str, output_path: str) -> None:
    df = pd.read_csv(input_path)          # 副作用：ここだけに集中
    df = clean_weather_data(df)           # 計算
    df = add_fahrenheit(df)               # 計算
    df.to_csv(output_path, index=False)   # 副作用：ここだけに集中
    print(f"処理完了: {len(df)} 行")
```

計算関数（ `clean_weather_data` ・ `add_fahrenheit` ）は `DataFrame` を受け取って `DataFrame` を返すだけです。ファイルについて何も知らないため、どんな入力でもテストできます。

## 純粋関数のテストがシンプルになる

副作用を分離すると、テストにファイルやネットワーク接続が不要になります。

```python
import pandas as pd

def test_欠損値を含む行が除去される():
    input_df = pd.DataFrame({
        "temp_c": [20.0, None, 25.0],
        "humidity": [60, 70, None],
    })

    result = clean_weather_data(input_df)

    assert len(result) == 1
    assert result.iloc[0]["temp_c"] == 20.0

def test_摂氏から華氏への変換が正しい():
    input_df = pd.DataFrame({"temp_c": [0.0, 100.0]})

    result = add_fahrenheit(input_df)

    assert result.iloc[0]["temp_f"] == 32.0
    assert result.iloc[1]["temp_f"] == 212.0
```

テストデータを `DataFrame` で直接作れるため、テストが読みやすく、実行も速いです。

## 副作用の種類と対策

| 副作用の種類 | 分離の方法 |
| --- | --- |
| ファイルの読み書き | 呼び出し元でI/Oを行い、計算関数にはデータを渡す |
| API・DBへのアクセス | 取得したデータを計算関数に渡す |
| 現在時刻の取得 | 時刻を引数として受け取るように変更する |
| 乱数の使用 | シードまたは乱数生成器を引数として受け取る |
| 標準出力・ログ | 計算関数の外で行う |

## まとめ

- **計算処理** （変換・集計・フィルタリング）は純粋関数にまとめる
- **副作用** （I/O・API呼び出し・出力）は呼び出し元や専用の関数にまとめる
- 純粋関数はテストがシンプルになり、再利用もしやすい

「この関数はファイルを知らなくていい」という問いかけを習慣にするだけで、設計が改善されます。
