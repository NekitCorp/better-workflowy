# Better WorkFlowy

Google Chrome extension for improvement [workflowy](https://workflowy.com/)

Features:

-   [Calculate total hashtag time](#calculate-total-hashtag-time)
-   [Filter by hashtags on hotkey](#filter-by-hashtags-on-hotkey)
-   [Swap hashtags on hotkey](#swap-hashtags-on-hotkey)
-   [Paint hashtag line color](#paint-hashtag-line-color)

## Extension settings

![settings](/img/settings.png)

## Features

### Calculate total hashtag time

> Required option `Calculate total time` in extension settings

#### Supported tags

-   `d` - days
-   `h` - hours
-   `m` - minutes
-   `s` - seconds

![presentation1](https://i.gyazo.com/534ccdf0b014a4c23fd7a186cd30c06c.gif)
![presentation2](https://camo.githubusercontent.com/94e0e25e56485ae07d4188c4c333c49f4cf6c9f7/68747470733a2f2f73746f726167652e79616e646578636c6f75642e6e65742f7075626c69632d6d6174657269616c732f70726573656e746174696f6e322e676966)

### Filter by hashtags on hotkey

> At the presentation below we click in turn `SHIFT + HOME`, `SHIFT + PAGEUP`

![presentation3](https://i.gyazo.com/a565909e85cdcec5cf397a80645894da.gif)

### Swap hashtags on hotkey

> Required option `Swap hashtags on hotkey` in extension settings

![presentation4](https://i.gyazo.com/8070f0fc6904d0a9621c7f81b7b3bcc9.gif)

### Paint hashtag line color

![paint-hashtag-line-color](/img/paint-hashtag-line-color.gif)

## Development

[Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted)

```bash
# build files to './public/build'
# rollup.watch rebuilds your bundle when it detects changes
npm run dev
```

```bash
# production build files to './public/build'
$ npm run build
```

```bash
# run tests
$ npm run test
```
