# Bankist Function Page

A simple banking JaveScript native web app demo that allows users to log in, view transactions, transfer money, request loans, and close accounts. This project demonstrates and study modern JavaScript array methods, date formatting, TimeOut setting, and UI updates.

## Features

- **Login:** User authentication with username and PIN.
- **View Transactions:** See all deposits and withdrawals with dates and formatted currency.
- **Transfer Money:** Send money to another user.
- **Request Loan:** Request a loan if eligible.
- **Close Account:** Remove your account from the system.
- **Sort Transactions:** Sort transactions in ascending order.
- **Vies Result:** See total in/all/interest money.
- **Auto Logout:** User is logged out after a period of inactivity.

## Main Functions (script.js)

- `displayTransactions(account, sort)`: Renders the transaction list, optionally sorted.
- `createUsernames(accounts)`: Generates usernames from account owner names.
- `calcDisplaySummary(account)`: Calculates and displays total in, out, and interest.
- `calcDisplayBalance(account)`: Calculates and displays the current balance.
- `updateUI(account)`: Updates all UI sections for the current account.
- `logOutTimer()`: Handles auto-logout countdown.

## Notable JavaScript Array Methods Used

- `map()`, `filter()`, `reduce()`, `find()`, `findIndex()`
- `forEach()`, `sort()`, `slice()`, `push()`, `splice()`
- Modern non-destructive methods: `toSorted()`, `toReversed()`, `toSpliced()`, `with()`

## Notes

- **Date Formatting:** Uses `Intl.DateTimeFormat` for locale-aware date display.
- **Currency Formatting:** Uses `Intl.NumberFormat` for locale-aware currency display.
- **Non-destructive Array Methods:** Modern methods like `toSorted()` and `toReversed()` are used to avoid mutating the original data.
- **Auto Logout:** Timer resets on user activity (transfer, loan, etc.) by `setTimeout()`,`setInterval()`.

## How to Use

1. Open `index.html` in your browser.
2. Simple Use one of the demo accounts to log in:
    - Username: `js` | PIN: `1111`
    - Username: `jd` | PIN: `2222`
    - Username: `stw` | PIN: `3333`
    - Username: `ss` | PIN: `4444`
3. Try transferring money, requesting a loan, or closing the account.

## File Structure

- `index.html` – Main HTML structure
- `style.css` – Styling for the app
- `script.js` – All JavaScript logic

---

*This project is for educational/demo purposes only. No real banking functionality is provided.*
