const notifications = [
  { id: 1, type: "error", message: "Login failed", read: false },
  { id: 2, type: "info", message: "Welcome back", read: true },
  { id: 3, type: "warning", message: "Storage almost full", read: false },
  { id: 4, type: "success", message: "Profile saved", read: true },
];
function getUnreadNotificationItems(notifications) {
  const result = [];

  for (const notification of notifications) {
    const read = notification.read;
    if (!read) {
      const type = notification.type.toUpperCase();
      result.push({
        id: notification.id,
        label: `[${type}] ${notification.message}`,
      });
    }
  }

  return result;
}

console.log(getUnreadNotificationItems(notifications));

// [
//   { id: 1, label: "[ERROR] Login failed" },
//   { id: 3, label: "[WARNING] Storage almost full" }
// ]

// 1. 只保留 read === false 的通知
// 2. 每一筆轉成新的 object
// 3. 新 object 只需要 id 和 label
// 4. label 格式是：[TYPE] message
// 5. TYPE 要大寫

// I separate the raw notification data from the UI-ready data. I iterate through the list, keep only unread notifications, then transform each unread notification into a smaller object with only the fields needed by the UI: id and label. This keeps the rendering layer simpler because it receives data in the shape it needs.
// 我會把原始 notification data 跟 UI 要用的資料 shape 分開。先走訪整個 array，只保留未讀通知，然後把每一筆未讀通知轉成 UI 需要的格式，只留下 id 和 label。這樣 render 的地方會比較單純，不需要混太多資料處理邏輯。

// function toUnreadItems(items) {
//   const result = [];

//   for (const item of items) {
//     if (!item.read) {
//       const type = item.type.toUpperCase();

//       result.push({
//         id: item.id,
//         label: `[${type}] ${item.message}`,
//       });
//     }
//   }

//   return result;
// }

// function getUnreadNotificationItems(notifications) {
//   return notifications
//     .filter((notification) => !notification.read)
//     .map((notification) => {
//       const type = notification.type.toUpperCase();

//       return {
//         id: notification.id,
//         label: `[${type}] ${notification.message}`,
//       };
//     });
// }
