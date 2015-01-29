/*!
  http://github.com/fitnr/litebox

  Adapted from:
  Lightbox JS: Fullsize Image Overlays
  @author: Lokesh Dhakar
  @date: 2005-2006
  @link: http://huddletogether.com/projects/lightbox/
  @license: Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
  (basically, do anything you want, just leave my name and link)

  Updates by Neil Freeman, same license.
*/
!function (name, definition) {

  if (typeof module != 'undefined')
    module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object')
    define(definition);
  else
    this[name] = definition();

}('lightbox', function(options) {
  // If you would like to use a custom loading image or close button reference them in the next two lines.
  //
  // Configuration
  //
  var
    doc = document,
    docElem = doc.documentElement,
    defaultOptions = {
      loadingImage: '/img/lightbox/loading.gif',
      closeButton: '', //'close.gif';
      class: 'lightbox'
    };

  options = (typeof options === 'object') ? options : {};

  for (var prop in defaultOptions) {
    if (defaultOptions.hasOwnProperty(prop) && !options.hasOwnPropert(prop))
      options[prop] = defaultOptions[prop];
  }

  //
  // getPageScroll()
  // Returns array with x,y page scroll values.
  // Core code from - quirksmode.org
  //
  function getPageScroll() {

    var yScroll;

    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
    } else if (docElem && docElem.scrollTop) { // Explorer 6 Strict
      yScroll = docElem.scrollTop;
    } else if (doc.body) { // all other Explorers
      yScroll = doc.body.scrollTop;
    }

    arrayPageScroll = new Array('', yScroll);
    return arrayPageScroll;
  }

  // getPageSize()
  // Returns array with page width, height and window width, height
  // Core code from - quirksmode.org
  // Edit for Firefox by pHaez
  function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
      xScroll = doc.body.scrollWidth;
      yScroll = window.innerHeight + window.scrollMaxY;
    } else if (doc.body.scrollHeight > doc.body.offsetHeight) { // all but Explorer Mac
      xScroll = doc.body.scrollWidth;
      yScroll = doc.body.scrollHeight;
    } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
      xScroll = doc.body.offsetWidth;
      yScroll = doc.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
      windowWidth = self.innerWidth;
      windowHeight = self.innerHeight;
    } else if (docElem && docElem.clientHeight) { // Explorer 6 Strict Mode
      windowWidth = docElem.clientWidth;
      windowHeight = docElem.clientHeight;
    } else if (doc.body) { // other Explorers
      windowWidth = doc.body.clientWidth;
      windowHeight = doc.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if (yScroll < windowHeight) {
      pageHeight = windowHeight;
    } else {
      pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if (xScroll < windowWidth) {
      pageWidth = windowWidth;
    } else {
      pageWidth = xScroll;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return arrayPageSize;
  }

  //
  // pause(numberMillis)
  // Pauses code execution for specified time. Uses busy code, not good.
  // Code from http://www.faqts.com/knowledge_base/view.phtml/aid/1602
  //
  function pause(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  }

  // getKey(key)
  // Gets keycode. If 'x' is pressed then it hides the lightbox.
  //
  function getKey(e) {
    if (e === null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    key = String.fromCharCode(keycode).toLowerCase();

    if (key == 'x') {
      hideLightbox();
    }
  }

  //
  // listenKey()
  //
  function listenKey() { doc.onkeypress = getKey; }

  //
  // showLightbox()
  // Preloads images. Pleaces new image in lightbox then centers and displays.
  //
  function showLightbox(objLink) {
    // prep objects
    var objOverlay = options.objOverlay,
      objLightbox = options.objLightbox,
      objCaption = options.objCaption,
      objImage = options.objImage,
      objLoadingImage = options.objLoadingImage,
      objLightboxDetails = options.objLightboxDetails,

      arrayPageSize = getPageSize(),
      arrayPageScroll = getPageScroll();

    // center loadingImage if it exists
    if (objLoadingImage) {
      objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
      objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
      objLoadingImage.style.display = 'block';
    }

    // set height of Overlay to take up whole page and show
    objOverlay.style.height = (arrayPageSize[1] + 'px');
    objOverlay.style.display = 'block';

    // preload image
    imgPreload = new Image();

    imgPreload.onload = function() {
      objImage.src = objLink.href;

      // center lightbox and make sure that the top and left values are not negative
      // and the image placed outside the viewport
      var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
      var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);

      objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
      objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";

      objLightboxDetails.style.width = imgPreload.width + 'px';

      if (objLink.getAttribute('title')) {
        objCaption.style.display = 'block';
        //objCaption.style.width = imgPreload.width + 'px';
        objCaption.innerHTML = objLink.getAttribute('title');
      } else {
        objCaption.style.display = 'none';
      }

      // A small pause between the image loading and displaying is required with IE,
      // this prevents the previous image displaying for a short burst causing flicker.
      if (navigator.appVersion.indexOf("MSIE") != -1) {
        pause(250);
      }

      if (objLoadingImage) {
        objLoadingImage.style.display = 'none';
      }

      // Hide select boxes as they will 'peek' through the image in IE
      selects = doc.getElementsByTagName("select");
      for (i = 0; i != selects.length; i++) {
        selects[i].style.visibility = "hidden";
      }

      objLightbox.style.display = 'block';

      // After image is loaded, update the overlay height as the new image might have
      // increased the overall page height.
      arrayPageSize = getPageSize();
      objOverlay.style.height = (arrayPageSize[1] + 'px');

      // Check for 'x' keypress
      listenKey();

      return false;
    };
    imgPreload.src = objLink.href;
  }

  //
  // hideLightbox()
  //
  function hideLightbox() {
    // get objects
    var objOverlay = options.objOverlay,
      objLightbox = options.objLightbox;

    // hide lightbox and overlay
    objOverlay.style.display = 'none';
    objLightbox.style.display = 'none';

    // make select boxes visible
    selects = doc.getElementsByTagName("select");
    for (i = 0; i != selects.length; i++) {
      selects[i].style.visibility = "visible";
    }

    // disable keypress listener
    doc.onkeypress = '';
    return false;
  }

  function createLightboxFn(elem) {
    return function() {
      showLightbox(elem);
      return false;
    };
  }

  function preLoad() {
    var imgPreloader = new Image();

    // if loader image found, create link to hide lightbox and create loadingimage
    imgPreloader.onload = function() {

      var objLoadingImageLink = doc.createElement("a");
      objLoadingImageLink.setAttribute('href', '#');
      objLoadingImageLink.onclick = function() {
        hideLightbox();
        return false;
      };

      objOverlay.appendChild(objLoadingImageLink);

      var objLoadingImage = doc.createElement("img");
      objLoadingImage.src = options.loadingImage;
      objLoadingImage.setAttribute('id', 'loadingImage');
      objLoadingImage.style.position = 'absolute';
      objLoadingImage.style.zIndex = '150';
      objLoadingImageLink.appendChild(objLoadingImage);

      imgPreloader.onload = function() {}; //  clear onLoad, as IE will flip out w/animated gifs

      options.objLoadingImage = objLoadingImage;

      return false;
    };

    imgPreloader.src = options.loadingImage;
    return imgPreloader;
  }

  // <div id="overlay">
  //    <a href="#" onclick="hideLightbox(); return false;"><img id="loadingImage" /></a>
  //  </div>
  // <div id="lightbox">
  //    <a href="#" onclick="hideLightbox(); return false;" title="Click anywhere to close image">
  //      <img id="closeButton" />
  //      <img id="lightboxImage" />
  //    </a>
  //    <div id="lightboxDetails">
  //      <span id="lightboxCaption"></span>
  //      <span id="keyboardMsg"></span>
  //    </div>
  // </div>
  function createLightboxElems(objBody) {
    // create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
    var objOverlay = doc.createElement("div"),
      // preload and create loader image
      imgPreloader = preLoad();

    objOverlay.setAttribute('id', namespace + '-overlay');
    objOverlay.className = namespace + '-overlay';
    objOverlay.addEventListener('click', hideLightbox);
    objOverlay.style.display = 'none';
    objOverlay.style.position = 'absolute';
    objOverlay.style.top = '0';
    objOverlay.style.left = '0';
    objOverlay.style.zIndex = '90';
    objOverlay.style.width = '100%';
    objBody.insertBefore(objOverlay, objBody.firstChild);

    options.objOverlay = objOverlay;

    // create lightbox div, same note about styles as above
    var objLightbox = doc.createElement("div");
    objLightbox.setAttribute('id', namespace + '-body');
    objLightbox.className = namespace + '-body';
    objLightbox.style.display = 'none';
    objLightbox.style.position = 'absolute';
    objLightbox.style.zIndex = '100';
    objBody.insertBefore(objLightbox, objOverlay.nextSibling);

    options.objLightbox = objLightbox;

    // create link
    var objLink = doc.createElement("a");
    objLink.setAttribute('href', '#');
    objLink.setAttribute('title', 'Click to close');
    objLink.addEventListener('click', hideLightbox);
    objLightbox.appendChild(objLink);

    // preload and create close button image
    var imgPreloadCloseButton = new Image();

    // if close button image found,
    imgPreloadCloseButton.onload = function() {

      var objCloseButton = doc.createElement("img");
      objCloseButton.src = options.closeButton;
      objCloseButton.className = namespace + '-closebutton';
      objCloseButton.setAttribute('id', 'closeButton');
      objCloseButton.style.position = 'absolute';
      objCloseButton.style.zIndex = '200';
      objLink.appendChild(objCloseButton);

      return false;
    };

    imgPreloadCloseButton.src = options.closeButton;

    // create image
    var objImage = doc.createElement("img");
    objImage.setAttribute('id', namespace + 'Image');
    objImage.className = namespace + '-image';
    objLink.appendChild(objImage);

    options.objImage = objImage;

    // create details div, a container for the caption and keyboard message
    var objLightboxDetails = doc.createElement("div");
    objLightboxDetails.setAttribute('id', namespace + 'Details');
    objLightboxDetails.className = namespace + '-details';
    objLightbox.appendChild(objLightboxDetails);

    options.objLightboxDetails = objLightboxDetails;

    // create caption
    var objCaption = doc.createElement("span");
    objCaption.setAttribute("id", namespace + 'Caption');
    objCaption.className = namespace + '-caption';
    objCaption.style.display = 'none';
    objLightboxDetails.appendChild(objCaption);

    options.objCaption = objCaption;

    // create keyboard message
    //var objKeyboardMsg = doc.createElement("div");
    //objKeyboardMsg.setAttribute('id','keyboardMsg');
    //objKeyboardMsg.className = namespace + '-keyboardmsg';
    //objKeyboardMsg.innerHTML = 'press <a href="#" onclick="hideLightbox(); return false;"><kbd>x</kbd></a> to close';
    //objLightboxDetails.appendChild(objKeyboardMsg);
    return objBody;
  }

  //
  // initLightbox()
  // Function runs on window load, going through link tags looking for class="lightbox",
  // or for links inside elements with class="lightbox" (e.g. <div class="lightbox"><a href="foo">link</a></div>)
  // These links receive onclick events that enable the lightbox display for their targets.
  // The function also inserts html markup at the top of the page which will be used as a
  // container for the overlay pattern and the inline image.
  //
  function initLightbox(namespace) {

    namespace = namespace ? namespace : options.namespace;

    if (doc.querySelectorAll === undefined) {
      return;
    }

    links = doc.querySelectorAll("." + namespace).item(0).getElementsByTagName("a");

    // loop through children, hitting anchor tags
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href")) {
        links[i].addEventListener('click', createLightboxFn(links[i]));
      }
    }

    // listener for possible future .lightbox links.
    doc.body.addEventListener("click", function(event) {
      var elem = event.target, anchor;
      while (elem) {

        if (elem.tagName === 'A' && elem.getAttribute('href'))
          anchor = elem;

        if (anchor && elem.classList.contains(namespace)) {
          createLightboxFn(anchor);
          break;
        }

        elem = elem.parentNode;

      }
    });

    // the rest of this code inserts html at the top of the page that looks like this:
    // create lightbox elements that will display images
    createLightboxElems(doc.body);
  }

  return initLightbox;

});