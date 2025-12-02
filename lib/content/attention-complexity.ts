import { Article } from './types';

export const attentionComplexity: Article = {
  module: 2,
  slug: 'attention-complexity',
  title: 'Attention Mechanics & Complexity',
  description: 'Understanding the computational cost and mechanics of attention operations',
  readTime: 6,
  previousTopic: { module: 2, slug: 'residual-connections', title: '8. Residual Connections' },
  nextTopic: { module: 2, slug: 'causal-masking', title: '10. Causal Masking' },
  content: `# Attention Mechanics & Complexity

## What is Computational Complexity?

Computational complexity tells us **how much work** a process takes as the input grows larger.

Think of it like:
- Organizing 10 books on a shelf? Easy, takes 1 minute
- Organizing 100 books? Takes 10 minutes
- Organizing 1000 books? Takes...?

The **complexity** tells us how the time grows!

## The Attention Problem

Self-attention needs to compare **every word** with **every other word**.

\`\`\`
Sentence: "The cat sat"
Comparisons needed:
- "The" looks at: The, cat, sat (3 comparisons)
- "cat" looks at: The, cat, sat (3 comparisons)
- "sat" looks at: The, cat, sat (3 comparisons)

Total: 3 × 3 = 9 comparisons
\`\`\`

For **n words**: n × n = n² comparisons!

## O(n²) Complexity

This is written as **O(n²)** - "Big-O of n squared"

\`\`\`
Sequence Length (n) → Comparisons (n²)
10 words → 100 comparisons
100 words → 10,000 comparisons
1,000 words → 1,000,000 comparisons! 💥
10,000 words → 100,000,000 comparisons!! 💥💥
\`\`\`

Notice how it **explodes** as length increases!

## Visual Comparison Matrix

\`\`\`mermaid
graph TD
    subgraph "Attention Matrix (n × n)"
        A["Every word (row)"]
        B["attends to"]
        C["Every word (column)"]
    end
    
    Matrix["Matrix Size: n × n<br/>Total operations: n²"]
    
    A --> B --> C
    B --> Matrix
    
    style Matrix fill:#f59e0b,color:#fff
\`\`\`

## Why is it O(n²)?

### Three Matrix Operations

Attention computes three things for every token pair:

**Step 1: Calculate Scores**
\`\`\`
Query (n × d) × Key^T (d × n) = Scores (n × n)

For each of n queries:
  Compare with n keys
  = n × n = O(n²) operations
\`\`\`

**Step 2: Apply Softmax**
\`\`\`
For each row in the n × n matrix:
  Compute softmax (normalize)
  = O(n²) operations
\`\`\`

**Step 3: Weighted Sum**
\`\`\`
Scores (n × n) × Values (n × d) = Output (n × d)

For each of n positions:
  Sum over n weighted values
  = n × n = O(n²) operations
\`\`\`

**Total: O(n²) + O(n²) + O(n²) = O(n²)**

## Memory Complexity

Not just computation - **memory** also grows!

\`\`\`
Attention Matrix Storage:
- Size: n × n
- For n = 1000: 1,000,000 values
- For n = 10,000: 100,000,000 values

Each value is typically 16 bits (half precision)
= 200 MB for 10,000 tokens! (just for one attention matrix!)
\`\`\`

## The Bottleneck Visualized

\`\`\`mermaid
flowchart LR
    subgraph Input["Input Processing"]
        E1["Embeddings<br/>O(n)"]
    end
    
    subgraph Attention["Attention Layer"]
        A1["Q, K, V projection<br/>O(n)"]
        A2["Attention Matrix<br/>O(n²) ⚠️"]
        A3["Context computation<br/>O(n²) ⚠️"]
    end
    
    subgraph FFN["Feed-Forward"]
        F1["FFN computation<br/>O(n)"]
    end
    
    Input --> Attention
    A1 --> A2 --> A3
    Attention --> FFN
    
    style A2 fill:#ef4444,color:#fff
    style A3 fill:#ef4444,color:#fff
\`\`\`

The **attention computation** is the bottleneck!

## Real-World Impact

### Short Sequences (n = 512)

\`\`\`
n² = 512² = 262,144 operations
✅ Fast on modern GPUs
✅ Fits in memory easily
\`\`\`

### Medium Sequences (n = 2048)

\`\`\`
n² = 2048² = 4,194,304 operations
⚠️ Slower, but manageable
⚠️ More memory needed
\`\`\`

### Long Sequences (n = 100,000)

\`\`\`
n² = 100,000² = 10,000,000,000 operations
❌ Extremely slow
❌ Requires huge amounts of memory
❌ Often impossible on standard hardware
\`\`\`

## Comparison with Other Operations

| Operation | Complexity | Example (n=1000) |
|-----------|-----------|------------------|
| **Feed-Forward** | O(n) | 1,000 ops |
| **Layer Norm** | O(n) | 1,000 ops |
| **Embedding Lookup** | O(n) | 1,000 ops |
| **Attention** | O(n²) | 1,000,000 ops ⚠️ |

Attention is **1000x more expensive** for n=1000!

## The Quadratic Wall

\`\`\`mermaid
graph LR
    subgraph Growth["Complexity Growth"]
        L["Linear O(n)<br/>Grows slowly"]
        Q["Quadratic O(n²)<br/>Grows rapidly"]
    end
    
    Examples["Examples:<br/>n=1000: 1000 vs 1,000,000<br/>n=10000: 10,000 vs 100,000,000"]
    
    L -.Manageable.-> Examples
    Q -.Limiting Factor!.-> Examples
    
    style Q fill:#ef4444,color:#fff
    style L fill:#22c55e,color:#fff
\`\`\`

## Breaking Down the Attention Formula

\`\`\`
Attention(Q, K, V) = Softmax(QK^T / √d) V

Let's count operations for each part:
\`\`\`

### Part 1: QK^T (Query-Key Dot Product)

\`\`\`
Q: [n × d]  (n queries, d dimensions each)
K^T: [d × n]  (n keys transposed)

QK^T: [n × n]

For each of n queries:
  Compute dot product with n keys
  Each dot product: d multiplications
  Total: n × n × d operations
  
Complexity: O(n² × d)
\`\`\`

### Part 2: Divide by √d (Scaling)

\`\`\`
For each element in [n × n] matrix:
  Divide by √d
  
Total: n² operations
Complexity: O(n²)
\`\`\`

### Part 3: Softmax

\`\`\`
For each row (n rows total):
  Exponentiate n values: O(n)
  Sum n values: O(n)
  Divide each by sum: O(n)
  
Total: n × 3n = 3n²
Complexity: O(n²)
\`\`\`

### Part 4: Multiply by V (Apply Attention)

\`\`\`
Attention Weights: [n × n]
V: [n × d]

Result: [n × d]

For each of n output positions:
  Compute weighted sum of n values
  Each value has d dimensions
  Total: n × n × d
  
Complexity: O(n² × d)
\`\`\`

**Dominant Terms: O(n² × d)**

## Multi-Head Attention Complexity

With **h heads**:

\`\`\`
Each head: O(n² × d_head)
where d_head = d_model / h

Total for h heads:
h × O(n² × d/h) = O(n² × d)

Multi-head doesn't change overall complexity!
But processes happen in parallel on GPU ✅
\`\`\`

## Why Not Just Make Attention Linear?

You might ask: "Why not use a simpler, O(n) operation?"

**The Problem:**
- Attention's power comes from comparing **all pairs**
- This is what enables "understanding" relationships
- Removing this = losing the core benefit

**Trade-off:**
- Power vs Efficiency
- Understanding vs Speed

That's why researchers work on:
- **Efficient attention** (approximations)
- **Sparse attention** (selective comparisons)
- **Linear attention** (new architectures)

We'll cover these later!

## Context Window Limitations

The O(n²) complexity directly limits **context windows**:

| Model | Context Window | Attention Ops |
|-------|---------------|---------------|
| **GPT-2** | 1,024 | ~1 million |
| **GPT-3** | 2,048 | ~4 million |
| **GPT-4** | 8,192 | ~67 million |
| **Claude 2** | 100,000 | ~10 billion ⚠️ |

Longer context = exponentially more computation!

## The Cost Breakdown

For a transformer with **L layers**, **h heads**, and **n tokens**:

\`\`\`
Per Layer:
- Multi-head attention: O(n² × d)
- Feed-forward: O(n × d × d_ff)

Total Model:
- Attention: L × O(n² × d)
- FFN: L × O(n × d × d_ff)

For n = 2048, d = 768:
- Attention: ~3 billion ops per layer
- FFN: ~6 billion ops per layer

Attention is significant but not always dominant!
\`\`\`

## Practical Implications

**Training:**
- Batch size × sequence length × sequence length
- Limited by GPU memory
- Often use gradient checkpointing to save memory

**Inference:**
- Process one token at a time with KV cache
- Much more efficient (we'll cover this later!)
- Still limited by context length

## Optimization Techniques (Preview)

We'll explore these in upcoming topics:

1. **KV Cache**: Reuse previous computations
2. **Flash Attention**: Optimized GPU kernels
3. **Sparse Attention**: Only attend to subset
4. **Linear Attention**: Approximate with O(n)
5. **PagedAttention**: Better memory management

## Summary

> **Attention Complexity** = O(n²) - every token must compare with every other token, making long sequences computationally expensive.

**Key Insights:**
- 📊 Quadratic growth: 2x length = 4x computation
- 💾 Memory and compute both scale with n²
- 🎯 This is the main bottleneck for long contexts
- ⚡ Many optimizations exist to address this

**The Formula:**
\`\`\`
For n tokens:
Comparisons = n²
Memory = n² × bytes_per_value
Time = O(n²× d)

Where d is the model dimension
\`\`\`

## What's Next?

Now that we understand the computational cost, let's see how transformers handle **sequential generation**.

Next: **Causal Masking** - Preventing the model from "cheating" by looking at future tokens!
`,
};
