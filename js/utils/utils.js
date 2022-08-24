function parse(value, ...args) {
  return typeof value === "function" ? value(...args) : value;
}

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function updateBuyThings(key, can, list = ["cannotbuy", "canbuy"]) {
  el(key).replaceClass(...(can ? list : list.reverse()));
}

// map images to their glitch.global parts
function imageMap(imageName) {
  const type = imageName.endsWith("compact") ? "jpg" : "png";
  return `https://cdn.glitch.global/a8bae54f-d7d3-4a51-8ee6-6fbadebe03a5/${imageName}.${type}?v=${Date.now()}`;
}