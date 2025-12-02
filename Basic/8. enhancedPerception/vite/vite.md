# vita v.s. parcel
The main difference is 
vita: development not bundle use ES module, to final build bundle with rollup
parcel: bundle all

## 1. init bundler
### parcel: 
`
parcel index.html
`
### vita: quickly to get dev server
`
    npm create vite@latest my-project
    cd my-project
    npm install
    npm run dev

`

## 2. development
### parcel: bundle all
### vita: use native import ES module, reload change file without rebundle
`
import { something } from './utils/helpers.js'

browser get dirctly vita help to change the difference
viat advantage: boot fast, change fast, hotfix fast 
`

## 3. build
### vita: use rollup to bundle at dist path, esbuild/babel tranform language for old browser support
`
npm run build 
`
### rollup do this:
- zip JS
- Tree-shaking
- conbine module to few file
- create assets and static sorces then move to dist path

### advantage:
- clear config
- Strong development rollup plugin env
- execute fast


| Future| Parcel      | Vite                  |
| ----- | ----------- | --------------------- |
| init  | Zero config | CLI build project     |
| Dev   | bundle, quit slow | **no bundle, faster**|
| Build | self bundle  | use Rollup（Pro level）         |
| config   | not need       | could use, simple                |
| suitale    | beginner, quick demo  | **real world、modern case** |


