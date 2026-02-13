# 📁 Audio Folder

## Add Your Music Here!

Place your romantic background music in this folder as `song.mp3`.

### Recommended Format:
- **File Type**: MP3 (best browser compatibility)
- **File Size**: Under 10MB for fast loading
- **Length**: 2-4 minutes (will loop automatically)
- **Volume**: Pre-normalize audio for consistent volume

### Where to Find Royalty-Free Music:

1. **YouTube Audio Library** (Free)
   - https://www.youtube.com/audiolibrary

2. **Free Music Archive** (Free)
   - https://freemusicarchive.org/

3. **Epidemic Sound** (Paid/Subscription)
   - https://www.epidemicsound.com/

4. **Artlist** (Paid/Subscription)
   - https://artlist.io/

5. **Incompetech** (Free with attribution)
   - https://incompetech.com/music/

### Music Tips:

- Choose instrumental tracks (no lyrics usually work better)
- Romantic piano, acoustic guitar, or strings work wonderfully
- Test the music at different volumes
- Make sure it loops smoothly without jarring transitions

### Current Setup:

The website expects the file: `/public/audio/song.mp3`

If you want to use a different filename, update line 116 in `app/page.tsx`:

```typescript
<MusicPlayer 
  audioSrc="/audio/your-filename.mp3"  // Change this
  autoplay={musicStarted}
/>
```

---

**Important**: Make sure you have the rights to use the music you choose! 🎵
