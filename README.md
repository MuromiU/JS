## compressed js file
`*.js` in [/src](https://github.com/MuromiU/JS/tree/master/src)
`*.min.js` in [/build](https://github.com/MuromiU/JS/tree/master/build)

## languages.js
**for Html Localization**

examples/languages.html
``` html
<html>
  <head>
    <title lang="en">Test Page</title>
    <title lang="zh-cmn-Hans">测试页面</title>
    <title lang="ja">テストページ</title>
    <title lang="miaw">miaw miaw miaw</title>
  </head>
  <body>
    <div lang="en" style="display:block;">Why does the sun rise? Why does the moon shine?</div>
    <div lang="zh-cmn-Hans">太阳为什么会升起？月亮为什么会发光？</div>
    <div lang="ja" style="display:inline">太陽はなんで昇る?月はなぜ輝く？</div>
    <div lang="miaw" style="display:inline">miaw miaw miaw miaw miaw miaw miaw miaw miaw miaw miaw miaw miaw</div>
  </body>
</html>
<script src="../src/languages.js"></script>
```

1.You can use
``` JavaScript
Languages.select("en"); //for example, use english
Languages.select(lang);
```
to choose a language.

2.After html dom changed, please excute
``` JavaScript
Languages.update();
```
you could also new a MutationObserver to help to do update.

PS: You **don't need to** excute `Languages.update()` after **any** `Languages.select(lang)`, `Languages.update()` is designed to maintain the `<key,value>` data stored in closure when [lang]:not(title) doms increase or decrease.
