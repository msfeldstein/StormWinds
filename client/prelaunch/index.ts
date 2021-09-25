import "./index.css";

const eldritch = new URL("./assets/eldritch.svg", import.meta.url);
const gem = new URL("./assets/gem.svg", import.meta.url);
const loveless = new URL("./assets/loveless.svg", import.meta.url);
const shard = new URL("./assets/shard.svg", import.meta.url);
const sword = new URL("./assets/sword.svg", import.meta.url);
const undead = new URL("./assets/undead.svg", import.meta.url);
const svgs = [eldritch, gem, loveless, shard, sword, undead];
let i = 0;
setInterval(() => {
  const svg = svgs[i++ % svgs.length];
  console.log(svg.pathname);
  (document.querySelector("#svg-icon") as HTMLImageElement).src = svg.pathname;
}, 1000);
