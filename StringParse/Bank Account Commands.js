const commands = [
  "OPEN Stuart savings 1000",
  "OPEN Yiyi checking 500",
  "DEPOSIT Stuart 300",
  "WITHDRAW Yiyi 100",
  "CLOSE Yiyi",
  "COUNT Stuart",
  "SUM Stuart",
];
function processAccounts(commands) {
  const result = {
    accounts: [],
    queries: [],
  };
  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];
    const owner = parts[1];
    if (action === "OPEN") {
      const type = parts[2];
      const balance = Number(parts[3]);
      result.accounts.push({
        owner,
        type,
        balance,
      });
    } else if (action === "DEPOSIT") {
      const amount = Number(parts[2]);
      const depositAccount = result.accounts.find(
        (account) => account.owner === owner,
      );
      if (depositAccount) {
        depositAccount.balance += amount;
      }
    } else if (action === "WITHDRAW") {
      const amount = Number(parts[2]);
      const withdrawAccount = result.accounts.find(
        (account) => account.owner === owner,
      );
      if (withdrawAccount) {
        withdrawAccount.balance -= amount;
      }
    } else if (action === "CLOSE") {
      const closeIndex = result.accounts.findIndex(
        (account) => account.owner === owner,
      );
      if (closeIndex !== -1) {
        result.accounts.splice(closeIndex, 1);
      }
    } else if (action === "COUNT") {
      const count = result.accounts.filter(
        (account) => account.owner === owner,
      ).length;
      result.queries.push({
        owner,
        type: "count",
        value: count,
      });
    } else if (action === "SUM") {
      const totalBalance = result.accounts.reduce((sum, account) => {
        if (account.owner === owner) {
          return sum + account.balance;
        }
        return sum;
      }, 0);
      result.queries.push({
        owner,
        type: "sum",
        value: totalBalance,
      });
    }
  }
  // return result
  return result;
}
console.log(processAccounts(commands));

//rule
// OPEN owner type balance
// → 新增一筆 { owner, type, balance }

// DEPOSIT owner amount
// → 找到第一筆 owner 符合的 account
// → balance 加上 amount

// WITHDRAW owner amount
// → 找到第一筆 owner 符合的 account
// → balance 減掉 amount

// CLOSE owner
// → 移除第一筆 owner 符合的 account

// COUNT owner
// → 計算目前 accounts 裡該 owner 有幾筆 account

// SUM owner
// → 加總目前 accounts 裡該 owner 的 balance

// example
// {
//   accounts: [
//     { owner: "Stuart", type: "savings", balance: 1300 }
//   ],
//   queries: [
//     { owner: "Stuart", type: "count", value: 1 },
//     { owner: "Stuart", type: "sum", value: 1300 }
//   ]
// }

// DEPOSIT / WITHDRAW → find account
// CLOSE → findIndex + splice，記得 -1 guard
// COUNT → filter.length
// SUM → for...of 或 reduce
