import { Article } from './types';

export const messagePassing: Article = {
  module: 3,
  slug: 'message-passing',
  title: 'Message Passing',
  description: 'Direct communication between agents via messages',
  readTime: 3,
  content: `# Message Passing

## What is it?

Message Passing is when agents send direct messages to each other. Like sending an email or text.

Think of it like: Slack messages between team members.

## How it Works

1. Agent A creates a message
2. Agent A sends to Agent B (by ID or name)
3. Agent B receives and processes message
4. Agent B can reply back

## Message Structure

A typical message contains:

\`\`\`
{
  "from": "planner_agent",
  "to": "code_worker",
  "type": "task",
  "content": "Write a login function",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

## Code Example

\`\`\`python|javascript
class MessageBus:
    def __init__(self):
        self.queues = {}

    def send(self, from_id, to_id, message_type, content):
        if to_id not in self.queues:
            self.queues[to_id] = []

        self.queues[to_id].append({
            "from": from_id,
            "to": to_id,
            "type": message_type,
            "content": content,
            "timestamp": datetime.now()
        })

    def receive(self, agent_id):
        messages = self.queues.get(agent_id, [])
        self.queues[agent_id] = []
        return messages

    def has_messages(self, agent_id):
        return len(self.queues.get(agent_id, [])) > 0


class Agent:
    def __init__(self, agent_id, bus):
        self.id = agent_id
        self.bus = bus

    def send_to(self, target_id, msg_type, content):
        self.bus.send(self.id, target_id, msg_type, content)

    def check_messages(self):
        return self.bus.receive(self.id)

    def process_messages(self):
        for msg in self.check_messages():
            self.handle_message(msg)

# Usage
bus = MessageBus()
supervisor = Agent("supervisor", bus)
worker = Agent("worker", bus)

# Supervisor sends task to worker
supervisor.send_to("worker", "task", "Write unit tests")

# Worker checks messages
messages = worker.check_messages()
# [{"from": "supervisor", "type": "task", "content": "Write unit tests", ...}]
|||
class MessageBus {
    constructor() {
        this.queues = {};
    }

    send(fromId, toId, messageType, content) {
        if (!this.queues[toId]) {
            this.queues[toId] = [];
        }

        this.queues[toId].push({
            from: fromId,
            to: toId,
            type: messageType,
            content: content,
            timestamp: new Date()
        });
    }

    receive(agentId) {
        const messages = this.queues[agentId] || [];
        this.queues[agentId] = [];
        return messages;
    }

    hasMessages(agentId) {
        return (this.queues[agentId] || []).length > 0;
    }
}


class Agent {
    constructor(agentId, bus) {
        this.id = agentId;
        this.bus = bus;
    }

    sendTo(targetId, msgType, content) {
        this.bus.send(this.id, targetId, msgType, content);
    }

    checkMessages() {
        return this.bus.receive(this.id);
    }

    processMessages() {
        for (const msg of this.checkMessages()) {
            this.handleMessage(msg);
        }
    }
}

// Usage
const bus = new MessageBus();
const supervisor = new Agent("supervisor", bus);
const worker = new Agent("worker", bus);

// Supervisor sends task to worker
supervisor.sendTo("worker", "task", "Write unit tests");

// Worker checks messages
const messages = worker.checkMessages();
// [{ from: "supervisor", type: "task", content: "Write unit tests", ... }]
\`\`\`

## Message Types

task: Assign work to another agent

result: Return completed work

query: Ask for information

response: Answer to a query

error: Report a problem

status: Update on progress

## Pros and Cons

Pros: Clear sender/receiver, easy to trace, ordered delivery

Cons: Need to know recipient, can create bottlenecks, synchronous feeling

## When to Use

Supervisor assigning tasks to workers

Worker returning results to supervisor

Agent asking another agent for specific info

Sequential workflows where order matters

## Key Point

Message Passing = Direct mail. You know exactly who you're talking to.
`,
  previousTopic: { module: 3, slug: 'multi-agent-communication', title: 'Multi-Agent Communication' },
  nextTopic: { module: 3, slug: 'shared-memory', title: 'Shared Memory' },
};
