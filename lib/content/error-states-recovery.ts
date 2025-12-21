import { Article } from './types';

export const errorStatesRecovery: Article = {
  module: 3,
  slug: 'error-states-recovery',
  title: 'Error States & Recovery',
  description: 'Handle failures gracefully with error states',
  readTime: 4,
  content: `# Error States & Recovery

## Why Error States Matter

Without error handling, agents crash or get stuck. Error states let them recover.

\`\`\`mermaid
flowchart TD
    A[EXECUTING] -->|success| B[COMPLETED]
    A -->|error| C[ERROR]
    C -->|retry| A
    C -->|give up| D[FAILED]
\`\`\`

## Error Handling Pattern

\`\`\`python|javascript
class RecoverableAgent:
    def __init__(self):
        self.state = "IDLE"
        self.retries = 0
        self.max_retries = 3

    def execute_with_recovery(self, task):
        self.state = "EXECUTING"

        try:
            result = self.execute(task)
            self.state = "COMPLETED"
            return result
        except Exception as e:
            self.state = "ERROR"
            return self.handle_error(e, task)

    def handle_error(self, error, task):
        self.retries += 1

        if self.retries < self.max_retries:
            # Retry
            return self.execute_with_recovery(task)
        else:
            # Give up
            self.state = "FAILED"
            return {"error": str(error)}
|||
class RecoverableAgent {
    constructor() {
        this.state = "IDLE";
        this.retries = 0;
        this.maxRetries = 3;
    }

    async executeWithRecovery(task) {
        this.state = "EXECUTING";

        try {
            const result = await this.execute(task);
            this.state = "COMPLETED";
            return result;
        } catch (e) {
            this.state = "ERROR";
            return this.handleError(e, task);
        }
    }

    async handleError(error, task) {
        this.retries++;

        if (this.retries < this.maxRetries) {
            // Retry
            return this.executeWithRecovery(task);
        } else {
            // Give up
            this.state = "FAILED";
            return { error: error.message };
        }
    }
}
\`\`\`

## Recovery Strategies

| Strategy | When to Use |
|----------|-------------|
| **Retry** | Transient errors (API timeout) |
| **Backoff** | Rate limits |
| **Fallback** | Alternative approach |
| **Escalate** | Need human help |

\`\`\`mermaid
flowchart TD
    A[Error] --> B{Retry?}
    B -->|Yes| C[Wait & Retry]
    B -->|No| D{Fallback?}
    D -->|Yes| E[Try Alternative]
    D -->|No| F[Escalate/Fail]
\`\`\`

## Key Takeaway

**Always have an error state** - agents will fail, plan for it.
`,
  previousTopic: { module: 3, slug: 'transition-guards', title: 'Transition Guards' },
  nextTopic: { module: 3, slug: 'loop-detection-termination', title: 'Loop Detection & Termination' },
};
