import { Article } from './types';

export const planningVsExecution: Article = {
  module: 2,
  slug: 'planning-vs-execution',
  title: 'Planning vs Execution Separation',
  description: 'Plan first, execute later - the key to reliable agents',
  readTime: 5,
  content: `# Planning vs Execution Separation

## The Core Idea

**Separate PLANNING from DOING.** First create a plan, then execute it step by step.

\`\`\`mermaid
flowchart LR
    A[Task] --> B[PLAN Phase]
    B --> C[EXECUTE Phase]
    C --> D[Result]

    B -.-> B1[Think through steps]
    C -.-> C1[Do each step]
\`\`\`

**Why separate them?**
- Planning needs creativity and reasoning
- Execution needs precision and reliability
- Mixing them causes chaos

## Bad vs Good Approach

\`\`\`mermaid
flowchart TD
    subgraph Bad[❌ Mixed - Chaotic]
        A1[Do step 1] --> A2[Think what's next?]
        A2 --> A3[Do step 2]
        A3 --> A4[Forget step 3!]
        A4 --> A5[Confused agent]
    end

    subgraph Good[✅ Separated - Clean]
        B1[Plan ALL steps first] --> B2[Execute step 1]
        B2 --> B3[Execute step 2]
        B3 --> B4[Execute step 3]
        B4 --> B5[Done!]
    end
\`\`\`

## Real Example

**Task:** "Book a trip to Goa for next weekend"

### Without Separation (Messy)
\`\`\`
Agent: Let me search flights... found some
Agent: Wait, what dates? Let me ask user
Agent: Okay got dates. Now hotels...
Agent: Oh wait, should I book flight first?
Agent: *gets confused and stuck*
\`\`\`

### With Separation (Clean)

**PLAN Phase:**
\`\`\`
1. Get travel dates from user
2. Get budget from user
3. Search flights
4. Search hotels
5. Show options to user
6. Book selected options
\`\`\`

**EXECUTE Phase:**
\`\`\`
Step 1: ✅ Got dates: Dec 20-22
Step 2: ✅ Got budget: ₹15,000
Step 3: ✅ Found 5 flights
Step 4: ✅ Found 8 hotels
Step 5: ✅ User selected flight + hotel
Step 6: ✅ Booked successfully!
\`\`\`

## Code Implementation

\`\`\`python|javascript
class PlanExecuteAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools

    def run(self, task):
        # PHASE 1: Planning
        plan = self.create_plan(task)
        print(f"Plan: {plan}")

        # PHASE 2: Execution
        results = []
        for step in plan:
            result = self.execute_step(step)
            results.append(result)

            # Check if step failed
            if not result["success"]:
                return self.handle_failure(step, results)

        return self.summarize(results)

    def create_plan(self, task):
        response = self.llm.generate(f"""
            Task: {task}
            Available tools: {list(self.tools.keys())}

            Create a step-by-step plan. Be specific.
            Format:
            1. [action]: [details]
            2. [action]: [details]
            ...
        """)
        return self.parse_plan(response)

    def execute_step(self, step):
        tool = self.tools.get(step["tool"])
        if tool:
            return tool(**step["params"])
        return {"success": False, "error": "Unknown tool"}
|||
class PlanExecuteAgent {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools;
    }

    async run(task) {
        // PHASE 1: Planning
        const plan = await this.createPlan(task);
        console.log("Plan:", plan);

        // PHASE 2: Execution
        const results = [];
        for (const step of plan) {
            const result = await this.executeStep(step);
            results.push(result);

            // Check if step failed
            if (!result.success) {
                return this.handleFailure(step, results);
            }
        }

        return this.summarize(results);
    }

    async createPlan(task) {
        const response = await this.llm.generate(\`
            Task: \${task}
            Available tools: \${Object.keys(this.tools)}

            Create a step-by-step plan. Be specific.
            Format:
            1. [action]: [details]
            2. [action]: [details]
            ...
        \`);
        return this.parsePlan(response);
    }

    async executeStep(step) {
        const tool = this.tools[step.tool];
        if (tool) {
            return await tool(step.params);
        }
        return { success: false, error: "Unknown tool" };
    }
}
\`\`\`

## When to Re-Plan

Sometimes execution reveals new information. Handle it:

\`\`\`mermaid
flowchart TD
    A[Execute Step] --> B{Step Succeeded?}
    B -->|Yes| C[Continue to Next Step]
    B -->|No| D{Can Recover?}
    D -->|Yes| E[Modify Plan]
    D -->|No| F[Report Failure]
    E --> A
    C --> G{More Steps?}
    G -->|Yes| A
    G -->|No| H[Done!]
\`\`\`

\`\`\`python|javascript
def execute_with_replan(self, plan):
    for i, step in enumerate(plan):
        result = self.execute_step(step)

        if not result["success"]:
            # Try to create a new plan from here
            remaining_goal = self.get_remaining_goal(plan, i)
            new_plan = self.create_plan(remaining_goal)

            if new_plan:
                return self.execute_with_replan(new_plan)
            else:
                return {"success": False, "completed": i}

    return {"success": True}
|||
async executeWithReplan(plan) {
    for (let i = 0; i < plan.length; i++) {
        const result = await this.executeStep(plan[i]);

        if (!result.success) {
            // Try to create a new plan from here
            const remainingGoal = this.getRemainingGoal(plan, i);
            const newPlan = await this.createPlan(remainingGoal);

            if (newPlan) {
                return this.executeWithReplan(newPlan);
            } else {
                return { success: false, completed: i };
            }
        }
    }

    return { success: true };
}
\`\`\`

## Comparison

| Aspect | Mixed Approach | Plan-Execute |
|--------|----------------|--------------|
| Clarity | Confusing | Clear steps |
| Debugging | Hard | Easy |
| Recovery | Difficult | Can re-plan |
| User visibility | None | Can show plan |
| Reliability | Low | High |

## Key Takeaways

\`\`\`mermaid
flowchart LR
    A[Plan First] --> B[Execute Second]
    B --> C[Re-plan if Needed]
\`\`\`

| Principle | Why |
|-----------|-----|
| **Plan completely first** | Catch issues before executing |
| **Execute step by step** | Track progress, recover from errors |
| **Re-plan when needed** | Adapt to new information |
| **Show plan to user** | Transparency and trust |

**Remember:** Think like a chess player - plan your moves before you touch the pieces!
`,
  previousTopic: { module: 2, slug: 'tool-first-execution', title: 'Tool-First Execution Pattern' },
  nextTopic: { module: 2, slug: 'planner-worker-architecture', title: 'Planner + Worker Architecture' },
};
