import { Article } from './types';

export const causalMasking: Article = {
  module: 1,
  slug: 'causal-masking',
  title: 'Causal Masking',
  description: 'How language models prevent looking into the future during text generation',
  readTime: 5,
  previousTopic: { module: 1, slug: 'attention-complexity', title: '9. Attention Mechanics & Complexity' },
  nextTopic: { module: 1, slug: 'multi-query-attention', title: '11. Multi-Query Attention' },
  content: `# Causal Masking

## What is Causal Masking?

Causal masking is like putting **blinders** on a horse - it prevents the model from "cheating" by looking at future words when predicting the next word.

Think of it as enforcing the rule: **"No peeking ahead!"**

## The Problem: Time Travel

Without causal masking, the model could see the future!

\`\`\`
Task: Predict the next word in "The cat sat on the ___"

❌ Without Masking:
  Model sees: "The cat sat on the mat"
  Oh, the answer is "mat"! (cheating!)

✅ With Causal Masking:
  Model sees: "The cat sat on the ???"
  Now it must truly predict! (fair!)
\`\`\`

## Real-Life Analogy

Imagine taking a test:

**Without Masking:**
> You can see all the answers at the bottom of the page
> Not a real test!

**With Masking:**
> Each answer is covered until you write your answer
> Now it's a fair test!

Causal masking does this for language models!

## How Does It Work?

Causal masking uses a **triangular mask** to block future tokens.

### Attention Without Masking (Bidirectional)

\`\`\`
Sentence: "The cat sat"

Attention Matrix (every word sees every word):
        The  cat  sat
The      ✓    ✓    ✓
cat      ✓    ✓    ✓
sat      ✓    ✓    ✓

Each word attends to ALL words (past, present, future)
\`\`\`

### Attention With Causal Masking (Autoregressive)

\`\`\`
Sentence: "The cat sat"

Causal Attention Matrix (lower triangular):
        The  cat  sat
The      ✓    ✗    ✗   ← "The" only sees itself
cat      ✓    ✓    ✗   ← "cat" sees The, cat
sat      ✓    ✓    ✓   ← "sat" sees all previous

Each word only attends to itself and previous words!
\`\`\`

## Visual Representation

\`\`\`mermaid
graph TD
    subgraph "Without Masking (BERT-style)"
        W1["Word 1"] <--> W2["Word 2"]
        W2 <--> W3["Word 3"]
        W1 <--> W3
    end
    
    subgraph "With Causal Masking (GPT-style)"
        C1["Word 1"]
        C2["Word 2"]
        C3["Word 3"]
        
        C1 --> C1
        C1 --> C2
        C1 --> C3
        C2 --> C2
        C2 --> C3
        C3 --> C3
    end
    
    style C1 fill:#3b82f6,color:#fff
    style C2 fill:#3b82f6,color:#fff
    style C3 fill:#3b82f6,color:#fff
\`\`\`

Notice: Information flows **left to right only** (past to future)!

## The Mask Matrix

The causal mask is a **lower triangular matrix**:

\`\`\`
Position:  0    1    2    3
         ┌────────────────┐
    0    │ 1    0    0    0 │  ← Position 0 sees only itself
    1    │ 1    1    0    0 │  ← Position 1 sees 0,1
    2    │ 1    1    1    0 │  ← Position 2 sees 0,1,2
    3    │ 1    1    1    1 │  ← Position 3 sees all
         └────────────────┘

1 = Can attend (visible)
0 = Cannot attend (masked/blocked)
\`\`\`

## Implementation: Setting to -∞

The mask doesn't literally block values - it sets them to **negative infinity**!

\`\`\`
Step 1: Calculate attention scores
scores = Q × K^T
Example: [0.5, 0.8, 0.3, 0.9]

Step 2: Apply causal mask
Position 1 (should only see positions 0 and 1):
masked_scores = [0.5, 0.8, -∞, -∞]
                            ↑    ↑
                      Blocked future!

Step 3: Apply softmax
softmax([-∞]) = 0
softmax([0.5, 0.8, -∞, -∞]) = [0.38, 0.62, 0, 0]

Future positions get 0% attention! ✅
\`\`\`

## Why -∞ (Negative Infinity)?

\`\`\`
Softmax formula: exp(x) / sum(exp(x))

For x = -∞:
exp(-∞) = 0

So attention to future tokens becomes exactly 0!
Perfect masking!
\`\`\`

## Autoregressive Generation Flow

\`\`\`mermaid
flowchart LR
    subgraph "Token Generation"
        T1["Token 1<br/>'The'"]
        T2["Token 2<br/>'cat'"]
        T3["Token 3<br/>'sat'"]
        T4["Token 4<br/>'on'"]
    end
    
    T1 -.Generates.-> T2
    T1 --> T2
    T2 -.Generates.-> T3
    T1 --> T3
    T2 --> T3
    T3 -.Generates.-> T4
    T1 --> T4
    T2 --> T4
    T3 --> T4
    
    style T1 fill:#3b82f6,color:#fff
    style T4 fill:#22c55e,color:#fff
\`\`\`

Each new token can only see previous tokens!

## BERT vs GPT: The Key Difference

### BERT (Bidirectional - No Masking)

\`\`\`
Task: Fill in the blank
"The ___ sat on the mat"

BERT sees:
- "The" before the blank
- "sat on the mat" after the blank

Can use BOTH directions = Better understanding!
Use case: Classification, Q&A
\`\`\`

### GPT (Causal - With Masking)

\`\`\`
Task: Generate next word
"The cat sat on the ___"

GPT sees:
- Only "The cat sat on the"
- Cannot see what comes after

Must predict purely from past = Text generation!
Use case: Writing, completion, chat
\`\`\`

## During Training

Causal masking enables **parallel training**:

\`\`\`
Training sequence: "The cat sat on mat"

Without masking (sequential):
Step 1: Input "The" → Predict "cat"
Step 2: Input "The cat" → Predict "sat"
Step 3: Input "The cat sat" → Predict "on"
...
(Very slow! One at a time)

With causal masking (parallel):
Process ALL positions at once:
Position 0: "The" → Predict "cat"
Position 1: "The cat" → Predict "sat"
Position 2: "The cat sat" → Predict "on"
...
(Fast! All in parallel, but each position masked!)
\`\`\`

## The Triangular Pattern

\`\`\`mermaid
graph TD
    subgraph "Causal Attention Pattern"
        Row1["Position 0: Sees 1 token (itself)"]
        Row2["Position 1: Sees 2 tokens (0, 1)"]
        Row3["Position 2: Sees 3 tokens (0, 1, 2)"]
        Row4["Position 3: Sees 4 tokens (0, 1, 2, 3)"]
        Row5["..."]
        RowN["Position n: Sees n+1 tokens (all previous + self)"]
    end
    
    Row1 --> Row2 --> Row3 --> Row4 --> Row5 --> RowN
    
    style Row1 fill:#3b82f6,color:#fff
    style RowN fill:#22c55e,color:#fff
\`\`\`

The pattern grows like a **staircase**!

## Inference vs Training

### Training (Parallel)
\`\`\`
Input: "The cat sat on mat"
With mask, compute all predictions at once:
  Position 0: [The] → cat
  Position 1: [The cat] → sat
  Position 2: [The cat sat] → on
  Position 3: [The cat sat on] → mat

All computed in one forward pass!
⚡ Very efficient!
\`\`\`

### Inference (Sequential)
\`\`\`
Start: "The cat sat on"
Generate one token at a time:
  Step 1: "The cat sat on" → "the"
  Step 2: "The cat sat on the" → "mat"
  Step 3: "The cat sat on the mat" → "."

Must generate sequentially!
🐌 Slower, but necessary for generation
\`\`\`

## Memory Efficiency

The causal mask is **predictable** and **reusable**:

\`\`\`
Mask shape: [seq_len × seq_len]

For seq_len = 1000:
Mask size = 1000 × 1000 = 1 million values

BUT: The mask is the same for all batches!
Can precompute and reuse! ✅
\`\`\`

## Common Mask Values

\`\`\`
In code, you'll see:

1. Boolean mask:
   True = can attend
   False = cannot attend

2. Float mask:
   0.0 = can attend
   -inf = cannot attend

3. Addition mask:
   0.0 = can attend
   -1e9 = cannot attend (approximate -inf)
\`\`\`

## Why "Causal"?

The name comes from **causality**: cause must come before effect.

\`\`\`
In language:
Past CAUSES → Present CAUSES → Future

In causal masking:
Can see PAST → Can see PRESENT → Cannot see FUTURE

Respects the causal order of time! ⏰
\`\`\`

## Visual Example: Generating "Hello World"

\`\`\`
Step 1: Start with "Hello"
Attention: "Hello" → [only sees itself]
Predicts: "World"

Step 2: Now have "Hello World"
Attention:
  "Hello" → [sees "Hello"]
  "World" → [sees "Hello", "World"]
Predicts: "!"

Step 3: Now have "Hello World !"
Attention:
  "Hello" → [sees "Hello"]
  "World" → [sees "Hello", "World"]
  "!" → [sees "Hello", "World", "!"]
Predicts: <end>

Each token only knows its history!
\`\`\`

## Impact on Model Behavior

**With Causal Masking:**
- ✅ Can generate text fluently
- ✅ Prevents leaking future information
- ✅ Enables autoregressive generation
- ❌ Cannot use future context for understanding

**Without Causal Masking:**
- ✅ Better understanding (sees full context)
- ✅ Great for classification tasks
- ❌ Cannot generate text autoregressively
- ❌ Would cheat during generation

## Summary

> **Causal Masking** = A triangular mask that prevents tokens from attending to future positions, enabling fair autoregressive text generation.

**Think of it as:**
- 🚫 No time travel allowed!
- ⏪ Only look backward (and at yourself)
- 📝 Fair text generation (no cheating)
- ⚡ Enables parallel training despite sequential generation

**The Key Formula:**
\`\`\`
mask[i, j] = 1 if j ≤ i else 0

Where:
  i = current position (query)
  j = position to attend to (key)
  
Token i can only attend to tokens j where j ≤ i
(current and previous positions only!)
\`\`\`

## What's Next?

Now that we understand how to prevent future peeking, let's explore an optimization that reduces memory usage in attention.

Next: **Multi-Query Attention** - Sharing keys and values across attention heads!
`,
};
