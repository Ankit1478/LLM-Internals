import { Article } from './types';

export const sharedMemory: Article = {
  module: 2,
  slug: 'shared-memory',
  title: 'Shared Memory',
  description: 'Common storage that all agents can read and write',
  readTime: 3,
  content: `# Shared Memory

## What is it?

Shared Memory is a common storage space that all agents can read and write. Instead of sending messages, agents just update shared data.

Think of it like: A shared Google Doc that everyone on the team can edit.

## How it Works

1. Agent A writes data to shared memory
2. Any agent can read that data
3. Agents check shared memory for updates
4. No direct communication needed

## Code Example

\`\`\`python|javascript
class SharedMemory:
    def __init__(self):
        self.store = {}
        self.locks = {}

    def write(self, key, value, agent_id):
        self.store[key] = {
            "value": value,
            "updated_by": agent_id,
            "updated_at": datetime.now()
        }

    def read(self, key):
        data = self.store.get(key)
        return data["value"] if data else None

    def read_all(self):
        return {k: v["value"] for k, v in self.store.items()}

    def exists(self, key):
        return key in self.store

    def delete(self, key):
        if key in self.store:
            del self.store[key]


# Usage
memory = SharedMemory()

# Research agent stores findings
memory.write("research_results", {
    "topic": "React hooks",
    "findings": ["useState", "useEffect", "useContext"]
}, agent_id="researcher")

# Writer agent reads research
research = memory.read("research_results")
# {"topic": "React hooks", "findings": [...]}

# Writer stores draft
memory.write("draft", "React hooks are...", agent_id="writer")

# Reviewer reads draft
draft = memory.read("draft")
|||
class SharedMemory {
    constructor() {
        this.store = {};
    }

    write(key, value, agentId) {
        this.store[key] = {
            value: value,
            updatedBy: agentId,
            updatedAt: new Date()
        };
    }

    read(key) {
        const data = this.store[key];
        return data ? data.value : null;
    }

    readAll() {
        const result = {};
        for (const [k, v] of Object.entries(this.store)) {
            result[k] = v.value;
        }
        return result;
    }

    exists(key) {
        return key in this.store;
    }

    delete(key) {
        delete this.store[key];
    }
}


// Usage
const memory = new SharedMemory();

// Research agent stores findings
memory.write("research_results", {
    topic: "React hooks",
    findings: ["useState", "useEffect", "useContext"]
}, "researcher");

// Writer agent reads research
const research = memory.read("research_results");
// { topic: "React hooks", findings: [...] }

// Writer stores draft
memory.write("draft", "React hooks are...", "writer");

// Reviewer reads draft
const draft = memory.read("draft");
\`\`\`

## Common Use Cases

task_context: Current task info all agents need

intermediate_results: Partial results from workers

agent_status: Which agents are busy/free

global_config: Settings all agents share

conversation_history: Chat history for context

## Handling Conflicts

Problem: Two agents write to same key at same time.

Solutions:

1. Locks - Only one agent can write at a time
2. Namespacing - Each agent writes to their own keys
3. Versioning - Keep track of versions, reject old writes
4. Merge strategy - Combine conflicting writes

\`\`\`python|javascript
# Namespacing example
memory.write("researcher:findings", data, "researcher")
memory.write("writer:draft", data, "writer")

# Each agent has their own namespace
|||
// Namespacing example
memory.write("researcher:findings", data, "researcher");
memory.write("writer:draft", data, "writer");

// Each agent has their own namespace
\`\`\`

## Pros and Cons

Pros: Simple to implement, no need to know recipients, good for shared state

Cons: Potential conflicts, harder to trace who wrote what, polling needed

## Message Passing vs Shared Memory

Message Passing: "Hey worker, here's your task"

Shared Memory: Worker checks shared memory and sees new task

Use message passing for direct commands. Use shared memory for shared state.

## Key Point

Shared Memory = Whiteboard in office. Everyone can see it, anyone can write on it.
`,
  previousTopic: { module: 2, slug: 'message-passing', title: 'Message Passing' },
  nextTopic: { module: 2, slug: 'event-bus', title: 'Event Bus' },
};
