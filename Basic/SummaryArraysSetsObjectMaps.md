# Arrays vs Sets vs Object vs Maps

====

# Arrays

```
tasks = ['Code', 'lunch', 'sleep'];
```

## Use when need **ordered** list of values (might contain duplicates)

## Use when you need to **manipualte** data

# Sets

```
tasks = new Set(['Code', 'lunch', 'sleep']);
```

## Use when you need to work with **unqiue** valuses

## Use when **high-performance** is really important

## Use to **remove duplicates** from arrays

# Objects

```
tasks = {[
    task: 'Code',
    date: 'lunch',
    end: 'sleep'
]};
```

## More "traditional" key/value store("abused" object)

## Easier to write and sccess values with . and []

## Use when you need to include **functions (methods)**

## Use when working with JSON (can convert to map)

# Maps

```
tasks = new Map([
    ['task', 'Code'],
    ['date', 'lunch'],
    ['end', 'sleep']
]);
```

## Better performance

## Keys can have **any** data type

## Easy to iterate

## Easy to compute size

## Use when you simply need to map key to values

## Use when you need keys that are **not** strings
