import { Article } from './types';

export const multiHeadAttention: Article = {
  module: 2,
  slug: 'multi-head-attention',
  title: 'Multi-Head Attention',
  description: 'How transformers use multiple attention mechanisms in parallel to capture different relationships',
  readTime: 7,
  previousTopic: { module: 2, slug: 'self-attention', title: '4. Self-Attention Mechanism' },
  nextTopic: { module: 2, slug: 'feed-forward-networks', title: '6. Feed-Forward Networks' },
  content: `# Multi-Head Attention

## Part of Transformer Architecture

We're building the Transformer piece by piece:

**Lesson 4:** Self-Attention (Done!)
**Lesson 5:** Multi-Head Attention (This lesson)
**Lesson 6:** Feed-Forward Networks (Next)

These components work together inside every Transformer model!

## Quick Recap: Self-Attention

Remember **Self-Attention** from the previous lesson?

It helps each word look at other words in a sentence:

**Example:** "The cat sat on the mat"
- "cat" looks at all words and focuses on "The" and "sat"

Self-Attention = **1 way of looking** at the sentence.

## What is Multi-Head Attention?

**Multi-Head Attention** = Using **multiple self-attentions** at the same time!

Think of it like having **8 different pairs of eyes**, each noticing different things:

\`\`\`
Self-Attention      →  1 pair of eyes
Multi-Head Attention →  8 pairs of eyes (working together!)
\`\`\`

## Why Do We Need Multiple "Heads"?

**Example Sentence:** "The cat chased the mouse"

Different "heads" can focus on different relationships:

- **Head 1**: Connects "cat" → "chased" (who is doing the action?)
- **Head 2**: Connects "chased" → "mouse" (what is being chased?)
- **Head 3**: Connects "The" → "cat" (which cat?)

One self-attention might miss some connections. **8 heads** catch more patterns!

## Simple Visual

\`\`\`mermaid
flowchart LR
    Input["Input: 'The cat sat'"]

    H1["Head 1<br/>Self-Attention"]
    H2["Head 2<br/>Self-Attention"]
    H3["Head 3<br/>Self-Attention"]

    Combine["Combine All Results"]
    Output["Better Understanding!"]

    Input --> H1
    Input --> H2
    Input --> H3

    H1 --> Combine
    H2 --> Combine
    H3 --> Combine
    Combine --> Output

    style Input fill:#3b82f6,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## How It Works (Step by Step)

### Step 1: Run Multiple Self-Attentions

Take the same sentence and run **8 self-attentions** at the same time (in parallel).

Each head is just **self-attention**, but they learn different patterns!

### Step 2: Combine Results

After all 8 heads finish, **combine** their outputs into one result.

\`\`\`
Head 1 output + Head 2 output + ... + Head 8 output = Final Output
\`\`\`

That's it!

## Simple Code Example

\`\`\`python|javascript
# Step 1: One self-attention (one head)
def self_attention(sentence):
    # Each word looks at other words
    return attention_output

# Step 2: Multi-head = Run self-attention 8 times
def multi_head_attention(sentence):
    results = []

    # Run 8 self-attentions
    for i in range(8):
        output = self_attention(sentence)
        results.append(output)

    # Combine all results
    final = combine(results)
    return final
|||
// Step 1: One self-attention (one head)
function selfAttention(sentence) {
    // Each word looks at other words
    return attentionOutput;
}

// Step 2: Multi-head = Run self-attention 8 times
function multiHeadAttention(sentence) {
    const results = [];

    // Run 8 self-attentions
    for (let i = 0; i < 8; i++) {
        const output = selfAttention(sentence);
        results.push(output);
    }

    // Combine all results
    const final = combine(results);
    return final;
}
\`\`\`

## Real-Life Analogy

Imagine you're reading a book:

**Self-Attention (1 head):**
- You read it once and understand some parts

**Multi-Head Attention (8 heads):**
- You read it 8 times, each time focusing on different things:
  - Time 1: Focus on characters
  - Time 2: Focus on emotions
  - Time 3: Focus on the plot
  - ...and so on

After 8 readings, you understand the book **much better**!

## Why 8 Heads?

**1 Head:**
- Might miss important patterns

**8 Heads (Most Common):**
- Good balance - catches most patterns
- Not too slow

**100 Heads:**
- Too many, becomes slow and doesn't help much

## Summary

> **Multi-Head Attention** = Running **8 self-attentions** at the same time, then combining their results.

1. Self-Attention = 1 way of looking
2. Multi-Head = 8 ways of looking (8 self-attentions)
3. More heads = catch more patterns
4. All heads run **together** (parallel)

**Think of it as:** 8 students reading the same sentence, each noticing different things. Then they share what they found!

## Connection to Self-Attention

| Concept | Self-Attention | Multi-Head Attention |
|---------|---------------|---------------------|
| Number of "looks" | 1 | 8 |
| Speed | Fast | Still fast (parallel) |
| Understanding | Good | Better |
| What it does | One attention | Multiple attentions |

Multi-Head Attention is just **multiple self-attentions working together**!

## What's Next?

Now that words understand each other better (thanks to multi-head attention), we need to process this information.

Next: **Feed-Forward Networks** - The processing step after attention!
`,
};
