import { Article } from './types';

export const feedForwardNetworks: Article = {
  module: 1,
  slug: 'feed-forward-networks',
  title: 'Feed-Forward Networks',
  description: 'How transformers process each token individually after attention',
  readTime: 6,
  previousTopic: { module: 1, slug: 'multi-head-attention', title: '5. Multi-Head Attention' },
  nextTopic: { module: 1, slug: 'layer-normalization', title: '7. Layer Normalization' },
  content: `# Feed-Forward Networks

## Part of Transformer Architecture

We're building the Transformer step by step:

**Lesson 4:** Self-Attention (Done!)
**Lesson 5:** Multi-Head Attention (Done!)
**Lesson 6:** Feed-Forward Networks (This lesson)

All these parts work together inside the Transformer!

## Quick Recap: What We Learned So Far

Remember from previous lessons:

**Lesson 4 - Self-Attention:**
- Each word looks at other words in the sentence

**Lesson 5 - Multi-Head Attention:**
- 8 different ways of looking at words (8 heads)

**Visual Summary:**

\`\`\`mermaid
flowchart TD
    Sentence["Sentence: 'The cat sat on the mat'"]

    L4["Lesson 4: Self-Attention<br/>Each word looks at others"]
    L4Ex["Example: 'cat' looks at all words"]

    L5["Lesson 5: Multi-Head Attention<br/>8 different ways to look"]
    L5Ex["8 heads notice different patterns"]

    Result["Result: 'cat' now knows it's related to<br/>'The', 'sat', 'on', 'the', 'mat'"]

    Question["But now what?<br/>We have information... now we need to THINK!"]

    Sentence --> L4
    L4 --> L4Ex
    L4Ex --> L5
    L5 --> L5Ex
    L5Ex --> Result
    Result --> Question

    style Sentence fill:#3b82f6,color:#fff
    style L4 fill:#8b5cf6,color:#fff
    style L5 fill:#8b5cf6,color:#fff
    style Result fill:#22c55e,color:#fff
    style Question fill:#f59e0b,color:#fff
\`\`\`

**After multi-head attention:** The word "cat" gathered information from other words

**Next step needed:** Process this information (that's what this lesson is about!)

## What is Feed-Forward Network?

**Feed-Forward Network (FFN)** = The "thinking" step that happens **after** attention

Think of it like this:

\`\`\`
Multi-Head Attention  →  "I gathered information from other words"
Feed-Forward Network  →  "Now let me THINK about what I learned"
\`\`\`

## Super Simple Analogy

Imagine you're in class:

**Step 1 - Multi-Head Attention (Previous lesson):**
- You listen to the teacher
- You read the textbook
- You look at the board
- You gather information from everywhere

**Step 2 - Feed-Forward Network (This lesson):**
- You sit quietly
- You **think** about what you just learned
- Your brain processes the information
- You understand it better!

Feed-Forward Network = Your brain's "thinking time"!

## How Everything Connects

Here's how all the pieces work together:

\`\`\`mermaid
flowchart TD
    Input["Word: 'cat'"]

    Step1["Step 1: Multi-Head Attention<br/>Look at other words"]
    Step2["Step 2: Feed-Forward Network<br/>Think about what you learned"]

    Output["Smarter understanding of 'cat'"]

    Input --> Step1
    Step1 --> Step2
    Step2 --> Output

    style Input fill:#3b82f6,color:#fff
    style Step1 fill:#8b5cf6,color:#fff
    style Step2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

Every word goes through these 2 steps!

## How Does It Work? (Very Simple!)

Feed-Forward Network does 3 simple steps:

### Step 1: Expand (Make Bigger)

Take the word information and make it **bigger** (more space to think)

\`\`\`
Small box → BIG BOX
  [512]  →  [2048]
\`\`\`

### Step 2: Think (Activation)

Now that we have more space, we **think** and keep only important things

\`\`\`
Remove negative thoughts, keep positive ones
\`\`\`

### Step 3: Compress (Make Small Again)

Compress back to original size with **better understanding**

\`\`\`
BIG BOX → Small box (but smarter!)
 [2048] →   [512]
\`\`\`

## Real-Life Example

Imagine explaining something to a friend:

**Step 1 - Expand:**
- You explain in DETAIL with many examples
- "A cat is a small furry animal with four legs, whiskers, says meow, chases mice, sleeps a lot..."

**Step 2 - Think:**
- Your friend thinks about it
- Keeps important parts, forgets unnecessary details

**Step 3 - Compress:**
- Your friend summarizes: "Oh, a cat is a small pet animal!"

That's exactly what Feed-Forward Network does!

## Simple Code Example

\`\`\`python|javascript
# Feed-Forward Network
def feed_forward(word):
    # Step 1: Expand (make bigger)
    big = expand(word)  # 512 → 2048

    # Step 2: Think (keep important parts)
    thinking = relu(big)  # Remove negative values

    # Step 3: Compress (make small again)
    output = compress(thinking)  # 2048 → 512

    return output  # Smarter word!
|||
// Feed-Forward Network
function feedForward(word) {
    // Step 1: Expand (make bigger)
    const big = expand(word);  // 512 → 2048

    // Step 2: Think (keep important parts)
    const thinking = relu(big);  // Remove negative values

    // Step 3: Compress (make small again)
    const output = compress(thinking);  // 2048 → 512

    return output;  // Smarter word!
}
\`\`\`

That's it! Just 3 simple steps.

## Visual Diagram

\`\`\`mermaid
flowchart LR
    X["Word<br/>Small"]
    W1["Expand<br/>Make BIG"]
    Act["Think<br/>Process"]
    W2["Compress<br/>Make Small"]
    Out["Smarter Word"]

    X --> W1
    W1 --> Act
    Act --> W2
    W2 --> Out

    style X fill:#3b82f6,color:#fff
    style Act fill:#f59e0b,color:#fff
    style Out fill:#22c55e,color:#fff
\`\`\`

## What is "ReLU" (The Thinking Part)?

**ReLU** = A simple rule for thinking

**Rule:** Keep positive numbers, turn negative numbers into zero

### What Are Positive and Negative Numbers?

If you're learning coding for the first time, here's a quick reminder:

**Positive Numbers:** Numbers greater than zero
\`\`\`
1, 2, 3, 5, 10, 100 → All positive!
\`\`\`

**Negative Numbers:** Numbers less than zero (have a minus sign)
\`\`\`
-1, -2, -5, -10 → All negative!
\`\`\`

**Zero:** Not positive, not negative
\`\`\`
0 → Just zero!
\`\`\`

### How ReLU Works

\`\`\`
Input: -5, -2, 0, 3, 7

After ReLU:
-5 → 0  (negative, change to 0!)
-2 → 0  (negative, change to 0!)
 0 → 0  (zero, stays zero)
 3 → 3  (positive, keep it!)
 7 → 7  (positive, keep it!)

Output: 0, 0, 0, 3, 7
\`\`\`

### Why Remove Negative Numbers?

Think of it like filtering information:

- **Positive numbers** = Important information (keep it!)
- **Negative numbers** = Not useful right now (ignore it!)

**Example:** If you're studying for a math test:
- Positive: Math formulas, practice problems (keep these!)
- Negative: What you ate for breakfast, random thoughts (ignore these!)

ReLU helps the network focus on important information and ignore the rest!

## Each Word Gets Its Own Thinking Time

**Important:** Every word goes through Feed-Forward Network separately!

\`\`\`
Sentence: "The cat sat"

Word "The" → Expand → Think → Compress → Smarter "The"
Word "cat" → Expand → Think → Compress → Smarter "cat"
Word "sat" → Expand → Think → Compress → Smarter "sat"
\`\`\`

Each word gets its own "thinking time"!

## Putting It All Together

Here's the complete flow from start to finish:

\`\`\`mermaid
flowchart TD
    Input["Start: 'The cat sat'"]

    Step1["Step 1: Multi-Head Attention<br/>Words look at each other"]
    Info["'cat' now knows about 'The' and 'sat'"]

    Step2["Step 2: Feed-Forward Network<br/>Each word thinks individually"]
    Smart["Each word becomes smarter!"]

    Output["Result: Better understanding of sentence"]

    Input --> Step1
    Step1 --> Info
    Info --> Step2
    Step2 --> Smart
    Smart --> Output

    style Input fill:#3b82f6,color:#fff
    style Step1 fill:#8b5cf6,color:#fff
    style Step2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## Connection to Previous Topics

Let's see how everything connects:

| Topic | What It Does | Example |
|-------|-------------|---------|
| **Self-Attention** (Lesson 4) | One word looks at others | "cat" looks at "The" and "sat" |
| **Multi-Head Attention** (Lesson 5) | 8 different ways of looking | 8 heads notice different patterns |
| **Feed-Forward Network** (This lesson) | Each word thinks about what it learned | "cat" processes all the information |

**Together:** Attention gathers information → Feed-Forward processes it!

## Summary

> **Feed-Forward Network** = The "thinking" step after attention, where each word processes information individually

**Remember:**
1. After attention, words need to THINK
2. Feed-Forward does: Expand → Think → Compress
3. Every word gets its own thinking time
4. Makes words "smarter" with better understanding

**Think of it as:** After listening to everyone (attention), you sit quietly and think about what you learned (feed-forward)!

## What's Next?

We've learned how attention gathers context and FFN processes it. But there's a problem:

> What if the network gets unstable during training?

Next: **Layer Normalization** - Keeping values stable!
`,
};
