# Dastardly Ducks Genesis Generator

This is the typescript that was used to assemble JSON data and images for the original batch of 10,000 Dastardly Ducks.

It is not well-optimized, as it was not intended to be a long-term piece of code. This is presented in the form used to generated the genesis batch. I was more 
concerned with making sure the Solidity and website were perfect instead. I just needed the data this outputted to be clean.

## 🪄 Install GraphicsMagick

GraphicsMagick is a library used by the library to assemble images, which must be [downloaded separately](http://www.graphicsmagick.org/) and installed for this to work.

If you are on macOS and use Homebrew, you may simply go:
```
brew install graphicsmagick
```

## Proper Use

Setup with ``yarn install`` then run a generation with ``yarn start``.

``{IPFS_PATH}`` must be replaced in all of the token data with the actual IPFS path.

## License

All art assets included for non-commercial use only. Code licensed as MIT.
