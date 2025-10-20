
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const cancel = document.getElementById("cancel");
const saveWord = document.getElementById("saveWord");

let vocab = JSON.parse(localStorage.getItem("vocab")) || words;

function saveToLocal() {
  localStorage.setItem("vocab", JSON.stringify(vocab));
}

function renderTable(filter = "") {
  tableBody.innerHTML = "";
  const filtered = vocab.filter(item =>
    item.word.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.word}</td>
      <td>${item.definition}</td>
      <td>${item.synonyms || "-"}</td>
      <td>${item.example}</td>
    `;
    tableBody.appendChild(row);
  });
}

search.addEventListener("input", e => renderTable(e.target.value));

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

cancel.addEventListener("click", () => {
  modal.style.display = "none";
});

saveWord.addEventListener("click", () => {
  const word = document.getElementById("newWord").value.trim();
  const definition = document.getElementById("newDefinition").value.trim();
  const synonyms = document.getElementById("newSynonyms").value.trim();
  const example = document.getElementById("newExample").value.trim();

  if (!word || !definition) {
    alert("Word and definition are required!");
    return;
  }

  vocab.push({ word, definition, synonyms, example });
  saveToLocal();
  renderTable();
  modal.style.display = "none";

  // reset inputs
  document.getElementById("newWord").value = "";
  document.getElementById("newDefinition").value = "";
  document.getElementById("newSynonyms").value = "";
  document.getElementById("newExample").value = "";
});

renderTable();
