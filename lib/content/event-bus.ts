import { Article } from './types';

export const eventBus: Article = {
  module: 3,
  slug: 'event-bus',
  title: 'Event Bus',
  description: 'Publish-subscribe pattern for agent communication',
  readTime: 3,
  content: `# Event Bus

## What is it?

Event Bus is a publish-subscribe system. Agents publish events, and any agent interested can subscribe to receive them.

Think of it like: A news channel. Publisher broadcasts, subscribers tune in.

## How it Works

1. Agent subscribes to event type (e.g., "task_completed")
2. Another agent publishes that event
3. All subscribers receive the event automatically
4. Publisher doesn't need to know who's listening

## Code Example

\`\`\`python|javascript
class EventBus:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, event_type, callback):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(callback)

    def unsubscribe(self, event_type, callback):
        if event_type in self.subscribers:
            self.subscribers[event_type].remove(callback)

    def publish(self, event_type, data):
        if event_type in self.subscribers:
            for callback in self.subscribers[event_type]:
                callback(data)


# Usage
bus = EventBus()

# Supervisor subscribes to task completion
def on_task_done(data):
    print(f"Task completed: {data}")

bus.subscribe("task_completed", on_task_done)

# Worker publishes when done
bus.publish("task_completed", {
    "task_id": "123",
    "result": "Code written successfully"
})
# Output: Task completed: {task_id: "123", result: "..."}
|||
class EventBus {
    constructor() {
        this.subscribers = {};
    }

    subscribe(eventType, callback) {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(callback);
    }

    unsubscribe(eventType, callback) {
        if (this.subscribers[eventType]) {
            this.subscribers[eventType] = this.subscribers[eventType]
                .filter(cb => cb !== callback);
        }
    }

    publish(eventType, data) {
        if (this.subscribers[eventType]) {
            for (const callback of this.subscribers[eventType]) {
                callback(data);
            }
        }
    }
}


// Usage
const bus = new EventBus();

// Supervisor subscribes to task completion
const onTaskDone = (data) => {
    console.log("Task completed:", data);
};

bus.subscribe("task_completed", onTaskDone);

// Worker publishes when done
bus.publish("task_completed", {
    taskId: "123",
    result: "Code written successfully"
});
// Output: Task completed: { taskId: "123", result: "..." }
\`\`\`

## Common Event Types

task_created: New task added

task_completed: Task finished

task_failed: Task errored

agent_ready: Agent available for work

agent_busy: Agent working on something

data_updated: Shared data changed

error_occurred: Something went wrong

## Message Passing vs Event Bus

Message Passing: "Hey Worker-1, do this task"

Event Bus: "A task is available" (any worker can pick it up)

## Pros and Cons

Pros: Decoupled (publisher doesn't know subscribers), flexible, easy to add new listeners

Cons: Harder to debug, no guaranteed delivery order, can miss events if not subscribed

## When to Use

When multiple agents might care about an event

When you don't know which agent should handle something

For logging and monitoring

For loose coupling between agents

## Key Point

Event Bus = Radio broadcast. Publish once, anyone listening will hear it.
`,
  previousTopic: { module: 3, slug: 'shared-memory', title: 'Shared Memory' },
  nextTopic: { module: 3, slug: 'state-synchronization', title: 'State Synchronization' },
};
