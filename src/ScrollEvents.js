
export const setupScrollObserver = (el, areaId, zoomLevel = 14) => {

  const callback = (entries, observer) => {
    // console.log(observer);
    // entries.forEach(entry => {
    //   console.log(entry);
    // });
    document.mainMap?.flyMapTo(areaId, zoomLevel);
  };

  const makeObserver = function (selector, callback) {
    const observer = new IntersectionObserver(callback, {
      root: document.root,
      rootMargin: '0px',
      threshold: 0.0
    });
    try {
      observer.observe(el.shadowRoot.querySelector(selector));
    } catch (e) {
      console.error('Couldn\'t get ' + selector);
    }
  };

  // const waypoints = ['#ktown', '#hollywood', '#venice']
  makeObserver('.scroll-trigger', callback);
};
