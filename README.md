![tab2image icon](/dist/img/icon128.png)

# tab2image

tab2image is a simple and easy-to-use Chrome extension to download every image opened as a tab in one click.

[**Get tab2image on the Chrome Web Store**](https://chrome.google.com/webstore/detail/save-tabbed-images/hhcoikfhkkadkgklepjkfgafmjoggefh).

<img src="/assets/screenshots/demo.gif" alt="demo gif" width="500px" />

## Development

Install node modules:

```
yarn install
```

Compile and watch for javascript changes:

```
yarn run watch
```

Check for linting errors:

```
yarn run lint
```

### Packaging for Chrome web store release

* Update version in dist/manifest.json
* Summarize the changes made from the last release (list pull requests) in CHANGELOG.md
* Create git tag with `git tag x.x.x` and push it with `git push origin --tags`
* Build a production version of webpack bundle with `yarn run package`
* Create a .zip file of the `dist` folder named `tab2image_<version>.zip`
* [Create a new release in github](https://github.com/venkrishraja/tab2image/releases) and attach the .zip file. In the description, add the summary from CHANGELOG.md.
* Upload the .zip file to the chrome web store

### License

tab2image is [MIT licensed](https://opensource.org/licenses/MIT).
