import { Article } from './types';

export const thoughtActionObservation: Article = {
  module: 2,
  slug: 'thought-action-observation',
  title: 'Thought–Action–Observation Loop',
  description: 'Deep dive into the three components that make agents intelligent',
  readTime: 8,
  content: `# Thought–Action–Observation Loop

## The Core Loop

This is the heartbeat of every intelligent AI agent. Understanding this loop deeply will make you a better agent builder.

\`\`\`mermaid
flowchart LR
    A[THOUGHT] --> B[ACTION]
    B --> C[OBSERVATION]
    C --> A
\`\`\`

**The Simple Explanation:**
1. **THOUGHT:** "What should I do?" (Brain)
2. **ACTION:** "Let me do it!" (Hands)
3. **OBSERVATION:** "What happened?" (Eyes)

This loop repeats until the task is complete. Each component feeds into the next, creating an intelligent cycle.

## Why This Loop Works

**Theory:** This loop mimics how humans solve problems. When you're assembling furniture:

1. **Thought:** "I need to attach the leg to the table top"
2. **Action:** Pick up screwdriver, insert screw
3. **Observation:** "The leg is now attached but wobbles"
4. **Thought:** "I need to tighten it more"
5. ... and so on

AI agents work exactly the same way!

\`\`\`mermaid
flowchart TD
    subgraph Human Problem Solving
        H1[Think about problem] --> H2[Take action]
        H2 --> H3[See result]
        H3 --> H4{Solved?}
        H4 -->|No| H1
        H4 -->|Yes| H5[Done!]
    end
\`\`\`

## Deep Dive: THOUGHT

**What is a Thought?**

A thought is the agent's internal reasoning. It's where the LLM shines - analyzing the situation and deciding what to do next.

\`\`\`mermaid
flowchart TD
    A[Current Situation] --> B[LLM Brain]
    B --> C{What does agent think about?}
    C --> D[What do I know?]
    C --> E[What do I need?]
    C --> F[What should I do?]
    C --> G[What could go wrong?]
    D --> H[Thought Output]
    E --> H
    F --> H
    G --> H
\`\`\`

**Good Thought vs Bad Thought:**

| Bad Thought | Good Thought |
|-------------|--------------|
| "I'll search for something" | "I need the user's location to find nearby restaurants. Let me ask for it." |
| "Let me try this" | "The previous search failed because the date format was wrong. I should use YYYY-MM-DD format." |
| "I don't know" | "I don't have enough information. I need to: 1) Get the date, 2) Get the budget, 3) Then search for flights." |

**Theory:** Good thoughts are SPECIFIC and ACTIONABLE. They show clear reasoning about:
- What information is available
- What information is missing
- What the next logical step should be
- Why that step makes sense

### Code: Generating Good Thoughts

\`\`\`python|javascript
def generate_thought(self, context, history):
    prompt = f"""
    You are a helpful AI agent solving a problem.

    CONTEXT:
    - User's request: {context['user_query']}
    - Available tools: {context['tools']}
    - What you've done so far: {history}

    THINK STEP BY STEP:
    1. What do I know from the user's request?
    2. What information am I missing?
    3. What should I do next and WHY?

    Be specific and actionable.

    MY THOUGHT:
    """

    thought = self.llm.generate(prompt)
    return thought

# Example output:
# "The user wants to book a flight to Delhi. I know the destination (Delhi)
#  but I'm missing: 1) departure city, 2) travel date, 3) budget.
#  I should first ask for the travel date since it affects availability.
#  ACTION: Ask user for travel date."
|||
async generateThought(context, history) {
    const prompt = \`
    You are a helpful AI agent solving a problem.

    CONTEXT:
    - User's request: \${context.userQuery}
    - Available tools: \${context.tools}
    - What you've done so far: \${history.join('\\n')}

    THINK STEP BY STEP:
    1. What do I know from the user's request?
    2. What information am I missing?
    3. What should I do next and WHY?

    Be specific and actionable.

    MY THOUGHT:
    \`;

    const thought = await this.llm.generate(prompt);
    return thought;
}

// Example output:
// "The user wants to book a flight to Delhi. I know the destination (Delhi)
//  but I'm missing: 1) departure city, 2) travel date, 3) budget.
//  I should first ask for the travel date since it affects availability.
//  ACTION: Ask user for travel date."
\`\`\`

## Deep Dive: ACTION

**What is an Action?**

An action is something the agent DOES to change the world or gather information. Actions use TOOLS.

\`\`\`mermaid
flowchart TD
    A[Agent Decides Action] --> B{Action Type}
    B --> C[Search: Find information]
    B --> D[Calculate: Do math]
    B --> E[API Call: External service]
    B --> F[Database: Store/retrieve]
    B --> G[Communicate: Send message]
\`\`\`

**Types of Actions:**

| Action Type | What it does | Example |
|-------------|--------------|---------|
| **Information Gathering** | Get data from external sources | Search web, Query API |
| **Computation** | Process or calculate | Math, Data analysis |
| **State Change** | Modify something | Update database, Send email |
| **Communication** | Interact with user/systems | Ask question, Send notification |

**Theory:** Actions are the agent's connection to the real world. Without actions, an agent is just a chatbot that can only talk. With actions, it becomes a true assistant that can DO things.

### Action Design Principles

\`\`\`mermaid
flowchart TD
    A[Good Action Design] --> B[Atomic]
    A --> C[Clear Input/Output]
    A --> D[Error Handling]
    A --> E[Reversible if possible]

    B --> F[Does ONE thing well]
    C --> G[Easy to understand results]
    D --> H[Graceful failure]
    E --> I[Can undo if needed]
\`\`\`

**Key principles:**
1. **Atomic:** Each action should do ONE thing well
2. **Clear I/O:** Input and output should be predictable
3. **Error handling:** Actions should fail gracefully
4. **Documented:** Agent should know what each action does

### Code: Defining Actions

\`\`\`python|javascript
class AgentActions:
    def __init__(self):
        self.tools = {
            "search": self.search,
            "calculate": self.calculate,
            "send_email": self.send_email,
            "get_weather": self.get_weather
        }

    def search(self, query: str) -> dict:
        """
        Search the web for information.
        Input: search query string
        Output: dict with 'results' list and 'success' boolean
        """
        try:
            results = web_search_api(query)
            return {
                "success": True,
                "results": results[:5],  # Top 5 results
                "query": query
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "query": query
            }

    def calculate(self, expression: str) -> dict:
        """
        Perform mathematical calculation.
        Input: math expression as string
        Output: dict with 'result' number and 'success' boolean
        """
        try:
            # Safe evaluation
            result = safe_eval(expression)
            return {
                "success": True,
                "result": result,
                "expression": expression
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "expression": expression
            }

    def execute(self, action_name: str, params: dict) -> dict:
        """Execute an action by name with given parameters"""
        if action_name not in self.tools:
            return {"success": False, "error": f"Unknown action: {action_name}"}

        return self.tools[action_name](**params)
|||
class AgentActions {
    constructor() {
        this.tools = {
            search: this.search.bind(this),
            calculate: this.calculate.bind(this),
            sendEmail: this.sendEmail.bind(this),
            getWeather: this.getWeather.bind(this)
        };
    }

    async search(query) {
        /**
         * Search the web for information.
         * Input: search query string
         * Output: object with 'results' list and 'success' boolean
         */
        try {
            const results = await webSearchApi(query);
            return {
                success: true,
                results: results.slice(0, 5),  // Top 5 results
                query: query
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                query: query
            };
        }
    }

    calculate(expression) {
        /**
         * Perform mathematical calculation.
         * Input: math expression as string
         * Output: object with 'result' number and 'success' boolean
         */
        try {
            // Safe evaluation
            const result = safeEval(expression);
            return {
                success: true,
                result: result,
                expression: expression
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                expression: expression
            };
        }
    }

    async execute(actionName, params) {
        /** Execute an action by name with given parameters */
        if (!(actionName in this.tools)) {
            return { success: false, error: \`Unknown action: \${actionName}\` };
        }

        return await this.tools[actionName](params);
    }
}
\`\`\`

## Deep Dive: OBSERVATION

**What is an Observation?**

An observation is what the agent "sees" after taking an action. It's the feedback that tells the agent what happened.

\`\`\`mermaid
flowchart LR
    A[Action Executed] --> B[Environment Responds]
    B --> C[Observation Created]
    C --> D{Observation Contains}
    D --> E[Success/Failure]
    D --> F[Data/Results]
    D --> G[Error Messages]
    D --> H[Side Effects]
\`\`\`

**Why Observations Matter:**

| Without Observations | With Observations |
|---------------------|-------------------|
| Agent is blind | Agent can see results |
| Can't correct mistakes | Can adjust based on feedback |
| Doesn't know if action worked | Knows exactly what happened |
| Might repeat same action | Can try different approach |

**Theory:** Observations close the feedback loop. They transform a dumb "fire and forget" system into an intelligent "try, learn, adapt" system. This is what makes agents truly intelligent.

### Types of Observations

\`\`\`mermaid
flowchart TD
    A[Observation Types] --> B[Success Observation]
    A --> C[Failure Observation]
    A --> D[Partial Observation]
    A --> E[Unexpected Observation]

    B --> B1[Action worked as expected]
    C --> C1[Action failed with error]
    D --> D1[Some data, but incomplete]
    E --> E1[Surprising result, needs analysis]
\`\`\`

### Code: Handling Observations

\`\`\`python|javascript
class ObservationHandler:
    def process_observation(self, action, raw_result):
        """
        Process raw action result into a structured observation
        that the agent can reason about.
        """

        observation = {
            "action": action,
            "timestamp": datetime.now(),
            "raw_result": raw_result
        }

        # Determine observation type
        if raw_result.get("success"):
            observation["type"] = "success"
            observation["summary"] = self.summarize_success(raw_result)
        elif raw_result.get("error"):
            observation["type"] = "failure"
            observation["summary"] = f"Action failed: {raw_result['error']}"
            observation["retry_suggestion"] = self.suggest_retry(action, raw_result)
        else:
            observation["type"] = "partial"
            observation["summary"] = "Action completed with partial results"

        return observation

    def summarize_success(self, result):
        """Create a concise summary for successful actions"""
        if "results" in result:
            return f"Found {len(result['results'])} results"
        elif "result" in result:
            return f"Calculation result: {result['result']}"
        else:
            return "Action completed successfully"

    def suggest_retry(self, action, error):
        """Suggest how to retry failed action"""
        if "rate limit" in str(error).lower():
            return "Wait a moment and retry"
        elif "not found" in str(error).lower():
            return "Try a different search query"
        else:
            return "Try a different approach"


# Usage in agent loop
handler = ObservationHandler()

raw_result = agent.execute_action("search", {"query": "Python tutorials"})
observation = handler.process_observation("search", raw_result)

print(observation)
# {
#   "action": "search",
#   "type": "success",
#   "summary": "Found 5 results",
#   "raw_result": {...}
# }
|||
class ObservationHandler {
    processObservation(action, rawResult) {
        /**
         * Process raw action result into a structured observation
         * that the agent can reason about.
         */

        const observation = {
            action: action,
            timestamp: new Date(),
            rawResult: rawResult
        };

        // Determine observation type
        if (rawResult.success) {
            observation.type = "success";
            observation.summary = this.summarizeSuccess(rawResult);
        } else if (rawResult.error) {
            observation.type = "failure";
            observation.summary = \`Action failed: \${rawResult.error}\`;
            observation.retrySuggestion = this.suggestRetry(action, rawResult);
        } else {
            observation.type = "partial";
            observation.summary = "Action completed with partial results";
        }

        return observation;
    }

    summarizeSuccess(result) {
        /** Create a concise summary for successful actions */
        if (result.results) {
            return \`Found \${result.results.length} results\`;
        } else if (result.result !== undefined) {
            return \`Calculation result: \${result.result}\`;
        } else {
            return "Action completed successfully";
        }
    }

    suggestRetry(action, error) {
        /** Suggest how to retry failed action */
        const errorStr = String(error.error || "").toLowerCase();
        if (errorStr.includes("rate limit")) {
            return "Wait a moment and retry";
        } else if (errorStr.includes("not found")) {
            return "Try a different search query";
        } else {
            return "Try a different approach";
        }
    }
}

// Usage in agent loop
const handler = new ObservationHandler();

const rawResult = await agent.executeAction("search", { query: "Python tutorials" });
const observation = handler.processObservation("search", rawResult);

console.log(observation);
// {
//   action: "search",
//   type: "success",
//   summary: "Found 5 results",
//   rawResult: {...}
// }
\`\`\`

## Complete Loop Example

Let's see the entire loop in action with a real example:

**User:** "What's the weather in Mumbai and should I carry an umbrella?"

\`\`\`mermaid
flowchart TD
    A[User Question] --> B[Thought 1: Need weather data for Mumbai]
    B --> C[Action 1: get_weather Mumbai]
    C --> D[Observation 1: 32°C, 80% humidity, rain expected]
    D --> E[Thought 2: Rain expected, user should carry umbrella]
    E --> F[Final Answer]
\`\`\`

### The Loop in Code

\`\`\`python|javascript
def complete_loop_example(user_query):
    """
    Complete Thought-Action-Observation loop example
    """
    print(f"USER: {user_query}")
    print("-" * 50)

    # THOUGHT 1
    thought1 = """
    The user wants to know about Mumbai weather and umbrella advice.
    I need to:
    1. Get current weather for Mumbai
    2. Check if rain is expected
    3. Give umbrella recommendation based on weather
    Let me first get the weather data.
    """
    print(f"THOUGHT: {thought1}")

    # ACTION 1
    action1 = "get_weather"
    params1 = {"city": "Mumbai"}
    print(f"ACTION: {action1}({params1})")

    # Execute action
    result1 = get_weather("Mumbai")

    # OBSERVATION 1
    observation1 = f"""
    Weather for Mumbai:
    - Temperature: {result1['temp']}°C
    - Humidity: {result1['humidity']}%
    - Conditions: {result1['conditions']}
    - Rain probability: {result1['rain_probability']}%
    """
    print(f"OBSERVATION: {observation1}")

    # THOUGHT 2
    thought2 = f"""
    I now have the weather data. Rain probability is {result1['rain_probability']}%.
    Since it's above 50%, I should recommend carrying an umbrella.
    I have enough information to answer the user.
    """
    print(f"THOUGHT: {thought2}")

    # FINAL ANSWER
    final_answer = f"""
    The weather in Mumbai is currently {result1['temp']}°C with {result1['conditions']}.

    🌂 Umbrella recommendation: YES, carry an umbrella!
    There's a {result1['rain_probability']}% chance of rain today.
    """
    print(f"FINAL ANSWER: {final_answer}")

    return final_answer

# Run the example
complete_loop_example("What's the weather in Mumbai and should I carry an umbrella?")
|||
async function completeLoopExample(userQuery) {
    /**
     * Complete Thought-Action-Observation loop example
     */
    console.log(\`USER: \${userQuery}\`);
    console.log("-".repeat(50));

    // THOUGHT 1
    const thought1 = \`
    The user wants to know about Mumbai weather and umbrella advice.
    I need to:
    1. Get current weather for Mumbai
    2. Check if rain is expected
    3. Give umbrella recommendation based on weather
    Let me first get the weather data.
    \`;
    console.log(\`THOUGHT: \${thought1}\`);

    // ACTION 1
    const action1 = "getWeather";
    const params1 = { city: "Mumbai" };
    console.log(\`ACTION: \${action1}(\${JSON.stringify(params1)})\`);

    // Execute action
    const result1 = await getWeather("Mumbai");

    // OBSERVATION 1
    const observation1 = \`
    Weather for Mumbai:
    - Temperature: \${result1.temp}°C
    - Humidity: \${result1.humidity}%
    - Conditions: \${result1.conditions}
    - Rain probability: \${result1.rainProbability}%
    \`;
    console.log(\`OBSERVATION: \${observation1}\`);

    // THOUGHT 2
    const thought2 = \`
    I now have the weather data. Rain probability is \${result1.rainProbability}%.
    Since it's above 50%, I should recommend carrying an umbrella.
    I have enough information to answer the user.
    \`;
    console.log(\`THOUGHT: \${thought2}\`);

    // FINAL ANSWER
    const finalAnswer = \`
    The weather in Mumbai is currently \${result1.temp}°C with \${result1.conditions}.

    🌂 Umbrella recommendation: YES, carry an umbrella!
    There's a \${result1.rainProbability}% chance of rain today.
    \`;
    console.log(\`FINAL ANSWER: \${finalAnswer}\`);

    return finalAnswer;
}

// Run the example
await completeLoopExample("What's the weather in Mumbai and should I carry an umbrella?");
\`\`\`

## Best Practices

\`\`\`mermaid
flowchart TD
    A[Best Practices] --> B[Clear Thoughts]
    A --> C[Atomic Actions]
    A --> D[Rich Observations]
    A --> E[Know When to Stop]

    B --> B1[Be specific about reasoning]
    C --> C1[One action at a time]
    D --> D1[Include all relevant info]
    E --> E1[Set max iterations]
\`\`\`

| Component | Best Practice | Why |
|-----------|---------------|-----|
| **Thought** | Be specific, show reasoning | Helps debug and improves decisions |
| **Action** | One action per loop iteration | Easier to track and recover from errors |
| **Observation** | Include success/failure + data | Agent needs complete feedback |
| **Loop** | Set maximum iterations | Prevents infinite loops |

## Key Takeaways

| Component | Role | Question it Answers |
|-----------|------|---------------------|
| **Thought** | Brain | "What should I do and why?" |
| **Action** | Hands | "Let me do this specific thing" |
| **Observation** | Eyes | "What happened? Did it work?" |

**Remember:**
- Thoughts should be SPECIFIC and explain reasoning
- Actions should be ATOMIC (one thing at a time)
- Observations should be COMPLETE (success/failure + data)
- The loop continues until the task is DONE or max steps reached

This loop is the foundation of intelligent AI agents. Master it, and you can build any kind of agent!
`,
  previousTopic: { module: 2, slug: 'react-pattern', title: 'ReAct Pattern' },
  nextTopic: { module: 2, slug: 'tool-first-execution', title: 'Tool-First Execution Pattern' },
};
