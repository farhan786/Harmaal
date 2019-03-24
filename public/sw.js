const staticAssets = [
    './index.html',
    './assets/js/adsRelatedScripting.js',
    './assets/js/signingScripting.js',
    './assets/js/switching.js',
    './assets/js/chatScripting.js',
    './assets/js/notificationScripting.js',
    './assets/js/main.js',
    './assets/js/postingAds.js',
    
    './assets/library/jquery-3.3.1.js',
    './assets/library/jquery-3.3.1.min.js',
    
    './assets/images/slider_images/bg.jpg',
    './assets/images/slider_images/ecom1.jpg',
    './assets/images/slider_images/ecom3.jpg',
    './assets/images/slider_images/ecom2.jpg',
    './assets/images/slider_images/home.jpg',
    './assets/images/slider_images/icon.png',
    './assets/images/slider_images/iphone.png',
    './assets/images/slider_images/logo.png',
    './assets/images/slider_images/owner.jpg',

    './signin.html',
    './signup.html',
    './products.html',
    './notification.html',
    './AdsForm.html',
    './adsDetail.html',
    './chat.html',
    './favicon.ico',

    './assets/css/detailChatBox.css',
    './assets/css/detailChat.css',
    './assets/css/mainStyle.css',
    './assets/css/popupChat.css'
    
  ];
  
  self.addEventListener('install', (event) => {
      self.skipWaiting();
      event.waitUntil(
      caches.open('v1')
        .then(res => {
          console.log('wait.........!')
          return res.addAll(staticAssets);
        })
    );
    console.log('installed');
  });
  
  self.addEventListener('activate', (event) => {
    console.log('activated');
  });
  
  self.addEventListener('fetch', (ev) => {
    // console.log('Fetch from Service Worker ', ev);
    const req = ev.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
     return ev.respondWith(cacheFirst(req));
    }
    return ev.respondWith(networkFirst(req));
  });
  
  async function cacheFirst(req) {
    let cacheRes = await caches.match(req);
    return cacheRes || fetch(req);
  }
  
  async function networkFirst(req) {
    const dynamicCache = await caches.open('v1-dynamic');
    try {
      const networkResponse = await fetch(req);
      dynamicCache.put(req, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cacheResponse = await caches.match(req);
      return cacheResponse;
    }
  }
  