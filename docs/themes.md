# VibeCode Theme Catalog

> Beautiful themes to match your mood and workflow

## 🌙 Dark Themes

### Night Hacker
**Perfect for**: Late-night coding, cyberpunk lovers, hackers

A dark neon theme that brings the cyberpunk aesthetic to your editor. Features high-contrast colors with neon accents that pop against a deep dark background.

**Features:**
- Neon syntax highlighting
- High contrast for reduced eye strain
- Optimized for long night sessions
- JetBrains Mono font with ligatures

**Required Extensions:**
- Material Theme
- Material Icon Theme
- VSCode Icons

**Tags**: `dark`, `neon`, `night`, `hacker`, `cyberpunk`

---

### Tokyo Drift
**Perfect for**: Night owls, vibrant color lovers, creative coders

Inspired by Tokyo's electrifying nightscape, this theme combines deep purples, blues, and neon pinks for a truly unique coding experience.

**Features:**
- Vibrant color palette
- Smooth animations
- Tokyo Night base theme
- Cascadia Code font

**Required Extensions:**
- Tokyo Night Theme
- Material Icon Theme

**Tags**: `dark`, `vibrant`, `neon`, `night`, `tokyo`, `colorful`

---

### Forest Zen
**Perfect for**: Nature lovers, deep focus work, meditation coders

A calming dark theme with earthy green and brown tones. Designed to reduce stress and promote focused, mindful coding.

**Features:**
- Nature-inspired color palette
- Soft contrasts for eye comfort
- Minimalist design
- IBM Plex Mono font

**Required Extensions:**
- Everforest Theme
- Material Icon Theme

**Tags**: `dark`, `nature`, `chill`, `focus`, `zen`, `green`

---

### Monochrome Focus
**Perfect for**: Minimalists, distraction-haters, serious developers

Pure black and white. No colors to distract you. Just you and your code. Perfect for those who want absolute focus.

**Features:**
- Zero color distractions
- Maximum contrast
- Zen mode enabled by default
- Relative line numbers
- Hidden activity bar

**Required Extensions:**
- Palenight Theme
- VSCode Icons

**Tags**: `dark`, `monochrome`, `minimal`, `focus`, `distraction-free`

---

## ☀️ Light Themes

### Minimal Daylight
**Perfect for**: Morning work, focused sessions, minimalists

A clean, distraction-free light theme that's easy on the eyes during daytime work. Perfect for morning productivity.

**Features:**
- Clean, minimal design
- Soft white background
- GitHub-inspired colors
- Sans-serif UI font (Inter/SF Pro)

**Required Extensions:**
- GitHub Theme
- Material Icon Theme

**Tags**: `light`, `minimal`, `morning`, `focus`, `clean`

---

### Pastel Dream
**Perfect for**: Designers, frontend developers, creative work

Soft pastel colors that create a dreamy, creative atmosphere. Ideal for design-focused development work.

**Features:**
- Gentle pastel palette
- High readability
- Creative vibe
- Dank Mono/Operator Mono fonts

**Required Extensions:**
- Night Owl Theme
- Material Icon Theme

**Tags**: `light`, `pastel`, `creative`, `colorful`, `morning`

---

## 🎨 Theme Moods

### 🌙 Night
- Night Hacker
- Tokyo Drift
- Forest Zen

### ☀️ Morning
- Minimal Daylight
- Pastel Dream

### 💻 Hacker
- Night Hacker
- Monochrome Focus

### 🧘 Chill/Zen
- Forest Zen
- Pastel Dream

### 💡 Focus
- Monochrome Focus
- Minimal Daylight
- Forest Zen

### 🎨 Creative
- Pastel Dream
- Tokyo Drift

---

## 📝 Theme Specification

All themes follow this structure:

```json
{
  "id": "unique-theme-id",
  "name": "Human Readable Name",
  "description": "Detailed description of the theme",
  "tags": ["tag1", "tag2", "tag3"],
  "preview": "previews/theme-preview.png",
  "author": "Creator Name",
  "version": "1.0.0",
  "extensions": [
    "publisher.extension-id"
  ],
  "settings": {
    "workbench.colorTheme": "Base Theme Name",
    "workbench.iconTheme": "icon-theme-name",
    "editor.fontFamily": "Font Name",
    "editor.fontSize": 14,
    ...
  },
  "layout": {
    "sidebarLocation": "left" | "right",
    "terminalVisible": true | false,
    "editorColumns": 1,
    "zenMode": true | false
  }
}
```

---

## 🏷️ Tag Reference

### Color Tone Tags
- `dark` - Dark background themes
- `light` - Light background themes
- `neon` - Neon/vibrant accent colors
- `pastel` - Soft, muted colors
- `monochrome` - Black and white only
- `colorful` - Vibrant, multi-color

### Mood Tags
- `morning` - Good for daytime use
- `night` - Optimized for night coding
- `hacker` - Cyberpunk/hacker aesthetic
- `chill` - Relaxed, calm atmosphere
- `focus` - Minimal distractions
- `creative` - Inspiring, artistic

### Style Tags
- `minimal` - Minimalist design
- `vibrant` - High energy colors
- `nature` - Nature-inspired
- `zen` - Calm, meditative

---

## 🎯 Choosing the Right Theme

### By Time of Day
- **Morning (6am-12pm)**: Minimal Daylight, Pastel Dream
- **Afternoon (12pm-6pm)**: Minimal Daylight, Forest Zen
- **Evening (6pm-10pm)**: Tokyo Drift, Forest Zen
- **Night (10pm-6am)**: Night Hacker, Monochrome Focus

### By Work Type
- **Frontend Development**: Pastel Dream, Tokyo Drift
- **Backend Development**: Night Hacker, Minimal Daylight
- **Data Science**: Forest Zen, Monochrome Focus
- **Writing/Documentation**: Minimal Daylight, Monochrome Focus

### By Mood
- **Energized**: Tokyo Drift, Pastel Dream
- **Focused**: Monochrome Focus, Minimal Daylight
- **Relaxed**: Forest Zen, Pastel Dream
- **Creative**: Tokyo Drift, Pastel Dream

---

## 🔮 Coming Soon

Future themes in development:

- **Ocean Breeze** - Blue-toned calm theme
- **Sunset Coder** - Warm orange/red gradient
- **Nordic Frost** - Cool blues and whites
- **Retro Terminal** - Classic green terminal look
- **Cyberpunk 2077** - Inspired by the game
- **Sakura Bloom** - Pink cherry blossom theme

Want to contribute a theme? Check out our [contributing guide](../CONTRIBUTING.md)!
