function moveItem(id) {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop || document.getElementById(id).scrollTop || 0;

  let items = document.querySelectorAll(`#${id} [data-scroll-speed]`);

  for(let i = 0; i < items.length; i++) {
    let speed = items[i].getAttribute('data-scroll-speed');
    items[i].style.transform = `translateY(-${scrollTop * 2.5 / speed}px)`;
  }
}

function removeWelcome() {
  let items = document.querySelectorAll('#welcome [data-scroll-speed]');
  let offsets = [];

  for(let i = 0; i < items.length; i++) {
    offsets[i] = items[i].getBoundingClientRect().bottom;

    if(i === items.length - 1) {
      let checkOffset = offsets.filter(offset => offset > 0);
      if(checkOffset.length === 0) {
        let x = document.getElementById('welcome').getBoundingClientRect().bottom;
        let height = document.getElementById('welcome').clientHeight;

        document.getElementById('welcome').style.transform = `translateY(-100vh)`;
        document.getElementById('welcome').style.transition = `transform 0.7s ease-in-out`;
        document.getElementById('welcome').style.opacity = `${x / height}`;
        console.log('wfefwf')
        router.navigate('/intro');
      }
    }
  }
}

function welcomeAnimation(id) {
  moveItem(id);

  removeWelcome();
}

function scrollSection() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop || document.getElementById('scroll').scrollTop || 0;
  let items = document.querySelectorAll(`.horizontal-block`);

  if(scrollTop > prevScrollPosition && scrollIt) {
    if(currentIndex !== items.length - 1) {
      for(let i = 0; i < items.length; i++) {
        scrollIt = false;
        items[i].style.transform = `translateX(-${100 * (currentIndex + 1)}vw)`;
        items[i].style.transition = `transform 0.7s ease-in-out`;
      }
    }
  } else if(scrollTop < prevScrollPosition && scrollIt) {
    if(currentIndex !== 0) {
      for(let i = 0; i < items.length; i++) {
        scrollIt = false;
        items[i].style.transform = `translateX(-${100 * (currentIndex - 1)}vw)`;
        items[i].style.transition = `transform 0.7s ease-in-out`;
      }
    }
  }

  prevScrollPosition = scrollTop;

  setTimeout(() => {
    scrollIt = true;

    let homePositionX = Math.abs(document.getElementById('home').getBoundingClientRect().left);
    let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if(homePositionX % viewportWidth === 0) {
      currentIndex = homePositionX / viewportWidth;
    }
  }, 1200);
}

function loadHTML(url, id, cb) {
  req = new XMLHttpRequest();
  req.open('GET', url);
  req.send();
  req.onload = () => {
    document.getElementById(id).innerHTML = req.responseText;
    if(cb) {
      cb();
    }
  };
}

function setRouter() {
  router.on({
    'intro': function () {
      if(!document.getElementById('home')) {
        loadHTML('./home.html', 'view', () => {
          //document.getElementById("welcome").style.transform = `translateY(-100vh)`;
          document.getElementById("welcome").animate([
            // keyframes
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-100vh)' }
          ], {
            // timing options
            duration: 700
          });
          document.getElementById("welcome").animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0' }
          ], {
            // timing options
            duration: 700
          });
        });
      }
    },
    'about-us': function () {
      if(!document.getElementById('about-us')) {
        loadHTML('./home.html', 'view', () => {
          document.getElementById("welcome").scrollTop = 1000;
          document.getElementById("welcome").animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0' }
          ], {
            // timing options
            duration: 700
          });

        //   let items = document.querySelectorAll(`.horizontal-block`);

        //   for(let i = 0; i < items.length; i++) {
        //     items[i].style.transform = `translateX(-100vw)`;
        //     items[i].style.transition = `transform 0.7s ease-in-out`;
        //   }
        });
      }
    },
    '*': function () {
      loadHTML('./home.html', 'view');
    }
  }).resolve();
}

let router = new Navigo();
let prevScrollPosition = 0;
let currentIndex = 0;
let scrollIt = true;

(function() {
  setRouter();

})();

