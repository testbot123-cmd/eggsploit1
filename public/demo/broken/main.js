;(function(){
  if (window.__achLoggerInstalled) return
  window.__achLoggerInstalled = true
  try {
    var saved = localStorage.getItem('bb_achievements')
    window.__achievements = saved ? JSON.parse(saved) : []
  } catch(e) { window.__achievements = [] }
  var __origLog = console.log.bind(console)
  console.log = function() {
    try {
      var args = Array.prototype.slice.call(arguments)
      __origLog.apply(console, args)
      args.forEach(function(a){
        if (typeof a === 'string') {
          var m = a.match(/achievementunlocked\{([^}]+)\}/)
          var key = null
          if (m) {
            key = m[1]
          } else {
            var kws = ['konami_coffee','secret_menu','persistent_clicker','bean_hunter','leet_order','beanstorm','hyper_caffeine']
            for (var i=0;i<kws.length;i++) {
              if (a.indexOf(kws[i]) !== -1) { key = kws[i]; break }
            }
          }
          if (key) {
            if (window.__achievements.indexOf(key) === -1) {
              window.__achievements.push(key)
              try { localStorage.setItem('bb_achievements', JSON.stringify(window.__achievements)) } catch(e){}
            }
            __origLog('%c[Achievements] %s', 'color: #2ecc71; font-weight:bold', window.__achievements.join(', '))
            try { __origLog.call(console, ''); console.table(window.__achievements.map(function(k){return {achievement:k}})) } catch(e){}
          }
        }
      })
    } catch(e) { __origLog('ach-logger-error', e) }
  }
  window.ach = function() { __origLog('All achievements:', window.__achievements); try { __origLog.call(console, ''); console.table(window.__achievements.map(function(k){return {achievement:k}})) } catch(e){} }
  console.ach = window.ach
})()

var menutoggle = document.getElementById('menutoggle')
var navright = document.getElementById('navright')

if (menutoggle) {
  menutoggle.addEventListener('click', function() {
    navright.classList.toggle('open')
  })
}

document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var t = document.querySelector(this.getAttribute('href'))
    if (t) {
      e.preventDefault()
      t.scrollIntoView({ behavior: 'smooth' })
    }
    if (navright) navright.classList.remove('open')
  })
})


var cart = []
var cartlist = document.getElementById('cartlist')
var carttotal = document.getElementById('carttotal')

document.querySelectorAll('.addbtn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var name = this.getAttribute('data-item')
    var price = parseFloat(this.getAttribute('data-price'))
    cart.push({ name: name, price: price })
    if (name === 'Null Pointer') {
      cart.push({ name: name, price: price })
    }
    rendercart()
    this.textContent = 'added!'
    var b = this
    setTimeout(function() { b.textContent = 'add to cart' }, 600)
  })
})

function rendercart() {
  if (cart.length === 0) {
    cartlist.innerHTML = '<p class="cartempty">nothing here yet</p>'
    carttotal.textContent = 'total: $0.00'
    return
  }
  var html = ''
  var total = 0
  for (var i = 0; i < cart.length; i++) {
    html += '<div class="cartitem">'
    html += '<span class="cartitemname">' + cart[i].name + '</span>'
    html += '<span class="cartitemprice">$' + cart[i].price.toFixed(2) + '</span>'
    html += '<button class="cartremove" data-i="' + i + '">x</button>'
    html += '</div>'
    total += cart[i].price
  }
  cartlist.innerHTML = html
  carttotal.textContent = 'total: $' + total.toFixed(2)

  cartlist.querySelectorAll('.cartremove').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-i'))
      if (cart[idx] && cart[idx].name === 'The Recursion' && idx > 0) idx = idx - 1
      cart.splice(idx, 1)
      rendercart()
    })
  })

  if (Math.abs(total - 13.75) < 0.001) {
    carttotal.classList.add('leetmode')
    if (!window.__leetUnlocked) {
      showEggToast('achievementunlocked{leet_order}')
      window.__leetUnlocked = true
    }
  } else {
    carttotal.classList.remove('leetmode')
  }
}

document.getElementById('clearcart').addEventListener('click', function() {
  if (cart.length === 1) return
  cart = []
  rendercart()
})

var submitorder = document.getElementById('submitorder')
var ordermsg = document.getElementById('ordermsg')

submitorder.addEventListener('click', function() {
  var name = document.getElementById('ordername').value.trim()

  if (cart.length === 0) {
    ordermsg.style.color = '#e74c3c'
    ordermsg.textContent = 'cart is empty'
    return
  }

  ordermsg.style.color = '#2ecc71'
  ordermsg.textContent = 'order placed! thanks ' + name
  cart = []
  rendercart()
  document.getElementById('ordername').value = ''
  document.getElementById('orderemail').value = ''
  document.getElementById('ordernotes').value = ''
})


var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
var kpos = 0
document.addEventListener('keydown', function(e) {
  if (e.keyCode === konami[kpos]) {
    kpos++
    if (kpos === konami.length) {
      kpos = 0
      document.body.style.filter = 'invert(1)'
      console.log('%cachievementunlocked{konami_coffee}', 'color: #e8a87c; font-size: 14px; font-weight: bold')
      setTimeout(function() { document.body.style.filter = '' }, 3000)
    }
  } else { kpos = 0 }
})


console.log('%cwelcome to bytebrew', 'color: #e8a87c; font-size: 16px; font-weight: bold')
console.log('%cthe coffee is in the code', 'color: #888; font-size: 12px')
console.log('%chint: type "brewme" on the page', 'color: #555; font-size: 10px')
console.log('%cbonus hint: try "beanstorm" or "sudo" too', 'color: #555; font-size: 10px')


function showEggToast(text) {
  try { console.log(text) } catch(e){}
  var t = document.createElement('div')
  t.className = 'eggtoast'
  t.textContent = text
  document.body.appendChild(t)
  setTimeout(function() { t.classList.add('show') }, 20)
  setTimeout(function() {
    t.classList.remove('show')
    setTimeout(function() { if (t.parentNode) t.parentNode.removeChild(t) }, 250)
  }, 1800)
}

function spawnBeanStorm() {
  var layer = document.createElement('div')
  layer.className = 'beanstormlayer'
  for (var i = 0; i < 26; i++) {
    var bean = document.createElement('span')
    bean.className = 'beanstormbean'
    var left = Math.floor(Math.random() * 100)
    var size = 10 + Math.floor(Math.random() * 18)
    bean.style.left = left + '%'
    bean.style.width = size + 'px'
    bean.style.height = Math.max(8, Math.floor(size * 0.6)) + 'px'
    bean.style.borderRadius = Math.floor(size * 0.5) + 'px / ' + Math.floor(size * 0.6) + 'px'
    bean.style.transform = 'rotate(' + Math.floor(Math.random()*360) + 'deg)'
    bean.style.animationDelay = (Math.random() * 0.9).toFixed(2) + 's'
    bean.style.animationDuration = (1.6 + Math.random() * 1.6).toFixed(2) + 's'
    layer.appendChild(bean)
  }
  document.body.appendChild(layer)
  setTimeout(function() {
    if (layer.parentNode) layer.parentNode.removeChild(layer)
  }, 3000)
}


var typed = ''
document.addEventListener('keypress', function(e) {
  var tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : ''
  if (tag === 'input' || tag === 'textarea') return

  if (e.key.length === 1) typed += e.key.toLowerCase()
  if (typed.length > 12) typed = typed.slice(-12)

  if (typed.slice(-6) === 'brewme') {
    typed = ''
    if (document.getElementById('secretdrink')) return
    console.log('%cachievementunlocked{secret_menu}', 'color: #e8a87c; font-size: 14px; font-weight: bold')
    var drinks = document.querySelector('.drinks')
    var d = document.createElement('div')
    d.className = 'drink'
    d.id = 'secretdrink'
    d.style.borderColor = '#2ecc71'
    d.innerHTML = '<div class="drinktop"><h3 style="color:#2ecc71">Debug Brew</h3><span class="price" style="color:#2ecc71">$0.00</span></div><p>Secret menu item. Fixes all bugs*. (*free cuz it dosent fix any bugs)</p><button class="addbtn" data-item="Debug Brew" data-price="0">add to cart</button>'
    drinks.appendChild(d)
    d.querySelector('.addbtn').addEventListener('click', function() {
      cart.push({ name: 'Debug Brew', price: 0 })
      rendercart()
    })
    d.scrollIntoView({ behavior: 'smooth', block: 'center' })
    showEggToast('achievementunlocked{secret_menu}')
  }

  if (typed.slice(-9) === 'beanstorm') {
    typed = ''
    spawnBeanStorm()
    showEggToast('achievementunlocked{beanstorm}')
  }

  if (typed.slice(-4) === 'sudo') {
    typed = ''
    showEggToast('sudo: permission denied (you need more caffeine)')
  }
})


var heroTitle = document.querySelector('.hero h1')
var heroTapCount = 0
if (heroTitle) {
  heroTitle.addEventListener('click', function() {
    heroTapCount++
    if (heroTapCount === 5) {
      document.body.classList.add('hypermode')
      showEggToast('achievementunlocked{hyper_caffeine}')
      setTimeout(function() {
        document.body.classList.remove('hypermode')
        heroTapCount = 0
      }, 6000)
    }
  })
}


var logo = document.querySelector('.navlogo')
var logoclicks = 0
logo.addEventListener('click', function(e) {
  e.preventDefault()
  logoclicks++
  if (logoclicks === 7) {
    logo.style.color = '#2ecc71'
    logo.textContent = 'ByteBrew!'
    console.log('%cachievementunlocked{persistent_clicker}', 'color: #e8a87c; font-size: 14px; font-weight: bold')
    setTimeout(function() {
      logoclicks = 0
      logo.style.color = ''
      logo.textContent = 'ByteBrew'
    }, 4000)
  }
})


var secretdot = document.getElementById('secretdot')
var popup = document.getElementById('popup')
var popupclose = document.getElementById('popupclose')

secretdot.addEventListener('click', function() {
  popup.classList.add('show')
  console.log('%cachievementunlocked{bean_hunter}', 'color: #e8a87c; font-size: 14px; font-weight: bold')
})

popupclose.addEventListener('click', function() {
  popup.classList.remove('show')
})

popup.addEventListener('click', function(e) {
  if (e.target === popup) popup.classList.remove('show')
})


var realtitle = document.title
setInterval(function() {
  if (Math.random() > 0.92) {
    var g = ''
    for (var i = 0; i < realtitle.length; i++) {
      if (Math.random() > 0.7 && realtitle[i] !== ' ') {
        g += String.fromCharCode(realtitle.charCodeAt(i) + Math.floor(Math.random() * 3) - 1)
      } else {
        g += realtitle[i]
      }
    }
    document.title = g
    setTimeout(function() { document.title = realtitle }, 200)
  }
}, 4000)


setTimeout(function() {
  var reviews = document.querySelectorAll('.review')
  if (reviews.length >= 3) {
    var temp = reviews[1].innerHTML
    reviews[1].innerHTML = reviews[2].innerHTML
    reviews[2].innerHTML = temp
  }
}, 8000)
