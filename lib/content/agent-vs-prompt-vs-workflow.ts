import { Article } from './types';

export const agentVsPromptVsWorkflow: Article = {
  module: 2,
  slug: 'agent-vs-prompt-vs-workflow',
  title: 'Agent vs Prompt vs Workflow',
  description: 'Understanding the key differences between Prompts, Workflows, and Agents',
  readTime: 7,
  content: `# Agent vs Prompt vs Workflow

## The Big Picture

\`\`\`mermaid
flowchart LR
    subgraph Simple
        A[Prompt]
    end
    subgraph Medium
        B[Workflow]
    end
    subgraph Smart
        C[Agent]
    end
    A --> B --> C
\`\`\`

| Type | What it does | Intelligence |
|------|--------------|--------------|
| **Prompt** | Single question → Single answer | Low |
| **Workflow** | Fixed steps in order | Medium |
| **Agent** | Decides steps dynamically | High |

## 1. What is a Prompt?

A **Prompt** is a single question to AI. One input, one output. Done.

\`\`\`mermaid
flowchart LR
    A[Your Question] --> B[AI]
    B --> C[Answer]
\`\`\`

### Example: Prompt

**You:** "What is the capital of France?"

**AI:** "Paris"

That's it. No tools, no memory, no decisions.

### Code Example

\`\`\`python|javascript
# Simple Prompt - One question, one answer

import openai

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "What is the capital of France?"}
    ]
)

print(response.choices[0].message.content)
# Output: "Paris"
|||
// Simple Prompt - One question, one answer

const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
        { role: "user", content: "What is the capital of France?" }
    ]
});

console.log(response.choices[0].message.content);
// Output: "Paris"
\`\`\`

## 2. What is a Workflow?

A **Workflow** is a fixed sequence of steps. Always runs the same way.

\`\`\`mermaid
flowchart TD
    A[Start] --> B[Step 1: Get Data]
    B --> C[Step 2: Process]
    C --> D[Step 3: Format]
    D --> E[Step 4: Send Email]
    E --> F[End]
\`\`\`

### Example: Email Newsletter Workflow

\`\`\`mermaid
flowchart TD
    A[Get Blog Posts] --> B[Summarize Each Post]
    B --> C[Create HTML Email]
    C --> D[Send to Subscribers]
\`\`\`

**Key Point:** Steps are FIXED. Always same order. No decisions.

### Code Example

\`\`\`python|javascript
# Workflow - Fixed steps, always same order

def newsletter_workflow():
    # Step 1: Always get posts first
    posts = get_latest_posts()

    # Step 2: Always summarize
    summaries = []
    for post in posts:
        summary = ai_summarize(post)
        summaries.append(summary)

    # Step 3: Always create email
    html = create_email_html(summaries)

    # Step 4: Always send
    send_email(html)

    return "Newsletter sent!"

# Always runs: Step 1 → 2 → 3 → 4
newsletter_workflow()
|||
// Workflow - Fixed steps, always same order

async function newsletterWorkflow() {
    // Step 1: Always get posts first
    const posts = await getLatestPosts();

    // Step 2: Always summarize
    const summaries = [];
    for (const post of posts) {
        const summary = await aiSummarize(post);
        summaries.push(summary);
    }

    // Step 3: Always create email
    const html = createEmailHtml(summaries);

    // Step 4: Always send
    await sendEmail(html);

    return "Newsletter sent!";
}

// Always runs: Step 1 → 2 → 3 → 4
newsletterWorkflow();
\`\`\`

## 3. What is an Agent?

An **Agent** decides what to do based on the situation. Dynamic steps.

\`\`\`mermaid
flowchart TD
    A[User Request] --> B[Agent Thinks]
    B --> C{What to do?}
    C -->|Need info| D[Search Web]
    C -->|Need code| E[Write Code]
    C -->|Need data| F[Query Database]
    D --> G{Done?}
    E --> G
    F --> G
    G -->|No| B
    G -->|Yes| H[Return Answer]
\`\`\`

### Example: Travel Agent

**You:** "Plan a trip to Goa for 3 days under 20,000 rupees"

\`\`\`mermaid
flowchart TD
    A[Plan Trip Request] --> B{Agent Decides}
    B --> C[Search Flights]
    C --> D{Cheap flight found?}
    D -->|No| E[Search Trains]
    D -->|Yes| F[Search Hotels]
    E --> F
    F --> G{Budget OK?}
    G -->|No| H[Find Cheaper Options]
    H --> F
    G -->|Yes| I[Create Itinerary]
    I --> J[Return Plan]
\`\`\`

**Key Point:** Agent DECIDES what to do next based on results!

### Code Example

\`\`\`python|javascript
# Agent - Decides steps dynamically

class TravelAgent:
    def __init__(self):
        self.tools = {
            "search_flights": search_flights,
            "search_trains": search_trains,
            "search_hotels": search_hotels,
            "get_weather": get_weather
        }

    def plan_trip(self, request):
        budget = extract_budget(request)
        destination = extract_destination(request)

        # Agent DECIDES: Try flights first
        flights = self.tools["search_flights"](destination)

        if flights["price"] > budget * 0.5:
            # Agent DECIDES: Too expensive, try trains
            transport = self.tools["search_trains"](destination)
        else:
            transport = flights

        remaining_budget = budget - transport["price"]

        # Agent DECIDES: Search hotels with remaining budget
        hotels = self.tools["search_hotels"](
            destination,
            max_price=remaining_budget
        )

        # Agent DECIDES: Check weather for packing tips
        weather = self.tools["get_weather"](destination)

        return create_itinerary(transport, hotels, weather)

# Agent decides different steps based on situation!
agent = TravelAgent()
agent.plan_trip("Plan Goa trip, budget 20000")
|||
// Agent - Decides steps dynamically

class TravelAgent {
    constructor() {
        this.tools = {
            searchFlights: searchFlights,
            searchTrains: searchTrains,
            searchHotels: searchHotels,
            getWeather: getWeather
        };
    }

    async planTrip(request) {
        const budget = extractBudget(request);
        const destination = extractDestination(request);

        // Agent DECIDES: Try flights first
        const flights = await this.tools.searchFlights(destination);

        let transport;
        if (flights.price > budget * 0.5) {
            // Agent DECIDES: Too expensive, try trains
            transport = await this.tools.searchTrains(destination);
        } else {
            transport = flights;
        }

        const remainingBudget = budget - transport.price;

        // Agent DECIDES: Search hotels with remaining budget
        const hotels = await this.tools.searchHotels(
            destination,
            { maxPrice: remainingBudget }
        );

        // Agent DECIDES: Check weather for packing tips
        const weather = await this.tools.getWeather(destination);

        return createItinerary(transport, hotels, weather);
    }
}

// Agent decides different steps based on situation!
const agent = new TravelAgent();
agent.planTrip("Plan Goa trip, budget 20000");
\`\`\`

## Side-by-Side Comparison

### Same Task, Different Approaches

**Task:** "Get weather and suggest what to wear"

### Prompt Approach

\`\`\`mermaid
flowchart LR
    A[Ask AI] --> B[AI Guesses Answer]
\`\`\`

\`\`\`python|javascript
# Prompt: AI guesses (might be wrong!)
response = ask_ai("What should I wear today in Mumbai?")
# AI: "Wear light clothes" (but doesn't know actual weather!)
|||
// Prompt: AI guesses (might be wrong!)
const response = await askAi("What should I wear today in Mumbai?");
// AI: "Wear light clothes" (but doesn't know actual weather!)
\`\`\`

### Workflow Approach

\`\`\`mermaid
flowchart LR
    A[Get Weather] --> B[AI Suggests Clothes]
\`\`\`

\`\`\`python|javascript
# Workflow: Fixed 2 steps
weather = get_weather_api("Mumbai")  # Step 1: Always
suggestion = ask_ai(f"Weather is {weather}. What to wear?")  # Step 2: Always
|||
// Workflow: Fixed 2 steps
const weather = await getWeatherApi("Mumbai");  // Step 1: Always
const suggestion = await askAi(\`Weather is \${weather}. What to wear?\`);  // Step 2: Always
\`\`\`

### Agent Approach

\`\`\`mermaid
flowchart TD
    A[User: What to wear?] --> B{Agent Thinks}
    B --> C[Get Location]
    C --> D[Get Weather]
    D --> E{Rainy?}
    E -->|Yes| F[Check Umbrella Availability]
    E -->|No| G[Suggest Clothes]
    F --> G
    G --> H[Return Suggestion]
\`\`\`

\`\`\`python|javascript
# Agent: Decides what info is needed
def what_to_wear_agent(user_query):
    # Agent decides: Need location first
    location = get_user_location()

    # Agent decides: Get weather
    weather = get_weather(location)

    # Agent decides: Is it raining?
    if weather["rain"]:
        # Agent decides: Check umbrella
        has_umbrella = check_calendar("umbrella reminder")
        suggestion = suggest_rain_clothes(has_umbrella)
    else:
        suggestion = suggest_normal_clothes(weather["temp"])

    return suggestion
|||
// Agent: Decides what info is needed
async function whatToWearAgent(userQuery) {
    // Agent decides: Need location first
    const location = await getUserLocation();

    // Agent decides: Get weather
    const weather = await getWeather(location);

    // Agent decides: Is it raining?
    let suggestion;
    if (weather.rain) {
        // Agent decides: Check umbrella
        const hasUmbrella = await checkCalendar("umbrella reminder");
        suggestion = suggestRainClothes(hasUmbrella);
    } else {
        suggestion = suggestNormalClothes(weather.temp);
    }

    return suggestion;
}
\`\`\`

## When to Use What?

\`\`\`mermaid
flowchart TD
    A[Your Task] --> B{Simple Q&A?}
    B -->|Yes| C[Use Prompt]
    B -->|No| D{Fixed Steps?}
    D -->|Yes| E[Use Workflow]
    D -->|No| F{Need Decisions?}
    F -->|Yes| G[Use Agent]
    F -->|No| E
\`\`\`

| Use Case | Best Choice | Why |
|----------|-------------|-----|
| "What is 2+2?" | Prompt | Simple, one answer |
| "Translate this text" | Prompt | One input, one output |
| "Send daily report email" | Workflow | Same steps every day |
| "Process uploaded files" | Workflow | Fixed processing steps |
| "Book cheapest flight" | Agent | Needs to compare, decide |
| "Debug my code" | Agent | Needs to analyze, try solutions |
| "Research a topic" | Agent | Needs to search, evaluate, dig deeper |

## Real-World Analogy

### Prompt = Asking a Question

Like asking someone: "What time is it?"
They answer: "3 PM"
Done.

### Workflow = Following a Recipe

Like cooking pasta:
1. Boil water
2. Add pasta
3. Wait 10 minutes
4. Drain
5. Add sauce

Always same steps, same order.

### Agent = Hiring a Chef

Like telling a chef: "Make me something delicious with what's in the fridge"
- Chef checks fridge
- Decides what to make based on ingredients
- Adjusts recipe if something is missing
- Tastes and adjusts seasoning
- Serves the best possible dish

## Summary

| | Prompt | Workflow | Agent |
|--|--------|----------|-------|
| **Steps** | 1 | Fixed many | Dynamic |
| **Decisions** | None | None | Yes |
| **Tools** | None | Pre-defined | Chooses tools |
| **Memory** | None | Limited | Yes |
| **Flexibility** | Low | Medium | High |
| **Complexity** | Simple | Medium | Complex |
| **Cost** | Cheap | Medium | Expensive |

## Key Takeaways

- **Prompt** = Single question, single answer (like Google search)
- **Workflow** = Fixed steps, always same order (like assembly line)
- **Agent** = Makes decisions, adapts to situation (like human assistant)

Choose based on your needs:
- Simple task? → **Prompt**
- Repeatable process? → **Workflow**
- Complex, dynamic task? → **Agent**
`,
  previousTopic: { module: 2, slug: 'what-is-ai-agent', title: 'What is an AI Agent?' },
  nextTopic: { module: 2, slug: 'agent-lifecycle', title: 'Agent Lifecycle' },
};
