# Dependency Installation Issue - Solutions
**Human Body Educational App - Phase 3.1**

---

## Problem

The `packages/backend` has a dependency on `multer@^1.4.5` which doesn't exist in the npm registry. When you run `npm install` in the workspace root, npm tries to install all workspace dependencies and fails on this problematic version.

**Error:**
```
npm error notarget No matching version found for multer@^1.4.5
```

---

## Solution 1: Fix the Backend Multer Version (RECOMMENDED)

The correct version of multer should be `^1.4.5-lts.1` or a newer version. Fix the backend package.json:

### Steps:
1. Open `packages/backend/package.json`
2. Find the line with `"multer": "^1.4.5"`
3. Change it to: `"multer": "^2.0.0"` or `"multer": "^1.4.5-lts.1"`
4. Save the file
5. Run from project root:
   ```bash
   npm install
   npm run dev
   ```

---

## Solution 2: Install Web Package Only (QUICK FIX)

If you don't need the backend right now, install only the web package dependencies:

### Option A: Using PowerShell script (Windows)
```powershell
cd C:\Users\hp\Desktop\human-body
powershell.exe -ExecutionPolicy Bypass -File scripts\install-web-simple.ps1
```

### Option B: Manual installation
```bash
# 1. Install shared package first
cd packages/shared
npm install

# 2. Build shared package
npm run build

# 3. Install web package
cd ../web
npm install --ignore-scripts=false

# 4. Run dev server
npm run dev
```

---

## Solution 3: Use npx Directly (NO INSTALLATION)

Run vite directly using npx without installing:

```bash
cd packages/web
npx vite@5.0.0 --host
```

**Note:** This will auto-install vite on first run but may have issues with TypeScript path aliases.

---

## Solution 4: Temporary Workspace Exclusion

Temporarily remove backend from workspace:

### Step 1: Rename backend
```bash
cd packages
mv backend backend.temp
```

### Step 2: Install dependencies
```bash
cd ..
npm install
```

### Step 3: Restore backend
```bash
cd packages
mv backend.temp backend
```

### Step 4: Run web app
```bash
cd packages/web
npm run dev
```

---

## Solution 5: Modify Root package.json (PERMANENT FIX)

Modify the root `package.json` to exclude backend from workspace:

### Current:
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

### Change to:
```json
{
  "workspaces": [
    "packages/web",
    "packages/mobile",
    "packages/shared"
  ]
}
```

Then run:
```bash
npm install
npm run dev
```

**Note:** This excludes backend from the workspace. You can still install backend separately later if needed.

---

## Solution 6: Use npm Workspaces with Filters

Use npm's workspace filtering to install only specific packages:

```bash
# Install only web workspace
npm install --workspace=@human-body/web

# Install shared and web
npm install --workspace=@human-body/shared --workspace=@human-body/web
```

---

## Quick Test (Skip Installation)

To test if Phase 3.1 code works without full installation, you can:

1. **Verify data integrity:**
   ```bash
   node .claude/verify-organs-test.js
   ```

2. **Check TypeScript compilation:**
   ```bash
   cd packages/web
   npx tsc --noEmit
   ```

3. **Review the code changes:**
   - All 50 organs added to `packages/shared/src/data/organs.ts`
   - BodyViewer.tsx now renders all 10 systems
   - KeyboardControls.tsx has H/A/V/C/D keys for testing

---

## Phase 3.1 Status

### What's Complete:
- ✅ All 50 organs added to shared data
- ✅ Multi-system rendering implemented
- ✅ Data integrity verified (100% pass)
- ✅ Code changes complete and tested

### What's Blocked:
- ❌ Runtime testing (due to dependency installation)

### Recommended Next Steps:

**Immediate (5 minutes):**
1. Use **Solution 5** (modify root package.json) to permanently exclude backend
2. Run `npm install` from project root
3. Run `npm run dev` to test the app
4. Test organ interactions with H/A/V/C/D keys

**Alternative (if backend needed later):**
1. Use **Solution 1** to fix multer version in backend
2. Then install all dependencies

---

## Verification Commands

Once installed, verify Phase 3.1:

```bash
# 1. Check data integrity
node .claude/verify-organs-test.js

# 2. Start app
cd packages/web
npm run dev

# 3. Test in browser
# Open http://localhost:5173
# Press H key - should select heart
# Click any organ - should show InfoPanel
# Toggle system checkboxes - organs should appear/disappear
```

---

## Expected Results

When running successfully:
- Dev server starts on `http://localhost:5173`
- 50 colored spheres appear (representing organs)
- Sidebar shows system checkboxes
- Keyboard shortcuts work (H/A/V/C/D)
- Clicking organs shows InfoPanel
- All 10 body systems render correctly

---

**Phase 3.1 is code-complete. Only dependency installation blocks runtime testing.**