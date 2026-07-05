# JS Array & Object Patterns

This folder contains small JavaScript practice exercises focused on common array and object data transformations.

The goal is not only to solve the problems, but also to practice how to reason about data flow, state shape, and UI-ready data structures. These patterns are especially useful for frontend development with React.

## Patterns Covered

### 1. Queue Command Parsing

**File:** `notification-queue.js`

This exercise parses string commands and updates a queue-like result array.

```js
"PUSH error Login failed"
"POP"
```

Key ideas:

* Parse command strings with `split`
* Extract action, type, and message
* Use an array to represent queue state
* Use `push` to add items
* Use `shift` to remove the earliest item

This pattern helps practice transforming raw command input into structured objects.

---

### 2. Frequency Map

**File:** `count-by-type.js`

This exercise counts how many times each notification type appears.

```js
{
  error: 2,
  info: 1,
  warning: 1,
  success: 1
}
```

Key ideas:

* Use an object as a frequency map
* Use dynamic property access with `result[type]`
* Initialize missing keys before incrementing
* Accumulate data into a summary object

This pattern is useful for counting items by category, status, type, or level.

---

### 3. Raw Data to UI-Ready Items

**File:** `unread-ui-items.js`

This exercise filters unread notifications and transforms them into a smaller shape for UI rendering.

```js
[
  { id: 1, label: "[ERROR] Login failed" },
  { id: 3, label: "[WARNING] Storage almost full" }
]
```

Key ideas:

* Separate raw data from UI-ready data
* Filter by condition
* Transform each item into a new object
* Keep only the fields needed by the UI

This pattern is common in frontend work because API data often needs to be reshaped before rendering.

---

### 4. Immutable Update by ID

**File:** `update-by-id.js`

This exercise updates one item in an array by matching its `id`.

```js
{
  ...notification,
  read: true
}
```

Key ideas:

* Find the target item by `id`
* Create a new object for the updated item
* Return a new array instead of mutating the original data
* Preserve unchanged items

This pattern is closely related to React state updates, where immutable updates help keep state changes predictable.

## Why These Exercises Matter

These exercises practice small but important frontend data-flow skills:

* Parsing input
* Building result state
* Counting and grouping data
* Transforming raw data into UI-ready shapes
* Updating array items immutably

These patterns appear often in React components, reducers, form handling, API response shaping, and interview-style JavaScript questions.

## Practice Focus

For each exercise, the main questions are:

1. What is the input data shape?
2. What result shape do we need?
3. What state or accumulator should represent the result?
4. How does data move through each step?
5. Does the solution mutate the original data or return a new structure?

The goal is to write code that is correct, readable, and easy to explain.
