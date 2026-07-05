const notifications = [
  { id: 1, type: "error", message: "Login failed", read: false },
  { id: 2, type: "info", message: "Welcome back", read: true },
  { id: 3, type: "warning", message: "Storage almost full", read: false },
];

function markAsRead(notifications, targetId) {
  const result = [];
  for (const notification of notifications) {
    if (notification.id === targetId) {
      result.push({
        ...notification,
        read: true,
      });
    } else {
      result.push(notification);
    }
  }
  return result;
}

console.log(markAsRead(notifications, 3));

// [
//   { id: 1, type: "error", message: "Login failed", read: false },
//   { id: 2, type: "info", message: "Welcome back", read: true },
//   { id: 3, type: "warning", message: "Storage almost full", read: true },
// ]

// 只把 id === targetId 的那一筆改成 read: true。
// 其他資料保持原樣。

if (todo.id === targetId) {
  result.push({
    ...todo,
    completed: !todo.completed,
  });
} else {
  result.push(todo);
}
