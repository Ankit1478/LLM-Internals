import { Article } from './types';

export const explicitVsImplicitState: Article = {
  module: 2,
  slug: 'explicit-vs-implicit-state',
  title: 'Explicit vs Implicit State',
  description: 'Visible state variables vs hidden context state',
  readTime: 3,
  content: `# Explicit vs Implicit State

## The Difference

\`\`\`mermaid
flowchart LR
    subgraph Explicit[Explicit State]
        A[state = "planning"]
        B[step = 3]
        C[retries = 2]
    end

    subgraph Implicit[Implicit State]
        D[Hidden in context]
        E[LLM remembers]
        F[Not visible]
    end
\`\`\`

| Type | Where | Example |
|------|-------|---------|
| **Explicit** | Variables you define | \`state = "executing"\` |
| **Implicit** | Hidden in LLM context | Conversation history |

## Code Example

\`\`\`python|javascript
# EXPLICIT - You control it
class ExplicitAgent:
    def __init__(self):
        self.state = "idle"
        self.current_step = 0
        self.results = []

    def run(self, task):
        self.state = "planning"
        # State is visible and controllable
|||
// EXPLICIT - You control it
class ExplicitAgent {
    constructor() {
        this.state = "idle";
        this.currentStep = 0;
        this.results = [];
    }

    run(task) {
        this.state = "planning";
        // State is visible and controllable
    }
}
\`\`\`

\`\`\`python|javascript
# IMPLICIT - Hidden in context
def chat_agent(messages):
    # State is hidden in message history
    response = llm.generate(messages)
    # Can't easily know "what step are we on?"
|||
// IMPLICIT - Hidden in context
function chatAgent(messages) {
    // State is hidden in message history
    const response = llm.generate(messages);
    // Can't easily know "what step are we on?"
}
\`\`\`

## When to Use

| Use Explicit When | Use Implicit When |
|-------------------|-------------------|
| Need to save/restore | Simple chat |
| Debugging required | Short conversations |
| Complex workflows | No recovery needed |

## Key Takeaway

**Prefer explicit state** - easier to debug, save, and control.
`,
  previousTopic: { module: 2, slug: 'agent-state-machines', title: 'State Machines for Agents' },
  nextTopic: { module: 2, slug: 'transition-guards', title: 'Transition Guards' },
};
