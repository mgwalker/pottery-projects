---
---

## Desired volume

Volume: <input type="number" data-volume /> <select data-volume-unit>

  <option value="in3">cubic inches</option>
  <option value="cm3">cubic centimeters</option>
  <option value="fl-oz">ounces</option>
  <option value="cup">cups</option>
</select>

### With...

Height: <input type="number" data-height /><select data-height-unit>

  <option value="in" selected>inches</option>
  <option value="cm">centimeters</option>
</select>

Radius: <input type="number" data-radius /><select data-radius-unit>

  <option value="in" selected>inches</option>
  <option value="cm">centimeters</option>
</select>

Diameter: <input type="number" data-diameter /><select data-diameter-unit>

  <option value="in" selected>inches</option>
  <option value="cm">centimeters</option>
</select>

<script type="module" src="{% script "/scripts/volume-page.js" %}"></script>

## Pre-shrink measures:

**Height:** <span data-measure-height></span>  
**Radius:** <span data-measure-radius></span>  
**diameter:** <span data-measure-diameter></span>

---

**Volume:** <span data-measure-volume></span>

<div data-compare style="position: relative;">
  <div data-compare-height style="position: absolute; border-left: 1px solid black;"></div>
  <div data-compare-diameter style="position: absolute; border-top: 1px solid black;"></div>
  <div data-compare-circle style="position: absolute; border: 1px solid black; border-radius: 100%;">
</div>
