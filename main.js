(function() {
    var STORE_DOMAINS = ['chrome.google.com', 'chromewebstore.google.com'];
    var STORE_BASE_PATHS = ['/webstore/detail/', '/detail/'];
    var CRX_BASE_URL = 'https://clients2.google.com/service/update2/crx';

    var form = document.getElementById('form');
    var downloadLink = document.getElementById('downloadLink');

    if (STORE_DOMAINS.length != STORE_BASE_PATHS.length) {
        alert("STORE_DOMAINS.length != STORE_BASE_PATHS.length; Contact the administrator to fix main.js");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
    
        form.action = '';

        var urlStr = form.url.value;
        if (!urlStr) {
            alert('Please enter a URL');
            return;
        }
    
        var url = new URL(urlStr);
        var isValidUrl = false;
        var i;
        for (i = 0; i < STORE_DOMAINS.length; i++) {
            if (url.host == STORE_DOMAINS[i] && url.pathname.startsWith(STORE_BASE_PATHS[i])) {
                isValidUrl = true;
                break;
            }
        }
        if (!isValidUrl) {
            var errorText = 'Please enter a valid extension link that starts with ' + STORE_DOMAINS[0] + STORE_BASE_PATHS[0];
            if (STORE_DOMAINS.length > 1) {
                for (i = 1; i < STORE_DOMAINS.length - 1; i++) {
                    errorText += ', ' + STORE_DOMAINS[i] + STORE_BASE_PATHS[i];
                }
                errorText += ' or ' + STORE_DOMAINS[i] + STORE_BASE_PATHS[i];
            }
            alert(errorText);
            return;
        }
    
        var extId = url.pathname.split('/').pop();
        var crxUrlParams = new URLSearchParams({
            response: 'redirect',
            prodversion: '91.0',
            acceptformat: 'crx2,crx3',
            x: 'id=' + extId + '&uc'
        });
        var crxUrl = CRX_BASE_URL + '?' + crxUrlParams;

        downloadLink.href = crxUrl;
        downloadLink.click();
    });
})();
