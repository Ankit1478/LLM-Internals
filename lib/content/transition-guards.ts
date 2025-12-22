import { Article } from './types';

export const transitionGuards: Article = {
  module: 2,
  slug: 'transition-guards',
  title: 'Transition Guards',
  description: 'Conditions that must be true before state changes',
  readTime: 3,
  content: `# Transition Guards

## What are Guards?

**Guards** = Conditions that must be true before a state transition is allowed.

\`\`\`mermaid
flowchart LR
    A[PLANNING] -->|guard: plan_valid?| B[EXECUTING]
    A -->|guard fails| A
\`\`\`

## Real Example

\`\`\`mermaid
flowchart TD
    A[IDLE] -->|has_task?| B[PLANNING]
    B -->|plan_exists AND tools_available?| C[EXECUTING]
    C -->|all_steps_done?| D[COMPLETED]
\`\`\`

## Code Implementation

\`\`\`python|javascript
class GuardedStateMachine:
    def __init__(self):
        self.state = "IDLE"
        self.guards = {
            ("IDLE", "PLANNING"): self.has_task,
            ("PLANNING", "EXECUTING"): self.plan_is_valid,
            ("EXECUTING", "COMPLETED"): self.all_done
        }

    def transition(self, new_state):
        guard = self.guards.get((self.state, new_state))

        if guard and not guard():
            return False  # Guard blocked transition

        self.state = new_state
        return True

    def has_task(self):
        return self.current_task is not None

    def plan_is_valid(self):
        return len(self.plan) > 0
|||
class GuardedStateMachine {
    constructor() {
        this.state = "IDLE";
        this.guards = {
            "IDLE->PLANNING": () => this.hasTask(),
            "PLANNING->EXECUTING": () => this.planIsValid(),
            "EXECUTING->COMPLETED": () => this.allDone()
        };
    }

    transition(newState) {
        const key = \`\${this.state}->\${newState}\`;
        const guard = this.guards[key];

        if (guard && !guard()) {
            return false; // Guard blocked transition
        }

        this.state = newState;
        return true;
    }

    hasTask() {
        return this.currentTask !== null;
    }

    planIsValid() {
        return this.plan.length > 0;
    }
}
\`\`\`

## Common Guards

| Guard | Checks |
|-------|--------|
| \`has_input\` | Input provided? |
| \`plan_valid\` | Plan created? |
| \`tools_ready\` | Tools available? |
| \`budget_ok\` | Within token limit? |
| \`retries_left\` | Can retry? |

## Key Takeaway

**Guards prevent invalid transitions** - agent can't execute without a plan.
`,
  previousTopic: { module: 2, slug: 'explicit-vs-implicit-state', title: 'Explicit vs Implicit State' },
  nextTopic: { module: 2, slug: 'error-states-recovery', title: 'Error States & Recovery' },
};
