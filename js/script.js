function generateFields() {
  const parent = document.querySelector("field-parts");
  for (let i = 0; i < 25; i++) {
    let field = document.createElement("field-part");
    field.classList.add("grass");
    field.dataset.seed = "0";
    parent.appendChild(field);
  }
}

function labourer() {
  let fields = document.querySelectorAll("field-part");
  let hoe = document.getElementById("tool-hoe");

  for (let field of fields) {
    field.addEventListener("click", function () {
      if (hoe.classList.contains("active")) {
        field.classList.remove("grass");
        field.classList.add("farmland");
      }
    });
  }
}

function arroser() {
  let fields = document.querySelectorAll("field-part");
  let water = document.getElementById("tool-water");

  for (let field of fields) {
    field.addEventListener("click", function () {
      if (water.classList.contains("active")) {
        field.classList.add("hydrated");
        setTimeout(() => drought(field), 10000);
      }
    });
  }
}

function semer() {
  let fields = document.querySelectorAll("field-part");
  let seed = document.getElementById("tool-sow");

  for (let field of fields) {
    field.addEventListener("click", function () {
      if (seed.classList.contains("active")) {
        field.dataset.seed = "1";
      }
    });
  }
}

function drought(field){
  field.classList.remove("hydrated");
}

function dirt(field){
  field.classList.remove("farmland");
  field.classList.add("grass");
}

function moissonner() {
  let fields = document.querySelectorAll("field-part");
  let moissonneuse = document.getElementById("tool-harvest");

  for (let field of fields) {
    field.addEventListener("click", function () {
      if (moissonneuse.classList.contains("active")) {
        if (field.dataset.seed === "7") {
          let pff = parseInt(document.getElementById("stock-wheat").textContent) + 1;
          document.getElementById("stock-wheat").textContent = pff.toString();
        }
        field.dataset.seed = "0";
        field.classList.remove("hydrated");
      }
    });
  }
}

function grow() {
  let fields = document.querySelectorAll("field-part");
  let stock = 0;
  
  for (let field of fields){
    let chance = field.classList.contains("hydrated") ? 0.3 : 0.05;
    let chance_dirt = 0.01;
    if (field.dataset.seed !== "0" && field.dataset.seed !== "7" && field.classList.contains("hydrated") && Math.random() < chance){
        stock = parseInt(field.dataset.seed);
        stock += 1;
        field.dataset.seed = stock.toString();
    }
    else if (field.dataset.seed === "0" && !field.classList.contains("hydrated") && Math.random() < chance_dirt){
      dirt(field);
    }
  }

  setTimeout(grow, 1000);
}

function activateTool(event) {
  let tools = document.querySelectorAll("tool");

  for (const tool of tools) {
    tool.classList.toggle("active", tool === event.target);
  }
}

function attachToolsEvent() {
  let hoe = document.getElementById("tool-hoe");
  let water = document.getElementById("tool-water");
  let seed = document.getElementById("tool-sow");
  let sow = document.getElementById("tool-harvest");

  hoe.addEventListener("click", activateTool);
  water.addEventListener("click", activateTool);
  seed.addEventListener("click", activateTool);
  sow.addEventListener("click", activateTool);
}

window.addEventListener("load", function () {
  generateFields();
  attachToolsEvent();
  labourer();
  arroser();
  semer();
  moissonner();
  grow();
});

