/* js/temples.js */
(async function () {
  // config
  const DATA_URL = 'temples.json'; // path to temples.json
  const MAP_CENTER = [22.0, 79.0]; // India center
  const MAP_ZOOM = 5;

  // elements
  const stateSelect = document.getElementById('stateFilter');
  const searchBox = document.getElementById('searchBox');
  const templeList = document.getElementById('templeList');
  const modal = document.getElementById('tmplModal');
  const modalInner = document.getElementById('tmplModalInner');
  const modalClose = document.getElementById('tmplClose');

  // init map
  const map = L.map('map', { zoomControl: true }).setView(MAP_CENTER, MAP_ZOOM);

  // OpenStreetMap tiles (include attribution)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // clustering layer
  const markersGroup = L.markerClusterGroup ? L.markerClusterGroup() : L.layerGroup();
  map.addLayer(markersGroup);

  // load data
  let temples = [];
  try {
    const res = await fetch(DATA_URL);
    temples = await res.json();
  } catch (err) {
    console.error('Failed loading temples.json', err);
    templeList.innerHTML = '<p style="color:crimson">Failed to load temple data.</p>';
    return;
  }

  // create useful maps
  const markersById = {};
  const statesSet = new Set();

  // custom icon
  const pinIcon = L.icon({
    iconUrl: 'images/temples/pin.png', // create a pin image or use a small svg
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -36]
  });

  // add markers
  temples.forEach(t => {
    statesSet.add(t.state);

    const marker = L.marker([t.lat, t.lng], { title: t.name, icon: pinIcon })
      .on('click', () => openModalFor(t))
      .bindTooltip(t.name, { direction: 'top', offset: [0, -10] });

    markersGroup.addLayer(marker);
    markersById[t.id] = marker;
  });

  // populate state select
  const states = Array.from(statesSet).sort();
  states.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    stateSelect.appendChild(opt);
  });

  // render temple list
  function renderList(list) {
    templeList.innerHTML = '';
    list.forEach(t => {
      const div = document.createElement('div');
      div.className = 'temple-item';
      div.tabIndex = 0;
      div.innerHTML = `
        <img class="temple-thumb" src="${t.image}" alt="${t.name}" onerror="this.style.opacity=0.85" />
        <div class="temple-meta">
          <h4>${t.name}</h4>
          <p>${t.short} • <strong>${t.state}</strong></p>
        </div>
      `;
      div.addEventListener('click', () => {
        // pan to marker and open modal
        map.setView([t.lat, t.lng], 13, { animate: true });
        markersById[t.id].openPopup?.(); // not required, we open modal manually
        openModalFor(t);
      });
      templeList.appendChild(div);
    });
  }

  renderList(temples);

  // filtering
  function applyFilters() {
    const state = stateSelect.value;
    const q = searchBox.value.trim().toLowerCase();
    const filtered = temples.filter(t => {
      const stateMatch = (state === 'all') || (t.state === state);
      const textMatch = !q || (t.name.toLowerCase().includes(q) || t.short.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
      return stateMatch && textMatch;
    });

    // update list
    renderList(filtered);

    // update markers visibility: easiest is to clear and re-add
    markersGroup.clearLayers();
    filtered.forEach(t => {
      markersGroup.addLayer(markersById[t.id]);
    });

    // fit bounds to filtered markers
    const latlngs = filtered.map(t => [t.lat, t.lng]);
    if (latlngs.length === 1) {
      map.setView(latlngs[0], 13);
    } else if (latlngs.length > 1) {
      map.fitBounds(latlngs, { padding: [60, 60] });
    } else {
      map.setView(MAP_CENTER, MAP_ZOOM);
    }
  }

  stateSelect.addEventListener('change', applyFilters);
  searchBox.addEventListener('input', () => {
    // small debounce
    clearTimeout(searchBox._deb);
    searchBox._deb = setTimeout(applyFilters, 220);
  });

  // open modal
  function openModalFor(t) {
    modalInner.innerHTML = `
      <h2>${t.name}</h2>
      <p><strong>${t.state}</strong></p>
      <img src="${t.image}" alt="${t.name}" style="width:100%;max-height:260px;object-fit:cover;border-radius:8px;margin:8px 0;" />
      <p>${t.description}</p>
      <p><a href="${t.moreLink || '#'}" target="_blank" rel="noopener">Read more</a></p>
    `;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
  }

  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  });

  // click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      modal.style.display = 'none';
    }
  });

})();
