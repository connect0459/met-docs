---
title: SOLID原則
description: 変更に強いクラス設計のための5つの指針をPythonのデータ分析コードで解説します。
sidebar:
  label: SOLID原則
  order: 3
---

**SOLID原則** は、長期的に保守しやすいオブジェクト指向設計のための5つの指針です。頭文字を並べたものです。

| 原則 | 概要 |
| --- | --- |
| **S**ingle Responsibility | クラスは1つの責任だけを持つ |
| **O**pen/Closed | 拡張には開いており、変更には閉じている |
| **L**iskov Substitution | サブクラスは親クラスの代わりに使えなければならない |
| **I**nterface Segregation | 使わないメソッドへの依存を強制しない |
| **D**ependency Inversion | 詳細ではなく抽象に依存する |

## S — 単一責任の原則

クラスが変わる理由は **1つだけ** であるべきです。

```python
# 悪い例：1つのクラスがデータの読み込み・処理・保存すべてを担っている
class WeatherAnalyzer:
    def load_csv(self, path): ...
    def clean_data(self, df): ...
    def calculate_stats(self, df): ...
    def save_results(self, df, path): ...
    def send_report_email(self, results): ...
```

CSV形式が変わっても、統計処理のロジックが変わっても、メール送信の仕様が変わっても、このクラスを変更しなければなりません。責任が多すぎます。

```python
# 良い例：責任ごとにクラスを分ける
class WeatherDataLoader:
    def load(self, path: str) -> pd.DataFrame: ...

class WeatherDataCleaner:
    def clean(self, df: pd.DataFrame) -> pd.DataFrame: ...

class WeatherStatsCalculator:
    def calculate(self, df: pd.DataFrame) -> dict: ...

class ReportSender:
    def send(self, results: dict) -> None: ...
```

各クラスが変わる理由が1つになり、影響範囲が明確になります。

## O — 開放/閉鎖原則

クラスは **拡張には開いており、変更には閉じている** べきです。新しい機能を追加するとき、既存コードを書き換えなくて済む設計が理想です。

```python
from abc import ABC, abstractmethod

# 悪い例：新しいフォーマットを追加するたびにこのクラスを変更する必要がある
class DataLoader:
    def load(self, path: str, format: str) -> pd.DataFrame:
        if format == "csv":
            return pd.read_csv(path)
        elif format == "excel":
            return pd.read_excel(path)
        elif format == "json":            # 追加のたびにここを変更
            return pd.read_json(path)

# 良い例：新しいフォーマットはサブクラスを追加するだけ
class DataLoader(ABC):
    @abstractmethod
    def load(self, path: str) -> pd.DataFrame: ...

class CsvLoader(DataLoader):
    def load(self, path: str) -> pd.DataFrame:
        return pd.read_csv(path)

class ExcelLoader(DataLoader):
    def load(self, path: str) -> pd.DataFrame:
        return pd.read_excel(path)

class JsonLoader(DataLoader):          # 既存コードを変更せず追加できる
    def load(self, path: str) -> pd.DataFrame:
        return pd.read_json(path)
```

## L — リスコフの置換原則

サブクラスは、 **親クラスが使われている場所に置き換えられる** 必要があります。

```python
# 悪い例：サブクラスが親クラスの契約を破っている
class DataLoader(ABC):
    @abstractmethod
    def load(self, path: str) -> pd.DataFrame: ...

class CachedLoader(DataLoader):
    def load(self, path: str) -> pd.DataFrame | None:  # None を返す可能性がある
        if not self._cache_exists(path):
            return None  # 呼び出し元が None を想定していなければバグになる
        return self._load_from_cache(path)

# 良い例：常に DataFrame を返す（None を返さない）
class CachedLoader(DataLoader):
    def load(self, path: str) -> pd.DataFrame:
        if not self._cache_exists(path):
            return self._load_and_cache(path)
        return self._load_from_cache(path)
```

「親クラスを使っているコードを、サブクラスに差し替えても動く」という保証が大切です。

## I — インターフェース分離の原則

使わないメソッドへの依存を強制しないようにします。大きすぎる抽象クラスより、 **小さく目的に合った抽象クラス** を定義します。

```python
from abc import ABC, abstractmethod

# 悪い例：すべてのローダーにsave機能を強制してしまう
class DataHandler(ABC):
    @abstractmethod
    def load(self, path: str) -> pd.DataFrame: ...

    @abstractmethod
    def save(self, df: pd.DataFrame, path: str) -> None: ...  # 読み込みだけのクラスにも必要?

# 良い例：役割ごとに小さなインターフェースに分ける
class DataReader(ABC):
    @abstractmethod
    def load(self, path: str) -> pd.DataFrame: ...

class DataWriter(ABC):
    @abstractmethod
    def save(self, df: pd.DataFrame, path: str) -> None: ...

class CsvHandler(DataReader, DataWriter):   # 必要なものだけ実装する
    def load(self, path: str) -> pd.DataFrame:
        return pd.read_csv(path)

    def save(self, df: pd.DataFrame, path: str) -> None:
        df.to_csv(path, index=False)
```

## D — 依存性逆転の原則

具体的な実装クラスではなく、 **抽象（インターフェース）に依存する** べきです。

```python
# 悪い例：上位クラスが下位クラス（CsvLoader）に直接依存している
class AnalysisPipeline:
    def __init__(self):
        self.loader = CsvLoader()  # CsvLoader に固定されている

    def run(self, path: str) -> dict:
        df = self.loader.load(path)
        ...

# 良い例：DataLoader（抽象）に依存し、具体的なクラスは外から注入する
class AnalysisPipeline:
    def __init__(self, loader: DataReader):  # 抽象型を受け取る
        self.loader = loader

    def run(self, path: str) -> dict:
        df = self.loader.load(path)
        ...

# 使う側が具体的な実装を渡す
pipeline = AnalysisPipeline(loader=CsvLoader())
pipeline = AnalysisPipeline(loader=ExcelLoader())  # 差し替えが簡単
```

テスト時にも、本物の `CsvLoader` の代わりにテスト用のダミーを渡すことができます。

## どこから始めるか

すべてを一度に適用する必要はありません。特に効果が大きいのは **S（単一責任）** と **D（依存性逆転）** です。

1. 「このクラス/関数は何をするクラスか？」一言で言えなければ、分割を検討する
2. 具体的なファイル名やパスをクラス内にハードコードしていたら、外から渡せるようにする

この2点だけでも、コードの保守性は大きく改善します。
