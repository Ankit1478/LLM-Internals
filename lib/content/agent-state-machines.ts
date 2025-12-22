import { Article } from './types';

export const agentStateMachines: Article = {
  module: 2,
  slug: 'agent-state-machines',
  title: 'State Machines for Agents',
  description: 'Control agent behavior with defined states and transitions',
  readTime: 4,
  content: `# State Machines for Agents

## What is a State Machine?

A **state machine** defines what states an agent can be in and how it moves between them.

\`\`\`mermaid
flowchart LR
    A[IDLE] -->|task received| B[PLANNING]
    B -->|plan ready| C[EXECUTING]
    C -->|done| D[COMPLETED]
    C -->|error| E[FAILED]
\`\`\`

## Why Use State Machines?

Without state machines, agents are chaos. With them, you have control.

\`\`\`mermaid
flowchart LR
    subgraph Without[No State Machine]
        A1[What state] --> A2[No idea]
        A2 --> A3[Stuck]
    end

    subgraph With[With State Machine]
        B1[PLANNING] --> B2[EXECUTING]
        B2 --> B3[Clear]
    end
\`\`\`

### Problems State Machines Solve

| Problem | Without SM | With SM |
|---------|-----------|---------|
| **Agent gets stuck** | No way to know where | Know exact state |
| **Unpredictable jumps** | Can go anywhere | Only allowed transitions |
| **Debugging** | "What happened?" | "Failed at EXECUTING" |
| **Recovery** | Start over | Resume from last state |
| **Testing** | Test everything | Test each state |

### Real Example: Order Agent

\`\`\`mermaid
flowchart TD
    A[RECEIVED] -->|validate| B[VALIDATED]
    B -->|process payment| C[PAID]
    C -->|ship| D[SHIPPED]
    D -->|deliver| E[DELIVERED]
    B -->|invalid| F[REJECTED]
    C -->|payment failed| F
\`\`\`

**Without state machine:**
\`\`\`
Agent: Processing order...
Agent: Shipping... wait, was it paid?
Agent: Let me check... where was I?
Agent: *confused*
\`\`\`

**With state machine:**
\`\`\`
State: VALIDATED → PAID → SHIPPED → DELIVERED ✓
\`\`\`

### Benefits Summary

| Benefit | Description |
|---------|-------------|
| **Predictability** | Agent only does allowed actions |
| **Visibility** | Always know current state |
| **Persistence** | Save state, resume later |
| **Testing** | Test transitions individually |
| **Debugging** | Trace state history |

## Basic Implementation

\`\`\`python|javascript
class AgentStateMachine:
    def __init__(self):
        self.state = "IDLE"
        self.transitions = {
            "IDLE": ["PLANNING"],
            "PLANNING": ["EXECUTING", "FAILED"],
            "EXECUTING": ["COMPLETED", "FAILED"],
            "FAILED": ["IDLE"],
            "COMPLETED": ["IDLE"]
        }

    def can_transition(self, new_state):
        return new_state in self.transitions.get(self.state, [])

    def transition(self, new_state):
        if self.can_transition(new_state):
            self.state = new_state
            return True
        return False
|||
class AgentStateMachine {
    constructor() {
        this.state = "IDLE";
        this.transitions = {
            IDLE: ["PLANNING"],
            PLANNING: ["EXECUTING", "FAILED"],
            EXECUTING: ["COMPLETED", "FAILED"],
            FAILED: ["IDLE"],
            COMPLETED: ["IDLE"]
        };
    }

    canTransition(newState) {
        return this.transitions[this.state]?.includes(newState);
    }

    transition(newState) {
        if (this.canTransition(newState)) {
            this.state = newState;
            return true;
        }
        return false;
    }
}
\`\`\`

## Key Takeaways

| Principle | Why |
|-----------|-----|
| **Define all states** | Know where agent can be |
| **Control transitions** | Prevent invalid jumps |
| **Always have exit** | Avoid stuck states |
`,
  previousTopic: { module: 2, slug: 'reactive-vs-deliberative', title: 'Reactive vs Deliberative Agents' },
  nextTopic: { module: 2, slug: 'explicit-vs-implicit-state', title: 'Explicit vs Implicit State' },
};
