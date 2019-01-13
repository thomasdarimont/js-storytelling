function RGB2HSV(rgb) {
  let hsv = new Object();
  max = max3(rgb.r, rgb.g, rgb.b);
  dif = max - min3(rgb.r, rgb.g, rgb.b);
  hsv.saturation = max == 0.0 ? 0 : (100 * dif) / max;
  if (hsv.saturation == 0) hsv.hue = 0;
  else if (rgb.r == max) hsv.hue = (60.0 * (rgb.g - rgb.b)) / dif;
  else if (rgb.g == max) hsv.hue = 120.0 + (60.0 * (rgb.b - rgb.r)) / dif;
  else if (rgb.b == max) hsv.hue = 240.0 + (60.0 * (rgb.r - rgb.g)) / dif;
  if (hsv.hue < 0.0) hsv.hue += 360.0;
  hsv.value = Math.round((max * 100) / 255);
  hsv.hue = Math.round(hsv.hue);
  hsv.saturation = Math.round(hsv.saturation);
  return hsv;
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
  var rgb = new Object();
  if (hsv.saturation == 0) {
    rgb.r = rgb.g = rgb.b = Math.round(hsv.value * 2.55);
  } else {
    hsv.hue /= 60;
    hsv.saturation /= 100;
    hsv.value /= 100;
    i = Math.floor(hsv.hue);
    f = hsv.hue - i;
    p = hsv.value * (1 - hsv.saturation);
    q = hsv.value * (1 - hsv.saturation * f);
    t = hsv.value * (1 - hsv.saturation * (1 - f));
    switch (i) {
      case 0:
        rgb.r = hsv.value;
        rgb.g = t;
        rgb.b = p;
        break;
      case 1:
        rgb.r = q;
        rgb.g = hsv.value;
        rgb.b = p;
        break;
      case 2:
        rgb.r = p;
        rgb.g = hsv.value;
        rgb.b = t;
        break;
      case 3:
        rgb.r = p;
        rgb.g = q;
        rgb.b = hsv.value;
        break;
      case 4:
        rgb.r = t;
        rgb.g = p;
        rgb.b = hsv.value;
        break;
      default:
        rgb.r = hsv.value;
        rgb.g = p;
        rgb.b = q;
    }
    rgb.r = Math.round(rgb.r * 255);
    rgb.g = Math.round(rgb.g * 255);
    rgb.b = Math.round(rgb.b * 255);
  }
  return rgb;
}

//Adding HueShift via Jacob (see comments)
function HueShift(h, s) {
  h += s;
  while (h >= 360.0) h -= 360.0;
  while (h < 0.0) h += 360.0;
  return h;
}

//min max via Hairgami_Master (see comments)
function min3(a, b, c) {
  return a < b ? (a < c ? a : c) : b < c ? b : c;
}
function max3(a, b, c) {
  return a > b ? (a > c ? a : c) : b > c ? b : c;
}

var colours = {
  none: "#ffffff", //hack
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

function colourNameToHex(colour) {
  if (!colour) {
    return "#FFFFFF";
  }

  if (typeof colours[colour.toLowerCase()] != "undefined")
    return colours[colour.toLowerCase()];

  return "#FFFFFF";
}

window.colorComplement = function(color) {

  var hex = colourNameToHex(color);
  var rgb =
    "rgb(" +
    (hex = hex.replace("#", ""))
      .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
      .map(function(l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .join(",") +
    ")";

  // Get array of RGB values
  rgb = rgb.replace(/[^\d,]/g, "").split(",");
  let thisrgb = { r: rgb[0], g: rgb[1], b: rgb[2] };

  // complement
  let temprgb = thisrgb;
  temphsv = RGB2HSV(temprgb);
  temphsv.hue = HueShift(temphsv.hue, 180.0);
  temprgb = HSV2RGB(temphsv);

  return temprgb;
};
