const BIN_ID = "68f69f8fd0ea881f40af338e";
const API_KEY = "YOUR_API_KEY_HERE"; // حط هنا الـ secret key بتاعك
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const container = document.getElementById("flashcards");
const addBtn = document.getElementById("add-btn");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

async function loadWords() {
  const res = await fetch(`${BIN_URL}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  const words = data.record || [];
  container.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"><h2>${word.word}</h2></div>
        <div class="card-back">
          <p><b>Definition:</b> ${word.definition}</p>
          <p><b>Example:</b> ${word.example}</p>
        </div>
      </div>
    `;
    card.addEventListener("click", () => {
      card.querySelector(".card-inner").classList.toggle("flipped");
    });
    container.appendChild(card);
  });
}

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

saveBtn.addEventListener("click", async () => {
  const word = document.getElementById("word").value.trim();
  const definition = document.getElementById("definition").value.trim();
  const example = document.getElementById("example").value.trim();

  if (!word || !definition || !example) return alert("Please fill all fields!");

  // تحميل البيانات الحالية
  const res = await fetch(`${BIN_URL}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  const words = data.record || [];

  // إضافة الكلمة الجديدة
  words.push({ word, definition, example });

  // رفع البيانات الجديدة
  await fetch(BIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify(words),
  });

  modal.style.display = "none";
  document.getElementById("word").value = "";
  document.getElementById("definition").value = "";
  document.getElementById("example").value = "";
  loadWords();
});

// تحميل الكروت عند فتح الصفحة
loadWords();
