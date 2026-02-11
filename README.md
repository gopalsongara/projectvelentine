# Premium 3D Digital Diary

A responsive, dark-themed, animated 3D diary with emotional flow. Built with React (Hooks) and pure CSS 3D — no external UI libs.

## Flow

1. **Screen 1 – First Photo** – Centered photo, text *"Ye wali photo thodi theek nahi hai..."*, fade-in. Click to continue.
2. **Screen 2 – Sorry Animation** – Dark → pink gradient, animated *"Sorry... Sorry 😔❤️"*, floating hearts, glow. **Auto-transitions after 3s** (or tap to skip).
3. **Screen 3 – 3D Diary Cover** – Black/dark purple leather-style cover, shine, border glow, floating animation, *"For You 💖"*. Click to open.
4. **Screen 4 – Diary Book** – Responsive flip book (max 90vw × 90vh), 3D depth (perspective 1500px), page shadows, edge lighting. **5 pages:** 4 photo pages + final *"We can make a friend? 🙂"* with heart particles.

## Design

- **Dark luxury:** black, deep purple, gold accents  
- Leather-style cover (CSS gradients)  
- Glassmorphism and subtle neon glow on Sorry screen  
- Paper texture and edge lighting inside the book  
- Animations: cover float, page flip (rotateY), soft photo zoom, heart particles on final page  

## Responsive

- `clamp()` and vw/vh for sizing  
- `overflow-x` / `overflow-y` controlled to prevent scroll issues  
- Diary scales on mobile (90vw, 90vh limits)  

## Setup

```bash
npm install
npm run dev
```

Add your photos in `src/assets/images/` and set the `image` field in `PAGE_CONTENT` inside `src/components/Book.jsx`.

## Tech

- React 18 (functional components, hooks)  
- Vite  
- Pure CSS (3D transforms, animations, gradients)
