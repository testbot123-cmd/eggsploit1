var gallerydata = []

function rendergallery() {
  var container = document.getElementById('gallerygrid')
  if (!container) return

  if (gallerydata.length === 0) {
    container.innerHTML = '<div class="emptygallery" style="grid-column: 1 / -1;"><h2>Coming Soon!</h2><p>Submit your Eggsploit website to get featured in our gallery.</p><p style="color: #555; font-size: 13px;">Be the first to have your site showcased here. Start building!</p></div>'
    return
  }

  container.innerHTML = ''

  gallerydata.forEach(function(item, index) {
    var card = document.createElement('div')
    card.className = 'gallerycard reveal'
    card.style.transitionDelay = (index % 3) * 0.1 + 's'

    var thumbnail = item.thumbnail ? '<img src="' + item.thumbnail + '" alt="' + item.title + '" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22250%22%3E%3Crect fill=%22%23222%22 width=%22400%22 height=%22250%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2224%22 fill=%22%23666%22%3EImage%3C/text%3E%3C/svg%3E\'">' : 'Image'

    card.innerHTML = '<div class="gallerythumbnail">' + thumbnail + '</div>' +
      '<div class="gallerycontent">' +
      '<h3 class="gallerytitle">' + item.title + '</h3>' +
      '<p class="galleryby">by <a href="' + item.bylink + '" target="_blank">' + item.by + '</a></p>' +
      '<p class="gallerydesc">' + item.description + '</p>' +
      '<div class="gallerylinks">' +
      '<a href="' + item.live + '" target="_blank" class="gallerylinkbtn">Live Preview</a>' +
      '<a href="' + item.code + '" target="_blank" class="gallerylinkbtn secondary">Code</a>' +
      '</div>' +
      '</div>'

    container.appendChild(card)
  })

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return
        entry.target.classList.add('show')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.gallerycard.reveal').forEach(function(el) {
      observer.observe(el)
    })
  } else {
    document.querySelectorAll('.gallerycard.reveal').forEach(function(el) {
      el.classList.add('show')
    })
  }
}

fetch('gallery/gallery.json')
  .then(function(response) {
    if (!response.ok) throw new Error('Failed to load gallery data')
    return response.json()
  })
  .then(function(data) {
    gallerydata = data
    rendergallery()
  })
  .catch(function(error) {
    console.error('Error loading gallery data:', error)
    rendergallery()
  })
