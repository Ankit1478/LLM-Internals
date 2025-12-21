import { Article } from './types';

export const hierarchicalPattern: Article = {
  module: 3,
  slug: 'hierarchical-pattern',
  title: 'Hierarchical Pattern',
  description: 'Boss agents manage and coordinate worker agents',
  readTime: 4,
  content: `# Hierarchical Pattern

## What is it?

Hierarchical Pattern organizes agents like a company. Supervisor agents manage worker agents. Workers report back to supervisors.

Think of it like: A manager delegating tasks to team members and combining their work.

## Visual Flow

\`\`\`
                    ┌─────────────┐
                    │  Supervisor │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
      ┌─────────┐    ┌─────────┐    ┌─────────┐
      │ Worker 1│    │ Worker 2│    │ Worker 3│
      └─────────┘    └─────────┘    └─────────┘
           │               │               │
           └───────────────┴───────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Combine   │
                    └─────────────┘
\`\`\`

## Code Example

\`\`\`python|javascript
class HierarchicalSystem:
    def __init__(self, supervisor, workers):
        self.supervisor = supervisor
        self.workers = {w.name: w for w in workers}

    def run(self, task):
        # 1. Supervisor breaks down task
        plan = self.supervisor.plan(task)

        # 2. Assign subtasks to workers
        results = {}
        for subtask in plan["subtasks"]:
            worker = self.workers[subtask["assigned_to"]]
            result = worker.execute(subtask["task"])
            results[subtask["id"]] = result

        # 3. Supervisor combines results
        final = self.supervisor.combine(results)
        return final

class SupervisorAgent:
    def plan(self, task):
        # Break task into subtasks
        return {
            "subtasks": [
                {"id": 1, "task": "Write backend API", "assigned_to": "coder"},
                {"id": 2, "task": "Write unit tests", "assigned_to": "tester"},
                {"id": 3, "task": "Write documentation", "assigned_to": "writer"}
            ]
        }

    def combine(self, results):
        return {
            "status": "complete",
            "deliverables": results
        }

# Usage
system = HierarchicalSystem(
    supervisor=SupervisorAgent(),
    workers=[CoderAgent(), TesterAgent(), WriterAgent()]
)
result = system.run("Build user authentication feature")
|||
class HierarchicalSystem {
    constructor(supervisor, workers) {
        this.supervisor = supervisor;
        this.workers = Object.fromEntries(workers.map(w => [w.name, w]));
    }

    async run(task) {
        // 1. Supervisor breaks down task
        const plan = await this.supervisor.plan(task);

        // 2. Assign subtasks to workers
        const results = {};
        for (const subtask of plan.subtasks) {
            const worker = this.workers[subtask.assignedTo];
            const result = await worker.execute(subtask.task);
            results[subtask.id] = result;
        }

        // 3. Supervisor combines results
        const final = await this.supervisor.combine(results);
        return final;
    }
}

class SupervisorAgent {
    async plan(task) {
        // Break task into subtasks
        return {
            subtasks: [
                { id: 1, task: "Write backend API", assignedTo: "coder" },
                { id: 2, task: "Write unit tests", assignedTo: "tester" },
                { id: 3, task: "Write documentation", assignedTo: "writer" }
            ]
        };
    }

    async combine(results) {
        return {
            status: "complete",
            deliverables: results
        };
    }
}

// Usage
const system = new HierarchicalSystem(
    new SupervisorAgent(),
    [new CoderAgent(), new TesterAgent(), new WriterAgent()]
);
const result = await system.run("Build user authentication feature");
\`\`\`

## Multi-Level Hierarchy

\`\`\`python|javascript
class MultiLevelHierarchy:
    def __init__(self, org_structure):
        self.org = org_structure  # Nested dict of managers -> workers

    def run(self, task, manager_id="ceo"):
        manager = self.org[manager_id]

        if manager["type"] == "worker":
            # Leaf node - do the work
            return manager["agent"].execute(task)

        # Manager node - delegate to reports
        subtasks = manager["agent"].plan(task)
        results = {}

        for subtask in subtasks:
            report_id = subtask["assigned_to"]
            # Recursive call - report might be another manager
            results[subtask["id"]] = self.run(subtask["task"], report_id)

        return manager["agent"].combine(results)

# Organization structure
org = {
    "ceo": {
        "type": "manager",
        "agent": CEOAgent(),
        "reports": ["tech_lead", "product_lead"]
    },
    "tech_lead": {
        "type": "manager",
        "agent": TechLeadAgent(),
        "reports": ["dev1", "dev2"]
    },
    "dev1": {"type": "worker", "agent": DeveloperAgent()},
    "dev2": {"type": "worker", "agent": DeveloperAgent()},
    "product_lead": {
        "type": "manager",
        "agent": ProductLeadAgent(),
        "reports": ["designer", "writer"]
    },
    "designer": {"type": "worker", "agent": DesignerAgent()},
    "writer": {"type": "worker", "agent": WriterAgent()}
}

system = MultiLevelHierarchy(org)
result = system.run("Launch new product feature")
|||
class MultiLevelHierarchy {
    constructor(orgStructure) {
        this.org = orgStructure; // Nested dict of managers -> workers
    }

    async run(task, managerId = "ceo") {
        const manager = this.org[managerId];

        if (manager.type === "worker") {
            // Leaf node - do the work
            return await manager.agent.execute(task);
        }

        // Manager node - delegate to reports
        const subtasks = await manager.agent.plan(task);
        const results = {};

        for (const subtask of subtasks) {
            const reportId = subtask.assignedTo;
            // Recursive call - report might be another manager
            results[subtask.id] = await this.run(subtask.task, reportId);
        }

        return await manager.agent.combine(results);
    }
}

// Organization structure
const org = {
    ceo: {
        type: "manager",
        agent: new CEOAgent(),
        reports: ["tech_lead", "product_lead"]
    },
    tech_lead: {
        type: "manager",
        agent: new TechLeadAgent(),
        reports: ["dev1", "dev2"]
    },
    dev1: { type: "worker", agent: new DeveloperAgent() },
    dev2: { type: "worker", agent: new DeveloperAgent() },
    product_lead: {
        type: "manager",
        agent: new ProductLeadAgent(),
        reports: ["designer", "writer"]
    },
    designer: { type: "worker", agent: new DesignerAgent() },
    writer: { type: "worker", agent: new WriterAgent() }
};

const system = new MultiLevelHierarchy(org);
const result = await system.run("Launch new product feature");
\`\`\`

## Dynamic Worker Assignment

\`\`\`python|javascript
class SmartSupervisor:
    def __init__(self, workers):
        self.workers = workers

    def assign(self, subtask):
        # Match task to best worker based on skills
        best_worker = None
        best_score = 0

        for worker in self.workers:
            score = self.match_score(subtask, worker.skills)
            if score > best_score:
                best_score = score
                best_worker = worker

        return best_worker

    def match_score(self, task, skills):
        # Simple keyword matching
        task_lower = task.lower()
        return sum(1 for skill in skills if skill.lower() in task_lower)

# Workers with skills
class CoderAgent:
    name = "coder"
    skills = ["code", "api", "backend", "database", "python", "javascript"]

class TesterAgent:
    name = "tester"
    skills = ["test", "qa", "validation", "bug", "coverage"]

class WriterAgent:
    name = "writer"
    skills = ["documentation", "readme", "guide", "tutorial", "docs"]

# Supervisor picks best worker for each task
supervisor = SmartSupervisor([CoderAgent(), TesterAgent(), WriterAgent()])
worker = supervisor.assign("Write API documentation")  # Returns WriterAgent
|||
class SmartSupervisor {
    constructor(workers) {
        this.workers = workers;
    }

    assign(subtask) {
        // Match task to best worker based on skills
        let bestWorker = null;
        let bestScore = 0;

        for (const worker of this.workers) {
            const score = this.matchScore(subtask, worker.skills);
            if (score > bestScore) {
                bestScore = score;
                bestWorker = worker;
            }
        }

        return bestWorker;
    }

    matchScore(task, skills) {
        // Simple keyword matching
        const taskLower = task.toLowerCase();
        return skills.filter(skill => taskLower.includes(skill.toLowerCase())).length;
    }
}

// Workers with skills
class CoderAgent {
    name = "coder";
    skills = ["code", "api", "backend", "database", "python", "javascript"];
}

class TesterAgent {
    name = "tester";
    skills = ["test", "qa", "validation", "bug", "coverage"];
}

class WriterAgent {
    name = "writer";
    skills = ["documentation", "readme", "guide", "tutorial", "docs"];
}

// Supervisor picks best worker for each task
const supervisor = new SmartSupervisor([new CoderAgent(), new TesterAgent(), new WriterAgent()]);
const worker = supervisor.assign("Write API documentation"); // Returns WriterAgent
\`\`\`

## Common Use Cases

**Software Development:**
Tech Lead → Frontend Dev + Backend Dev + QA

**Content Production:**
Editor → Writers + Designers + Reviewers

**Research Projects:**
Lead Researcher → Data Collectors + Analysts + Writers

**Customer Support:**
Support Manager → Tier 1 + Tier 2 + Specialists

## Pros and Cons

**Pros:**

Scales to complex tasks

Clear responsibility chain

Good for large projects

Easy to add/remove workers

**Cons:**

Supervisor is bottleneck

More complex to implement

Communication overhead

Supervisor failures break everything

## When to Use

Complex tasks needing breakdown

Multiple specialized skills required

Need coordination between workers

Clear delegation hierarchy makes sense

## Example Prompts

Supervisor planning:
\`\`\`
You are a Supervisor Agent managing a team.

Task: {main_task}

Available workers:
{worker_list_with_skills}

Break down this task into subtasks.
Assign each subtask to the best worker.

Return JSON:
{
  "subtasks": [
    {"id": 1, "task": "...", "assigned_to": "worker_name"},
    ...
  ]
}
\`\`\`

Supervisor combining:
\`\`\`
You are combining results from your team.

Original task: {main_task}

Worker results:
{results}

Combine these into a coherent final deliverable.
Resolve any conflicts between worker outputs.
\`\`\`

## Key Point

Hierarchical = Manager + Workers. Supervisor plans and delegates, workers execute, supervisor combines. Great for complex multi-part tasks.
`,
  previousTopic: { module: 3, slug: 'parallel-execution', title: 'Parallel Execution' },
  nextTopic: { module: 3, slug: 'collaborative-pattern', title: 'Collaborative (Debate & Consensus)' },
};
