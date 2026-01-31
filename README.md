# 🎨 Gradient Generator Control Guide

This guide explains exactly how each button and slider in the interface affects your design.

---

## 🖼️ Canvas & Resolution
* **Width (X) & Height (Y):** Sets the literal pixel dimensions of your output image.
* **Presets Dropdown:** Instantly fills in the Width and Height for standard sizes like **1080p**, **2K**, **4K**, or your current **Monitor** resolution.
* <img width="487" height="93" alt="image" src="https://github.com/user-attachments/assets/9c56aca0-3b27-4a87-a3e1-1e508dea572f" />


---

## 🌈 Color & Theme Controls
* **Theme Mode:** Changes the mathematical relationship between the colors:
    * **Custom Colors:** Activates two color pickers for a specific dual-tone look.
      
       <img width="480" height="270" alt="Custom Colors" src="https://github.com/user-attachments/assets/eb38736b-e19f-4f4c-88c9-47c695b08b1f" />

    * **Complementary:** Picks colors on opposite sides of the color wheel.
      
      <img width="480" height="270" alt="Complementary" src="https://github.com/user-attachments/assets/4147024f-4bfc-4c9b-a9bd-432c4af6ca8f" />

    * **Analogous:** Picks colors that are next to each other for a harmonious feel.
      
      <img width="480" height="270" alt="Analogous" src="https://github.com/user-attachments/assets/8ee74ee2-93a1-4f9d-a41f-ab83c48bc758" />

    * **Monochromatic:** Uses different shades of a single color
      
      <img width="480" height="270" alt="Monochromatic" src="https://github.com/user-attachments/assets/ca8b169f-8ac5-4e44-8e5b-0e469ff0837b" />

    * **Triadic/Square:** Uses complex geometric spacing for vibrant, multi-color palettes.
      
       <img width="480" height="270" alt="image" src="https://github.com/user-attachments/assets/15dd3b70-aadb-4dfc-a86c-bb9a66bb93c9" />

* **Rainbow Slider:** Shifts the base hue of the entire gradient across the 360° color spectrum.
  
   <img width="299" height="66" alt="image" src="https://github.com/user-attachments/assets/a9c7c6f9-b0fb-4b87-9bba-268467cdb4a8" />

* **Background Color:** Sets the solid color that sits behind the transparent blurred blobs.
  
   <img width="237" height="65" alt="image" src="https://github.com/user-attachments/assets/a57a10eb-dd98-4c90-bcac-fd785164bfea" />


---

## 🪄 Shaping the "Blobs."
* **Blob Size:** Controls how much the color spreads. High values create soft, blurry clouds; low values create tighter circles.
  
   <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/7fbfd04f-3b07-4935-8b2d-3d7985db5e4d" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/4c72fed3-94d8-47b6-bb7f-80d365b04659" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/5a401f50-892c-426d-b273-0a9bb5c098a1" />

* **Blob Amount:** Determines how many color "spots" are rendered. More blobs result in a more complex, layered look.

  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/d9af3603-9baa-4f98-9640-93773e329a3e" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/f35ced94-aa16-4063-90f4-b8c17081ce58" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/36f10f9a-6a24-4ba0-a171-8798ee2713bc" />


* **Saturation:** Controls the intensity of the colors, from greyish-muted to neon-vivid.

  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/c8cca87f-22ab-430a-a136-7cf07f694c48" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/7669bb01-671b-4cc9-9b27-09045424298b" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/235931cb-44a3-4b93-9c93-3def9d036000" />

* **Brightness:** Adjusts the overall light level of the color blobs.

  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/c348b6ab-f9c0-45b0-9997-d2cdf4a1053f" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/b5356020-3966-4e58-8d79-573de1e3b849" />
  <img width="250" height="250" alt="image" src="https://github.com/user-attachments/assets/61dbecd4-e1f2-4ff8-b6a2-2e1a7359db9d" />

---

## 🎞️ Effects & Seeding
* **Noise (Grain):** Adds a visual texture overlay. This helps prevent "color banding" and gives the image a film-like quality.
* **Generate New:** Randomizes the positions of the blobs while keeping your current sliders and theme settings.
* **Seed Input:** Displays the unique ID of your current design. You can paste a previous seed here to reload a specific look.
* **Copy Button:** Saves the current Seed to your clipboard for sharing.

---

## 💾 Exporting
* **Download PNG:** Renders your design at the full resolution set in the Width/Height boxes and saves it to your device.

---

> [!NOTE]
> The **Seed** system ensures that if you share a seed like `5uwraj` with a friend, they will see the exact same pattern you did.
