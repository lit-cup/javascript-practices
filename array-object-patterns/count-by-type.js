const notifications = [
  { type: "error", message: "Login failed" },
  { type: "info", message: "Welcome back" },
  { type: "warning", message: "Storage almost full" },
  { type: "error", message: "Payment failed" },
  { type: "success", message: "Profile saved" },
];
function countNotificationTypes(notifications) {
  const self = {
    //   const result = {
    //     error: 0,
    //     info: 0,
    //     warning: 0,
    //     success: 0,
    //   };
    //   for (const notification of notifications) {
    //     if (notification.type === "error") {
    //       result.error++;
    //     } else if (notification.type === "info") {
    //       result.info++;
    //     } else if (notification.type === "warning") {
    //       result.warning++;
    //     } else if (notification.type === "success") {
    //       result.success++;
    //     }
    //   }
    //   notifications.reduce((sum, notification) => {
    //     if (notification.type === "error") {
    //       result.error++;
    //     } else if (notification.type === "info") {
    //       result.info++;
    //     } else if (notification.type === "warning") {
    //       result.warning++;
    //     } else if (notification.type === "success") {
    //       result.success++;
    //     }
    //   }, 0);
  };

  const result = [];
  for (const notification of notifications) {
    const type = notification.type;
    result[type] = (result[type] || 0) + 1;
  }
  //   return notifications.reduce((result, notification) => {
  //     const type = notification.type;
  //     result[type] = (result[type] || 0) + 1;
  //     return result;
  //   }, {});

  return result;
}

console.log(countNotificationTypes(notifications));

// {
//   error: 2,
//   info: 1,
//   warning: 1,
//   success: 1
// }

// 每一筆 notification 都有：

// {
//   type: string,
//   message: string
// }

// 你要統計每種 type 出現幾次。
