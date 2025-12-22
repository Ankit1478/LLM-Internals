import { Article } from './types';

export const multiAgentCommunication: Article = {
  module: 2,
  slug: 'multi-agent-communication',
  title: 'Multi-Agent Communication',
  description: 'How agents talk to each other in multi-agent systems',
  readTime: 4,
  content: `# Multi-Agent Communication

## Why Agents Need to Communicate

In multi-agent systems, agents need to share information, coordinate tasks, and pass results.

Think of it like: Team members in a company need to talk to get work done.

## Communication Methods

There are 4 main ways agents communicate:

1. Message Passing - Direct messages between agents
2. Shared Memory - Common storage all agents can access
3. Event Bus - Publish/subscribe to events
4. State Synchronization - Keep state in sync across agents

## When to Use Each

Message Passing: When Agent A needs to tell Agent B something specific

Shared Memory: When multiple agents need access to same data

Event Bus: When you don't know which agent needs the info

State Sync: When all agents must have same view of the world

## Code Example

\`\`\`python|javascript
class AgentCommunicator:
    def __init__(self):
        self.message_queue = {}
        self.shared_memory = {}
        self.event_listeners = {}

    # Message Passing
    def send_message(self, from_agent, to_agent, message):
        if to_agent not in self.message_queue:
            self.message_queue[to_agent] = []
        self.message_queue[to_agent].append({
            "from": from_agent,
            "message": message
        })

    def get_messages(self, agent_id):
        messages = self.message_queue.get(agent_id, [])
        self.message_queue[agent_id] = []  # Clear after reading
        return messages

    # Shared Memory
    def write_shared(self, key, value):
        self.shared_memory[key] = value

    def read_shared(self, key):
        return self.shared_memory.get(key)

    # Event Bus
    def subscribe(self, event_type, agent_callback):
        if event_type not in self.event_listeners:
            self.event_listeners[event_type] = []
        self.event_listeners[event_type].append(agent_callback)

    def publish(self, event_type, data):
        for callback in self.event_listeners.get(event_type, []):
            callback(data)
|||
class AgentCommunicator {
    constructor() {
        this.messageQueue = {};
        this.sharedMemory = {};
        this.eventListeners = {};
    }

    // Message Passing
    sendMessage(fromAgent, toAgent, message) {
        if (!this.messageQueue[toAgent]) {
            this.messageQueue[toAgent] = [];
        }
        this.messageQueue[toAgent].push({
            from: fromAgent,
            message: message
        });
    }

    getMessages(agentId) {
        const messages = this.messageQueue[agentId] || [];
        this.messageQueue[agentId] = []; // Clear after reading
        return messages;
    }

    // Shared Memory
    writeShared(key, value) {
        this.sharedMemory[key] = value;
    }

    readShared(key) {
        return this.sharedMemory[key];
    }

    // Event Bus
    subscribe(eventType, agentCallback) {
        if (!this.eventListeners[eventType]) {
            this.eventListeners[eventType] = [];
        }
        this.eventListeners[eventType].push(agentCallback);
    }

    publish(eventType, data) {
        for (const callback of this.eventListeners[eventType] || []) {
            callback(data);
        }
    }
}
\`\`\`

## Comparison

Message Passing: Direct, one-to-one, clear sender/receiver

Shared Memory: Simple, all can access, risk of conflicts

Event Bus: Decoupled, flexible, harder to trace

State Sync: Consistent, complex to implement

## Key Point

Choose communication method based on your needs. Message passing for direct coordination, shared memory for common data.
`,
  previousTopic: { module: 2, slug: 'reflection-agent', title: 'Reflection Agent' },
  nextTopic: { module: 2, slug: 'message-passing', title: 'Message Passing' },
};
