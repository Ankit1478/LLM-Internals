import { Article } from './types';

export const langgraph: Article = {
  module: 2,
  slug: 'langgraph',
  title: 'LangGraph',
  description: 'Build stateful, multi-step AI agents with graph-based workflows',
  readTime: 8,
  content: `# LangGraph

## What is LangGraph?

**LangGraph** = A framework by LangChain for building **stateful, multi-step AI agents**.

Think of it as drawing a flowchart for your AI agent. Each box is a step, each arrow is a path.

\`\`\`mermaid
flowchart LR
    A[User Input] --> B[Agent Thinks]
    B --> C{Need Tool?}
    C -->|Yes| D[Use Tool]
    D --> B
    C -->|No| E[Final Answer]
\`\`\`

**Key idea:** You define your agent as a **graph** where:
- **Nodes** = Actions (like "think", "search", "respond")
- **Edges** = Connections between actions

## Why LangGraph?

| Problem | LangGraph Solution |
|---------|-------------------|
| Agent forgets previous steps | Built-in **state management** |
| Hard to visualize agent flow | **Graph-based** design |
| Loops are tricky | Easy **cycles** support |
| Debugging is hard | Clear **step-by-step** execution |

## Core Concepts

### 1. State

The agent's memory that persists across steps.

\`\`\`python|javascript
from typing import TypedDict, List

class AgentState(TypedDict):
    messages: List[str]      # Conversation history
    current_step: str        # Where are we now?
    tool_results: List[str]  # Results from tools
|||
// State is a simple object in JavaScript
const initialState = {
    messages: [],        // Conversation history
    currentStep: "",     // Where are we now?
    toolResults: []      // Results from tools
};
\`\`\`

### 2. Nodes

Functions that do something and update the state.

\`\`\`python|javascript
def think_node(state: AgentState) -> AgentState:
    """Agent thinks about what to do next"""
    # LLM decides next action
    response = llm.invoke(state["messages"])

    return {
        **state,
        "messages": state["messages"] + [response],
        "current_step": "thinking"
    }

def tool_node(state: AgentState) -> AgentState:
    """Agent uses a tool"""
    result = execute_tool(state["messages"][-1])

    return {
        **state,
        "tool_results": state["tool_results"] + [result]
    }
|||
function thinkNode(state) {
    // Agent thinks about what to do next
    const response = llm.invoke(state.messages);

    return {
        ...state,
        messages: [...state.messages, response],
        currentStep: "thinking"
    };
}

function toolNode(state) {
    // Agent uses a tool
    const result = executeTool(state.messages[state.messages.length - 1]);

    return {
        ...state,
        toolResults: [...state.toolResults, result]
    };
}
\`\`\`

### 3. Edges

Connections that define the flow.

\`\`\`python|javascript
# Simple edge: A -> B
graph.add_edge("think", "respond")

# Conditional edge: A -> B or C based on logic
def should_use_tool(state):
    if "TOOL:" in state["messages"][-1]:
        return "tool"
    return "respond"

graph.add_conditional_edges(
    "think",
    should_use_tool,
    {
        "tool": "tool_node",
        "respond": "respond_node"
    }
)
|||
// Simple edge: A -> B
graph.addEdge("think", "respond");

// Conditional edge: A -> B or C based on logic
function shouldUseTool(state) {
    if (state.messages[state.messages.length - 1].includes("TOOL:")) {
        return "tool";
    }
    return "respond";
}

graph.addConditionalEdges(
    "think",
    shouldUseTool,
    {
        tool: "toolNode",
        respond: "respondNode"
    }
);
\`\`\`

## Building Your First LangGraph Agent

\`\`\`mermaid
flowchart TD
    A[START] --> B[Agent]
    B --> C{Should use tool?}
    C -->|Yes| D[Tool]
    D --> B
    C -->|No| E[END]
\`\`\`

### Complete Example

\`\`\`python|javascript
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated
import operator

# 1. Define State
class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    next_step: str

# 2. Create Nodes
def agent(state: AgentState):
    response = llm.invoke(state["messages"])

    # Check if agent wants to use a tool
    if "search:" in response.lower():
        return {"messages": [response], "next_step": "tool"}
    return {"messages": [response], "next_step": "end"}

def tool(state: AgentState):
    last_message = state["messages"][-1]
    query = last_message.split("search:")[1].strip()
    result = search_web(query)
    return {"messages": [f"Search result: {result}"], "next_step": "agent"}

# 3. Build Graph
graph = StateGraph(AgentState)

# Add nodes
graph.add_node("agent", agent)
graph.add_node("tool", tool)

# Add edges
graph.set_entry_point("agent")

graph.add_conditional_edges(
    "agent",
    lambda state: state["next_step"],
    {
        "tool": "tool",
        "end": END
    }
)

graph.add_edge("tool", "agent")

# 4. Compile and Run
app = graph.compile()

# Run the agent
result = app.invoke({
    "messages": ["What is the weather in Tokyo?"],
    "next_step": ""
})
print(result["messages"])
|||
// Note: LangGraph is primarily Python, but concept applies
// Using pseudo-code for JavaScript

import { StateGraph, END } from "langgraph";

// 1. Define State
const initialState = {
    messages: [],
    nextStep: ""
};

// 2. Create Nodes
function agent(state) {
    const response = llm.invoke(state.messages);

    // Check if agent wants to use a tool
    if (response.toLowerCase().includes("search:")) {
        return { messages: [response], nextStep: "tool" };
    }
    return { messages: [response], nextStep: "end" };
}

function tool(state) {
    const lastMessage = state.messages[state.messages.length - 1];
    const query = lastMessage.split("search:")[1].trim();
    const result = searchWeb(query);
    return { messages: [\`Search result: \${result}\`], nextStep: "agent" };
}

// 3. Build Graph
const graph = new StateGraph(initialState);

// Add nodes
graph.addNode("agent", agent);
graph.addNode("tool", tool);

// Add edges
graph.setEntryPoint("agent");

graph.addConditionalEdges(
    "agent",
    (state) => state.nextStep,
    {
        tool: "tool",
        end: END
    }
);

graph.addEdge("tool", "agent");

// 4. Compile and Run
const app = graph.compile();

const result = await app.invoke({
    messages: ["What is the weather in Tokyo?"],
    nextStep: ""
});
console.log(result.messages);
\`\`\`

## LangGraph Patterns

### Pattern 1: Simple ReAct Agent

\`\`\`mermaid
flowchart LR
    A[Think] --> B{Action?}
    B -->|Tool| C[Execute Tool]
    C --> A
    B -->|Done| D[Respond]
\`\`\`

### Pattern 2: Multi-Agent Collaboration

\`\`\`mermaid
flowchart TD
    A[Supervisor] --> B{Route to?}
    B --> C[Researcher]
    B --> D[Writer]
    B --> E[Reviewer]
    C --> A
    D --> A
    E --> F[Final Output]
\`\`\`

\`\`\`python|javascript
# Multi-agent with supervisor
def supervisor(state):
    """Decides which agent should work next"""
    task = analyze_task(state["messages"][-1])

    if task == "research":
        return {"next_agent": "researcher"}
    elif task == "write":
        return {"next_agent": "writer"}
    else:
        return {"next_agent": "done"}

def researcher(state):
    """Does research"""
    result = search_and_summarize(state["task"])
    return {"research": result}

def writer(state):
    """Writes content"""
    content = write_content(state["research"])
    return {"output": content}
|||
// Multi-agent with supervisor
function supervisor(state) {
    // Decides which agent should work next
    const task = analyzeTask(state.messages[state.messages.length - 1]);

    if (task === "research") {
        return { nextAgent: "researcher" };
    } else if (task === "write") {
        return { nextAgent: "writer" };
    } else {
        return { nextAgent: "done" };
    }
}

function researcher(state) {
    // Does research
    const result = searchAndSummarize(state.task);
    return { research: result };
}

function writer(state) {
    // Writes content
    const content = writeContent(state.research);
    return { output: content };
}
\`\`\`

### Pattern 3: Human-in-the-Loop

\`\`\`mermaid
flowchart TD
    A[Agent Plans] --> B{Needs Approval?}
    B -->|Yes| C[Wait for Human]
    C --> D{Approved?}
    D -->|Yes| E[Execute]
    D -->|No| A
    B -->|No| E
    E --> F[Done]
\`\`\`

\`\`\`python|javascript
def should_interrupt(state):
    """Check if we need human approval"""
    action = state["planned_action"]

    # Dangerous actions need approval
    dangerous = ["delete", "send_email", "purchase"]
    if any(d in action.lower() for d in dangerous):
        return "wait_for_human"
    return "execute"

# Add interrupt point
graph.add_conditional_edges(
    "plan",
    should_interrupt,
    {
        "wait_for_human": "human_approval",
        "execute": "execute_action"
    }
)
|||
function shouldInterrupt(state) {
    // Check if we need human approval
    const action = state.plannedAction;

    // Dangerous actions need approval
    const dangerous = ["delete", "send_email", "purchase"];
    if (dangerous.some(d => action.toLowerCase().includes(d))) {
        return "waitForHuman";
    }
    return "execute";
}

// Add interrupt point
graph.addConditionalEdges(
    "plan",
    shouldInterrupt,
    {
        waitForHuman: "humanApproval",
        execute: "executeAction"
    }
);
\`\`\`

## When to Use LangGraph

\`\`\`mermaid
flowchart TD
    A[Your Agent] --> B{Complex flow?}
    B -->|Yes| C{Multiple steps?}
    B -->|No| D[Simple chain is fine]
    C -->|Yes| E{Needs loops?}
    C -->|No| D
    E -->|Yes| F[Use LangGraph ✓]
    E -->|No| G{State management?}
    G -->|Yes| F
    G -->|No| D
\`\`\`

| Use LangGraph When | Don't Use When |
|-------------------|----------------|
| Multi-step workflows | Simple Q&A |
| Agents with tools | Single LLM call |
| Need state persistence | Stateless operations |
| Complex conditional logic | Linear chains |
| Human-in-the-loop | Fully automated |

## LangGraph vs Plain LangChain

| Feature | LangChain | LangGraph |
|---------|-----------|-----------|
| Linear flows | ✅ Great | ✅ Good |
| Loops/cycles | ❌ Hard | ✅ Easy |
| State management | ❌ Manual | ✅ Built-in |
| Visualization | ❌ Limited | ✅ Graph view |
| Complex agents | ❌ Messy | ✅ Clean |

## Quick Start Template

\`\`\`python|javascript
from langgraph.graph import StateGraph, END
from typing import TypedDict

# 1. State
class State(TypedDict):
    input: str
    output: str

# 2. Nodes
def process(state: State) -> State:
    result = llm.invoke(state["input"])
    return {"output": result}

# 3. Graph
graph = StateGraph(State)
graph.add_node("process", process)
graph.set_entry_point("process")
graph.add_edge("process", END)

# 4. Run
app = graph.compile()
result = app.invoke({"input": "Hello!"})
|||
// Conceptual JavaScript version
class State {
    input = "";
    output = "";
}

function process(state) {
    const result = llm.invoke(state.input);
    return { output: result };
}

const graph = new StateGraph(State);
graph.addNode("process", process);
graph.setEntryPoint("process");
graph.addEdge("process", "END");

const app = graph.compile();
const result = await app.invoke({ input: "Hello!" });
\`\`\`

## Key Takeaways

| Concept | Remember |
|---------|----------|
| **Graph** | Your agent's flowchart |
| **Nodes** | Actions/functions |
| **Edges** | Connections between nodes |
| **State** | Persistent memory |
| **Conditional edges** | "If this, then that" logic |

\`\`\`mermaid
flowchart LR
    A[Define State] --> B[Create Nodes]
    B --> C[Connect with Edges]
    C --> D[Compile]
    D --> E[Run!]
\`\`\`

**LangGraph makes complex agents simple by turning code into visual graphs!**
`,
  previousTopic: { module: 2, slug: 'collaborative-pattern', title: 'Collaborative Pattern' },
  nextTopic: { module: 2, slug: 'autogen', title: 'AutoGen (Microsoft)' },
};
