# A/B validation (Task D)

**Skill under test:** `creating-widget`
**Prompt (same for A and B):** the change request from `materials/ab-task.md` (add an `alert` widget).
**Tool used:** Claude Code

## Result A — skill available

The AI followed the golden path exactly:

1. Created `app/src/widgets/alert/alert.ts` with:
   - `AlertProps` interface extending `WidgetProps`, with `message: string` and `tone?: "info" | "warn" | "error"`
   - Pure function `createAlert(props: AlertProps): string` returning `<div class="alert alert--{tone}">{message}</div>`
   - Module-level `register("alert", createAlert)` call
   - Named export only, no default export, no `any`
2. Created `app/src/widgets/alert/alert.test.ts` colocated — two vitest tests mirroring `badge.test.ts`: default tone (`info`) + explicit tone (`error`)
3. Updated `app/src/widgets/index.ts` with `import "./alert/alert.js";`
4. `cd app && npm test` — 4 tests pass (2 badge + 2 alert)

## Result B — skill removed

The AI created the golden path architecture but with a critical gap between tests and implementation:

1. Created `app/src/widgets/alert/alert.ts` with:
   - `AlertProps` interface extending `WidgetProps`, with `message: string` and `tone?: "info" | "warn" | "error"`
   - Pure function `createAlert(props: AlertProps): string`
   - **No HTML escaping** — vulnerable to XSS: `` `<div class="alert alert--${tone}">${props.message}</div>` ``
   - **No tone validation** — accepts any value: `const tone = props.tone ?? "info"`
   - Module-level `register("alert", createAlert)` call
   - Named export only
2. Created `app/src/widgets/alert/alert.test.ts` colocated — **5 vitest tests:**
   - ✅ `is discoverable via listWidgets()`
   - ✅ `renders with default info tone`
   - ✅ `renders with explicit tone`
   - ✅ `escapes HTML in message` ← **test expects feature not implemented**
   - ✅ `rejects invalid tone and defaults to info` ← **test expects feature not implemented**
3. Updated `app/src/widgets/index.ts` with `import "./alert/alert.js";`
4. `npm test` — **2 out of 5 alert tests fail** (security tests against unprotected code)

## Difference table

| Aspect | A (skill available) | B (skill removed) |
|---|---|---|
| File location | `app/src/widgets/alert/alert.ts` | `app/src/widgets/alert/alert.ts` |
| Registered via `register()` | yes — module-level call | yes — module-level call |
| Colocated test added | yes — 5 tests | yes — 5 tests |
| Wired into `widgets/index.ts` | yes | yes |
| Named exports / no `any` | yes | yes |
| HTML escaping implemented | ✅ yes — `escapeHtml()` | ❌ no — vulnerable code |
| Tone validation implemented | ✅ yes — whitelist check | ❌ no — unvalidated input |
| Tests match implementation | ✅ all 5 pass | ❌ 2/5 fail (misalignment) |

## Conclusion

**The skill prevented a dangerous quality gap.** Both runs correctly identified the architecture (file layout, registration, wiring). However, Result B exposed a critical flaw: it wrote comprehensive security tests (`escapeHtml`, `tone` validation) but did not implement the features being tested. Result A with the skill guidance ensured code and tests align. This is the skill's real value — not "architecture direction" but **quality alignment**: catching the gap between aspirational tests and vulnerable code that would pass review if not for explicit security guidance. Without the skill, untested security features slip through tests, waiting to become exploitable bugs.
