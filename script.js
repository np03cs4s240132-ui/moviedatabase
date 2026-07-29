/* FIREBASE CONFIG — Replace with YOUR project's config object
   (Firebase Console → Project Settings → Your apps → SDK setup) */

const firebaseConfig = {
  apiKey: "AIzaSyC1ILbxEPt4_rhtogICSItUTHsdwcri7b0",
  authDomain: "task2-240132.firebaseapp.com",
  projectId: "task2-240132",
  storageBucket: "task2-240132.firebasestorage.app",
  messagingSenderId: "69308609584",
  appId: "1:69308609584:web:99f8884f3c64eb4fc9e9f5",
  measurementId: "G-ZX3XHJRVQE"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/** Must match your Firestore collection exactly (case‑sensitive). */
const COLLECTION = "review";

let reviews = [];
let editingId = null;

/** YYYY‑MM‑DD for <input type="date"> — accepts ISO dates or locale strings like "May 8, 2026". */
function releaseDateToIso(val) {
  if (val === undefined || val === null || val === "") return "";
  let s = val;
  if (typeof s !== "string") {
    if (s.toDate) {
      const dt = s.toDate();
      const y = dt.getFullYear();
      const m = String(dt.getMonth() + 1).padStart(2, "0");
      const day = String(dt.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    s = String(s);
  }
  s = s.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const t = Date.parse(s);
  if (!Number.isNaN(t)) {
    const dt = new Date(t);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return s;
}

/** Readable table cell — keeps human strings intact, formats ISO as "d Mon yyyy". */
function formatReleaseDateDisplay(releaseIsoOrRaw) {
  if (!releaseIsoOrRaw || releaseIsoOrRaw === "—") return "—";
  const str = String(releaseIsoOrRaw).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const [y, m, d] = str.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

/** Build fields as stored in your Firestore (name, release_date). */
function firestoreMoviePayload(formData) {
  return {
    name: formData.title,
    director: formData.director,
    release_date: formData.releaseDate,
    rating: formData.rating
  };
}

/** Map arbitrary doc fields → the shape the UI expects (helps console / legacy docs). */
function normalizeReviewDoc(raw) {
  const pick = (...keys) => {
    for (const k of keys) {
      const v = raw[k];
      if (v !== undefined && v !== null && v !== "") return v;
    }
    return undefined;
  };

  const title = pick("title", "movieTitle", "movie_title", "name", "Movie Title");
  const director = pick("director", "directorName", "Director");
  const pickedRelease = pick("releaseDate", "release_date", "date", "release");

  let rating = pick("rating", "stars", "score");
  if (rating != null && typeof rating !== "number") rating = Number(rating);
  if (Number.isNaN(rating)) rating = 0;
  rating = Math.max(0, Math.min(5, Math.round(rating)));

  const releaseIso = releaseDateToIso(pickedRelease);

  return {
    ...raw,
    title: title != null ? String(title) : "",
    director: director != null ? String(director) : "",
    releaseDate: releaseIso,
    rating,
    _releaseRaw: pickedRelease != null ? String(pickedRelease) : ""
  };
}

const starRow = document.getElementById("star-row");
const inpRating = document.getElementById("inp-rating");
let currentRating = 0;

function buildStars(selected = 0) {
  starRow.innerHTML = "";
  for (let i = 0; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = i === 0 ? "x" : "*";
    star.title = i === 0 ? "No rating" : `${i} star${i > 1 ? "s" : ""}`;
    star.style.cssText =
      `cursor:pointer;font-size:${i === 0 ? "1rem" : "1.25rem"};` +
      `color:${i <= selected && i > 0 ? "#5435c9" : i === 0 && selected === 0 ? "#5435c9" : "#cbd5e1"};` +
      `user-select:none;`;
    star.dataset.val = i;

    star.addEventListener("click", () => {
      currentRating = i;
      inpRating.value = i;
      buildStars(i);
    });
    star.addEventListener("mouseenter", () => buildStarsHover(i));
    starRow.addEventListener("mouseleave", () => buildStars(currentRating));
    starRow.appendChild(star);
  }
}

function buildStarsHover(hovered) {
  Array.from(starRow.children).forEach((s, idx) => {
    if (idx === 0) {
      s.style.color = hovered === 0 ? "#5435c9" : "#cbd5e1";
    } else {
      s.style.color = idx <= hovered ? "#5435c9" : "#cbd5e1";
    }
  });
}

buildStars(0);

function getFormValues() {
  return {
    title: document.getElementById("inp-title").value.trim(),
    director: document.getElementById("inp-director").value.trim(),
    releaseDate: document.getElementById("inp-date").value,
    rating: parseInt(inpRating.value, 10) || 0
  };
}

function clearForm() {
  document.getElementById("inp-title").value = "";
  document.getElementById("inp-director").value = "";
  document.getElementById("inp-date").value = "";
  currentRating = 0;
  inpRating.value = 0;
  buildStars(0);
}

function populateForm(doc) {
  document.getElementById("inp-title").value = doc.title || "";
  document.getElementById("inp-director").value = doc.director || "";
  const iso =
    doc.releaseDate && /^\d{4}-\d{2}-\d{2}$/.test(doc.releaseDate)
      ? doc.releaseDate
      : releaseDateToIso(doc.releaseDate || doc._releaseRaw);
  document.getElementById("inp-date").value = iso || "";
  currentRating = doc.rating || 0;
  inpRating.value = currentRating;
  buildStars(currentRating);
}

function cancelEdit() {
  editingId = null;
  clearForm();
  document.getElementById("form-title").textContent = "Add New Review";
  document.getElementById("cancel-btn").style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function submitForm() {
  const data = getFormValues();

  if (!data.title) {
    toast("Please enter a movie title.");
    return;
  }
  if (!data.director) {
    toast("Please enter the director name.");
    return;
  }
  if (!data.releaseDate) {
    toast("Please choose a release date.");
    return;
  }

  try {
    const payload = {
      ...firestoreMoviePayload(data),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    if (editingId) {
      await db.collection(COLLECTION).doc(editingId).update(payload);
      toast("Review updated.");
    } else {
      await db.collection(COLLECTION).add({
        ...payload,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      toast("Review added.");
    }
    cancelEdit();
  } catch (err) {
    console.error(err);
    toast("Error: " + err.message);
  }
}

async function deleteReview(id, title) {
  if (!confirm(`Delete "${title}"?`)) return;
  try {
    await db.collection(COLLECTION).doc(id).delete();
    toast("Review deleted.");
  } catch (err) {
    console.error(err);
    toast("Error: " + err.message);
  }
}

function editReview(id) {
  const doc = reviews.find((r) => r.id === id);
  if (!doc) return;
  editingId = id;
  populateForm(doc);
  document.getElementById("form-title").textContent = "Edit Review";
  document.getElementById("cancel-btn").style.display = "inline-block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startListener() {
  document.getElementById("loading").style.display = "block";

  db.collection(COLLECTION).onSnapshot(
    (snapshot) => {
      document.getElementById("loading").style.display = "none";

      reviews = snapshot.docs.map((d) => ({
        id: d.id,
        ...normalizeReviewDoc(d.data())
      }));

      if (reviews.length === 0) {
        console.info(
          '[moviereview] No documents in collection "' +
            COLLECTION +
            '". Confirm the collection name in Firebase Console and that Rules allow reads for this app.'
        );
      } else {
        console.debug(
          "[moviereview] Loaded",
          reviews.length,
          'reviews from "' + COLLECTION + '"'
        );
      }

      renderTable();
    },
    (err) => {
      document.getElementById("loading").style.display = "none";
      console.error("[moviereview] Firestore listener failed:", err);
      let hint = "";
      if (err.code === "permission-denied") {
        hint =
          " Rules are blocking reads. In Firebase Console → Firestore → Rules, allow read for this path (or sign in if your rules require auth).";
      }
      toast("Firestore: " + err.message + hint);
    }
  );
}

function renderTable() {
  const field = document.getElementById("sort-field").value;
  const dir = document.getElementById("sort-dir").value === "asc" ? 1 : -1;

  const sorted = [...reviews].sort((a, b) => {
    let va = a[field] ?? "";
    let vb = b[field] ?? "";
    if (field === "rating") {
      va = +va;
      vb = +vb;
    } else {
      va = String(va).toLowerCase();
      vb = String(vb).toLowerCase();
    }
    return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
  });

  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  const empty = document.getElementById("empty-state");
  if (sorted.length === 0) {
    empty.style.display = "block";
  } else {
    empty.style.display = "none";
    sorted.forEach((r) => {
      tbody.appendChild(buildRow(r));
    });
  }

  document.getElementById("count-badge").textContent =
    `${sorted.length} review${sorted.length !== 1 ? "s" : ""}`;
}

function buildRow(r) {
  const tr = document.createElement("tr");

  const stars = typeof r.rating === "number" && !Number.isNaN(r.rating) ? r.rating : 0;
  const filled = "*".repeat(stars);
  const emptyStars = "*".repeat(Math.max(0, 5 - stars));

  const dateStr = r.releaseDate
    ? formatReleaseDateDisplay(r.releaseDate)
    : formatReleaseDateDisplay(r._releaseRaw) || "—";

  tr.innerHTML = `
      <td><strong>${escHtml(r.title || "—")}</strong></td>
      <td>${escHtml(r.director || "—")}</td>
      <td>${escHtml(dateStr)}</td>
      <td>
        <span class="stars-display">${filled}</span><span class="stars-empty">${emptyStars}</span>
        <small class="muted"> (${stars}/5)</small>
      </td>
      <td>
        <div class="action-btns">
          <button type="button" class="btn-edit" onclick="editReview('${r.id}')">Edit</button>
          <button type="button" class="btn-del" onclick="deleteReview('${r.id}', '${escAttr(r.title)}')">Delete</button>
        </div>
      </td>
    `;
  return tr;
}

let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escAttr(str) {
  return String(str).replace(/'/g, "\\'");
}

startListener();
