const cacheVersion = "v1";
const statiCache = "site-static-" + cacheVersion;
const dynamicCache = "site-dynamic-" + cacheVersion;

const pages = [
    "/"
];
const jsS = [
    "/js/app.js",
    "/js/main.js"
];
const cssS = [
    "/style.css"
];
const imgs = [
    "/images/ahn hyejin.jpg",
    "/images/gnomino.jpg",
    "/images/jang seungyeon.jpg",
    "/images/kang mina.jpg",
    "/images/kim jisoo.jpg",
    "/images/kwon eunbi.jpg",
    "/images/moon byulyi.jpg",
    "/images/sakamoto mashiro.jpg",
    "/images/yabuki nako.jpg",
    "/images/an yujin.jpg",
    "/images/handong.jpg",
    "/images/jang wonyoung.jpg",
    "/images/kang seulgi.jpg",
    "/images/kim jiwon.jpg",
    "/images/kwon eunbin.jpg",
    "/images/moon sua.jpg",
    "/images/seo soojin.jpg",
    "/images/yeh shuhua.jpg",
    "/images/bae joohyun.jpg",
    "/images/han eunji.jpg",
    "/images/jang yeeun.jpg",
    "/images/kang yeseo.jpg",
    "/images/kim jiwoo.jpg",
    "/images/lee chaeryeong.jpg",
    "/images/myoui mina.jpg",
    "/images/seo youngeun.jpg",
    "/images/yontararak nicha.jpg",
    "/images/bae sumin.jpg",
    "/images/hanni pham.jpg",
    "/images/jeon heejin.jpg",
    "/images/kim bora.jpg",
    "/images/kim jungeun.jpg",
    "/images/lee chaeyeon.jpg",
    "/images/nakamura kazuha.jpg",
    "/images/shen xiaoting.jpg",
    "/images/yoo jeongyeon.jpg",
    "/images/choi jisu.jpg",
    "/images/ha sooyoung.jpg",
    "/images/jeon somi.jpg",
    "/images/kim chaehyun.jpg",
    "/images/kim minjeong.jpg",
    "/images/lee chaeyoung.jpg",
    "/images/naoi rei.jpg",
    "/images/shin ryujin.jpg",
    "/images/yoo jimin.jpg",
    "/images/choi yena.jpg",
    "/images/heo yoorim.jpg",
    "/images/jeon soyeon.jpg",
    "/images/kim chaewon.jpg",
    "/images/kim minji2.jpg",
    "/images/lee gahyeon.jpg",
    "/images/ning yizuho.jpg",
    "/images/shin yuna.jpg",
    "/images/yoon seeun.jpg",
    "/images/choi yerim.jpg",
    "/images/hirai momo.jpg",
    "/images/jo haseul.jpg",
    "/images/kim chungha.jpg",
    "/images/kim minji.jpg",
    "/images/lee hyein.jpg",
    "/images/oh seunghee.jpg",
    "/images/sim jayoon.jpg",
    "/images/choi yoojung.jpg",
    "/images/honda hitomi.jpg",
    "/images/jo serim.jpg",
    "/images/kim dahyun.jpg",
    "/images/kim minju.jpg",
    "/images/lee hyunseo.jpg",
    "/images/park chaewon.jpg",
    "/images/son chaeyoung.jpg",
    "/images/choi yujin.jpg",
    "/images/hong eunchae.jpg",
    "/images/jo yuri.jpg",
    "/images/kim dayeon.jpg",
    "/images/kim sejeong.jpg",
    "/images/lee siyeon.jpg",
    "/images/park jihyo.jpg",
    "/images/song yuqi.jpg",
    "/images/cho miyeon.jpg",
    "/images/huening bahiyyih.jpg",
    "/images/jung chaeyeon.jpg",
    "/images/kim doyeon.jpg",
    "/images/kim sihyeon.jpg",
    "/images/lee sunmi.jpg",
    "/images/park jiwon.jpg",
    "/images/son hyejoo.jpg",
    "/images/chonnasorn sajakul.jpg",
    "/images/huh yunjin.jpg",
    "/images/jung jinsoul.jpg",
    "/images/kim gaeul.jpg",
    "/images/kim sohye.jpg",
    "/images/lee yubin.jpg",
    "/images/park sieun.jpg",
    "/images/son seungwan.jpg",
    "/images/chou tzuyu.jpg",
    "/images/hwang yeji.jpg",
    "/images/jung wheein.jpg",
    "/images/kim garam.jpg",
    "/images/kim yerim.jpg",
    "/images/manoban lalisa.jpg",
    "/images/park sooyoung.jpg",
    "/images/uchinaga aeri.jpg",
    "/images/danielle marsh.jpg",
    "/images/im nayeon.jpg",
    "/images/kang haerin.jpg",
    "/images/kim hyunjin.jpg",
    "/images/kim yongsun.jpg",
    "/images/minatozaki sana.jpg",
    "/images/rachel huh.jpg",
    "/images/wang yiren.jpg",
    "/images/ezaki hikaru.jpg",
    "/images/im yeojin.jpg",
    "/images/kang hyewon.jpg",
    "/images/kim jennie.jpg",
    "/images/kim yoohyeon.jpg",
    "/images/miyawaki sakura.jpg",
    "/images/roseanne park.jpg",
    "/images/wong gaahei.jpg"
];
const thirdParty = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js"
];

// Cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
}

// Install service worker
self.addEventListener("install", evt => {
    console.log("Service worker has been installed");
    evt.waitUntil(
        caches.open(statiCache).then(cache => {
            console.log("Caching shell assets");
            cache.addAll(pages);
            cache.addAll(jsS);
            cache.addAll(cssS);
            cache.addAll(imgs);
            cache.addAll(thirdParty);
        })
    );
});

// Activate service worker event
self.addEventListener("activate", evt => {
    console.log("Service worker has been activated");
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== statiCache && key !== dynamicCache)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch to service worker event
self.addEventListener("fetch", evt => {
    console.log("Fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCache, 150);
                    return fetchRes;
                })
            });
        })
    );
});