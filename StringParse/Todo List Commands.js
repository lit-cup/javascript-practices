const commands = [
  "ADD todo Buy milk",
  "ADD done Review array methods",
  "ADD todo Practice reduce",
  "COMPLETE Buy milk",
  "COUNT todo",
  "COUNT done",
];

function processTodos(commands) {
  const result = {
    todos: [],
    counts: [],
  };

  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];

    if (action === "ADD") {
      const status = parts[1];
      const title = parts.slice(2).join(" ");
      result.todos.push({
        status,
        title,
      });
    } else if (action === "COMPLETE") {
      const title = parts.slice(1).join(" ");
      const index = result.todos.findIndex((todo) => todo.title === title);
      if (index !== -1) {
        result.todos[index].status = "done";
      }
    } else if (action === "COUNT") {
      const countStatus = parts[1];
      const count = result.todos.filter(
        (todo) => todo.status === countStatus,
      ).length;
      result.counts.push({
        status: countStatus,
        count,
      });
    }
  }
  return result;
}

console.log(processTodos(commands));

// rule
// ADD status title
// → 新增一筆 { status, title }

// COMPLETE title
// → 找到第一筆 title 符合的 todo，將它的 status 改成 "done"

// COUNT status
// → 計算目前 todos 裡有幾筆指定 status，並記錄到 counts

// {
//   todos: [
//     { status: "done", title: "Buy milk" },
//     { status: "done", title: "Review array methods" },
//     { status: "todo", title: "Practice reduce" }
//   ],
//   counts: [
//     { status: "todo", count: 1 },
//     { status: "done", count: 2 }
//   ]
// }

// ADD：新增一筆 → push
// REMOVE：刪一筆 → findIndex + splice
// COMPLETE：改一筆 → findIndex + update property
// COUNT：查詢 → filter.length，不改主要 state
