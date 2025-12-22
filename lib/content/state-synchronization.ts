import { Article } from './types';

export const stateSynchronization: Article = {
  module: 2,
  slug: 'state-synchronization',
  title: 'State Synchronization',
  description: 'Keeping state consistent across all agents',
  readTime: 3,
  content: `# State Synchronization

## What is it?

State Synchronization ensures all agents have the same view of the world. When state changes, all agents get updated.

Think of it like: Google Docs - when one person edits, everyone sees the change instantly.

## Why it Matters

Without sync: Agent A thinks task is "pending", Agent B thinks it's "done"

With sync: All agents agree task is "done"

## Code Example

\`\`\`python|javascript
class SyncedState:
    def __init__(self):
        self.state = {}
        self.listeners = []
        self.version = 0

    def subscribe(self, callback):
        self.listeners.append(callback)

    def get_state(self):
        return self.state.copy()

    def update(self, key, value):
        self.state[key] = value
        self.version += 1
        self.notify_all(key, value)

    def notify_all(self, key, value):
        for listener in self.listeners:
            listener(key, value, self.version)


class Agent:
    def __init__(self, agent_id, synced_state):
        self.id = agent_id
        self.local_state = {}
        synced_state.subscribe(self.on_state_change)

    def on_state_change(self, key, value, version):
        self.local_state[key] = value
        print(f"Agent {self.id}: {key} = {value}")


# Usage
state = SyncedState()
agent1 = Agent("planner", state)
agent2 = Agent("worker", state)

# When state updates, both agents see it
state.update("current_task", "Write login page")
# Agent planner: current_task = Write login page
# Agent worker: current_task = Write login page
|||
class SyncedState {
    constructor() {
        this.state = {};
        this.listeners = [];
        this.version = 0;
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    getState() {
        return { ...this.state };
    }

    update(key, value) {
        this.state[key] = value;
        this.version++;
        this.notifyAll(key, value);
    }

    notifyAll(key, value) {
        for (const listener of this.listeners) {
            listener(key, value, this.version);
        }
    }
}


class Agent {
    constructor(agentId, syncedState) {
        this.id = agentId;
        this.localState = {};
        syncedState.subscribe(this.onStateChange.bind(this));
    }

    onStateChange(key, value, version) {
        this.localState[key] = value;
        console.log(\`Agent \${this.id}: \${key} = \${value}\`);
    }
}


// Usage
const state = new SyncedState();
const agent1 = new Agent("planner", state);
const agent2 = new Agent("worker", state);

// When state updates, both agents see it
state.update("current_task", "Write login page");
// Agent planner: current_task = Write login page
// Agent worker: current_task = Write login page
\`\`\`

## What to Sync

current_task: What's being worked on

agent_statuses: Who's available/busy

progress: How far along the task is

errors: Any problems that occurred

results: Outputs from completed work

## Handling Conflicts

Problem: Two agents update same state at same time.

Solution 1 - Last Write Wins:
\`\`\`
Agent A writes at t=1
Agent B writes at t=2
B's value is kept (most recent)
\`\`\`

Solution 2 - Version Check:
\`\`\`
Agent A reads version 5
Agent A tries to write, but version is now 6
Write rejected - must re-read first
\`\`\`

## Pros and Cons

Pros: All agents consistent, no stale data, easy to reason about

Cons: Overhead of syncing, conflict handling needed, more complex

## When to Use

When all agents must have same view

For task status tracking

For coordination (who's doing what)

When consistency is critical

## Key Point

State Sync = Single source of truth. One state, many readers, always consistent.
`,
  previousTopic: { module: 2, slug: 'event-bus', title: 'Event Bus' },
  nextTopic: { module: 2, slug: 'multi-agent-patterns', title: 'Multi-Agent Patterns' },
};
