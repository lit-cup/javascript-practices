找一筆：find / findIndex
刪一筆：findIndex + splice
改一筆：find 或 findIndex
算數量：filter.length
加總：reduce / for...of
--- 

你剛剛說的這句很接近：

> `findIndex` 可以用來找刪除的單筆欄位在哪一個位置，`find` 是找到欄位的值。

更精準地說：

```txt
findIndex：
找到第一筆符合條件的「index」
找不到回傳 -1

find：
找到第一筆符合條件的「item 本身」
找不到回傳 undefined
```

例如：

```js
const ticket = result.tickets.find(
  (ticket) => ticket.category === category && ticket.status === "open"
);
```

這裡 `ticket` 會是那個 object 本身：

```js
{ category: "login", title: "Cannot login", status: "open" }
```

所以你其實可以直接改它：

```js
if (ticket) {
  ticket.status = "resolved";
}
```

也就是 `RESOLVE` 可以寫成：

```js
} else if (action === "RESOLVE") {
  const category = parts[1];

  const ticket = result.tickets.find(
    (ticket) => ticket.category === category && ticket.status === "open"
  );

  if (ticket) {
    ticket.status = "resolved";
  }
}
```

所以你問：

> 有沒有找到值又能改的函式？

在 JS array 裡，沒有一個叫做 `findAndUpdate()` 的內建方法。
但對 **object array** 來說，`find()` 找到的 object 是原本陣列裡那個 object 的 reference，所以你可以直接改它。

差異是這樣：

```js
const ticket = result.tickets.find((ticket) => ticket.category === "login");

ticket.status = "resolved";
```

這會改到 `result.tickets` 裡的那一筆，因為 `ticket` 指向原本的 object。

但如果是 primitive value，例如 number/string，就不能這樣改：

```js
const nums = [1, 2, 3];

const num = nums.find((n) => n === 2);
num = 99; // ❌ 不行，而且也不會改 nums
```

所以規則是：

```txt
object array：
find 找到 object reference，可以改該 object 的 property

primitive array：
find 只拿到 value，不能靠改 value 來更新原 array
```

那什麼時候用 `findIndex`？

```txt
需要刪除：findIndex + splice
需要替換整筆：findIndex + assignment
需要知道位置：findIndex
```

例如刪除：

```js
const index = tickets.findIndex((ticket) => ticket.category === "login");

if (index !== -1) {
  tickets.splice(index, 1);
}
```

替換整筆：

```js
const index = tickets.findIndex((ticket) => ticket.category === "login");

if (index !== -1) {
  tickets[index] = {
    ...tickets[index],
    status: "resolved",
  };
}
```

只改 object property，`find` 就夠：

```js
const ticket = tickets.find((ticket) => ticket.category === "login");

if (ticket) {
  ticket.status = "resolved";
}
```

但如果是在 React state 裡，通常不要直接改 object，要用 immutable update：

```js
const nextTickets = tickets.map((ticket) => {
  if (ticket.category === category && ticket.status === "open") {
    return {
      ...ticket,
      status: "resolved",
    };
  }

  return ticket;
});
```

不過注意：這個 `map` 會改所有符合條件的 ticket。
如果需求是「只改第一筆」，就要另外控制，例如用 `updated` flag：

```js
let updated = false;

const nextTickets = tickets.map((ticket) => {
  if (!updated && ticket.category === category && ticket.status === "open") {
    updated = true;

    return {
      ...ticket,
      status: "resolved",
    };
  }

  return ticket;
});
```
---
一般 JS 題：
find object → 直接改 property 可以接受

React state：
不要直接改原 object，回傳新的 array / object

---

以你現在練基礎題來說，先記這個表就好：

```txt
findIndex + splice：
刪除第一筆符合條件的 item

findIndex + array[index].property = value：
更新第一筆符合條件的 item

find + item.property = value：
更新第一筆符合條件的 object，比 findIndex 更直接

filter.length：
計算符合條件的筆數

reduce：
加總 / 彙整數值
```

這題你的進步點很明顯：你已經開始注意到 **matching condition** 可能不是單一條件，而是：

```js
ticket.category === category && ticket.status === "open"
```

這就是線上測驗常考的「題目語意 → 條件判斷」能力。很好，這條鋼筋有補到。
