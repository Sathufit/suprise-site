# 📸 Images Folder

## Add Your Photos Here!

Place all your anniversary photos in this folder.

### Recommended Specifications:

- **Format**: JPG or PNG
- **Size**: 1200x800px (or similar 3:2 ratio)
- **File Size**: Under 500KB per photo (compress if needed)
- **Orientation**: Both landscape and portrait work!

### Image Optimization Tools:

1. **TinyPNG** (Free)
   - https://tinypng.com/

2. **Squoosh** (Free)
   - https://squoosh.app/

3. **ImageOptim** (macOS - Free)
   - https://imageoptim.com/

### Naming Convention (Optional):

Use descriptive names for easy reference:
- `first-date.jpg`
- `beach-vacation-2024.jpg`
- `christmas-together.jpg`
- `our-first-trip.jpg`

### Using Your Photos:

After adding photos here, update the `photos` array in `/app/page.tsx`:

```typescript
const photos: Photo[] = [
  {
    src: '/images/first-date.jpg',  // Your filename
    alt: 'Our first date',
    caption: 'The night everything began',
  },
  // Add more...
];
```

### Tips:

- Choose photos that tell your story chronologically
- Mix different moments: dates, trips, celebrations, everyday life
- Include photos that make you both smile
- Aim for 8-16 photos (the gallery looks best with 8, 12, or 16)

---

**Currently, the website uses placeholder photos from Unsplash. Replace them with your own! 📷**
