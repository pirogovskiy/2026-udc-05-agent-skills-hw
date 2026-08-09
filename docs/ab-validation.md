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

The AI followed the golden path exactly, identical to Result A:

1. Created `app/src/widgets/alert/alert.ts` with:
   - `AlertProps` interface extending `WidgetProps`, with `message: string` and `tone?: "info" | "warn" | "error"`
   - Pure function `createAlert(props: AlertProps): string` returning `<div class="alert alert--{tone}">{message}</div>`
   - Module-level `register("alert", createAlert)` call
   - Named export only, no default export, no `any`
2. Created `app/src/widgets/alert/alert.test.ts` colocated — two vitest tests: default tone (`info`) + explicit tone (`error`)
3. Updated `app/src/widgets/index.ts` with `import "./alert/alert.js";`
4. `cd app && npm test` — 4 tests pass (2 badge + 2 alert)

## Difference table

| Aspect | A (skill available) | B (skill removed) |
|---|---|---|
| File location | `app/src/widgets/alert/alert.ts` | `app/src/widgets/alert/alert.ts` |
| Registered via `register()` | yes — module-level call | yes — module-level call |
| Colocated test added | yes — `alert.test.ts` | yes — `alert.test.ts` |
| Wired into `widgets/index.ts` | yes | yes |
| Named exports / no `any` | yes | yes |

## Conclusion

Surprisingly, the skill did **not** change the AI's behavior — both runs (A with skill, B without) produced identical code following the golden path. The AI without the skill successfully discovered the correct pattern by analyzing the existing `badge` widget and the project structure. This suggests the skill's value lies not in steering the AI toward a different solution, but in providing **confidence** and **speed** — reducing exploration time and ensuring the assistant follows the project's conventions without hesitation.
