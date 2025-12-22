import { Article } from './types';

export const loopDetectionTermination: Article = {
  module: 2,
  slug: 'loop-detection-termination',
  title: 'Loop Detection & Termination',
  description: 'Prevent agents from running forever',
  readTime: 4,
  content: `# Loop Detection & Termination

## The Problem

Agents can get stuck in infinite loops - repeating the same action forever.

\`\`\`mermaid
flowchart LR
    A[Search] --> B[No Results]
    B --> C[Search Again]
    C --> B
    style B fill:#ff6b6b
    style C fill:#ff6b6b
\`\`\`

## Detection Strategies

### 1. Max Iterations

\`\`\`python|javascript
class SafeAgent:
    MAX_ITERATIONS = 10

    def run(self, task):
        iterations = 0

        while not self.is_done():
            if iterations >= self.MAX_ITERATIONS:
                return {"error": "Max iterations reached"}

            self.step()
            iterations += 1
|||
class SafeAgent {
    static MAX_ITERATIONS = 10;

    run(task) {
        let iterations = 0;

        while (!this.isDone()) {
            if (iterations >= SafeAgent.MAX_ITERATIONS) {
                return { error: "Max iterations reached" };
            }

            this.step();
            iterations++;
        }
    }
}
\`\`\`

### 2. Action History Check

\`\`\`python|javascript
def detect_loop(self, action):
    self.history.append(action)

    # Check last 3 actions
    if len(self.history) >= 3:
        last_3 = self.history[-3:]
        if last_3[0] == last_3[1] == last_3[2]:
            return True  # Same action 3 times = loop

    return False
|||
detectLoop(action) {
    this.history.push(action);

    // Check last 3 actions
    if (this.history.length >= 3) {
        const last3 = this.history.slice(-3);
        if (last3[0] === last3[1] && last3[1] === last3[2]) {
            return true; // Same action 3 times = loop
        }
    }

    return false;
}
\`\`\`

### 3. State Repetition

\`\`\`mermaid
flowchart TD
    A[Track States] --> B{Same state 3x?}
    B -->|Yes| C[Force Exit]
    B -->|No| D[Continue]
\`\`\`

## Termination Conditions

| Condition | Action |
|-----------|--------|
| Goal achieved | Normal exit |
| Max iterations | Force stop |
| Loop detected | Break + report |
| Timeout | Force stop |
| Budget exhausted | Stop |

## Complete Example

\`\`\`python|javascript
class LoopSafeAgent:
    def __init__(self):
        self.history = []
        self.max_iterations = 10
        self.max_same_action = 3

    def run(self, task):
        for i in range(self.max_iterations):
            action = self.decide_action()

            # Check for loop
            if self.is_looping(action):
                return self.break_loop()

            result = self.execute(action)

            if self.is_done(result):
                return result

        return {"status": "max_iterations"}

    def is_looping(self, action):
        self.history.append(action)
        recent = self.history[-self.max_same_action:]
        return len(set(recent)) == 1 and len(recent) == self.max_same_action
|||
class LoopSafeAgent {
    constructor() {
        this.history = [];
        this.maxIterations = 10;
        this.maxSameAction = 3;
    }

    async run(task) {
        for (let i = 0; i < this.maxIterations; i++) {
            const action = await this.decideAction();

            // Check for loop
            if (this.isLooping(action)) {
                return this.breakLoop();
            }

            const result = await this.execute(action);

            if (this.isDone(result)) {
                return result;
            }
        }

        return { status: "max_iterations" };
    }

    isLooping(action) {
        this.history.push(action);
        const recent = this.history.slice(-this.maxSameAction);
        const unique = new Set(recent);
        return unique.size === 1 && recent.length === this.maxSameAction;
    }
}
\`\`\`

## Key Takeaways

| Principle | Why |
|-----------|-----|
| **Set max iterations** | Always have a limit |
| **Track action history** | Detect repetition |
| **Multiple safeguards** | Belt and suspenders |
`,
  previousTopic: { module: 2, slug: 'error-states-recovery', title: 'Error States & Recovery' },
  nextTopic: { module: 2, slug: 'why-agents-need-memory', title: 'Why Agents Need Memory' },
};
