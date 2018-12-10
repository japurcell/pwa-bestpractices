(function()
{
  'use strict';

  const app = {

    loadItems: (initialItems) =>
    {
      const main = document.querySelector('.main');

      initialItems.forEach(item =>
        {
          const el = document.createElement('div');
          el.classList.add('card');

          const elTitle = document.createElement('h3');
          elTitle.classList.add('card-title');
          elTitle.innerText = item.id;

          const elContent = document.createElement('div');
          elContent.classList.add('card-body');
          elContent.innerText = item.name;

          el.appendChild(elTitle);
          el.appendChild(elContent);

          main.appendChild(el);
        });
    },

    seed: () =>
    {
      const items = [];

      for (let i = 0; i < 9; i++)
      {
        items.push({ id: i, name: `Item ${i}`});
      }

      return items;
    }

  };

  const initialItems = app.seed();
  app.loadItems(initialItems);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
})();