echo "Creating production build.."
npm run deploy

echo "mkdir -p build -> create build folder if non existent"
mkdir -p _build

echo "rm -rf build.* - removing old files"
rm -rf _build/*

echo "cp index.html ./_build - copy index.html"
cp index.html ./_build

echo "mkdir -p _build/dist - create dist folder"
mkdir -p _build/dist

echo "cp ./dist/* ./_build/dist - copy created assets"
cp ./dist/* ./_build/dist

echo "zip -r ./_build/build.zip ./_build - prepare zipped release"
zip -r ./_build/build.zip ./_build