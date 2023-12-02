echo TypeScript 4.9
cd ts49
if [ ! -d "node_modules" ]; then
  npm install
fi
npx tsc --noEmit

echo TypeScript 5.x
cd ../ts5x
if [ ! -d "node_modules" ]; then
  npm install
fi
npx tsc --noEmit
