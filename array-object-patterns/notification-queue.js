const commands = [
  "PUSH error Login failed",
  "PUSH info Welcome back",
  "PUSH warning Storage almost full",
  "POP",
  "PUSH success Profile saved",
];

function notificationQueue(commands) {
  const result = [];
  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];
    if (action === "PUSH") {
      const type = parts[1];
      const message = parts.slice(2).join(" ");
      result.push({
        type,
        message,
      });
    } else if (action === "POP") {
      result.shift();
    }
  }
  return result;
}

console.log(notificationQueue(commands));

// rule
// PUSH type message → 加入 queue
// POP → 移除最早加入的 notification

// [
//   { type: "error", message: "Login failed" },
//   { type: "info", message: "Welcome back" },
//   { type: "success", message: "Profile saved" }
// ]

// I parse each command into an action and payload. For PUSH, I create a notification object and append it to the queue. For POP, since this is a queue and we need to remove the earliest item, I use shift instead of pop. The main state is the result array, which represents the current queue.
// 我會先把每個 command 拆成 action 跟 payload。遇到 PUSH 時，把 type 和 message 組成 notification object 放進 queue。遇到 POP 時，因為 queue 是先進先出，所以要移除最早加入的項目，這裡應該用 shift，而不是 pop。整個 result array 就是目前 queue 的狀態。
const command = {
  action: "PUSH",
  payload: "error Login failed",
};

const notification = {
  type: "error",
  message: "Login failed",
};
