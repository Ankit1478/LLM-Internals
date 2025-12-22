import { Article } from './types';

export const attentionComplexity: Article = {
  module: 1,
  slug: 'attention-complexity',
  title: 'Attention Mechanics & Complexity',
  description: 'Understanding the computational cost and mechanics of attention operations',
  readTime: 6,
  previousTopic: { module: 1, slug: 'residual-connections', title: '8. Residual Connections' },
  nextTopic: { module: 1, slug: 'causal-masking', title: '10. Causal Masking' },
  content: `# Attention Mechanics & Complexity

## Part of Transformer Architecture

We're continuing to build the Transformer:

**Lesson 4:** Self-Attention (Done!)
**Lesson 5:** Multi-Head Attention (Done!)
**Lesson 6:** Feed-Forward Networks (Done!)
**Lesson 7:** Layer Normalization (Done!)
**Lesson 8:** Residual Connections (Done!)
**Lesson 9:** Attention Complexity (This lesson)

## Why Learn This?

Understanding attention complexity helps you:
- Know why AI API calls cost more for longer inputs
- Understand context window limits (GPT-4's 8K vs 128K tokens)
- Optimize your AI integration costs
- Choose the right model for your use case
- Understand why some AI requests are slow

**Real impact:** This is why you see "Maximum 4000 tokens" errors when calling AI APIs!

## What is Complexity?

**Complexity** = How much work the computer needs to do

\`\`\`plaintext
Search 10 items:   Takes 1 second
Search 100 items:  Takes 10 seconds
Search 1000 items: Takes 100 seconds

The more items, the more work!
\`\`\`

## The Attention Problem

Remember: **Self-Attention** means each word looks at every other word

**Example:** "The cat sat"

\`\`\`plaintext
"The" looks at: The, cat, sat (3 comparisons)
"cat" looks at: The, cat, sat (3 comparisons)
"sat" looks at: The, cat, sat (3 comparisons)

Total: 3 × 3 = 9 comparisons
\`\`\`

**Formula:** For n words → n × n comparisons

## Why This is a Problem

The comparisons grow VERY fast:

\`\`\`plaintext
3 words    → 3 × 3 = 9 comparisons
10 words   → 10 × 10 = 100 comparisons
100 words  → 100 × 100 = 10,000 comparisons
1000 words → 1000 × 1000 = 1,000,000 comparisons!
\`\`\`

**For web developers:** This is like nested loops!

\`\`\`javascript
// This is what attention does:
for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
        compare(words[i], words[j]); // n × n = n² operations!
    }
}
\`\`\`

Nested loops = Slow for large inputs!

## Visual Example

\`\`\`mermaid
flowchart TD
    Words["3 words:<br/>'The cat sat'"]
    Matrix["Comparison Matrix<br/>3 × 3 = 9 comparisons"]
    Result["Each word knows about<br/>all other words"]

    Words --> Matrix
    Matrix --> Result

    style Matrix fill:#f59e0b,color:#fff
    style Result fill:#22c55e,color:#fff
\`\`\`

## Not Just Computation - Memory Too!

The computer needs to remember all comparisons:

\`\`\`plaintext
100 words   = Store 10,000 numbers
1000 words  = Store 1,000,000 numbers (uses a lot of memory!)
10,000 words = Store 100,000,000 numbers (might run out of memory!)
\`\`\`

**For web developers:** Like creating a huge 2D array:
\`\`\`javascript
const n = 1000;
const attentionMatrix = new Array(n).fill(0).map(() => new Array(n));
// This is 1,000,000 values!
\`\`\`

## Real-World Impact

**Short Text (512 words):**
\`\`\`plaintext
512 × 512 = 262,144 comparisons
Fast! Works great.
\`\`\`

**Medium Text (2,048 words):**
\`\`\`plaintext
2,048 × 2,048 = 4,194,304 comparisons
Slower, but still okay
\`\`\`

**Long Text (10,000 words):**
\`\`\`plaintext
10,000 × 10,000 = 100,000,000 comparisons
Very slow! Might not work!
\`\`\`

## Why AI Models Have Limits

This is why AI models have **token limits**:

| Model | Token Limit | Why? |
|-------|------------|------|
| GPT-3.5 | 4,096 tokens | Attention is too expensive beyond this |
| GPT-4 | 8,192 tokens | Better hardware, but still limited |
| Claude | 100,000 tokens | Special optimizations needed |

**For web developers:** This is why you see "Maximum 4000 tokens" errors when calling AI APIs!

## Simple Code Example

\`\`\`python|javascript
# This is why attention is slow
def attention_complexity(words):
    n = len(words)

    # Every word looks at every word (nested loop!)
    for word1 in words:      # Loop 1: n times
        for word2 in words:  # Loop 2: n times
            compare(word1, word2)

    # Total: n × n = n² comparisons

# Example
words = ["The", "cat", "sat"]  # 3 words
# Comparisons: 3 × 3 = 9
|||
// This is why attention is slow
function attentionComplexity(words) {
    const n = words.length;

    // Every word looks at every word (nested loop!)
    for (let i = 0; i < n; i++) {      // Loop 1: n times
        for (let j = 0; j < n; j++) {  // Loop 2: n times
            compare(words[i], words[j]);
        }
    }

    // Total: n × n = n² comparisons
}

// Example
const words = ["The", "cat", "sat"];  // 3 words
// Comparisons: 3 × 3 = 9
\`\`\`

## How This Relates to Web Development

**API Cost Example:**

\`\`\`javascript
// Calling OpenAI API
async function callAI(prompt) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
    });

    // Cost depends on token count
    // Long prompts = more tokens = more attention work = higher cost!
}

// This costs less (50 tokens × 50 = 2,500 comparisons)
const short = "Write a haiku";

// This costs more! (1000 tokens × 1000 = 1,000,000 comparisons)
const long = "Write a detailed essay..." + 5000 words;
\`\`\`

**Why context windows matter:**
\`\`\`javascript
// GPT-3.5 limit: 4,096 tokens
const prompt = userInput + chatHistory;

if (countTokens(prompt) > 4096) {
    // Error! Too long for attention to handle
    throw new Error("Prompt exceeds token limit");
}
\`\`\`

## Summary

> **Attention Complexity** = Each word compares with every other word, causing n × n comparisons

**Remember:**
1. Attention uses nested loops (n × n)
2. 10 words = 100 comparisons
3. 1000 words = 1,000,000 comparisons (slow!)
4. This is why AI models have token limits
5. Longer input = Higher API costs

**For web developers:**
- Like for loop inside another for loop
- This is why context windows have limits
- This is why longer prompts cost more
- Understanding this helps you optimize AI integration

**Simple formula:**
\`\`\`plaintext
n words → n × n comparisons

Double the words = 4× the work!
\`\`\`

## Connection to Previous Topics

| Topic | What It Does | Complexity |
|-------|-------------|------------|
| **Self-Attention** (Lesson 4) | Words look at each other | n × n |
| **Multi-Head Attention** (Lesson 5) | 8 different ways of looking | Still n × n |
| **Feed-Forward Network** (Lesson 6) | Each word thinks individually | Just n (fast!) |
| **Layer Normalization** (Lesson 7) | Keep numbers balanced | Just n (fast!) |
| **Residual Connections** (Lesson 8) | Preserve original information | Just n (fast!) |
| **Attention Complexity** (This lesson) | Why attention is the bottleneck | n × n (slow!) |

Attention is the slowest part of the Transformer!

## What's Next?

Now that we understand the computational cost, let's see how transformers handle **sequential generation**.

Next: **Causal Masking** - Preventing the model from "cheating" by looking at future tokens!
`,
};
