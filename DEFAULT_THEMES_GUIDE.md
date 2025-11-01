# VibeCode Default Themes Guide

## 3 Loại Default Themes

VibeCode cung cấp **3 loại default themes** để phù hợp với mọi nhu cầu:

---

## 1. VS Code Default (Recommended)

**ID:** `vscode-default`  
**Description:** Setup HIỆN TẠI trên máy bạn - chính xác như bạn đang dùng

### Khi nào dùng:
- ✅ Muốn quay về setup BẠN đang dùng
- ✅ Sau khi test theme khác và muốn về lại
- ✅ Setup cá nhân của bạn (có Copilot, Prettier, GitLens, etc.)

### Apply:
```bash
vibecode apply vscode-default
```

### Settings bao gồm:
- ✅ Tất cả extensions settings (Copilot, Prettier, GitLens)
- ✅ Editor preferences
- ✅ Git configurations
- ✅ TypeScript/JavaScript settings
- ✅ Personal customizations

**Đây là setup CỦA BẠN - không phải Microsoft's default!**

---

## 2. Factory Default

**ID:** `factory-default`  
**Description:** VS Code gốc từ Microsoft - như mới cài đặt

### Khi nào dùng:
- ✅ Muốn reset về settings gốc hoàn toàn
- ✅ Clean slate - bắt đầu lại từ đầu
- ✅ Giống VS Code vừa mới install

### Apply:
```bash
vibecode apply factory-default
```

### Settings bao gồm:
- ✅ Default Dark Modern theme
- ✅ VS Seti icon theme
- ✅ Standard editor settings
- ✅ Không có extension customizations
- ✅ Microsoft's original defaults

**Đây là setup GỐC của Microsoft!**

---

## 3. VS Code Default Light

**ID:** `vscode-default-light`  
**Description:** Light theme default từ Microsoft

### Khi nào dùng:
- ✅ Muốn light theme gốc
- ✅ Làm việc ban ngày
- ✅ Clean light setup

### Apply:
```bash
vibecode apply vscode-default-light
```

### Settings bao gồm:
- ✅ Default Light Modern theme
- ✅ VS Seti icon theme  
- ✅ Standard editor settings
- ✅ Microsoft's light defaults

---

## So Sánh Nhanh

| Feature | VS Code Default | Factory Default | VS Code Default Light |
|---------|----------------|-----------------|---------------------|
| **Source** | Your current setup | Microsoft's defaults | Microsoft's light defaults |
| **Extensions Settings** | ✅ Yes (Copilot, Prettier, etc.) | ❌ No | ❌ No |
| **Personal Customizations** | ✅ Yes | ❌ No | ❌ No |
| **Status Bar** | Hidden (your preference) | Visible | Visible |
| **Git Settings** | Your preferences | Defaults | Defaults |
| **Theme** | Your current theme | Default Dark Modern | Default Light Modern |

---

## Workflow Examples

### Example 1: Try themes then go back to YOUR setup
```bash
# Try a custom theme
vibecode apply tokyo-drift

# Don't like it? Go back to YOUR setup
vibecode apply vscode-default
```

---

### Example 2: Reset everything to Microsoft's defaults
```bash
# Complete reset
vibecode apply factory-default

# Now you have clean Microsoft settings
```

---

### Example 3: Switch between light/dark
```bash
# Work in the morning - light theme
vibecode apply vscode-default-light

# Night coding - your setup
vibecode apply vscode-default
```

---

## Which One Should You Use?

### Use `vscode-default` when:
- 👍 You tried a theme and want YOUR setup back
- 👍 You want to go back to YOUR personal preferences
- 👍 This is your "home base" setup

### Use `factory-default` when:
- 👍 You want to completely reset VS Code
- 👍 You want Microsoft's original setup
- 👍 You're starting fresh

### Use `vscode-default-light` when:
- 👍 You want Microsoft's light theme
- 👍 Working during daytime
- 👍 Clean light setup without customizations

---

## Important Notes

### ⚠️ `vscode-default` = YOUR Current Setup
This theme was created from YOUR actual settings.json file. It includes:
- Your Copilot settings
- Your Prettier config
- Your Git preferences
- Your TypeScript settings
- Everything YOU have configured

### ⚠️ `factory-default` = Clean Slate
This is what VS Code looks like right after installation.
- No extension settings
- No personal preferences
- Just Microsoft's defaults

---

## Quick Commands

```bash
# List all default themes
vibecode search "default"

# Apply your personal setup
vibecode apply vscode-default

# Reset to factory
vibecode apply factory-default

# Switch to light
vibecode apply vscode-default-light

# See all themes
vibecode list
```

---

## Pro Tips

### Tip 1: Test themes safely
```bash
# Your setup is always saved in vscode-default
# So you can try any theme and come back easily!

vibecode apply night-hacker    # Try it
vibecode apply vscode-default  # Go back to YOUR setup
```

### Tip 2: Use restore for history
```bash
# If you applied many themes
vibecode restore

# Select the backup you want
# OR just use vscode-default to go to YOUR setup
```

### Tip 3: Backup before major changes
```bash
# Before trying many themes
vibecode backup

# Now vscode-default always has YOUR setup
# Plus you have manual backup too!
```

---

## Summary

**3 Default Themes:**
1. `vscode-default` - **YOUR personal setup** (Recommended for going back)
2. `factory-default` - **Microsoft's original** (Clean reset)
3. `vscode-default-light` - **Microsoft's light theme** (Default light)

**Most Used:**
- Going back to your setup: `vibecode apply vscode-default`
- Complete reset: `vibecode apply factory-default`

---

**Your setup is safe! You can always go back to `vscode-default`! 🎉**
