/*
 *
 */

(function (factory) {
  window.Languages = factory();
}(function () {
  let multi_languages = new Multi_languages(); // capture on top

  function Multi_languages()
  // Let over Lambda over Let over Lambda
  {
    let elements = new Array();
    elements["value"] = new Array();
    let titles;
    return {
      init:function init()
      {
        elements["key"] = document.querySelectorAll('[lang]:not(title)');
        titles = document.querySelectorAll('title[lang]');
        return function (lang)
        {
          elements["key"].forEach(
            function (element, index)
            {
              if (elements["value"][index] == undefined) {
                elements["value"][index] = element.style.display;
              }
              if (element.lang != lang) {
                element.style.display = 'none';
              } else {
                element.style.display = elements["value"][index];
                delete elements["value"][index];
              }
            });
          titles_container = titles[0].parentNode; // <title>s are special
          titles.forEach(
            function (element, index)
            {
              if (element.lang == lang) {
                titles_container.removeChild(element);
                titles_container.insertBefore(element, titles[index==0?1:0]);
              }
            }
          );
          titles = document.querySelectorAll('title[lang]');
        };
      },
      update:function ()
      {
        return function ()
        {
          elements["key"].forEach(
            function (element, index)
            {
              if (elements["value"][index] != undefined) {
                element.style.display = elements["value"][index];// recover all
              }
            });
          elements["key"] = document.querySelectorAll('[lang]:not(title)');
          elements["value"] = new Array();
        };
      }
    };
  }

  return {
    select:multi_languages.init(),
    update:multi_languages.update()
  };
}));
