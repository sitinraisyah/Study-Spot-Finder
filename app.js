const defaultLat = 5.40719;  // UMT fallback
const defaultLon = 103.08316;

const studySpots = [
  {
    coords: [5.40827, 103.08798],
    title: "📚 PSNZ Library",
    desc: "The main library offers quiet and group study zones, strong Wi-Fi and the ability to book rooms for study groups.",
    img: ["images/psnz1.jpg", "images/psnz2.jpg"]
  },
  {
    coords: [5.41235, 103.08684],
    title: "🏫 Kompleks Kuliah",
    desc: "Lecture complex with multiple air-conditioned halls.",
    img: ["images/kk1.jpg", "images/kk2.jpg", "images/kk3.jpg", "images/kk4.jpg", "images/kk5.jpg"]
  },
  {
    coords: [5.41170, 103.08754],
    title: "🏢 UMT Convention Centre",
    desc: "Spacious venue ideal for quiet self-study and group work.",
    img: ["images/umtcc.jpg"]
  },
  {
    coords: [5.41080, 103.08882],
    title: "💻 FSKM",
    desc: "Faculty of Science and Computer — tech-savvy study areas.",
    img: ["images/fskm.jpg", "images/fskm1.jpg", "images/fskm2.jpg"]
  },
  {
    coords: [5.40974, 103.08600],
    title: "🧪 FPSM",
    desc: "Science faculty labs and lounge study zones.",
    img: ["images/fpsm1.jpg"]
  },
  {
    coords: [5.41191, 103.08561],
    title: "🧪 FSSM",
    desc: "Faculty of Social Science and Marine Studies.",
    img: ["images/fssm.jpg", "images/fssm1.jpg"]
  },
  {
    coords: [5.41077, 103.08719],
    title: "📈 FPEPS",
    desc: "Business and Economics faculty with open desk areas.",
    img: ["images/fpeps1.jpg"]
  },
  {
    coords: [5.40709, 103.09046],
    title: "🕌 Pusat Islam Sultan Mahmud",
    desc: "Peaceful and calm for personal study or reflection.",
    img: ["images/pism1.jpg", "images/pism2.jpg"]
  },
  {
    coords: [5.40505, 103.09167],
    title: "☕ KKSAM",
    desc: "Cafeteria with seating and nearby Wi-Fi hotspots.",
    img: ["images/kksam1.jpg", "images/kksam2.jpg", "images/kksam3.jpg"]
  },
  {
    coords: [5.40517, 103.09392],
    title: "☕ Kafeteria Abdul Rahman Limbong",
    desc: "Popular student eatery, sometimes a great study break zone.",
    img: ["images/limbong1.jpg"]
  },
  {
    coords: [5.40640, 103.08927],
    title: "🏢 Kompleks Siswa",
    desc: "Student center with indoor study spots.",
    img: ["images/kosiswa1.jpg"]
  }
];

function storeLocation(lat, lon, spot) {
  localStorage.setItem('gotoLocation', JSON.stringify({ lat, lon, spot }));
}

function showMap(lat, lon, message = "📍 Your Location") {
  const map = L.map('map-preview').setView([lat, lon], 18);
  document.getElementById('map-preview').style.height = '100%';
  map.invalidateSize();

  const storedLocation = JSON.parse(localStorage.getItem('gotoLocation'));
  if (storedLocation) {
    const { lat, lon, spot } = storedLocation;

    // Center and zoom on the location
    map.setView([lat, lon], 18);

    // Add a marker for that spot
    const highlightMarker = L.marker([lat, lon], {
      icon: L.divIcon({
        className: 'emoji-icon',
        html: '⭐', // Or use 📍 again
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      })
    }).addTo(map).bindPopup(`📍 ${spot}`).openPopup();

    // Optional: clear after use
    localStorage.removeItem('gotoLocation');
  }
 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', ).addTo(map);

  // 📍 Use emoji as marker icon
  const emojiIcon = L.divIcon({
    className: 'emoji-icon',
    html: '📍',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });

  // 📍 Your current location marker
  L.marker([lat, lon], { icon: emojiIcon }).addTo(map).bindPopup(message).openPopup();

  // Description box elements
  const descBox = document.getElementById('description-box');
  const descImg = document.getElementById('desc-img');
  const descTitle = document.getElementById('desc-title');
  const descText = document.getElementById('desc-text');

  let activeMarker = null;

  studySpots.forEach((spot) => {
    const marker = L.marker(spot.coords, { icon: emojiIcon }).addTo(map);

    marker.on('click', () => {
      // Toggle off if same marker clicked again
      if (activeMarker === marker && descBox.classList.contains('show')) {
        hideDesc();
        activeMarker = null;
      } else {
        descBox.classList.remove('hidden');
        descBox.classList.add('show');
        descTitle.textContent = spot.title;
        descText.textContent = spot.desc;
        descImg.innerHTML = "";

        // populate images
        spot.img.forEach(imgPath => {
          const img = document.createElement('img');
          img.src = imgPath;
          img.alt = spot.title;
          descImg.appendChild(img);
        });

        activeMarker = marker;
      }
    });
    
    function showDescriptionBox(content) {
    const box = document.getElementById('description-box');
    box.innerHTML = content;
    box.classList.remove('hidden');
    box.classList.add('show');
  }

    function hideDescriptionBox() {
      const box = document.getElementById('description-box');
      box.classList.remove('show');
      box.classList.add('hidden');
    }
  });
}

    function hideDesc() {
    const box = document.getElementById('description-box');
    box.classList.remove('show');
    box.classList.add('hidden');
  }
// Try to get user location
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      console.log("User location:", lat, lon);
      showMap(lat, lon);
    },
    (err) => {
      console.warn("Geolocation error:", err.message);
      showMap(defaultLat, defaultLon, "📍 UMT (Default Location)");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
} else {
  showMap(defaultLat, defaultLon, "📍 Geolocation not supported");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(reg => console.log("✅ Service Worker registered"))
      .catch(err => console.error("Service Worker registration failed:", err));
  });
}
}

// MULTIPLE IMAGE POSTS SUPPORT
document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("imageUpload");
  const gallery = document.getElementById("gallery");

  function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("spotPosts") || "[]");
    gallery.innerHTML = "";

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";

      post.images.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        postDiv.appendChild(img);
      });

      const time = document.createElement("small");
      time.textContent = `Posted on: ${new Date(post.timestamp).toLocaleString()}`;
      postDiv.appendChild(time);

      gallery.prepend(postDiv);
    });
  }

  upload?.addEventListener("change", (e) => {
    const files = Array.from(e.target.files);
    const readerPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then(images => {
      const posts = JSON.parse(localStorage.getItem("spotPosts") || "[]");
      posts.push({ images, timestamp: Date.now() });
      localStorage.setItem("spotPosts", JSON.stringify(posts));
      loadPosts();
    });
  });

  loadPosts();
});
