import './style.css'


var menubar = document.getElementById('menubar')
var toggle = document.querySelector('.menutoggle')
var navlinks = document.querySelector('.navlinks')

if (toggle && navlinks) {
  toggle.addEventListener('click', function() {
    var open = navlinks.classList.toggle('open')
    toggle.setAttribute('aria-expanded', open)
  })

  navlinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (!link.classList.contains('navdropdowntoggle')) {
        navlinks.classList.remove('open')
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  })
}

var navdropdowns = document.querySelectorAll('.navdropdown')
navdropdowns.forEach(function(dropdown) {
  var toggle = dropdown.querySelector('.navdropdowntoggle')
  var menu = dropdown.querySelector('.dropdownmenu')
  if (toggle && menu) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 600) {
        e.preventDefault()
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none'
      }
    })
  }
})

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'))
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (navlinks) {
      navlinks.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })
})

var cards = document.querySelectorAll(
  '.heroleft, .heroright, .stepcard, .ideacard, .notecard, .desctext'
)

cards.forEach(function(el, i) {
  el.classList.add('reveal')
  el.style.transitionDelay = (i % 5) * 0.07 + 's'
})

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return
      entry.target.classList.add('show')
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  cards.forEach(function(el) { observer.observe(el) })
} else {
  cards.forEach(function(el) { el.classList.add('show') })
}


var glitchtext = document.querySelector('.glitchtext')

if (glitchtext) {
  setInterval(function() {
    if (Math.random() > 0.6) {
      glitchtext.classList.add('glitchactive')
      setTimeout(function() {
        glitchtext.classList.remove('glitchactive')
      }, 200)
    }
  }, 1500)
}


var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
var konamiindex = 0
var errorglitchaudio = new Audio('/assets/error-glitch.mp3')

document.addEventListener('keydown', function(e) {
  if (e.keyCode === konami[konamiindex]) {
    konamiindex++
    if (konamiindex === konami.length) {
      konamiindex = 0
      doegg('konami')
    }
  } else {
    konamiindex = 0
  }
})


// logging stuff into console
console.log('%cyou opened the console', 'color: #ec3750; font-size: 16px; font-weight: bold')
console.log('%cthat makes you the right kind of person....', 'color: #8492a6; font-size: 12px')
console.log('')
console.log('%c--- LOGS ---', 'color: #33d6a6; font-family: monospace')
console.log('%chint: try the konami code', 'color: #444; font-family: monospace; font-size: 10px')


function doegg(type) {
  if (type === 'konami') {
    errorglitchaudio.currentTime = 0
    errorglitchaudio.play().catch(function() {})
    document.body.style.transition = 'filter .3s'
    document.body.style.filter = 'hue-rotate(180deg)'
    console.log('%cachievementunlocked{konami_master}', 'color: #ff8c37; font-size: 14px; font-weight: bold')

    setTimeout(function() {
      document.body.style.filter = 'none'
    }, 3000)
  }
}

var eggicon = document.querySelector('.eggiconlol')
var eggclicks = 0
var eggcrackingaudio = new Audio('/assets/egg-cracking.mp3')

if (eggicon) {
  eggicon.addEventListener('click', function(e) {
    e.preventDefault()
    e.stopPropagation()
    eggclicks++

    if (eggclicks === 5) {
      eggicon.src = '/assets/logocracked.png'
      eggcrackingaudio.currentTime = 0
      eggcrackingaudio.play().catch(function() {})
      console.log('%c🥚 achievementunlocked{persistent_clicker}', 'color: #ff8c37; font-size: 14px; font-weight: bold')

      setTimeout(function() {
        eggclicks = 0
        eggicon.src = '/assets/logo.png'
      }, 10000)
    }
  })
}


var devtoolsopen = false
var amongususaudio = new Audio('/assets/amongus-sus.mp3')
var devtoolsthreshold = 160

function checkdevtools() {
  var widthdiff = window.outerWidth - window.innerWidth > devtoolsthreshold
  var heightdiff = window.outerHeight - window.innerHeight > devtoolsthreshold

  if (widthdiff || heightdiff) {
    if (!devtoolsopen) {
      devtoolsopen = true
      amongususaudio.currentTime = 0
      amongususaudio.play().catch(function() {})
      console.log('%cachievementunlocked{console_explorer}', 'color: #ff8c37; font-size: 14px; font-weight: bold')
    }
  } else {
    devtoolsopen = false
  }
}

setInterval(checkdevtools, 500)


var chickenegg = document.querySelector('.chickenegg')
var chickenoverlay = document.getElementById('chickenoverlay')
var chickenscreamingaudio = new Audio('/assets/chicken-screaming.mp3')

if (chickenegg && chickenoverlay) {
  chickenegg.addEventListener('click', function(e) {
    e.preventDefault()
    chickenscreamingaudio.currentTime = 0
    chickenscreamingaudio.play().catch(function() {})
    chickenoverlay.classList.add('active')
    console.log('%cachievementunlocked{chicken_finder}', 'color: #ff8c37; font-size: 14px; font-weight: bold')

    setTimeout(function() {
      chickenoverlay.classList.remove('active')
    }, 5000)
  })
}


window.addEventListener('load', function() {
  document.body.style.opacity = '0'
  document.body.style.transition = 'opacity .4s'
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      document.body.style.opacity = '1'
    })
  })
})


var originaltitle = document.title
setInterval(function() {
  if (Math.random() > 0.95) {
    var glitched = originaltitle.split('').map(function(c) {
      if (Math.random() > 0.7 && c !== ' ') {
        return String.fromCharCode(c.charCodeAt(0) + Math.floor(Math.random() * 3) - 1)
      }
      return c
    }).join('')
    document.title = glitched
    setTimeout(function() { document.title = originaltitle }, 200)
  }
}, 4000)

var eggnoticeoverlay = document.getElementById('eggnoticeoverlay')
var eggnoticeclose = document.getElementById('eggnoticeclose')
var eggrevealbtn = document.getElementById('eggrevealbtn')
var egglaterbtn = document.getElementById('egglaterbtn')
var egghints = document.getElementById('egghints')
var hintIndex = 0

if (eggnoticeoverlay) {
  setTimeout(function() {
    requestAnimationFrame(function() {
      eggnoticeoverlay.classList.add('show')
    })
  }, 1000)
}

if (eggnoticeclose) {
  eggnoticeclose.addEventListener('click', function() {
    eggnoticeoverlay.classList.remove('show')
  })
}

if (eggrevealbtn) {
  eggrevealbtn.addEventListener('click', function() {
    if (!egghints) return
    var items = egghints.querySelectorAll('.egghintsitem')
    if (hintIndex === 0) {
      egghints.style.display = 'block'
      eggrevealbtn.textContent = 'Reveal Next'
    }
    if (hintIndex < items.length) {
      var item = items[hintIndex]
      item.style.opacity = '0'
      requestAnimationFrame(function() {
        item.style.opacity = '1'
      })
      hintIndex++
      if (hintIndex >= items.length) {
        eggrevealbtn.textContent = 'All Revealed'
        eggrevealbtn.disabled = true
      }
    }
  })
}

if (egglaterbtn) {
  egglaterbtn.addEventListener('click', function() {
    var navlinks = document.getElementById('navlinks') || document.querySelector('.navlinks')
    if (navlinks && !document.querySelector('.nav-easter')) {
      var li = document.createElement('li')
      li.className = 'nav-easter'
      li.innerHTML = '<a href="#" class="nav-easter-link" aria-label="Easter Eggs">🥚</a>'
      navlinks.appendChild(li)
      var link = li.querySelector('a')
      link.addEventListener('click', function(e) {
        e.preventDefault()
        eggnoticeoverlay.classList.add('show')
      })
    }
    eggnoticeoverlay.classList.remove('show')
  })
}

if (eggnoticeoverlay) {
  eggnoticeoverlay.addEventListener('click', function(e) {
    if (e.target === eggnoticeoverlay) {
      eggnoticeoverlay.classList.remove('show')
    }
  })
}