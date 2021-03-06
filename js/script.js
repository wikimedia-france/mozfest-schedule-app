/**
 * Created by jitrixis on 26/07/2016.
 */
color = ["green", "blue", "red", "purple", "yellow"];
appCache = window.applicationCache;
lastNotif = "";
cacheNotif = {
    "not-supported":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-cache-error.svg",
        ".cache-notice .cache-text": "Votre navigateur ne supporte pas la fonctionnalité hors-ligne."
    },
    "error":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-cache-error.svg",
        ".cache-notice .cache-text": "Une erreur est servenue. La fonctionnalité hors-ligne peut ne pas fonctionner correctement."
    },
    "busy":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-cache-busy.svg",
        ".cache-notice .cache-text": "Chargement en cours."
    },
    "warning":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-cache-warning.svg",
        ".cache-notice .cache-text": "Une mise à jour est disponible. Rechargez la page."
    },
    "ok":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-cache-ok.svg",
        ".cache-notice .cache-text": "Regardez ce programme hors-ligne."
    },
    "offline":{
        ".cache-notice .cache-icon": "./vendor/schedule-app-core/img/icon-offline.svg",
        ".cache-notice .cache-text": "Vous êtes actuellement hors-ligne."
    }
};
cacheNotif["obsolete"] = cacheNotif["error"];
cacheNotif["cached"] = cacheNotif["ok"];
cacheNotif["noupdate"] = cacheNotif["ok"];
cacheNotif["online"] = cacheNotif["ok"];
cacheNotif["checking"] = cacheNotif["busy"];
cacheNotif["downloading"] = cacheNotif["busy"];
cacheNotif["progress"] = cacheNotif["busy"];
cacheNotif["updateready"] = cacheNotif["warning"];

// Fired after the first cache of the manifest.
appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
appCache.addEventListener('error', handleCacheEvent, false);

// Fired after the first download of the manifest.
appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
appCache.addEventListener('updateready', handleCacheEvent, false);

window.addEventListener("offline", handleCacheEvent, false);

window.addEventListener("online", handleCacheEvent, false);

function changeNotice(type, progress){
    if(cacheNotif.hasOwnProperty(type)){
        notif = cacheNotif[type];
        $.each(notif, function(selector, value) {
            if($(selector).prop("tagName") == "IMG"){
                $(selector).attr("src", value)
            }else {
                if(progress != -1){
                    $(selector).text(value + " ( " + Math.round(progress*100) + "% )");
                }else {
                    $(selector).text(value);
                }
            }
        });
    }
    lastNotif = type;
}

function handleCacheEvent(e) {
    if(!navigator.onLine){
        changeNotice("offline", -1);
    }else {
        if (e.type == "progress") {
            changeNotice(e.type, e.loaded / e.total);
        } else {
            changeNotice(e.type, -1);
        }
        if (e.type == "updateready") {
            appCache.swapCache();
        }
    }
}

function toggleMapSize(e){
    $(e).toggleClass("full");
}

$( document ).ready(function () {
    try {
        if(!navigator.onLine){
            changeNotice("offline", -1);
        }else{
            switch (appCache.status) {
                case appCache.UNCACHED:
                    changeNotice("error", -1);
                    break;
                case appCache.IDLE:
                    changeNotice("ok", -1);
                    break;
                case appCache.CHECKING:
                case appCache.DOWNLOADING:
                    changeNotice("busy", -1);
                    break;
                case appCache.UPDATEREADY:
                    changeNotice("warning", -1);
                    break;
                case appCache.OBSOLETE:
                    changeNotice("error", -1);
                    break;
                default:
                    changeNotice("not-supported", -1);
                    break;
            }
        }
    }
    catch (e) {
        changeNotice("not-supported", -1);
        throw e;
    }
});

$("ul li a, #page-links a").click(function(){
    $("body").attr("data-theme", color[(color.indexOf($("body").attr("data-theme"))+1)%5])
});

$(".cache-notice").click(function(){
    if(navigator.onLine){
        if(appCache.status == appCache.UPDATEREADY || lastNotif == "updateready" || lastNotif == "warning"){
            location.reload();
        }else {
            appCache.update();
        }
    }
});