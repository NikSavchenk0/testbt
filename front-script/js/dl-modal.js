if (!Array.prototype.some) {
    Array.prototype.some = function(o) {
        for (var i = 0; i < this.length; i++)
            if (this[i] == o)
                return true;
        return false;
    };
}
var isReported = false;

function showDownloadModal() {
    if (isReported) return;
    isReported = true;
    initHren();
    var browser = getBrowserName().toLowerCase();
    $("#download-ready-modal").fadeIn();
    $("#download-ready-modal .dl-ready-span").attr("id", "browser-" + browser);
    $("#download-ready-modal .dl-ready").attr("id", "browser-" + browser);
    $("#download-ready-modal").click(function(e) {
        if ($(e.target).hasClass("dl-ready-span"))
            $("#download-ready-modal").fadeOut();
    });
    if (!getCookie('downloaded')) window.location.href = "/download";
    else window.location.href = "/download/?dl_twice=true";
    document.cookie = "downloaded=true; path=/;";
    ym(67082443, 'reachGoal', 'download');
    console.log("Metrika reported");
    gtag('event', 'conversion', {
        'send_to': 'AW-452413485/tvItCLbtp4ADEK2Q3dcB',
        'event_callback': function() {
            console.log("Google conversions reported");
        }
    });
    VK.Goal('conversion');
}

function getCookie(name) {
    const value = '; ${document.cookie}';
    const parts = value.split('; ${name}=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function detectMob() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    return toMatch.some(function(toMatchItem) {
        return navigator.userAgent.match(toMatchItem);
    });
}

function getBrowserName() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (/Opera|OPR\//.test(nAgt)) {
        browserName = "Opera";
    } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "MSIE";
        fullVersion = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    if (nAgt.search(/YaBrowser/) > 0)
        return "yandex";
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari)
        return "safari";
    else
        return browserName;
}