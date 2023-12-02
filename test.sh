echo TypeScript 4.9
cd ts49
if [ ! -d "node_modules" ]; then
  npm install
fi
npx tsc --noEmit -p module:commonjs/tsconfig.json
npx tsc --noEmit -p module:esnext/resolution:node/tsconfig.json
npx tsc --noEmit -p module:esnext/resolution:nodenext/tsconfig.json
npx tsc --noEmit -p module:nodenext/tsconfig.json

echo TypeScript 5.x
cd ../ts5x
if [ ! -d "node_modules" ]; then
  npm install
fi
npx tsc --noEmit -p module:esnext/resolution:bundler/tsconfig.json
npx tsc --noEmit -p module:nodenext/resolution:nodenext/tsconfig.json
