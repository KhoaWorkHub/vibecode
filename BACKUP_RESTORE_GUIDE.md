# VibeCode Backup & Restore Feature

## Câu hỏi: Làm sao quay lại setup theme mặc định trước khi dùng tool?

## Trả lời: ✅ ĐÃ CÓ SẴN!

VibeCode có **tính năng backup & restore tự động** để đảm bảo bạn luôn có thể quay lại setup ban đầu.

---

## Cách Hoạt Động

### 🔄 Tự Động Backup Khi Apply Theme

**Khi bạn apply bất kỳ theme nào, VibeCode TỰ ĐỘNG backup setup hiện tại của bạn!**

```bash
vibecode apply tokyo-drift
```

**Điều gì xảy ra:**
1. ✅ Tự động backup setup hiện tại (settings, keybindings, etc.)
2. ✅ Apply theme mới
3. ✅ Bạn có thể restore bất cứ lúc nào

**Không cần làm gì thêm - backup hoàn toàn tự động!**

---

## Cách Restore Về Setup Cũ

### Cách 1: Interactive Mode (Dễ nhất)

```bash
vibecode restore
```

**Sẽ hiện menu cho bạn chọn:**
```
? Select a backup to restore:
  2025:11:01T16:44:27:570Z  (trước khi apply tokyo-drift)
  2025:11:01T15:30:15:123Z  (trước khi apply night-hacker)
  2025:11:01T14:20:00:456Z  (setup gốc)
```

Chọn backup nào muốn restore → Enter → Done!

---

### Cách 2: Xem Danh Sách Backups

```bash
vibecode restore --list
```

**Output:**
```
📦 Available Backups:

1. 2025:11:01T16:44:27:570Z
2. 2025:11:01T15:30:15:123Z
3. 2025:11:01T14:20:00:456Z

Use vibecode restore <backup-name> to restore a backup
```

---

### Cách 3: Restore Backup Cụ Thể

```bash
vibecode restore backup-2025-11-01T14-20-00-456Z
```

---

## Workflow Thực Tế

### Scenario 1: Apply theme không thích

```bash
# 1. Apply theme mới (tự động backup)
vibecode apply tokyo-drift

# 2. Không thích? Restore ngay
vibecode restore

# 3. Chọn backup gần nhất → Done!
```

---

### Scenario 2: Test nhiều themes

```bash
# Test theme 1
vibecode apply tokyo-drift
# → Không thích

# Test theme 2
vibecode apply forest-zen
# → Cũng không thích

# Test theme 3
vibecode apply minimal-daylight
# → Vẫn không thích

# Quay lại setup ban đầu
vibecode restore
# → Chọn backup đầu tiên (trước khi test)
```

---

### Scenario 3: Backup thủ công trước khi thử nghiệm

```bash
# 1. Backup setup hiện tại
vibecode backup

# 2. Thử nghiệm막 các theme
vibecode apply tokyo-drift
vibecode apply night-hacker
vibecode apply pastel-dream

# 3. Quay lại setup đã backup
vibecode restore
```

---

## Backups Được Lưu Ở Đâu?

**Location:**
```
~/.vibecode/backups/
  ├── backup-2025-11-01T16-44-27-570Z/
  │   ├── settings.json
  │   ├── keybindings.json
  │   └── metadata.json
  ├── backup-2025-11-01T15-30-15-123Z/
  └── backup-2025-11-01T14-20-00-456Z/
```

---

## Những Gì Được Backup

✅ **settings.json** - Tất cả VS Code settings  
✅ **keybindings.json** - Tất cả keybindings  
✅ **metadata.json** - Thông tin backup (timestamp, platform)

---

## Backup Tự Động vs. Thủ Công

### Tự Động (Mặc định)
```bash
vibecode apply <theme-id>
# → Tự động backup trước khi apply
```

**Khi nào:** Mỗi lần apply theme  
**Ai làm:** VibeCode tự động  
**Bạn cần làm gì:** Không cần làm gì

---

### Thủ Công (Tùy chọn)
```bash
vibecode backup
```

**Khi nào:** Khi bạn muốn tạo checkpoint  
**Ai làm:** Bạn chủ động  
**Ví dụ:** Trước khi test nhiều themes

---

## Disable Tự Động Backup (Không khuyến khích)

```bash
vibecode apply tokyo-drift --no-backup
```

⚠️ **Cảnh báo:** Không nên dùng vì sẽ mất khả năng restore!

---

## Commands Summary

| Command | Description |
|---------|-------------|
| `vibecode backup` | Tạo backup thủ công |
| `vibecode restore` | Restore interactive (chọn từ menu) |
| `vibecode restore --list` | Xem danh sách backups |
| `vibecode restore <name>` | Restore backup cụ thể |
| `vibecode apply <theme> --no-backup` | Apply theme KHÔNG backup (không khuyến khích) |

---

## Examples

### Example 1: First-time user
```bash
# Lần đầu dùng - setup gốc của bạn
vibecode apply tokyo-drift
# ✅ Auto backup setup gốc
# ✅ Apply tokyo-drift

# Không thích?
vibecode restore
# → Chọn backup đầu tiên
# ✅ Quay về setup gốc
```

---

### Example 2: Power user
```bash
# Backup setup hiện tại trước
vibecode backup

# Test 5 themes khác nhau
vibecode apply tokyo-drift
vibecode apply night-hacker
vibecode apply forest-zen
vibecode apply minimal-daylight
vibecode apply pastel-dream

# Xem tất cả backups
vibecode restore --list

# Quay về setup ban đầu
vibecode restore
# → Chọn backup đầu tiên
```

---

### Example 3: Daily theme changes
```bash
# Sáng - dùng light theme
vibecode apply minimal-daylight
# ✅ Auto backup theme đêm

# Chiều - quay về dark theme
vibecode restore
# → Chọn backup từ tối qua
```

---

## Safety Features

✅ **Confirm before restore** - Luôn hỏi trước khi overwrite  
✅ **List all backups** - Xem tất cả trước khi chọn  
✅ **Automatic backup** - Không bao giờ mất setup  
✅ **Timestamped backups** - Dễ dàng tìm backup cũ  
✅ **Metadata tracking** - Biết backup nào là gì

---

## FAQs

**Q: Backup có bị mất không?**  
A: Không, backup lưu trong `~/.vibecode/backups/` cho đến khi bạn xóa thủ công.

**Q: Có giới hạn số lượng backup không?**  
A: Không giới hạn. Mỗi lần apply = 1 backup mới.

**Q: Làm sao xóa backup cũ?**  
A: Xóa thủ công folder trong `~/.vibecode/backups/`

**Q: Restore có ảnh hưởng gì không?**  
A: Restore chỉ thay đổi settings.json và keybindings.json. Extensions không bị ảnh hưởng.

**Q: Phải restart VS Code sau restore không?**  
A: Có, để thấy thay đổi đầy đủ.

**Q: Backup có chiếm dung lượng nhiều không?**  
A: Không, mỗi backup ~10-50KB (chỉ là JSON files).

---

## Kết Luận

### ✅ ĐÃ CÓ FEATURE NÀY!

**Tự động backup mỗi lần apply theme**  
**Restore dễ dàng với interactive menu**  
**An toàn 100% - không bao giờ mất setup**

### Workflow Đơn Giản:

1. Apply theme → Tự động backup
2. Không thích → `vibecode restore`
3. Chọn backup → Done!

**Bạn có thể thử nghiệm thoải mái mà không lo mất setup gốc! 🎉**

---

**Documentation:** [Full CLI Guide](docs/usage/cli-guide.md)  
**Repository:** https://github.com/KhoaWorkHub/vibecode
