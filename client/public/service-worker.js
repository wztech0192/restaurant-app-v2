self.addEventListener("fetch", event => {
    if (event.request.method === "GET" && !event.request.url.startsWith("chrome-extension")) {
        event.respondWith(
            caches.open("res-app-dynamic").then(async cache => {
                try {
                    if (!navigator.online) {
                        const cacheMatch = await cache.match(event.request);
                        if (cacheMatch) {
                            return cacheMatch;
                        }
                    }
                    const res = await fetch(event.request);
                    cache.put(event.request, res.clone());
                    return res;
                } catch (e) {
                    console.debug(event.request.url + "failed");
                    console.error(e);
                }
            })
        );
    }
});
