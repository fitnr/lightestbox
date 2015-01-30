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

}('lightbox', function() {

  var
    doc = document,
    figure,
    overlay,
    options,
    defaults = {
      namespace: 'lightbox',
      maxWidth: Infinity
    };

  function listenEsc(event) {
    if (event.key === 27)
      hideLightbox();
  }

  function setFigureDims() {
    figure.style.width = (this.width < options.MaxWidth) ? this.width : options.MaxWidth;
    figure.style.height = (this.width < options.MaxWidth) ? this.height : options.MaxWidth / this.width * this.height;
    figure.style.display = 'block';
  }
  //
  // showLightbox()
  // Preloads images. Pleaces new image in lightbox then centers and displays.
  //
  function showLightbox(elem) {
    // prep objects
    var figure = figure || createElems();
    var caption = figure.getElementsByTagName('figcaption').item(0);

    // show overlay (and loading css)
    overlay.style.display = 'block';

    if (elem.getAttribute('title')) {
      caption.style.display = 'block';
      caption.innerText = link.getAttribute('title');
    } else {
      caption.style.display = 'none';
    }
    // create image
    var img = doc.createElement("img");

    img.addEventListener('load', setFigureDims);

    figure.appendChild(img, caption);
    img.src = elem.href;

    // Check for 'esc' keypress
    doc.addEventListener('keypress', listenEsc);
  }

  function hideLightbox() {
    overlay.style.display = figure.style.display = 'none';
    doc.removeEventListener('keypress', listenEsc);
  }

  // elements created:
  // <div id="lightbox-overlay">
  //   <div class="lightbox-loading">Loeading</div>
  // </div>
  // <figure id="lightbox-body">
  //   <img id="lightboxImage" />
  //   <figcaption>{ title element of spawning link }</figcaption>
  // </figure>
  function createElems() {
    // create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
    overlay = doc.createElement("div");
    overlay.className = options.namespace + '-overlay';
    overlay.addEventListener('click', hideLightbox);
    doc.body.insertBefore(overlay, doc.body.firstChild);

    var loading = doc.createElement('div');
    loading.className = options.namespace + '-loading';
    loading.innerText = 'Loading...';
    overlay.appendChild(loading);

    // create lightbox div, same note about styles as above
    figure = doc.createElement("figure");
    figure.className = options.namespace + '-body';
    figure.addEventListener('click', hideLightbox);
    doc.body.insertBefore(figure, overlay.nextSibling);

    // create caption
    var caption = doc.createElement("caption");
    figure.appendChild(caption);

    return figure;
  }

  return function (element, opts) {
    options = (typeof opts === 'object') ? opts : {};

    for (var property in defaults) {
      if (defaults.hasOwnProperty(property) && !opts.hasOwnProperty(property))
        options[property] = defaults[property];
    }

    element.addEventListener('click', function() {
      showLightbox(elem);
      return false;
    });
  };

});