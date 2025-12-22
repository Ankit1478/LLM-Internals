import { Article } from './types';

export const supervisorAgent: Article = {
  module: 2,
  slug: 'supervisor-agent',
  title: 'Supervisor Agent',
  description: 'The manager that coordinates other agents',
  readTime: 3,
  content: `# Supervisor Agent

## What is it?

The **Supervisor** is the manager - it doesn't do work itself, it assigns tasks to other agents and collects results.

**Think of it like:** A project manager who delegates tasks to developers.

## How it Works

1. Receive task from user
2. Break into subtasks
3. Assign each subtask to right worker
4. Collect and combine results
5. Return final answer

## Code Example

\`\`\`python|javascript
class SupervisorAgent:
    def __init__(self, workers):
        self.workers = workers

    def run(self, task):
        # Decide which worker handles this
        worker_name = self.route_task(task)
        worker = self.workers[worker_name]

        # Execute and return
        return worker.execute(task)

    def route_task(self, task):
        if "code" in task.lower():
            return "coder"
        elif "search" in task.lower():
            return "researcher"
        else:
            return "general"

# Usage
supervisor = SupervisorAgent({
    "coder": CodeWorker(),
    "researcher": ResearchWorker(),
    "general": GeneralWorker()
})
result = supervisor.run("Write a function to sort array")
|||
class SupervisorAgent {
    constructor(workers) {
        this.workers = workers;
    }

    async run(task) {
        // Decide which worker handles this
        const workerName = this.routeTask(task);
        const worker = this.workers[workerName];

        // Execute and return
        return await worker.execute(task);
    }

    routeTask(task) {
        if (task.toLowerCase().includes("code")) {
            return "coder";
        } else if (task.toLowerCase().includes("search")) {
            return "researcher";
        }
        return "general";
    }
}

// Usage
const supervisor = new SupervisorAgent({
    coder: new CodeWorker(),
    researcher: new ResearchWorker(),
    general: new GeneralWorker()
});
const result = await supervisor.run("Write a function to sort array");
\`\`\`

## Example Prompt

\`\`\`
You are a Supervisor Agent. Your job is to delegate tasks to the right worker.

Available workers:
- coder: Writes and edits code
- researcher: Searches and gathers information
- writer: Creates content and documentation

Task: {user_task}

Decide which worker should handle this task.
Reply with: WORKER: worker_name
\`\`\`

## When to Use

Use when you have multiple specialized workers

Use for complex multi-step tasks

Use when coordination is needed

Don't use for single simple tasks

## Key Point

**Supervisor = Router + Coordinator.** It picks the right agent and manages the flow.
`,
  previousTopic: { module: 2, slug: 'agent-roles', title: 'Agent Roles' },
  nextTopic: { module: 2, slug: 'worker-agents', title: 'Worker Agents' },
};
