import { Article } from './types';

export const transformersArchitecture: Article = {
  module: 1,
  slug: 'transformers-architecture',
  title: 'Transformers Architecture',
  description: 'The brain behind ChatGPT, Claude, and all modern AI',
  readTime: 5,
  previousTopic: { module: 1, slug: 'positional-encoding', title: '2. Positional Encoding' },
  nextTopic: { module: 1, slug: 'self-attention', title: '4. Self-Attention Mechanism' },
  content: `# Transformers Architecture

## What is a Transformer?

Transformer = The **brain** of ChatGPT, Claude, Gemini, and all modern AI.

That's it. Every AI you talk to uses this.

## The Old Way (Before 2017)

Old AI read words **one by one**:

> "I" → wait → "love" → wait → "AI" → wait → done!

**Problem:** Super slow! Can't see the full picture.

## The New Way (Transformers)

Transformers see **all words at once**:

> "I love AI" → sees everything together → done!

**Like this:**
- Old way = Reading a book one word at a time
- New way = Looking at the whole page at once

## The 5 Main Parts

Think of Transformer like a **factory** with 5 stations:

### 1. Input (Words Go In)

Your text enters the factory.

> "Hello world" → enters the machine

### 2. Tokenization + Position

We learned this already!

- Break text into tokens
- Add position numbers

> "Hello" (pos 1) + "world" (pos 2)

### 3. Attention (The Magic Part)

This is the **superpower**.

Attention = AI looks at ALL words and asks:

> "Which words are related to each other?"

Example: "The cat sat on the mat because **it** was tired"

What does "it" mean? The **cat**!

Attention helps AI understand this connection.

### 4. Feed-Forward (Thinking)

After attention, AI **thinks** about what it learned.

Like your brain processing information.

### 5. Output (Answer Comes Out)

AI gives you the answer!

## Simple Picture

\`\`\`mermaid
flowchart TD
    A["📝 Input: Hello world"] --> B["🔪 Tokenize"]
    B --> C["[Hello] [world]"]
    C --> D["📍 Add Position"]
    D --> E["[Hello, pos:1] [world, pos:2]"]
    E --> F["🔍 Attention"]
    F --> G["How are words related?"]
    G --> H["🧠 Feed-Forward"]
    H --> I["Let me think..."]
    I --> J["✅ Output: AI Response"]

    style A fill:#3b82f6,color:#fff
    style J fill:#22c55e,color:#fff
    style F fill:#f59e0b,color:#fff
    style H fill:#8b5cf6,color:#fff
\`\`\`

## Why Called "Transformer"?

Because it **transforms** your input into understanding.

Input text → Transform → Understanding → Output

## The Stack (Layers)

Real AI doesn't do this once.

It does it **many times** (layers).

- GPT-3: 96 layers
- GPT-4: Even more!

Each layer = Better understanding.

Like reading a book multiple times - you understand more each time.

## Real Life Example

**You ask:** "What is the capital of France?"

**Inside Transformer:**

1. Tokenize: [What] [is] [the] [capital] [of] [France] [?]
2. Add positions: Each word gets a number
3. Attention: AI connects "capital" with "France"
4. Think: AI recalls "Paris" from training
5. Output: "Paris"

## Why Transformers Won

Before Transformers:
- Slow (read one word at a time)
- Forgot earlier words
- Bad at long text

After Transformers:
- Fast (sees all words at once)
- Remembers everything
- Great at long text

## Super Simple Summary

> Transformer = A machine that reads everything at once, finds connections between words, thinks about it, and gives you an answer.

## What's Next?

Now you know the big picture!

Next: Deep dive into **Attention** - the magic that makes it all work.
`,
};
