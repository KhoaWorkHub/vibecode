# Interactive Token Setup - Demo

## ✨ New Feature: Auto-Setup GitHub Token

No more manual token setup! The CLI now guides you through the process.

## Flow Demo

### First Time Sharing (No Token)

```bash
$ vibecode profile share my-setup

📤 Sharing profile "my-setup"...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚠  GitHub Token Required (One-Time Setup)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To share profiles, you need a GitHub token.
This takes 2 minutes and only needs to be done once.

[1] 🌐 Auto-open GitHub (recommended)
[2] 📝 I already have a token
[3] ❌ Cancel

Choose option (1-3): 1

✓ Opening browser...
  https://github.com/settings/tokens/new?scopes=gist&description=VibeCode+Profile+Sharing

Instructions:
  1. Click "Generate token" (green button at bottom)
  2. Copy the token (starts with ghp_...)
  3. Paste it below

Paste token: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

✓ Token saved to ~/.vibecode/github-token
✓ You can now share profiles!

📤 Sharing profile "my-setup"...

✓ Profile shared successfully!

  Share Code: VIBE-abc123def456789...

Anyone can import this profile with:
  vibecode profile import VIBE-abc123def456789...

This code is permanent and works across all machines.
```

---

### Second Time (Token Already Saved)

```bash
$ vibecode profile share another-setup

📤 Sharing profile "another-setup"...

✓ Profile shared successfully!

  Share Code: VIBE-xyz789abc123...

Anyone can import this profile with:
  vibecode profile import VIBE-xyz789abc123...
```

**→ No prompts! Instant share!**

---

## Options Explained

### Option 1: Auto-open GitHub (Recommended)
- Opens browser automatically to GitHub token page
- Pre-fills: scope=gist, description=VibeCode
- User just clicks "Generate" and copies token
- **Fastest and easiest**

### Option 2: I Already Have a Token
- For users who already created a token manually
- Just paste it directly
- Skips browser opening

### Option 3: Cancel
- Exits without sharing
- Shows alternative: `vibecode profile export <name>`

---

## What Happens Behind the Scenes

1. **Check Environment Variable**
   ```bash
   # If set, uses this
   export GITHUB_TOKEN=ghp_xxx
   ```

2. **Check Config File**
   ```bash
   # If exists, uses this
   cat ~/.vibecode/github-token
   ```

3. **Interactive Setup**
   - Neither found? → Run interactive setup
   - Saves token to `~/.vibecode/github-token`
   - Token persists forever (until you delete it)

---

## Security Notes

- Token is stored locally in `~/.vibecode/github-token`
- File permissions: 600 (only you can read it)
- Token only has `gist` scope (can't access repos, code, etc.)
- You can revoke it anytime: https://github.com/settings/tokens

---

## Testing Instructions

### Test Interactive Setup

```bash
# Remove existing token
rm ~/.vibecode/github-token

# Try sharing (should trigger interactive setup)
vibecode profile share test-profile

# Choose option [1] - browser should auto-open
# Copy token and paste
# Should save and continue with sharing
```

### Test Saved Token

```bash
# Try sharing again (should skip setup)
vibecode profile share another-profile

# Should immediately share without prompts
```

### Test Cancel

```bash
# Remove token again
rm ~/.vibecode/github-token

# Try sharing
vibecode profile share test

# Choose option [3] - should cancel gracefully
```

---

## Code Changes

**Files Modified:**
- `packages/core/src/services/ProfileSharing.ts`
  - Added `interactiveTokenSetup()` method
  - Updated `getGitHubToken()` to call interactive setup
  - Better error messages

**Dependencies Added:**
- `open@^10.0.3` - For auto-opening browser

**Lines of Code:**
- ~100 lines added for interactive setup
- Better UX with box drawing and emojis

---

## Benefits

✅ **Zero Documentation Reading** - CLI guides you  
✅ **Faster Setup** - 2 minutes instead of 10  
✅ **Auto-Open Browser** - No manual URL copying  
✅ **Smart Defaults** - Pre-filled scopes and description  
✅ **One-Time Only** - Never asks again after setup  
✅ **Graceful Fallback** - Manual paste option available  

---

## Future Enhancements

- [ ] Token validation (test token before saving)
- [ ] QR code for mobile token input
- [ ] Token expiration detection
- [ ] Multiple token support (work/personal)

---

**Status**: ✅ Implemented and ready to test!
