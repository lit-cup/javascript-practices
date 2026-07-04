# JS Command Pattern Cheat Sheet

> 基礎題節奏：讀題 → 建模 → 分 action → 更新資料 → 回傳整理後結果

---

## 1. Main Flow

```txt
commands
→ split command
→ action branch
→ write / read operation
→ return organized result
```

常見起手：

```js
function processSomething(commands) {
  const result = {
    records: [],
    queries: [],
  };

  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];

    // action branches here
  }

  return result;
}
```

---

## 2. Action Responsibility

| Action | Responsibility | Common Tool |
|---|---|---|
| `ADD` / `OPEN` | 新增一筆資料 | `push()` |
| `UPDATE` / `SCORE` / `DEPOSIT` | 找第一筆並改 property | `find()` |
| `REMOVE` / `CLOSE` | 找第一筆並刪除 | `findIndex()` + `splice()` |
| `COUNT` | 計算符合條件的筆數 | `filter().length` |
| `SUM` | 加總數值 | `reduce()` or `for...of` |

---

## 3. Array Method Responsibility

### `find`

找第一筆符合條件的 item。

```js
const record = records.find(
  (record) => record.student === student
);

if (record) {
  record.score += amount;
}
```

重點：

```txt
find 找到的是 object 本身。
如果 array 裡放的是 object，可以直接改 property。
找不到會回傳 undefined。
```

---

### `findIndex`

找第一筆符合條件的 index。

```js
const index = records.findIndex(
  (record) => record.student === student
);

if (index !== -1) {
  records.splice(index, 1);
}
```

重點：

```txt
findIndex 找不到會回傳 -1。
使用 splice 前一定要加 -1 guard。
否則 splice(-1, 1) 會刪掉最後一筆。
```

---

### `filter`

留下所有符合條件的資料，回傳新的 array。

```js
const count = records.filter(
  (record) => record.student === student
).length;
```

適合：

```txt
select / 篩選資料
count / 計算符合條件的筆數
```

---

### `map`

把每一筆資料轉換成新的 shape，回傳新的 array。

```js
const names = records.map((record) => record.student);
```

注意：

```txt
map 不是通用 loop。
不要用 map 做 side effect counting / mutation。
```

---

### `reduce`

把整個 array 彙整成一個結果，例如 sum、total、grouped object。

```js
const totalScore = records.reduce((sum, record) => {
  if (record.student === student) {
    return sum + record.score;
  }

  return sum;
}, 0);
```

人話版：

```txt
sum 一開始是 0。
每看到一筆 record：
- 如果符合條件，就把值加進 sum。
- 如果不符合，就原樣回傳 sum。
最後 totalScore 就是加總結果。
```

---

### `for...of`

逐筆流程控制，最直覺、最清楚。

```js
let totalScore = 0;

for (const record of records) {
  if (record.student === student) {
    totalScore += record.score;
  }
}
```

適合：

```txt
剛練習時
流程比較複雜時
需要 step-by-step 更新 state 時
面試想寫清楚時
```

---

## 4. Number Conversion

### `Number()`

整包轉成數字。

```js
Number("5");      // 5
Number("5.5");    // 5.5
Number("5px");    // NaN
Number("");       // 0
```

適合 command 題裡乾淨的數字欄位：

```js
const amount = Number(parts[2]);
```

### `parseInt()`

從字串開頭抽整數，遇到不能解析的地方就停。

```js
parseInt("5");      // 5
parseInt("5.5");    // 5
parseInt("5px");    // 5
parseInt("abc5");   // NaN
```

簡單記法：

```txt
Number：整包檢查
parseInt：從頭挖整數
parseFloat：從頭挖小數
```

---

## 5. Naming Model

| Name | Meaning |
|---|---|
| `command` | 原始指令字串，例如 `"ADD Alice frontend 80"` |
| `parts` | `command.split(" ")` 後的字串陣列 |
| `action` | 指令類型，例如 `ADD` / `REMOVE` / `COUNT` |
| `record` | 資料集合裡的一筆資料 |
| `account` | accounts 裡的一筆資料 |
| `ticket` | tickets 裡的一筆資料 |
| `amount` | 用來加減的數值 |
| `index` | 要刪除或替換的位置 |

命名原則：

```txt
不要把 records 裡的一筆資料叫 command。
command 是原始字串。
record / account / ticket 才是整理後的 object。
```

---

## 6. Common Pattern Examples

### Add a record

```js
if (action === "ADD") {
  const student = parts[1];
  const course = parts[2];
  const score = Number(parts[3]);

  result.records.push({
    student,
    course,
    score,
  });
}
```

---

### Update first matching record

```js
if (action === "SCORE") {
  const student = parts[1];
  const amount = Number(parts[2]);

  const record = result.records.find(
    (record) => record.student === student
  );

  if (record) {
    record.score += amount;
  }
}
```

---

### Remove first matching record

```js
if (action === "REMOVE") {
  const student = parts[1];

  const index = result.records.findIndex(
    (record) => record.student === student
  );

  if (index !== -1) {
    result.records.splice(index, 1);
  }
}
```

---

### Count matching records

```js
if (action === "COUNT") {
  const student = parts[1];

  const count = result.records.filter(
    (record) => record.student === student
  ).length;

  result.queries.push({
    student,
    type: "count",
    value: count,
  });
}
```

---

### Sum matching records

```js
if (action === "SUM") {
  const student = parts[1];

  const totalScore = result.records.reduce((sum, record) => {
    if (record.student === student) {
      return sum + record.score;
    }

    return sum;
  }, 0);

  result.queries.push({
    student,
    type: "sum",
    value: totalScore,
  });
}
```
```txt
transform → map
select → filter
aggregate → reduce
procedural update → for...of
find one object → find
find position → findIndex
delete by position → splice
```
