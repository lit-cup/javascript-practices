const commands = [
  "ADD laptop 5",
  "ADD mouse 10",
  "SELL laptop 2",
  "RESTOCK mouse 5",
  "COUNT laptop",
  "COUNT mouse",
];

function findProduct(inventory, item) {
  return inventory.find((product) => product.item === item);
}

function processInventory(commands) {
  const result = {
    inventory: [],
    counts: [],
  };

  for (const command of commands) {
    if (!command) continue;

    const parts = command.split(" ");
    const action = parts[0];
    const item = parts[1];

    if (action === "ADD") {
      const quantity = Number(parts[2]);
      result.inventory.push({
        item,
        quantity,
      });
    } else if (action === "SELL") {
      const quantity = Number(parts[2]);
      const productItem = result.inventory.find(
        (product) => product.item === item,
      );

      if (productItem) {
        productItem.quantity -= quantity;
      }
    } else if (action === "RESTOCK") {
      const quantity = Number(parts[2]);
      const productItem = result.inventory.find(
        (product) => product.item === item,
      );

      if (productItem) {
        productItem.quantity += quantity;
      }
    } else if (action === "COUNT") {
      const productItem = result.inventory.find(
        (product) => product.item === item,
      );
      result.counts.push({
        item,
        count: productItem.quantity,
      });
    }
  }

  return result;
}

console.log(processInventory(commands));

// rule
// ADD item quantity
// → 新增一筆 { item, quantity }

// SELL item quantity
// → 找到第一筆符合 item 的商品
// → quantity 減掉指定數量

// RESTOCK item quantity
// → 找到第一筆符合 item 的商品
// → quantity 加上指定數量

// COUNT item
// → 查目前該 item 的 quantity
// → 記錄到 counts

// example
// {
//   inventory: [
//     { item: "laptop", quantity: 3 },
//     { item: "mouse", quantity: 15 }
//   ],
//   counts: [
//     { item: "laptop", count: 3 },
//     { item: "mouse", count: 15 }
//   ]
// }
