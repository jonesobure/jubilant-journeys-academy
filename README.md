# Jubilant Journeys Academy – Landing Page (React + Tailwind)

A simple, fast school landing page built with **Vite**, **React 18**, **Tailwind CSS**, and **lucide-react** icons.
Colors and imagery match the school uniform (maroon + blue), and a login modal is included.

## Local Development

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel/GitHub Pages/Netlify)

- **Vercel**: Import this repo; framework preset: *Vite*.  
- **GitHub Pages**: Use `vite` plugin defaults or deploy the `dist/` folder via any static host.  
- **Netlify**: Build command `npm run build`, publish directory `dist/`.

## Replace the photo

Put your photo at `public/students-group.jpg` (already included here). The app references it via `/students-group.jpg`.

## Make it yours

- Update texts (address, phone, email) in `src/App.jsx`.
- Add more sections or links as needed.
- Tailwind config is in `tailwind.config.js`.
