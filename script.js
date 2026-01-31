// 1. SELECTORS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const noiseOverlay = document.getElementById("noiseOverlay");

const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const themeMode = document.getElementById("themeMode");
const customColorScale = document.getElementById("customColorScale");
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const blobSizeSlider = document.getElementById("blobSizeSlider");
const blobAmountSlider = document.getElementById("blobAmountSlider");
const brightnessSlider = document.getElementById("brightnessSlider");
const noiseSlider = document.getElementById("noiseSlider");
const resolutionPreset = document.getElementById("resolutionPreset");
const saturationSlider = document.getElementById("saturationSlider");
const rainbowSlider = document.getElementById("rainbowSlider");
const rainbowSliderGroup = document.getElementById("rainbowSliderGroup");
const backgroundColorPicker = document.getElementById("backgroundColorPicker");
const monochromaticColorPicker = document.getElementById("monochromaticColorPicker");
const monochromaticColorGroup = document.getElementById("monochromaticColorGroup");
const seedInput = document.getElementById("seedInput");
const copySeedBtn = document.getElementById("copySeedBtn");

const PREVIEW_SCALE = 0.5;
let currentSeed = Math.random().toString(36).substring(7);

// 2. SEEDING & RANDOM MATH
function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1>>>0), (h2>>>0), (h3>>>0), (h4>>>0)];
}

function mulberry32(a) {
    return function() {
      let t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// 3. CORE DRAWING LOGIC
function hexToHue(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, d = max - min;
    if (max === min) h = 0;
    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return h * 360;
}

function renderGradient(targetCtx, targetWidth, targetHeight) {
    const seedHash = cyrb128(currentSeed)[0];
    const seededRandom = mulberry32(seedHash);

    const amount = parseInt(blobAmountSlider.value);
    const sizeMult = parseInt(blobSizeSlider.value) / 200;
    const saturation = parseInt(saturationSlider.value);
    const brightness = parseInt(brightnessSlider.value) / 100;
    const mode = themeMode.value;

    // Now all modes (except custom) simply use the Rainbow Slider value
    let baseHue = parseInt(rainbowSlider.value);

    targetCtx.globalCompositeOperation = "source-over";
    targetCtx.filter = "none";
    targetCtx.fillStyle = backgroundColorPicker.value;
    targetCtx.fillRect(0, 0, targetWidth, targetHeight);

    targetCtx.filter = `blur(${Math.max(targetWidth, targetHeight) * 0.08}px)`;
    targetCtx.globalCompositeOperation = "screen";

    for (let i = 0; i < amount; i++) {
        const x = seededRandom() * targetWidth;
        const y = seededRandom() * targetHeight;
        const radius = Math.max(targetWidth, targetHeight) * sizeMult;
        
        let hueOffset = 0;
        switch (mode) {
            case "monochromatic": hueOffset = 0; break; // All blobs same hue, varying brightness
            case "complementary": hueOffset = i % 2 === 0 ? 0 : 180; break;
            case "analogous": hueOffset = i % 3 === 0 ? 0 : (i % 3 === 1 ? 30 : -30); break;
            case "triadic": hueOffset = i % 3 === 0 ? 0 : (i % 3 === 1 ? 120 : 240); break;
            case "split-complementary": hueOffset = i % 3 === 0 ? 0 : (i % 3 === 1 ? 150 : 210); break;
            case "square": hueOffset = (i % 4) * 90; break;
        }

        if (mode === "custom") {
            targetCtx.fillStyle = i % 2 === 0 ? color1Input.value : color2Input.value;
        } else {
            // We can even add a tiny bit of "internal" random brightness per blob 
            // for monochromatic mode to make it look deeper
            const blobBrightness = (brightness * 50) + (seededRandom() * 10 - 5);
            targetCtx.fillStyle = `hsl(${(baseHue + hueOffset) % 360}, ${saturation}%, ${blobBrightness}%)`;
        }

        targetCtx.beginPath();
        targetCtx.arc(x, y, radius, 0, Math.PI * 2);
        targetCtx.fill();
    }
}

function draw() {
    const targetW = parseInt(widthInput.value) || 1920;
    const targetH = parseInt(heightInput.value) || 1080;

    canvas.width = targetW * PREVIEW_SCALE;
    canvas.height = targetH * PREVIEW_SCALE;
    canvas.style.width = (targetW * PREVIEW_SCALE) + "px";
    canvas.style.height = (targetH * PREVIEW_SCALE) + "px";

    noiseOverlay.style.width = canvas.style.width;
    noiseOverlay.style.height = canvas.style.height;

    renderGradient(ctx, canvas.width, canvas.height);
    updatePostEffects();
}

function updatePostEffects() {
    noiseOverlay.style.opacity = noiseSlider.value / 200;
}

function updateSliderVisibility() {
    const mode = themeMode.value;
    
    // Show Custom Color inputs ONLY for "custom"
    customColorScale.style.display = (mode === "custom") ? "flex" : "none";
    
    // Show Rainbow Slider for ALL modes except "custom"
    // This includes: complementary, analogous, monochromatic, triadic, etc.
    const isCustom = (mode === "custom");
    rainbowSliderGroup.style.display = isCustom ? "none" : "block";
    
    // Ensure Brightness/Saturation are visible for everything except custom 
    // (unless you want custom to have them too!)
    const showControls = !isCustom;
    brightnessSlider.parentElement.style.display = showControls ? "block" : "none";
    saturationSlider.parentElement.style.display = showControls ? "block" : "none";
}

// 4. EVENT LISTENERS
[widthInput, heightInput, blobSizeSlider, blobAmountSlider, brightnessSlider, saturationSlider, noiseSlider, rainbowSlider, backgroundColorPicker, monochromaticColorPicker, color1Input, color2Input].forEach(el => 
    el.addEventListener("input", draw)
);

themeMode.addEventListener("change", () => {
    updateSliderVisibility();
    draw();
});

resolutionPreset.addEventListener("change", (e) => {
    const p = e.target.value;
    if (p === "1080p") { widthInput.value = 1920; heightInput.value = 1080; }
    if (p === "2k") { widthInput.value = 2560; heightInput.value = 1440; }
    if (p === "4k") { widthInput.value = 3840; heightInput.value = 2160; }
    if (p === "screen") { widthInput.value = window.screen.width; heightInput.value = window.screen.height; }
    draw();
});

seedInput.addEventListener("input", (e) => {
    currentSeed = e.target.value;
    draw();
});

document.getElementById("regenerateBtn").addEventListener("click", () => {
    currentSeed = Math.random().toString(36).substring(7);
    seedInput.value = currentSeed;
    draw();
});

copySeedBtn.addEventListener("click", () => {
    seedInput.select();
    navigator.clipboard.writeText(seedInput.value);
    copySeedBtn.innerText = "Saved!";
    setTimeout(() => copySeedBtn.innerText = "Copy", 1000);
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    const fullW = parseInt(widthInput.value);
    const fullH = parseInt(heightInput.value);
    const tempCanvas = document.createElement("canvas");
    const tCtx = tempCanvas.getContext("2d");
    tempCanvas.width = fullW;
    tempCanvas.height = fullH;
    renderGradient(tCtx, fullW, fullH);
    const link = document.createElement('a');
    link.download = `gradient-seed-${currentSeed}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
});

// 5. INITIALIZE
window.onload = () => {
    seedInput.value = currentSeed;
    updateSliderVisibility();
    draw();
};