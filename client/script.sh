npm run build
rm -r ../server/public/assets
rm -r ../server/public/index.html
mv ./dist/assets ../server/public  
mv ./dist/index.html ../server/public
