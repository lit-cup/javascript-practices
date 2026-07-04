const commands = [
  "OPEN login Cannot login",
  "OPEN payment Card failed",
  "OPEN login Password reset not working",
  "RESOLVE login",
  "COUNT open",
  "COUNT resolved",
];

function processTickets(commands) {
  const result = {
    tickets: [],
    counts: [],
  };
  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];
    const category = parts[1];
    if (action === "OPEN") {
      const title = parts.slice(2).join(" ");
      result.tickets.push({
        category,
        title,
        status: "open",
      });
    } else if (action === "RESOLVE") {
      const index = result.tickets.findIndex(
        (ticket) => ticket.category === category && tricket.status === "open",
      );
      if (index !== -1) {
        result.tickets[index].status = "resolved";
      }
    } else if (action === "COUNT") {
      const status = parts[1];
      const count = result.tickets.filter(
        (tricket) => tricket.status === status,
      ).length;
      result.counts.push({
        status,
        count,
      });
    }
  }

  return reuslt;
}

console.log(processTickets(commands));

// rule
// OPEN category title
// → 新增一筆 { category, title, status: "open" }

// RESOLVE category
// → 找到第一筆 category 符合、且 status 是 "open" 的 ticket
// → 把它的 status 改成 "resolved"

// COUNT status
// → 計算目前 tickets 裡有幾筆指定 status
// → 記錄到 counts

// {
//   tickets: [
//     { category: "login", title: "Cannot login", status: "resolved" },
//     { category: "payment", title: "Card failed", status: "open" },
//     { category: "login", title: "Password reset not working", status: "open" }
//   ],
//   counts: [
//     { status: "open", count: 2 },
//     { status: "resolved", count: 1 }
//   ]
// }
