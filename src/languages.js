/* GPLv3.0 2016 chendianbuji@gmail.com */

(function (factory) {
  window.Languages = factory();
  new MutationObserver(
    function (mutations)
    {
      mutations.map(
        function (mutation)
        {
          if (mutation.target != '[object HTMLBodyElement]' &&
              mutation.target != '[object HTMLScriptElement]' &&
              (mutation.removedNodes.length != 0 ||
              mutation.addedNodes.length != 0)) {
            Languages.update();
          }
        }
      );
    }
  ).observe(
    document.querySelector('body'),
    {attributes: false, childList: true, characterData: false, subtree:true}
  );
}(function () {
  let multi_languages = new Multi_languages(); // capture on top

  let pad = function(x) {
    return Array.prototype.slice.call(x);
  }

  let handleSelect = function (select, options, lang) {
      return function (condition) {
          pad(options).map(function (option, i) {
              if (option.lang == lang && condition(option)) {
                  select.selectedIndex = i;
              }
          });
      }
  }
  let fakeCache = new Map();window.fakeCache = fakeCache;
  let fakeSelect = function (select, lang) {
      let options = select.querySelectorAll('option');
      pad(options).filter(function (option) {return option.lang == lang && option.lang != "";}).map(function (option) {
          option.value = option.value || fakeCache.get(option) || "";
      });
      pad(options).filter(function (option) {return option.lang != lang && option.lang != "";}).map(function (option) {
          fakeCache.set(option, fakeCache.get(option) || option.value || "");
          option.value = "";
      });
  }

  let handleSelects = function (lang) {
      let selects = document.querySelectorAll('select');
      let later = [];
      pad(selects).map(function (select) {
          let oldValue = select.value;
          let options = select.querySelectorAll('option');
          let selectHandler = handleSelect(select, options, lang);
          selectHandler(function (option) {return !!option.selected;});
          if (pad(options).filter(function (option) {return option.lang == lang;}).every(function (option) {return option.selected == false;})) {
              selectHandler(function (option) {return !!option.getAttribute('selected');});
          }
          later.push(function(){select.value = oldValue;});
      });
      pad(selects).map(function (select) {
          fakeSelect(select, lang);
      });
      later.map(function(fn){fn()});
  }

  function Multi_languages()
  // Let over Lambda over Let over Lambda
  {
    let elements = new Map();
    let titles;
    let active_lang;
    let element_doms;
    return {
      init: function init()
      {
        element_doms = document.querySelectorAll('[lang]:not(title)');
        titles = document.querySelectorAll('title[lang]');
        return function (lang)
        {
          pad(element_doms).forEach(
            function (element, _index)
            {
              if (!elements.has(element)) {
                elements.set(element, element.style.display);
              }
              if (element.lang != lang) {
                element.style.display = 'none';
              } else {
                element.style.display = elements.get(element);
                elements.delete(element);
              }
            });
          titles_container = titles[0].parentNode; // <title>s are special
          pad(titles).forEach(
            function (element, index)
            {
              if (element.lang == lang) {
                titles_container.removeChild(element);
                titles_container.insertBefore(element, titles[index==0?1:0]);
              }
            }
          );
          titles = document.querySelectorAll('title[lang]');
          handleSelects(lang);

          active_lang = lang;
        };
      },
      update: function ()
      {
        return function ()
        {
          let increase_doms = element_doms = document.querySelectorAll('[lang]:not(title)');
          pad(increase_doms).forEach(
            function (element, _index)
            {
              if (!elements.has(element)) {
                elements.set(element, element.style.display);
              }
              if (element.lang != active_lang) {
                element.style.display = 'none';
              } else {
                elements.delete(element);
              }
            }
          );
          let decrease = new Map(elements);
          pad(increase_doms).forEach(
            function (element, _index)
            {
              if (decrease.has(element)) {
                decrease.delete(element);
              }
            }
          );
          pad(decrease).forEach(
            function (element, _display) {
              if (elements.has(element)) {
                elements.delete(element);
              }
            }
          );
        };
      }
    };
  }

  return {
    select:multi_languages.init(),
    update:multi_languages.update()
  };
}));
