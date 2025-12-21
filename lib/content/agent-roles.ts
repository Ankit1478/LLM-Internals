import { Article } from './types';

export const agentRoles: Article = {
  module: 3,
  slug: 'agent-roles',
  title: 'Agent Roles',
  description: 'Specialized agents for different tasks - Supervisor, Worker, Planning, Memory, and more',
  readTime: 6,
  content: `# Agent Roles in Multi-Agent Systems

## Why Different Roles?

Just like a company has different employees (CEO, developers, testers), multi-agent systems have specialized agents. Each agent has a specific job.

**Single agent trying to do everything:**
- Gets confused with complex tasks
- Makes more mistakes
- Hard to debug when things go wrong

**Multiple specialized agents:**
- Each focuses on one thing
- Better at their specific job
- Easier to fix problems

## The 7 Key Agent Roles

| Role | Job | Human Equivalent |
|------|-----|------------------|
| **Supervisor** | Manages other agents | Project Manager |
| **Worker** | Does the actual tasks | Developer |
| **Planning** | Creates step-by-step plans | Architect |
| **Memory** | Stores and retrieves information | Librarian |
| **Evaluation** | Checks quality of work | QA Tester |
| **Verification** | Validates facts and outputs | Fact-checker |
| **Reflection** | Learns from mistakes | Coach |

## 1. Supervisor Agent

**Job:** Coordinate other agents, assign tasks, collect results.

The supervisor doesn't do the work - it manages who does what.

**When to use:** When you have multiple workers that need coordination.

\`\`\`python|javascript
class SupervisorAgent:
    def __init__(self, workers):
        self.workers = workers  # Dict of worker agents

    def handle_task(self, task):
        # 1. Analyze what needs to be done
        subtasks = self.break_down_task(task)

        # 2. Assign to appropriate workers
        results = {}
        for subtask in subtasks:
            worker = self.select_worker(subtask)
            results[subtask["id"]] = worker.execute(subtask)

        # 3. Combine results
        return self.combine_results(results)

    def select_worker(self, subtask):
        # Match task type to worker specialty
        task_type = subtask["type"]
        return self.workers.get(task_type, self.workers["general"])

# Example usage
supervisor = SupervisorAgent({
    "research": ResearchWorker(),
    "code": CodeWorker(),
    "review": ReviewWorker()
})
result = supervisor.handle_task("Build a login page with best practices")
|||
class SupervisorAgent {
    constructor(workers) {
        this.workers = workers; // Map of worker agents
    }

    async handleTask(task) {
        // 1. Analyze what needs to be done
        const subtasks = await this.breakDownTask(task);

        // 2. Assign to appropriate workers
        const results = {};
        for (const subtask of subtasks) {
            const worker = this.selectWorker(subtask);
            results[subtask.id] = await worker.execute(subtask);
        }

        // 3. Combine results
        return this.combineResults(results);
    }

    selectWorker(subtask) {
        // Match task type to worker specialty
        const taskType = subtask.type;
        return this.workers[taskType] || this.workers["general"];
    }
}

// Example usage
const supervisor = new SupervisorAgent({
    research: new ResearchWorker(),
    code: new CodeWorker(),
    review: new ReviewWorker()
});
const result = await supervisor.handleTask("Build a login page with best practices");
\`\`\`

**Real example:** User asks "Create a blog post about AI"
1. Supervisor receives task
2. Assigns research to ResearchWorker
3. Assigns writing to WriterWorker
4. Assigns fact-check to VerificationWorker
5. Combines all into final blog post

## 2. Worker Agent

**Job:** Execute specific tasks. The "hands" of the system.

Workers are specialized - a CodeWorker writes code, a ResearchWorker searches information.

**When to use:** For any task that needs to be done.

\`\`\`python|javascript
class CodeWorker:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools  # file_write, file_read, run_tests

    def execute(self, task):
        # Focused only on coding tasks
        code = self.llm.generate(f"""
            You are a coding expert.
            Task: {task["description"]}
            Requirements: {task["requirements"]}

            Write clean, tested code.
        """)

        # Write the code
        self.tools["file_write"](task["file_path"], code)

        # Run tests
        test_result = self.tools["run_tests"]()

        return {
            "code": code,
            "tests_passed": test_result["success"]
        }
|||
class CodeWorker {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools; // file_write, file_read, run_tests
    }

    async execute(task) {
        // Focused only on coding tasks
        const code = await this.llm.generate(\`
            You are a coding expert.
            Task: \${task.description}
            Requirements: \${task.requirements}

            Write clean, tested code.
        \`);

        // Write the code
        await this.tools.fileWrite(task.filePath, code);

        // Run tests
        const testResult = await this.tools.runTests();

        return {
            code: code,
            testsPassed: testResult.success
        };
    }
}
\`\`\`

**Different worker types:**
- **ResearchWorker** - Searches web, reads documents
- **CodeWorker** - Writes and edits code
- **WriterWorker** - Creates content, documentation
- **DataWorker** - Analyzes data, creates charts

## 3. Planning Agent

**Job:** Create detailed plans before execution. Think before doing.

The planner breaks complex tasks into actionable steps.

**When to use:** Complex tasks that need multiple steps.

\`\`\`python|javascript
class PlanningAgent:
    def __init__(self, llm):
        self.llm = llm

    def create_plan(self, goal, context):
        plan = self.llm.generate(f"""
            Goal: {goal}
            Context: {context}
            Available actions: research, code, test, review, deploy

            Create a detailed plan:
            1. What information do we need?
            2. What are the exact steps?
            3. What could go wrong?
            4. How do we verify success?

            Output as numbered steps with clear actions.
        """)

        return self.parse_plan(plan)

    def parse_plan(self, raw_plan):
        # Convert text plan to structured format
        steps = []
        for line in raw_plan.split("\\n"):
            if line.strip().startswith(tuple("123456789")):
                steps.append({
                    "step": len(steps) + 1,
                    "action": line.strip(),
                    "status": "pending"
                })
        return steps
|||
class PlanningAgent {
    constructor(llm) {
        this.llm = llm;
    }

    async createPlan(goal, context) {
        const plan = await this.llm.generate(\`
            Goal: \${goal}
            Context: \${context}
            Available actions: research, code, test, review, deploy

            Create a detailed plan:
            1. What information do we need?
            2. What are the exact steps?
            3. What could go wrong?
            4. How do we verify success?

            Output as numbered steps with clear actions.
        \`);

        return this.parsePlan(plan);
    }

    parsePlan(rawPlan) {
        // Convert text plan to structured format
        const steps = [];
        for (const line of rawPlan.split("\\n")) {
            if (/^[1-9]/.test(line.trim())) {
                steps.push({
                    step: steps.length + 1,
                    action: line.trim(),
                    status: "pending"
                });
            }
        }
        return steps;
    }
}
\`\`\`

**Example plan for "Build user authentication":**
1. Research best auth practices (OAuth, JWT)
2. Design database schema for users
3. Create login/signup API endpoints
4. Build frontend forms
5. Add password hashing
6. Write tests
7. Security review

## 4. Memory Agent

**Job:** Store information and retrieve it when needed.

The memory agent is the "brain's storage" - it decides what to remember and what to forget.

**When to use:** Long conversations, user preferences, learning from past.

\`\`\`python|javascript
class MemoryAgent:
    def __init__(self, storage):
        self.storage = storage  # Vector DB or regular DB

    def should_remember(self, message):
        # Decide if this is worth storing
        important_signals = ["remember", "my name", "I prefer", "always", "never"]
        return any(signal in message.lower() for signal in important_signals)

    def store(self, info, category="general"):
        if self.should_remember(info):
            self.storage.add({
                "content": info,
                "category": category,
                "timestamp": datetime.now()
            })

    def recall(self, query, limit=5):
        # Find relevant memories
        return self.storage.search(query, top_k=limit)

    def summarize_history(self, conversation):
        # Compress long conversations
        return self.llm.generate(f"Summarize key points: {conversation}")
|||
class MemoryAgent {
    constructor(storage) {
        this.storage = storage; // Vector DB or regular DB
    }

    shouldRemember(message) {
        // Decide if this is worth storing
        const importantSignals = ["remember", "my name", "I prefer", "always", "never"];
        return importantSignals.some(signal =>
            message.toLowerCase().includes(signal)
        );
    }

    store(info, category = "general") {
        if (this.shouldRemember(info)) {
            this.storage.add({
                content: info,
                category: category,
                timestamp: new Date()
            });
        }
    }

    recall(query, limit = 5) {
        // Find relevant memories
        return this.storage.search(query, { topK: limit });
    }

    async summarizeHistory(conversation) {
        // Compress long conversations
        return await this.llm.generate(\`Summarize key points: \${conversation}\`);
    }
}
\`\`\`

## 5. Evaluation Agent

**Job:** Check if the work is good enough. Quality control.

The evaluator reviews outputs and scores them.

**When to use:** Before delivering results to users, after code generation.

\`\`\`python|javascript
class EvaluationAgent:
    def __init__(self, llm):
        self.llm = llm
        self.criteria = ["correctness", "completeness", "clarity"]

    def evaluate(self, task, output):
        scores = {}
        for criterion in self.criteria:
            score = self.llm.generate(f"""
                Task: {task}
                Output: {output}

                Rate the {criterion} from 1-10.
                Explain why.
                Format: SCORE: X
                REASON: ...
            """)
            scores[criterion] = self.parse_score(score)

        return {
            "scores": scores,
            "average": sum(scores.values()) / len(scores),
            "passed": all(s >= 7 for s in scores.values())
        }

    def parse_score(self, response):
        # Extract number from "SCORE: 8"
        import re
        match = re.search(r"SCORE:\\s*(\\d+)", response)
        return int(match.group(1)) if match else 5
|||
class EvaluationAgent {
    constructor(llm) {
        this.llm = llm;
        this.criteria = ["correctness", "completeness", "clarity"];
    }

    async evaluate(task, output) {
        const scores = {};
        for (const criterion of this.criteria) {
            const score = await this.llm.generate(\`
                Task: \${task}
                Output: \${output}

                Rate the \${criterion} from 1-10.
                Explain why.
                Format: SCORE: X
                REASON: ...
            \`);
            scores[criterion] = this.parseScore(score);
        }

        const values = Object.values(scores);
        return {
            scores: scores,
            average: values.reduce((a, b) => a + b, 0) / values.length,
            passed: values.every(s => s >= 7)
        };
    }

    parseScore(response) {
        // Extract number from "SCORE: 8"
        const match = response.match(/SCORE:\\s*(\\d+)/);
        return match ? parseInt(match[1]) : 5;
    }
}
\`\`\`

## 6. Verification Agent

**Job:** Fact-check outputs. Ensure accuracy.

Unlike evaluation (quality), verification checks if information is TRUE.

**When to use:** When accuracy matters - medical, legal, financial content.

\`\`\`python|javascript
class VerificationAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools  # search, database lookup

    def verify(self, claims):
        results = []
        for claim in claims:
            # Search for evidence
            evidence = self.tools["search"](claim)

            # Judge if claim is supported
            verdict = self.llm.generate(f"""
                Claim: {claim}
                Evidence found: {evidence}

                Is this claim TRUE, FALSE, or UNCERTAIN?
                Explain briefly.
            """)

            results.append({
                "claim": claim,
                "verdict": self.extract_verdict(verdict),
                "evidence": evidence
            })
        return results

    def extract_claims(self, text):
        # Extract factual claims from text
        return self.llm.generate(f"""
            Extract all factual claims from this text:
            {text}

            List each claim on a new line.
        """).split("\\n")
|||
class VerificationAgent {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools; // search, database lookup
    }

    async verify(claims) {
        const results = [];
        for (const claim of claims) {
            // Search for evidence
            const evidence = await this.tools.search(claim);

            // Judge if claim is supported
            const verdict = await this.llm.generate(\`
                Claim: \${claim}
                Evidence found: \${evidence}

                Is this claim TRUE, FALSE, or UNCERTAIN?
                Explain briefly.
            \`);

            results.push({
                claim: claim,
                verdict: this.extractVerdict(verdict),
                evidence: evidence
            });
        }
        return results;
    }

    async extractClaims(text) {
        // Extract factual claims from text
        const result = await this.llm.generate(\`
            Extract all factual claims from this text:
            \${text}

            List each claim on a new line.
        \`);
        return result.split("\\n");
    }
}
\`\`\`

## 7. Reflection Agent

**Job:** Learn from mistakes and improve.

The reflection agent reviews what went wrong and suggests improvements.

**When to use:** After failures, for continuous improvement.

\`\`\`python|javascript
class ReflectionAgent:
    def __init__(self, llm):
        self.llm = llm
        self.lessons = []

    def reflect_on_failure(self, task, attempt, error):
        reflection = self.llm.generate(f"""
            Task: {task}
            What we tried: {attempt}
            What went wrong: {error}

            Analyze:
            1. Why did this fail?
            2. What should we do differently?
            3. What lesson should we remember?
        """)

        lesson = self.extract_lesson(reflection)
        self.lessons.append(lesson)
        return reflection

    def get_advice(self, new_task):
        # Check if any past lessons apply
        relevant = [l for l in self.lessons if self.is_relevant(l, new_task)]
        if relevant:
            return f"Based on past experience: {relevant}"
        return None
|||
class ReflectionAgent {
    constructor(llm) {
        this.llm = llm;
        this.lessons = [];
    }

    async reflectOnFailure(task, attempt, error) {
        const reflection = await this.llm.generate(\`
            Task: \${task}
            What we tried: \${attempt}
            What went wrong: \${error}

            Analyze:
            1. Why did this fail?
            2. What should we do differently?
            3. What lesson should we remember?
        \`);

        const lesson = this.extractLesson(reflection);
        this.lessons.push(lesson);
        return reflection;
    }

    getAdvice(newTask) {
        // Check if any past lessons apply
        const relevant = this.lessons.filter(l => this.isRelevant(l, newTask));
        if (relevant.length > 0) {
            return \`Based on past experience: \${relevant.join(", ")}\`;
        }
        return null;
    }
}
\`\`\`

## Putting It All Together

A complete multi-agent system:

\`\`\`
User: "Write a blog post about React hooks"

1. SUPERVISOR receives task
2. PLANNING agent creates plan:
   - Research React hooks
   - Write draft
   - Add code examples
   - Fact-check
   - Review quality

3. WORKER (Research) → gathers information
4. WORKER (Writer) → creates draft
5. VERIFICATION agent → checks facts
6. EVALUATION agent → rates quality (8/10)
7. MEMORY agent → stores "user likes React content"
8. SUPERVISOR → delivers final result
\`\`\`

## When to Use Which Role

| Situation | Roles Needed |
|-----------|--------------|
| Simple task | Worker only |
| Complex task | Supervisor + Workers |
| Need accuracy | + Verification |
| Need quality | + Evaluation |
| Long-term users | + Memory |
| Learning system | + Reflection |
| Multi-step task | + Planning |

## Key Takeaways

| Principle | Description |
|-----------|-------------|
| **Specialize** | Each agent does one thing well |
| **Coordinate** | Supervisor manages the team |
| **Verify** | Don't trust, verify |
| **Learn** | Reflection improves over time |
| **Remember** | Memory creates continuity |
`,
  previousTopic: { module: 3, slug: 'agent-state-machines', title: 'State Machines for Agents' },
  nextTopic: { module: 3, slug: 'supervisor-agent', title: 'Supervisor Agent' },
};
