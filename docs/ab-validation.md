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

<!-- Fill this in after running the A/B test:
     1. git rm -r .agents/skills/creating-widget
     2. Open a NEW chat
     3. Paste the exact prompt from materials/ab-task.md
     4. Record what the AI produced
     5. git checkout -- .agents/skills/creating-widget  (restore skill)
-->

_TODO: Run the prompt without the skill in a new chat and record the result here._

## Difference table

| Aspect | A (skill available) | B (skill removed) |
|---|---|---|
| File location | `app/src/widgets/alert/alert.ts` | _TODO_ |
| Registered via `register()` | yes — module-level call | _TODO_ |
| Colocated test added | yes — `alert.test.ts` | _TODO_ |
| Wired into `widgets/index.ts` | yes | _TODO_ |
| Named exports / no `any` | yes | _TODO_ |

## Conclusion

_TODO: After completing run B, write 1–3 sentences: did the skill change behavior? Was the difference worth writing the skill?_
