const commands = [
  "ADD Alice frontend 80",
  "ADD Bob backend 70",
  "ADD Alice testing 60",
  "SCORE Alice 10",
  "REMOVE Bob",
  "COUNT Alice",
  "SUM Alice",
];

function processEnrollments(commands) {
  const result = {
    records: [],
    queries: [],
  };
  for (const command of commands) {
    const parts = command.split(" ");
    const action = parts[0];
    const student = parts[1];

    if (action === "ADD") {
      const course = parts[2];
      const score = Number(parts[3]);
      result.records.push({
        student,
        course,
        score,
      });
    } else if (action === "SCORE") {
      const amount = Number(parts[2]);
      const record = result.records.find(
        (record) => record.student === student,
      );
      if (record) {
        record.score += amount;
      }
    } else if (action === "REMOVE") {
      const removeIndex = result.records.findIndex(
        (record) => record.student === student,
      );
      if (removeIndex !== -1) result.records.splice(removeIndex, 1);
    } else if (action === "COUNT") {
      const count = result.records.filter(
        (record) => record.student === student,
      ).length;
      result.queries.push({
        student,
        type: "count",
        value: count,
      });
    } else if (action === "SUM") {
      let totalScore = 0;
      for (const record of result.records) {
        if (record.student === student) {
          totalScore += record.score;
        }
      }
      result.queries.push({
        student,
        type: "sum",
        value: totalScore,
      });
    }
  }
  // return result
  return result;
}

console.log(processEnrollments(commands));

// rule
// ADD student course score
// → 新增一筆 { student, course, score }

// SCORE student amount
// → 找到第一筆 student 符合的資料
// → score 加上 amount

// REMOVE student
// → 移除第一筆 student 符合的資料

// COUNT student
// → 計算目前 records 裡該 student 有幾筆

// SUM student
// → 加總目前 records 裡該 student 的 score

// {
//   records: [
//     { student: "Alice", course: "frontend", score: 90 },
//     { student: "Alice", course: "testing", score: 60 }
//   ],
//   queries: [
//     { student: "Alice", type: "count", value: 2 },
//     { student: "Alice", type: "sum", value: 150 }
//   ]
// }

// const totalScore = result.records.reduce((sum, record) => {
//   if (record.student === student) {
//     return sum + record.score;
//   }

//   return sum;
// }, 0);

// sum 一開始是 0
// 每看到一筆 record
// 如果 record.student 是 Alice，就把 record.score 加進 sum
// 如果不是 Alice，就原樣回傳 sum
// 最後得到 totalScore
