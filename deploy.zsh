echo "Building Controller App in ./build directory..."
npm run build
echo "Done.\n\nPushing to GitHub Remote..."
git add .
git commit -m $1
git push
echo "Done.\n\nPushing to Heroku Remote for build and deployment..."
git push heroku master
echo "\nDone.\n\nSee The Volume has been redeployed.\n  Check logs above for details.\nDone."