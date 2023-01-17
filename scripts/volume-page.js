import { volumeConversions } from "./conversions.js";

const volume = document.querySelector("[data-volume]");
const volumeUnit = document.querySelector("[data-volume-unit]");

const height = document.querySelector("[data-height]");
const heightUnit = document.querySelector("[data-height-unit]");
const radius = document.querySelector("[data-radius]");
const radiusUnit = document.querySelector("[data-radius-unit]");
const diameter = document.querySelector("[data-diameter]");
const diameterUnit = document.querySelector("[data-diameter-unit]");

const SHRINKAGE = 0.12;

let BASE = "";

const update = () => {
  // The user hasn't set a height or radius, so we can't do the calculations yet
  if (BASE === "") {
    return;
  }

  const vol = Number.parseFloat(volume.value);
  const unit = volumeUnit.value;

  const targetUnit = (() => {
    switch (heightUnit.value) {
      case "in":
        return "in3";
      case "cm":
        return "cm3";
      default:
        return "in3";
    }
  })();

  const targetVol = vol * volumeConversions.get(unit).get(targetUnit);

  if (BASE === "height") {
    const h = Number.parseFloat(height.value);
    const r = Math.sqrt(targetVol / (Math.PI * h));
    radius.value = r.toFixed(3);
    diameter.value = (r * 2).toFixed(3);
  } else if (BASE === "radius") {
    const r = Number.parseFloat(radius.value);
    diameter.value = (r * 2).toFixed(3);

    const h = targetVol / (Math.PI * r * r);
    height.value = h.toFixed(3);
  } else if (BASE === "diameter") {
    const d = Number.parseFloat(diameter.value);
    radius.value = (d / 2).toFixed(3);

    const h = targetVol / ((Math.PI * d * d) / 4);
    height.value = h.toFixed(3);
  }

  const hh = Number.parseFloat(height.value) * (1 + SHRINKAGE);
  const rr = Number.parseFloat(radius.value) * (1 + SHRINKAGE);
  const dd = rr * 2;
  const vv = Math.PI * rr * rr * hh;

  document.querySelector("[data-measure-height]").innerText = hh.toFixed(3);
  document.querySelector("[data-measure-radius]").innerText = rr.toFixed(3);
  document.querySelector("[data-measure-diameter]").innerText = dd.toFixed(3);
  document.querySelector("[data-measure-volume]").innerText = vv.toFixed(3);

  console.log(`${hh}${targetUnit}`);
  const u = heightUnit.value;
  const w = `${dd}${u}`;
  const h = `${hh}${u}`;
  const r = `${rr}${u}`;
  document.querySelector("[data-compare]").style.height = h;
  document.querySelector("[data-compare]").style.width = w;
  document.querySelector("[data-compare-height]").style.left = r;
  document.querySelector("[data-compare-height]").style.height = h;
  document.querySelector("[data-compare-height]").style.width = r;
  document.querySelector("[data-compare-diameter]").style.top = `${hh / 2}${u}`;
  document.querySelector("[data-compare-diameter]").style.width = w;

  const c = document.querySelector("[data-compare-circle]").style;
  c.top = `${hh / 2}${u}`;
  c.left = r;
  c.marginTop = `-${r}`;
  c.marginLeft = `-${r}`;
  c.width = w;
  c.height = w;
};

const setBaseDimension = (dim) => {
  return () => {
    BASE = dim;

    if (dim === "height") {
      radiusUnit.value = heightUnit.value;
      diameterUnit.value = heightUnit.value;
    } else if (dim === "radius") {
      diameter.value = (radius.value * 2).toFixed(3);
      heightUnit.value = radiusUnit.value;
      diameterUnit.value = heightUnit.value;
    } else if (dim === "diameter") {
      radius.value = (diameter.value / 2).toFixed(3);
      radiusUnit.value = heightUnit.value;
      heightUnit.value = radiusUnit.value;
    }

    update();
  };
};

if (volume && volumeUnit && height && heightUnit && radius && radiusUnit) {
  volume.addEventListener("input", update);
  volumeUnit.addEventListener("change", update);

  height.addEventListener("input", setBaseDimension("height"));
  heightUnit.addEventListener("change", setBaseDimension("height"));
  radius.addEventListener("input", setBaseDimension("radius"));
  radiusUnit.addEventListener("change", setBaseDimension("radius"));
  diameter.addEventListener("input", setBaseDimension("diameter"));
  diameterUnit.addEventListener("change", setBaseDimension("diameter"));
}
