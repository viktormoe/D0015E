
let state;

function gameStart() {
  state = {
    year: 1,
    maxYears: 10,
    population: 100,
    bushels: 2800,
    acres: 1000,
    price: 20,
    fed: 0,
    seed: 0,
    trade: 0,
    last: { starved: 0, newcomers: 0, harvest: 0, rats: 0 }
  };
  setupSliders();
  setOutputs(0, 0, 0);
  refreshStats();
}

function finishTurn() {
  const needBushels = state.fed + state.seed + Math.max(0, state.trade) * state.price;
  const getBushels = Math.max(0, -state.trade) * state.price;
  if (needBushels > state.bushels + getBushels) {
    alert("Du försöker använda mer spannmål än du har.");
    return;
  }
  if (state.trade > 0) {
    state.bushels -= state.trade * state.price;
    state.acres += state.trade;
  } else if (state.trade < 0) {
    const sell = Math.min(-state.trade, state.acres);
    state.acres -= sell;
    state.bushels += sell * state.price;
  }
  state.bushels += Math.max(0, -state.trade) * state.price;
  state.bushels -= state.fed;
  const yieldPerSeed = randInt(2, 5);
  const planted = Math.min(state.seed, state.bushels + state.seed);
  const harvest = Math.floor(planted * yieldPerSeed);
  state.bushels += harvest;
  const rats = Math.floor(state.bushels * randInt(0, 10) / 100);
  state.bushels -= rats;
  const peopleFed = Math.floor(state.fed / 20);
  const starved = Math.max(0, state.population - peopleFed);
  const newcomers = randInt(0, 5);
  state.population = Math.max(0, state.population - starved + newcomers);
  state.last = { starved, newcomers, harvest, rats };
  state.price = randInt(17, 26);
  state.year++;
  refreshStats();
  if (state.population <= 0) {
    alert("Alla dog. Du blev avsatt.");
    gameStart();
    return;
  }
  if (state.year > state.maxYears) {
    alert("Spelet är slut!");
    gameStart();
    return;
  }
  setOutputs(0, 0, 0);
}

function setupSliders() {
  const acresSlider = document.getElementById("sliderAcrestosellbuy");
  const feedSlider  = document.getElementById("sliderFeedpeople");
  const seedSlider  = document.getElementById("sliderPlantwithseed");
  acresSlider.min = -500; acresSlider.max = 500; acresSlider.step = 10; acresSlider.value = 0;
  feedSlider.min = 0; feedSlider.max = 5000; feedSlider.step = 20; feedSlider.value = 0;
  seedSlider.min = 0; seedSlider.max = 5000; seedSlider.step = 10; seedSlider.value = 0;
}

function setOutputs(acres, fed, seed) {
  state.trade = Number(acres) || 0;
  state.fed   = Number(fed)   || 0;
  state.seed  = Number(seed)  || 0;
  document.getElementById("outputAcrestosellbuy").textContent = state.trade;
  document.getElementById("outputFeedpeople").textContent     = state.fed;
  document.getElementById("outputPlantwithseed").textContent  = state.seed;
}

function onChangeAcres(source) {
  const s = document.getElementById("sliderAcrestosellbuy");
  const step = 10;
  if (source === "minusbuttonAcrestosellbuy") s.value = Number(s.value) - step;
  if (source === "plusbuttonAcrestosellbuy")  s.value = Number(s.value) + step;
  setOutputs(s.value, state.fed, state.seed);
}

function onChangeFeeding(source) {
  const s = document.getElementById("sliderFeedpeople");
  const step = 20;
  if (source === "minusbuttonFeedpeople") s.value = Number(s.value) - step;
  if (source === "plusbuttonFeedpeople")  s.value = Number(s.value) + step;
  setOutputs(state.trade, s.value, state.seed);
}

function onChangePlanting(source) {
  const s = document.getElementById("sliderPlantwithseed");
  const step = 10;
  if (source === "minusbuttonPlantwithseed") s.value = Number(s.value) - step;
  if (source === "plusbuttonPlantwithseed")  s.value = Number(s.value) + step;
  setOutputs(state.trade, state.fed, s.value);
}

function refreshStats() {
  byId("year").textContent        = `År ${state.year} av ${state.maxYears}`;
  byId("starved").textContent     = `Svält i år: ${state.last.starved}`;
  byId("newcomers").textContent   = `Nya invånare: ${state.last.newcomers}`;
  byId("population").textContent  = `Befolkning: ${state.population}`;
  byId("acres").textContent       = `Mark (tunnland): ${state.acres}`;
  byId("bushels").textContent     = `Spannmål: ${state.bushels}`;
  byId("harvest").textContent     = `Skörd i år: ${state.last.harvest}`;
  byId("rats").textContent        = `Råttor åt: ${state.last.rats}`;
  byId("price").textContent       = `Pris per tunnland: ${state.price}`;
}

function help() {
  const el = document.getElementById("helpPopup");
  const nowHidden = !el.hasAttribute("hidden");
  if (nowHidden) {
    el.setAttribute("hidden", "");
    document.removeEventListener("keydown", closeOnEsc);
  } else {
    el.removeAttribute("hidden");
    document.addEventListener("keydown", closeOnEsc);
  }
}

function closeOnEsc(e) {
  if (e.key === "Escape") help();
}

function byId(id) { return document.getElementById(id); }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

window.gameStart = gameStart;
window.finishTurn = finishTurn;
window.onChangeAcres = onChangeAcres;
window.onChangeFeeding = onChangeFeeding;
window.onChangePlanting = onChangePlanting;
window.help = help;
