# MUSTSO Digital Website

Official website for **MUSTSO** – built with modern web technologies and deployed via **Vercel**.

🌐 Live site: https://www.mustso.digital

---

## 📁 Project Structure (Relevant Parts)

/public
├── Presda.png
├── Chairperson.png


/src
├── assets
│ ├── news1.png
│ ├── news2.jpg
│ └── ...
├── components
│ └── NewsroomSection.tsx
└── data
└── Mustso.json

---
## 📰 How to Add News
News content is managed using **JSON data** and **imported images**.

### 1️⃣ Add News Data
Open:
src/data/Mustso.json
Add a new item under the `news` section:
```json
{
  "id": 1,
  "title": "MUSTSO General Assembly Held Successfully",
  "date": "2025-01-15",
  "description": "The MUSTSO general assembly brought together student leaders...",
  "image": "news1"
}

⚠️ The value of "image" must match the imported image name in the component.

2️⃣ Add News Images

Place the image files in:

src/assets/
Example:
src/assets/news1.png
src/assets/news2.jpg

3️⃣ Import Images in NewsroomSection.tsx

Open:

src/components/NewsroomSection.tsx
Import the images:
import news1 from "../assets/news1.png";
import news2 from "../assets/news2.jpg";



👔 How to Add Leaders (Executives)

Leader images are loaded directly from the public folder.

1️⃣ Add Leader Images

Place images in:
public/
Example:
public/Presda.png
public/VicePres.png
public/Secretary.png

2️⃣ Reference Images in Mustso.json

Open:

src/data/Mustso.json
Use a public path starting with /:
{
  "id": 1,
  "name": "Hon. Yohana Lucas",
  "title": "President",
  "image": "/Presda.png"
}

✅ Images in public do not need to be imported in React components.

Images in the hero section and the logo 
  are imported from the src/asset folder where they are used in HeroSection.tsx{HERO} & NavBar.tsx{LOGO} components
