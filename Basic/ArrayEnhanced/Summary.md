# Array Method Summary

This document note decide which array method to use depending on whether you want to used about array method.

## To mutate the original array:

- **Add to original:**
  - `push()` – Add to end
  - `unshift()` – Add to start
- **Remove from original:**
  - `pop()` – Remove from end
  - `shift()` – Remove from start
  - `splice()` – Remove or replace at any position
- **Others(Usually be avoided):**
  - `reverse()`
  - `sort()`
  - `fill()`

## A new array based on original:

- **Same length as original:**
  - `map()` - loop
- **Filtered using condition:**
  - `filter()`
- **Taking portion of original:**
  - `slice()` – Copy part or all of the array
- **With one item replaced:**
  - `with()`
- **Flattened:**
  - `flat()`
  - `flatMap()`
- **Non-Destructure:**
  - `toReversed()`
  - `toSorted`
  - `toSpliced` - With deleted itmes
- **Joining two arrays**
  - `concat()`

## A array index:

- **Based on value:**
  - `indexof()`
- **Based on text condition:**
  - `findIndex()`
  - `findLastIndex()`

## A array element:

- **Based on text condition:**
  - `find()`
  - `findLast()`
- **Based on position:**
  - `at()`


## Check if array includes(return boolean value):

- **Based on value:**
  - `ubckydes()`
- **Based on text condition:**
  - `some()`
  - `every()`

## A new string

- **Based on separator:**
  - `join()`

## To transform to value

- **Based on accumularor**
  - `reduce()` - combine to single value fo any type: number, string, boolean, array, object

## To just loop array

- **Based on callback**
  - `forEach()` - not create new array just loop over

## Array Tools

- **Grouping an array by categories:**
  - `Object.groupBy()` 
  
- **Creating a new array from scratch:**
  - `Array.from()` 

- **Creating a new array from scratch with n empty positions (use together with fill() method):**
  - `new Array(n)`

- **Joining 2 or more arrays:**
  - `[...arr1, ...arr2]`

- **Creating a new array containing unique values from arr**
  - `[...new Set(arr)]`
  
- **Creating a new array containing unique elements that are present in both arr1 and arr2**
  - `[...new Set(arr1).intersection(new Set(arr2))]`