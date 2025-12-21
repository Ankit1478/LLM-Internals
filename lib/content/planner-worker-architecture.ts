import { Article } from './types';

export const plannerWorkerArchitecture: Article = {
  module: 3,
  slug: 'planner-worker-architecture',
  title: 'Planner + Worker Architecture',
  description: 'Separate brain from hands - one plans, others execute',
  readTime: 5,
  content: `# Planner + Worker Architecture

## The Idea

**One agent PLANS, other agents WORK.** The planner thinks, workers do.

\`\`\`mermaid
flowchart TD
    A[Task] --> B[PLANNER Agent]
    B --> C[Create Plan]
    C --> D[WORKER 1]
    C --> E[WORKER 2]
    C --> F[WORKER 3]
    D --> G[Results]
    E --> G
    F --> G
    G --> B
    B --> H[Final Answer]
\`\`\`

**Why this pattern?**
- Planner: Big picture thinking, coordination
- Workers: Specialized tasks, focused execution

## Real-World Analogy

\`\`\`mermaid
flowchart LR
    subgraph Company[Company Structure]
        A[CEO/Manager] --> B[Developer]
        A --> C[Designer]
        A --> D[Tester]
    end
\`\`\`

| Role | Agent Type | Job |
|------|-----------|-----|
| Manager | Planner | Decides what to do |
| Developer | Worker | Writes code |
| Designer | Worker | Creates UI |
| Tester | Worker | Tests features |

## Code Implementation

\`\`\`python|javascript
class PlannerWorkerSystem:
    def __init__(self, planner_llm, workers):
        self.planner = planner_llm
        self.workers = workers  # Dict of specialized workers

    def run(self, task):
        # Step 1: Planner creates the plan
        plan = self.create_plan(task)

        # Step 2: Assign tasks to workers
        results = {}
        for step in plan:
            worker = self.workers[step["worker_type"]]
            result = worker.execute(step["task"])
            results[step["id"]] = result

            # Report back to planner
            if not result["success"]:
                plan = self.replan(task, results)

        # Step 3: Planner summarizes
        return self.planner.summarize(results)

    def create_plan(self, task):
        return self.planner.generate(f"""
            Task: {task}
            Available workers: {list(self.workers.keys())}

            Create a plan with steps. For each step specify:
            - id: step number
            - worker_type: which worker
            - task: what to do
        """)
|||
class PlannerWorkerSystem {
    constructor(plannerLLM, workers) {
        this.planner = plannerLLM;
        this.workers = workers; // Map of specialized workers
    }

    async run(task) {
        // Step 1: Planner creates the plan
        let plan = await this.createPlan(task);

        // Step 2: Assign tasks to workers
        const results = {};
        for (const step of plan) {
            const worker = this.workers[step.workerType];
            const result = await worker.execute(step.task);
            results[step.id] = result;

            // Report back to planner
            if (!result.success) {
                plan = await this.replan(task, results);
            }
        }

        // Step 3: Planner summarizes
        return this.planner.summarize(results);
    }

    async createPlan(task) {
        return await this.planner.generate(\`
            Task: \${task}
            Available workers: \${Object.keys(this.workers)}

            Create a plan with steps. For each step specify:
            - id: step number
            - workerType: which worker
            - task: what to do
        \`);
    }
}
\`\`\`

## Worker Types

\`\`\`mermaid
flowchart TD
    P[Planner] --> W1[Research Worker]
    P --> W2[Code Worker]
    P --> W3[Review Worker]
    P --> W4[Test Worker]

    W1 -.-> T1[Search, Read docs]
    W2 -.-> T2[Write, Edit code]
    W3 -.-> T3[Check quality]
    W4 -.-> T4[Run tests]
\`\`\`

\`\`\`python|javascript
# Define specialized workers
workers = {
    "researcher": ResearchWorker(tools=["search", "read"]),
    "coder": CodeWorker(tools=["write", "edit", "run"]),
    "reviewer": ReviewWorker(tools=["analyze", "suggest"]),
    "tester": TestWorker(tools=["test", "benchmark"])
}
|||
// Define specialized workers
const workers = {
    researcher: new ResearchWorker({ tools: ["search", "read"] }),
    coder: new CodeWorker({ tools: ["write", "edit", "run"] }),
    reviewer: new ReviewWorker({ tools: ["analyze", "suggest"] }),
    tester: new TestWorker({ tools: ["test", "benchmark"] })
};
\`\`\`

## Communication Flow

\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant P as Planner
    participant W1 as Worker 1
    participant W2 as Worker 2

    U->>P: "Build a login page"
    P->>P: Create plan
    P->>W1: "Research auth methods"
    W1->>P: Research results
    P->>W2: "Write login component"
    W2->>P: Code complete
    P->>U: "Login page ready!"
\`\`\`

## When to Use

| Scenario | Use Planner-Worker? |
|----------|-------------------|
| Complex multi-step tasks | ✅ Yes |
| Need specialized skills | ✅ Yes |
| Simple single task | ❌ Overkill |
| Real-time chat | ❌ Too slow |

## Key Takeaways

| Principle | Description |
|-----------|-------------|
| **Separation of concerns** | Planner thinks, workers do |
| **Specialized workers** | Each worker has focused tools |
| **Central coordination** | Planner manages the flow |
| **Scalable** | Add more workers as needed |
`,
  previousTopic: { module: 3, slug: 'planning-vs-execution', title: 'Planning vs Execution Separation' },
  nextTopic: { module: 3, slug: 'reactive-vs-deliberative', title: 'Reactive vs Deliberative Agents' },
};
