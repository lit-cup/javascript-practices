---

至於 `parseInt()` 跟 `Number()`，差異很重要。

## `Number()`

`Number()` 會嘗試把整個值轉成 number。

```js id="q5opfa"
Number("5");      // 5
Number("5.5");    // 5.5
Number("05");     // 5
Number("5px");    // NaN
Number("abc");    // NaN
Number("");       // 0
Number("   ");    // 0
```

重點是：

```txt id="b9ea9o"
Number 會要求整個字串像一個合法數字
```

所以：

```js id="9g3f1w"
Number("10abc"); // NaN
```

---

## `parseInt()`

`parseInt()` 會從字串開頭開始解析整數，遇到不能解析的地方就停。

```js id="f4g79j"
parseInt("5");      // 5
parseInt("5.5");    // 5
parseInt("05");     // 5
parseInt("5px");    // 5
parseInt("10abc");  // 10
parseInt("abc10");  // NaN
parseInt("");       // NaN
```

重點是：

```txt id="4ajwf5"
parseInt 只抓開頭能變成整數的部分
```

所以它比較寬鬆，也會丟掉小數。

---

## 在這種 command 題用哪個？

這題：

```js id="rqfafe"
"ADD laptop 5"
```

`parts[2]` 應該是乾淨的數字字串，所以兩個都可以。

但依依會建議你這種基礎題先用：

```js id="8wdbt8"
const quantity = Number(parts[2]);
```

因為它比較嚴格。如果資料是：

```js id="3f6ufh"
"ADD laptop 5px"
```

`Number("5px")` 會得到 `NaN`，提醒你資料不乾淨。
但 `parseInt("5px")` 會得到 `5`，可能讓錯誤被吃掉。

---

## 簡單選擇規則

```txt id="ddm49v"
要完整轉成數字 → Number()
要從字串開頭抽整數 → parseInt()
要保留小數 → Number() 或 parseFloat()
只要整數、且字串可能有單位 → parseInt()
```

例子：

```js id="tjoobn"
Number("12.5");      // 12.5
parseInt("12.5");    // 12
parseFloat("12.5");  // 12.5
```

```js id="ey10tt"
Number("20px");      // NaN
parseInt("20px");    // 20
parseFloat("20.5px");// 20.5
```

所以你可以記：

```txt id="yqv306"
Number：整包檢查
parseInt：從頭挖整數
parseFloat：從頭挖小數
```

在我們現在的 command 題裡，`Number(parts[2])` 比較適合，因為 quantity 應該就是乾淨的數字。
