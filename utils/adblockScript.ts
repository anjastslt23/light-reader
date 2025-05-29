// Expert-level AdBlock JavaScript injection
export const ADBLOCK_SCRIPT = `
(function() {
  // Ad blocking rules for domains and selectors
  const blockedDomains = [
    // Gambling ads
    'googleads.g.doubleclick.net',
    'googlesyndication.com',
    'google-analytics.com',
    'googletagservices.com',
    'googleadservices.com',
    'casino',
    'gambling',
    'bet365',
    'poker',
    'slots',
    // Banner ads
    'ads.yahoo.com',
    'adsystem.amazon.com',
    'facebook.com/tr',
    'amazon-adsystem.com',
    'adsystem.amazon.com',
    'ads.twitter.com',
    'ads.pinterest.com',
    'outbrain.com',
    'taboola.com',
    'revcontent.com',
    'mgid.com',
    'adnxs.com',
    'adsystem.amazon.com',
    'scorecardresearch.com',
    'quantserve.com',
    'adsystem.amazon.co.uk',
    'media.net',
    'pubmatic.com',
    'rubiconproject.com',
    'openx.net',
    'amazon.com/gp/aw/sis',
    'amazon.com/dp/aw/sis'
  ];

  const adSelectors = [
    // Generic ad selectors
    '[id*="ad"]',
    '[class*="ad"]',
    '[id*="banner"]',
    '[class*="banner"]',
    '[id*="popup"]',
    '[class*="popup"]',
    '[id*="modal"]',
    '[class*="modal"]',
    '[id*="overlay"]',
    '[class*="overlay"]',
    '[id*="close"]',
    '[class*="close"]',
    '[id*="ads"]',
    '[class*="ads"]',
    '[id*="adbox"]',
    '[class*="adbox"]',
    '[id*="lightbox"]',
    '[class*="lightbox"]',
    '[id*="pop"]',
    '[class*="pop"]',
    '[id*="layer"]',
    '[class*="layer"]',
    '[id*="backdrop"]',
    '[class*="backdrop"]',
    '[id*="blocker"]',
    '[class*="blocker"]',
    '[id*="interstitial"]',
    '[class*="interstitial"]',
    '[id*="subscribe"]',
    '[class*="subscribe"]',
    '[id*="newsletter"]',
    '[class*="newsletter"]',
    '[id*="notification"]',
    '[class*="notification"]',
    '[id*="promo"]',
    '[class*="promo"]',
    '[id*="offer"]',
    '[class*="offer"]',
    '[id*="reward"]',
    '[class*="reward"]',
    '[id*="gift"]',
    '[class*="gift"]',
    '[id*="bonus"]',
    '[class*="bonus"]',
    '[id*="exit"]',
    '[class*="exit"]',
    '[id*="continue"]',
    '[class*="continue"]',
    '[id*="skip"]',
    '[class*="skip"]',
    '[id*="dismiss"]',
    '[class*="dismiss"]',
    '[id*="xclose"]',
    '[class*="xclose"]',
    '[id*="x-button"]',
    '[class*="x-button"]',
    '[id*="btn-close"]',
    '[class*="btn-close"]',
    '[id*="btnclose"]',
    '[class*="btnclose"]',
    '[id*="close-btn"]',
    '[class*="close-btn"]',
    '[id*="closebutton"]',
    '[class*="closebutton"]',
    '[id*="closead"]',
    '[class*="closead"]',
    '[id*="adclose"]',
    '[class*="adclose"]',
    '[id*="ad-close"]',
    '[class*="ad-close"]',
    '[id*="ad-closer"]',
    '[class*="ad-closer"]',
    '[id*="adcloser"]',
    '[class*="adcloser"]',
    '[id*="ad-overlay"]',
    '[class*="ad-overlay"]',
    '[id*="admodal"]',
    '[class*="admodal"]',
    '[id*="adlayer"]',
    '[class*="adlayer"]',
    '[id*="adblock"]',
    '[class*="adblock"]',
    '[id*="adblocker"]',
    '[class*="adblocker"]',
    '[id*="adblock-popup"]',
    '[class*="adblock-popup"]',
    '[id*="adblock-modal"]',
    '[class*="adblock-modal"]',
    '[id*="adblock-overlay"]',
    '[class*="adblock-overlay"]',
    '[id*="adblocklayer"]',
    '[class*="adblocklayer"]',
    '[id*="adblocker-popup"]',
    '[class*="adblocker-popup"]',
    '[id*="adblocker-modal"]',
    '[class*="adblocker-modal"]',
    '[id*="adblocker-overlay"]',
    '[class*="adblocker-overlay"]',
    '[id*="adblockerlayer"]',
    '[class*="adblockerlayer"]',
    // ...existing code...
  ];

  // Tambahkan CSS untuk memaksa sembunyikan popup/modal/overlay
  const style = document.createElement('style');
  style.innerHTML = \`
    [id*="popup"], [class*="popup"],
    [id*="modal"], [class*="modal"],
    [id*="overlay"], [class*="overlay"],
    [id*="close"], [class*="close"],
    [id*="ads"], [class*="ads"],
    [id*="adbox"], [class*="adbox"],
    [id*="lightbox"], [class*="lightbox"],
    [id*="pop"], [class*="pop"],
    [id*="layer"], [class*="layer"],
    [id*="backdrop"], [class*="backdrop"],
    [id*="blocker"], [class*="blocker"],
    [id*="interstitial"], [class*="interstitial"],
    [id*="subscribe"], [class*="subscribe"],
    [id*="newsletter"], [class*="newsletter"],
    [id*="notification"], [class*="notification"],
    [id*="promo"], [class*="promo"],
    [id*="offer"], [class*="offer"],
    [id*="reward"], [class*="reward"],
    [id*="gift"], [class*="gift"],
    [id*="bonus"], [class*="bonus"],
    [id*="exit"], [class*="exit"],
    [id*="continue"], [class*="continue"],
    [id*="skip"], [class*="skip"],
    [id*="dismiss"], [class*="dismiss"],
    [id*="xclose"], [class*="xclose"],
    [id*="x-button"], [class*="x-button"],
    [id*="btn-close"], [class*="btn-close"],
    [id*="btnclose"], [class*="btnclose"],
    [id*="close-btn"], [class*="close-btn"],
    [id*="closebutton"], [class*="closebutton"],
    [id*="closead"], [class*="closead"],
    [id*="adclose"], [class*="adclose"],
    [id*="ad-close"], [class*="ad-close"],
    [id*="ad-closer"], [class*="ad-closer"],
    [id*="adcloser"], [class*="adcloser"],
    [id*="ad-overlay"], [class*="ad-overlay"],
    [id*="admodal"], [class*="admodal"],
    [id*="adlayer"], [class*="adlayer"],
    [id*="adblock"], [class*="adblock"],
    [id*="adblocker"], [class*="adblocker"],
    [id*="adblock-popup"], [class*="adblock-popup"],
    [id*="adblock-modal"], [class*="adblock-modal"],
    [id*="adblock-overlay"], [class*="adblock-overlay"],
    [id*="adblocklayer"], [class*="adblocklayer"],
    [id*="adblocker-popup"], [class*="adblocker-popup"],
    [id*="adblocker-modal"], [class*="adblocker-modal"],
    [id*="adblocker-overlay"], [class*="adblocker-overlay"],
    [id*="adblockerlayer"], [class*="adblockerlayer"],
    [role="dialog"],
    [aria-modal="true"],
    .modal, .popup, .overlay, .backdrop, .ad, .ads, .adbox, .lightbox, .interstitial, .subscribe, .newsletter, .notification, .promo, .offer, .reward, .gift, .bonus, .exit, .continue, .skip, .dismiss, .xclose, .x-button, .btn-close, .btnclose, .close-btn, .closebutton, .closead, .adclose, .ad-close, .ad-closer, .adcloser, .ad-overlay, .admodal, .adlayer, .adblock, .adblocker, .adblock-popup, .adblock-modal, .adblock-overlay, .adblocklayer, .adblocker-popup, .adblocker-modal, .adblocker-overlay, .adblockerlayer,
    [aria-label*="close"], [title*="close"], [class*="close"], [id*="close"] {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -9999 !important;
      max-height: 0 !important;
      max-width: 0 !important;
      height: 0 !important;
      width: 0 !important;
      position: fixed !important;
    }
  \`;
  document.head.appendChild(style);

  let blockedCount = 0;

  // Function to notify React Native about blocked content
  function notifyBlocked() {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'adBlocked',
        count: blockedCount
      }));
    }
  }
  // Function to block network requests
  function blockRequest(url) {
    for (const domain of blockedDomains) {
      if (url.includes(domain)) {
        blockedCount++;
        notifyBlocked();
        console.log('AdBlock: Blocked request to', url);
        return true;
      }
    }
    return false;
  }

  // --- Tambahan whitelist domain utama ---
  const mainDomain = window.location.hostname;
  function isWhitelisted(url) {
    try {
      const u = new URL(url, window.location.href);
      return u.hostname === mainDomain;
    } catch {
      return false;
    }
  }

  // Perkuat selector iklan judi
  adSelectors.push(
    '[class*="judi"]', '[id*="judi"]', '[href*="judi"]', '[src*="judi"]',
    '[class*="slot"]', '[id*="slot"]', '[href*="slot"]', '[src*="slot"]',
    '[class*="toto"]', '[id*="toto"]', '[href*="toto"]', '[src*="toto"]',
    '[class*="sbobet"]', '[id*="sbobet"]', '[href*="sbobet"]', '[src*="sbobet"]',
    '[class*="bola"]', '[id*="bola"]', '[href*="bola"]', '[src*="bola"]',
    '[class*="casino"]', '[id*="casino"]', '[href*="casino"]', '[src*="casino"]'
  );

  // --- Perkuat blokir popup/redirect ---
  // Blokir window.open, location.href, assign, replace jika ke domain luar
  const originalOpen = window.open;
  window.open = function(url, ...args) {
    if (!isWhitelisted(url)) {
      blockedCount++;
      notifyBlocked();
      console.log('AdBlock: Blocked popup/redirect to', url);
      return null;
    }
    return originalOpen.call(this, url, ...args);
  };

  function blockRedirect(url) {
    if (!isWhitelisted(url)) {
      blockedCount++;
      notifyBlocked();
      console.log('AdBlock: Blocked redirect to', url);
      return true;
    }
    return false;
  }

  // Blokir location.href, assign, replace
  const originalAssign = window.location.assign;
  window.location.assign = function(url) {
    if (!blockRedirect(url)) {
      return originalAssign.call(this, url);
    }
  };
  const originalReplace = window.location.replace;
  window.location.replace = function(url) {
    if (!blockRedirect(url)) {
      return originalReplace.call(this, url);
    }
  };
  Object.defineProperty(window.location, 'href', {
    set: function(url) {
      if (!blockRedirect(url)) {
        window.location.assign(url);
      }
    }
  });

  // --- Pastikan blockRequest tidak blokir resource dari mainDomain ---
  const _blockRequest = blockRequest;
  blockRequest = function(url) {
    if (isWhitelisted(url)) return false;
    return _blockRequest(url);
  };

  // Override fetch to block ad requests
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string' && blockRequest(url)) {
      return Promise.reject(new Error('Blocked by AdBlock'));
    }
    return originalFetch.apply(this, args);
  };

  // Override XMLHttpRequest to block ad requests
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (blockRequest(url)) {
      return;
    }
    return originalOpen.call(this, method, url, ...args);
  };

  // Block script tags with ad domains
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && blockRequest(value)) {
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };

  // Function to remove ad elements
  function removeAds() {
    let removed = 0;
    
    adSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // Check if element looks like an ad
          const text = el.textContent?.toLowerCase() || '';
          const classes = el.className?.toLowerCase() || '';
          const id = el.id?.toLowerCase() || '';
          
          if (
            text.includes('sponsored') ||
            text.includes('advertisement') ||
            text.includes('casino') ||
            text.includes('gambling') ||
            text.includes('bet now') ||
            classes.includes('ad') ||
            classes.includes('banner') ||
            classes.includes('sponsor') ||
            id.includes('ad') ||
            id.includes('banner') ||
            id.includes('sponsor')
          ) {            el.style.display = 'none !important';
            el.remove();
            removed++;
            blockedCount++;
            notifyBlocked();
          }
        });
      } catch (e) {
        // Ignore selector errors
      }
    });
    
    return removed;
  }

  // Prevent pop-ups and redirects
  const originalOpen = window.open;
  window.open = function(url, target, features) {
    if (!url || url === 'about:blank') return originalOpen.call(this, url, target, features);
    
    const currentDomain = window.location.hostname;
    let targetDomain;
    
    try {
      targetDomain = new URL(url, window.location.href).hostname;
    } catch (e) {
      return null; // Block invalid URLs
    }
      // Block external redirects that might be ads
    if (targetDomain !== currentDomain && !url.startsWith(window.location.origin)) {
      console.log('AdBlock: Blocked popup/redirect to', url);
      blockedCount++;
      notifyBlocked();
      return null;
    }
    
    return originalOpen.call(this, url, target, features);
  };

  // Block unwanted navigation
  const originalNavigate = history.pushState;
  history.pushState = function(state, title, url) {
    if (url && blockRequest(url)) {
      console.log('AdBlock: Blocked navigation to', url);
      return;
    }
    return originalNavigate.call(this, state, title, url);
  };

  // Remove ads on load and periodically
  function scanAndRemove() {
    const removed = removeAds();
    if (removed > 0) {
      console.log('AdBlock: Removed', removed, 'ad elements');
    }
  }

  // Initial scan
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndRemove);
  } else {
    scanAndRemove();
  }

  // Periodic scanning for dynamically loaded ads
  setInterval(scanAndRemove, 2000);

  // Observer for new elements
  const observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldScan = true;
      }
    });
    
    if (shouldScan) {
      setTimeout(scanAndRemove, 100);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Expose blocked count for React Native
  window.getAdBlockStats = function() {
    return { blockedCount };
  };

  // Kirim judul halaman ke React Native setiap kali berubah
  function sendTitle() {
    if (window.ReactNativeWebView && document.title) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'pageTitle',
        title: document.title
      }));
    }
  }
  // Kirim saat load dan saat title berubah
  document.addEventListener('DOMContentLoaded', sendTitle);
  window.addEventListener('load', sendTitle);
  // Perbaikan: observer pada <title> bisa null, fallback ke document.title
  const titleEl = document.querySelector('title');
  if (titleEl) {
    const titleObserver = new MutationObserver(sendTitle);
    titleObserver.observe(titleEl, { childList: true });
  } else {
    // Fallback: poll title setiap 1s jika <title> tidak ditemukan
    setInterval(sendTitle, 1000);
  }

  console.log('AdBlock: Expert ad blocking enabled');
})();
`;
