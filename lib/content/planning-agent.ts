import { Article } from './types';

export const planningAgent: Article = {
  module: 3,
  slug: 'planning-agent',
  title: 'Planning Agent',
  description: 'Creates step-by-step plans before execution',
  readTime: 3,
  content: `# Planning Agent

## What is it?

**Planning Agent** creates a detailed plan before any work starts. Think first, do later.

**Think of it like:** An architect who draws blueprints before construction.

## Why Plan?

**Without Planning:**
- Jump into task blindly
- Miss important steps
- Hard to track progress
- Difficult to recover from errors

**With Planning:**
- Know all steps upfront
- Complete coverage of requirements
- Clear checkpoints to track progress
- Can resume from any step if something fails

## Code Example

\`\`\`python|javascript
class PlanningAgent:
    def __init__(self, llm):
        self.llm = llm

    def create_plan(self, goal):
        plan = self.llm.generate(f"""
            Goal: {goal}

            Create a step-by-step plan.
            Each step should be a single action.

            Format:
            1. [Action]
            2. [Action]
            ...
        """)
        return self.parse_steps(plan)

    def parse_steps(self, plan_text):
        steps = []
        for line in plan_text.split("\\n"):
            if line.strip() and line[0].isdigit():
                steps.append(line.strip())
        return steps

# Usage
planner = PlanningAgent(llm)
steps = planner.create_plan("Build a todo app")
# Returns: ["1. Create project structure", "2. Design database schema", ...]
|||
class PlanningAgent {
    constructor(llm) {
        this.llm = llm;
    }

    async createPlan(goal) {
        const plan = await this.llm.generate(\`
            Goal: \${goal}

            Create a step-by-step plan.
            Each step should be a single action.

            Format:
            1. [Action]
            2. [Action]
            ...
        \`);
        return this.parseSteps(plan);
    }

    parseSteps(planText) {
        return planText
            .split("\\n")
            .filter(line => line.trim() && /^\\d/.test(line))
            .map(line => line.trim());
    }
}

// Usage
const planner = new PlanningAgent(llm);
const steps = await planner.createPlan("Build a todo app");
// Returns: ["1. Create project structure", "2. Design database schema", ...]
\`\`\`

## Example Prompt

\`\`\`
You are a Planning Agent. Your job is to create detailed step-by-step plans.

Goal: {goal}
Context: {context}
Available tools: {tools}

Create a plan with these rules:
1. Each step should be ONE specific action
2. Steps should be in logical order
3. Include what tool to use for each step
4. Include success criteria for each step

Format:
Step 1: [Action] - Tool: [tool_name] - Done when: [criteria]
Step 2: [Action] - Tool: [tool_name] - Done when: [criteria]
...
\`\`\`

## Good Plan Characteristics

Specific - Each step is clear action

Ordered - Steps in logical sequence

Atomic - One action per step

Verifiable - Can check if step is done

## Key Point

**Planner = Architect.** Creates the blueprint, doesn't build the house.
`,
  previousTopic: { module: 3, slug: 'worker-agents', title: 'Worker Agents' },
  nextTopic: { module: 3, slug: 'memory-agent', title: 'Memory Agent' },
};
