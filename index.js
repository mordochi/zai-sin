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
        router.navigate('/intro');
      }
    }
  }
}

function moveItem(id) {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop || document.getElementById(id).scrollTop || 0;

  let items = document.querySelectorAll(`#${id} [data-scroll-speed]`);

  for(let i = 0; i < items.length; i++) {
    let speed = items[i].getAttribute('data-scroll-speed');
    items[i].style.transform = `translateY(-${scrollTop * 2.5 / speed}px)`;
  }
}

function welcomeAnimation(id) {
  moveItem(id);

  removeWelcome();
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
          document.getElementById("welcome").scrollTop = 1000;
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
    '2': function () {

    },
    '*': function () {
      loadHTML('./home.html', 'view');
    }
  }).resolve();
}


let router = new Navigo();

(function() {

  setRouter();
})();