npm install parcel --save-dev

package.json add new devdependencies
`
  "devDependencies": {
    "parcel": "^2.16.1"
  }
`
# with development 
use *npx parcel index.html* to bundle all module we are use for we want html file

example to npmExample.js bundle musicList.js and clonedeep.js two modules to ./dist/Parcel.[6d5110f9].js
and we could see in the dist folder it have development file we want in ./dist/Parcel.html that script use above to development


set "script" in package.json to easy running commend line
below example simpify *npx parcel Parcel.html* to *npm run start*, start is our script variable
`
  "script": {
    "start": "parcel Parcel.html"
  }
`

# build for the final bundle
finally we done the development we build the final bundle comparse and have dead code elimination 
add script with
`
  "script": {
    "start": "parcel Parcel.html",
    "build": "parcel build Parcel.html"
  }
`


bundler feture bundle difference modoules and manager