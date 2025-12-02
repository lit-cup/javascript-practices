# Modern JavaScript Development

## Process flow:
- Development -> Build Process -> Production

## Developmet - Module, 3rd-party Package
- 3rd-party Package(modules): 
- from Node package manager like npm, node include 3rd-party code in our own code
- npm, node both repository and software

## Build Process - Bundling, Transpling/Polyfilling
- Bundling: Join all modules into one file
- Transpling/polyfilling(using tool [Babel]): convert modern javascript to ES5 
- using Javascript bundler to build process for us like tool [Webpack & Parcel] tranfor raw code to javascript bundle
- npm includes development tool that help build our application(etc: Babel, Webpack, Parcel)

## Production - JavaScript Bundle

---

# Overview of modules
- Module:
- Reusable piece of code that encapsulates implementation details;
- Usually a standalone file, but it doesn't have to be
- Example
` 
    // import(dependency)
    import{ rand } from './math.js';

    // Module code
    const diceP1 = rand(1, 6, 2);
    const diceP2 = rand(1, 6, 2);
    const scores = {diceP1, diceP2};

    // export(Public API)
    export{ scores };
`
- Why?
- Compose sofeware: Modules are small building blocks that we put together to build complex applications.
- Isolate components: Modules can be developed in isolation without thinking about the entire codebase.
- Abstract code: Implement low-level code in modules and import these abstractions into other modules don't need to know the details.
- Organized code: Modules naturally lead to more organized codebase.
- Reuse code: Modules allow us to easily reuse the same code, even across multiple projects.

# Native JavaScript (ES6) Modules
- ES6 modules stored in files, exactly one module per file.
- import and export syntax

## Top-level variables: 
- ES6 Modules: Scoped to module
- Script: Global

## Default mode
- ES6 Modules: Strict mode
- Script: 'Sloppy' mode

## Top-level [this]
- ES6 Modules: undefined
- Script: window

## import and export
- ES6 Modules: YES Need to happen at top-level imports are hoisted
- Script: NO

## HTML linking
- ES6 Modules: <stript type="module">
- Script: <stript>

## File downloading 
- ES6 Modules: Asychronous
- Script: Sychronous

# How ES6 Modules are imported
- importing modules before execution
- modules are imported synchronously
- Possible thanks to top-level("static") imports, which make imports know before exection
- This makes bundling and dead code elimination possible

- Example improted flow
`
    // index.js
    import{ rand } from './math.js';
    import{ showDice } from './dom.js';
    const dice = rand(1, 6, 2);
    showDice(dice);

    // math.js
    const rand = () =>{....}
    export{ rand }

    // dom.js
    const showDice = ()=>{...}
    export{ showDice }
`
- 1. Parsing index.js
- 2. Asychronous downloading math.js & Asychronous downloading dom.js 
- 3. Linking imports to math.js exports & Linking imports to dom.js exports (Live connection not copies)
- 4. Exection math.js & Exection dom.js
- 5. Exection index.js