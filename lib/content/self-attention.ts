import { Article } from './types';

export const selfAttention: Article = {
  module: 2,
  slug: 'self-attention',
  title: 'Self-Attention Mechanism',
  description: 'How AI focuses on important words in a sentence',
  readTime: 5,
  previousTopic: { module: 2, slug: 'transformers-architecture', title: '3. Transformers Architecture' },
  nextTopic: { module: 2, slug: 'multi-head-attention', title: '5. Multi-Head Attention' },
  content: `# Self-Attention Mechanism

## Part of Transformer Architecture

**Remember from Lesson 3:** Transformers are the brain behind ChatGPT, Claude, and all modern AI.

Now we're learning the **building blocks** inside the Transformer:

- **Lesson 4 (This lesson):** Self-Attention
- **Lesson 5 (Next):** Multi-Head Attention
- **Lesson 6 (After that):** Feed-Forward Networks

These 3 parts work together inside the Transformer!

## What is Self-Attention?

Self-Attention = AI asking **"Which words should I focus on?"**

Like when you read, you focus on important words.

## Simple Example

**Sentence:** "The cat sat on the mat because **it** was tired"

Question: What does **"it"** refer to?

Answer: **The cat!**

How did you know? You **paid attention** to "cat" when reading "it".

That's exactly what Self-Attention does!

## How Does It Work?

Every word asks 3 questions:

### 1. Query (Q) - "What am I looking for?"

> "it" asks: "Who am I referring to?"

### 2. Key (K) - "What do I have?"

> "cat" says: "I'm a noun, an animal"
> "mat" says: "I'm a noun, a thing"
> "sat" says: "I'm a verb, an action"

### 3. Value (V) - "What's my meaning?"

> Each word offers its meaning

## The Magic Formula

\`\`\`
Attention = Who should I focus on?

"it" looks at all words:
- "cat" → High score (both are nouns, makes sense!)
- "mat" → Low score (thing can't be tired)
- "sat" → Low score (verb, not a thing)

Winner: "cat" gets the most attention!
\`\`\`

## Visual Flow

\`\`\`mermaid
flowchart LR
    A["it"] --> B["🔍 Query: What am I?"]
    B --> C{"Compare with all words"}
    C --> D["cat: 90%"]
    C --> E["mat: 5%"]
    C --> F["sat: 5%"]
    D --> G["✅ it = cat"]

    style A fill:#3b82f6,color:#fff
    style G fill:#22c55e,color:#fff
    style D fill:#f59e0b,color:#fff
\`\`\`

## Real Life Analogy

Imagine you're at a **party**:

- You (Query): "Who can help me with coding?"
- Everyone has a **tag** (Key): "Doctor", "Chef", "Developer"
- You **focus** on the "Developer" (high attention)
- You **ignore** the "Chef" (low attention)

Self-Attention does the same with words!

## Another Example

**Sentence:** "Bank of the river" vs "Bank for money"

Same word "Bank" but different meaning!

Self-Attention looks at nearby words:
- "river" nearby → Bank = riverside
- "money" nearby → Bank = financial place

## Why "Self" Attention?

Because the sentence looks at **itself**.

Each word in the sentence checks other words **in the same sentence**.

Not looking outside. Just within itself.

## The Math (Super Simple)

\`\`\`
Score = Query × Key

High score = Pay attention
Low score = Ignore
\`\`\`

That's it!

## Step by Step

1. Each word becomes Q, K, V
2. Q asks "what am I looking for?"
3. K answers "here's what I have"
4. Calculate scores (Q × K)
5. Focus on high scores
6. Get meaning from V

\`\`\`mermaid
flowchart TD
    A["Word: 'it'"] --> B["Create Q, K, V"]
    B --> C["Q: What am I looking for?"]
    B --> D["K: What do I have?"]
    B --> E["V: My meaning"]
    C --> F["Compare Q with all K's"]
    F --> G["Get Attention Scores"]
    G --> H["Focus on high scores"]
    H --> I["Get final meaning"]

    style A fill:#3b82f6,color:#fff
    style I fill:#22c55e,color:#fff
\`\`\`

## Why Is This Powerful?

Without Self-Attention:
> AI sees: "it" = just a pronoun, no context

With Self-Attention:
> AI sees: "it" = refers to "cat" = an animal that can be tired

**Context is everything!**

## Image Prompt

Generate this image to visualize self-attention:

> "A diagram showing the word 'it' in the center with arrows pointing to other words 'The', 'cat', 'sat', 'on', 'the', 'mat'. The arrow to 'cat' is thick and bright (high attention), while arrows to other words are thin and faded (low attention). Clean minimal style, dark background, blue and orange colors."

## Summary

> Self-Attention = Each word looks at all other words and decides which ones are important for understanding.

## What's Next?

One attention is good. But what if we use **multiple attentions** at once?

Next: Multi-Head Attention - Running multiple attention in parallel!
`,
};
