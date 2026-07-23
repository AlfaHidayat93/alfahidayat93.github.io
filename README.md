# Alfa Hidayat — Multidisciplinary Creative Portfolio

> DJ · Web Developer · Digital Artist · Playwright & Theater Director · Indonesian Language Educator

A sleek, modern, responsive portfolio website built with vanilla HTML5, CSS3, and JavaScript. Features a premium glassmorphic dark/light theme design.

## 🚀 Features

- **Glassmorphism Design** — Frosted glass cards with backdrop blur effects
- **Dark/Light Theme** — Smooth toggle with localStorage persistence
- **Typing Animation** — Dynamic role cycling in the hero section
- **Portfolio Filter** — Interactive filter by discipline (Music, Web Dev, Art, Acting, Education)
- **Image Lightbox** — Click-to-zoom gallery for portfolio pieces
- **Animated Counters** — Stats animate on scroll into view
- **Scroll Reveal** — Elements fade in as you scroll
- **Parallax Effect** — Hero image follows mouse movement
- **Fully Responsive** — Mobile-first design, works on all devices
- **Contact Form** — Validates and opens email client

## 📂 Project Structure

```
Portofolio/
├── index.html          # Main page
├── css/
│   └── styles.css      # Design system
├── js/
│   └── main.js         # Interactive logic
├── assets/
│   ├── images/         # Portfolio images
│   └── audio/          # Audio assets (optional)
└── README.md
```

## 🌐 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name the repository: `<your-username>.github.io`  
   (e.g., `alfahidayat.github.io`)
3. Set it to **Public**
4. Click **Create repository**

### Step 2: Push the Code
```bash
cd /path/to/Portofolio
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **main** branch and **/ (root)** folder
4. Click **Save**

Your site will be live at: `https://<your-username>.github.io`

## 🎨 Customization

### Change Colors
Edit the CSS custom properties in `css/styles.css` under `:root`:
```css
--accent-primary: #6c63ff;   /* Main accent color */
--accent-secondary: #00d4ff; /* Secondary accent */
--accent-purple: #a855f7;    /* Purple accent */
```

### Update Content
Edit `index.html` to change:
- Personal information and bio
- Portfolio projects and images
- Skills and proficiency levels
- Contact information and social links

### Replace Images
Swap the images in `assets/images/` with your own. Keep the same filenames or update the `src` attributes in `index.html`.

## 📱 Browser Support

- Chrome 98+
- Firefox 96+
- Safari 15+
- Edge 98+

## 📄 License

© 2026 Alfa Hidayat. All rights reserved.
