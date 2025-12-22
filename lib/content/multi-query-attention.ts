import { Article } from './types';

export const multiQueryAttention: Article = {
  module: 1,
  slug: 'multi-query-attention',
  title: 'Multi-Query Attention',
  description: 'How sharing keys and values across attention heads reduces memory and speeds up inference',
  readTime: 5,
  previousTopic: { module: 1, slug: 'causal-masking', title: '10. Causal Masking' },
  nextTopic: { module: 1, slug: 'rope', title: '12. RoPE (Rotary Position)' },
  content: `# Multi-Query Attention (MQA)

## What is Multi-Query Attention?

Multi-Query Attention is a **memory optimization** where all attention heads **share the same Keys and Values**, but each head still has its own unique Queries.

Think of it like having multiple students (queries) sharing the same textbook (keys and values) instead of each student having their own copy!

## The Problem It Solves

### Standard Multi-Head Attention is Memory-Heavy

\`\`\`
8 Heads × 3 Matrices (Q, K, V) = 24 separate matrices!

For each head:
- Query matrix: [seq_len × d_head]
- Key matrix: [seq_len × d_head]
- Value matrix: [seq_len × d_head]

With 8 heads and d_head=64:
Total K+V storage = 8 × 2 × [seq_len × 64]
For seq_len=2048: ~2 MB per layer!
\`\`\`

### Multi-Query Attention Reduces This

\`\`\`
8 unique Query matrices (one per head)
+ 1 shared Key matrix (for all heads)
+ 1 shared Value matrix (for all heads)

= 10 matrices instead of 24!

K+V storage = 1 × 2 × [seq_len × 64]
For seq_len=2048: ~256 KB per layer!

8x memory reduction for K+V! 💾
\`\`\`

## Visual Comparison

### Standard Multi-Head Attention

\`\`\`mermaid
flowchart TD
    Input["Input"]
    
    subgraph "Head 1"
        Q1["Q₁"]
        K1["K₁"]
        V1["V₁"]
    end
    
    subgraph "Head 2"
        Q2["Q₂"]
        K2["K₂"]
        V2["V₂"]
    end
    
    subgraph "Head 3"
        Q3["Q₃"]
        K3["K₃"]
        V3["V₃"]
    end
    
    Input --> Q1 & K1 & V1
    Input --> Q2 & K2 & V2
    Input --> Q3 & K3 & V3
    
    style K1 fill:#ef4444,color:#fff
    style V1 fill:#ef4444,color:#fff
    style K2 fill:#ef4444,color:#fff
    style V2 fill:#ef4444,color:#fff
    style K3 fill:#ef4444,color:#fff
    style V3 fill:#ef4444,color:#fff
\`\`\`

Each head has its own K and V (expensive!)

### Multi-Query Attention

\`\`\`mermaid
flowchart TD
    Input["Input"]
    
    subgraph "Unique Queries"
        Q1["Q₁"]
        Q2["Q₂"]
        Q3["Q₃"]
    end
    
    subgraph "Shared K & V"
        K["K (shared)"]
        V["V (shared)"]
    end
    
    Input --> Q1 & Q2 & Q3
    Input --> K & V
    
    Q1 & Q2 & Q3 -.Use same.-> K
    Q1 & Q2 & Q3 -.Use same.-> V
    
    style K fill:#22c55e,color:#fff
    style V fill:#22c55e,color:#fff
\`\`\`

All heads share ONE set of K and V! ✅

## Real-Life Analogy

**Standard Multi-Head Attention:**
> Imagine a library where each student gets their own complete copy of every textbook
> → Lots of duplicate books (expensive!)

**Multi-Query Attention:**
> All students share the same library books
> → Each student has their own notebook (queries)
> → But they all read from the same textbooks (keys/values)
> → Much cheaper!

## How It Works

### Step 1: Project Queries (Per Head)

\`\`\`
Each head gets its own Query projection:

Head 1: Q₁ = Input × W_Q₁
Head 2: Q₂ = Input × W_Q₂
Head 3: Q₃ = Input × W_Q₃
...

8 different Query matrices ✅
\`\`\`

### Step 2: Project Keys & Values (Shared!)

\`\`\`
Only ONE Key and ONE Value for ALL heads:

K = Input × W_K  (shared across all heads)
V = Input × W_V  (shared across all heads)

Just 2 matrices for all 8 heads! ✅
\`\`\`

### Step 3: Compute Attention (Per Head with Shared K, V)

\`\`\`
Head 1: Attention₁ = Softmax(Q₁ × K^T) × V
Head 2: Attention₂ = Softmax(Q₂ × K^T) × V
Head 3: Attention₃ = Softmax(Q₃ × K^T) × V
...

Same K and V, different Queries!
\`\`\`

## The Math

**Standard Multi-Head Attention:**
\`\`\`
For each head h:
  Q_h = Input × W_Q_h  [seq_len × d_head]
  K_h = Input × W_K_h  [seq_len × d_head]
  V_h = Input × W_V_h  [seq_len × d_head]
  
  Output_h = Attention(Q_h, K_h, V_h)

Total parameters: num_heads × 3 × (d_model × d_head)
\`\`\`

**Multi-Query Attention:**
\`\`\`
K = Input × W_K  [seq_len × d_head]  (shared!)
V = Input × W_V  [seq_len × d_head]  (shared!)

For each head h:
  Q_h = Input × W_Q_h  [seq_len × d_head]
  Output_h = Attention(Q_h, K, V)  ← Same K, V!

Total parameters: num_heads × (d_model × d_head)  (for Q)
                + 2 × (d_model × d_head)  (for K, V)
\`\`\`

## Memory Savings Calculation

### Example: 8 Heads, d_model=512, d_head=64, seq_len=2048

**Standard Multi-Head:**
\`\`\`
K+V per head = 2 × [2048 × 64] = 262,144 values
8 heads = 8 × 262,144 = 2,097,152 values
Size: ~4 MB (16-bit floats)
\`\`\`

**Multi-Query:**
\`\`\`
K+V total = 2 × [2048 × 64] = 262,144 values
Only 1 set for all heads!
Size: ~0.5 MB (16-bit floats)

Savings: 8x reduction! 💾
\`\`\`

## Why This Still Works

You might wonder: "If all heads share K and V, won't they all learn the same thing?"

**No!** Here's why:

1. **Different Queries = Different Attention Patterns**
   - Each head has unique queries
   - Even with same K/V, different queries create different attention weights
   - Each head still focuses on different aspects!

2. **Queries Drive the Attention**
   - The query determines WHAT to look for
   - Keys/Values just provide the information
   - Different seeks → different finds!

## Performance Impact

### Parameters Reduction

\`\`\`
Standard: 8 heads × (Q + K + V) = 24 matrices
MQA: 8 × Q + 1 × K + 1 × V = 10 matrices

Parameter reduction: ~58% for K+V!
\`\`\`

### Inference Speed

**The Big Win: KV Cache Size**

During text generation, we cache Keys and Values:

\`\`\`
Standard Multi-Head:
KV Cache = 8 heads × 2 (K+V) × seq_len × d_head
For seq_len=10,000: ~10 MB per layer

Multi-Query:
KV Cache = 1 × 2 (K+V) × seq_len × d_head
For seq_len=10,000: ~1.25 MB per layer

8x smaller cache! = 8x faster generation! ⚡
\`\`\`

### Training vs Inference

| Aspect | Training | Inference |
|--------|----------|-----------|
| **Speed impact** | Minimal | Major improvement! |
| **Memory savings** | Moderate | Huge! (8x for KV cache) |
| **Why?** | Compute-bound | Memory-bound |

**Key insight:** MQA's biggest benefit is during **inference** (text generation)!

## Trade-offs

### Advantages ✅

1. **8x less KV cache memory** during inference
2. **Faster generation** (less memory to load)
3. **Longer context windows** possible
4. **Cheaper to serve** (less GPU memory needed)

### Disadvantages ❌

1. **Slightly lower quality** (less expressiveness)
2. **Less diversity** in attention patterns
3. **May hurt performance** on complex tasks

## Evolution: Grouped-Query Attention (GQA)

MQA was too extreme for some tasks, so we got **Grouped-Query Attention**:

\`\`\`
Standard MHA: 8 heads, 8 K, 8 V
Multi-Query: 8 heads, 1 K, 1 V
Grouped-Query: 8 heads, 2 K, 2 V (4 heads per group)

GQA = Middle ground!
- Group heads into clusters
- Each group shares K and V
- Better quality than MQA, still efficient
\`\`\`

## Where MQA is Used

| Model | Attention Type | Notes |
|-------|---------------|-------|
| **PaLM** | Multi-Query | Google's large model |
| **Falcon** | Multi-Query | Open source LLM |
| **LLaMA 2** | Grouped-Query | 8 groups for 32 heads |
| **Mistral** | Grouped-Query | Balanced approach |

Modern models prefer **Grouped-Query** as the sweet spot!

## Visualization: Attention Pattern Diversity

\`\`\`mermaid
graph LR
    subgraph "Standard MHA"
        H1["Head 1<br/>Unique Q, K, V<br/>🎨 Pattern A"]
        H2["Head 2<br/>Unique Q, K, V<br/>🎨 Pattern B"]
        H3["Head 3<br/>Unique Q, K, V<br/>🎨 Pattern C"]
    end
    
    subgraph "Multi-Query Attention"
        M1["Head 1<br/>Unique Q, Shared K/V<br/>🎨 Pattern A'"]
        M2["Head 2<br/>Unique Q, Shared K/V<br/>🎨 Pattern B'"]
        M3["Head 3<br/>Unique Q, Shared K/V<br/>🎨 Pattern C'"]
    end
    
    style H1 fill:#3b82f6,color:#fff
    style H2 fill:#8b5cf6,color:#fff
    style H3 fill:#ec4899,color:#fff
    style M1 fill:#3b82f6,color:#fff
    style M2 fill:#3b82f6,color:#fff
    style M3 fill:#3b82f6,color:#fff
\`\`\`

MQA patterns are more similar (less diverse) but still different!

## When to Use MQA vs Standard

**Use Multi-Query Attention when:**
- 🚀 Inference speed is critical
- 💾 Memory is limited
- 📝 Generating long sequences
- 💰 Want to reduce serving costs

**Use Standard Multi-Head when:**
- 🎯 Need maximum quality
- 📚 Complex reasoning tasks
- 🔬 Research/experimentation
- 💪 Have abundant GPU memory

**Use Grouped-Query for:**
- ⚖️ Best of both worlds
- 🎯 Production systems
- 📊 Most modern LLMs

## Implementation Details

### Matrix Shapes

\`\`\`
Input: [batch, seq_len, d_model]

Standard Multi-Head (8 heads):
Q: 8 × [batch, seq_len, d_head]
K: 8 × [batch, seq_len, d_head]
V: 8 × [batch, seq_len, d_head]

Multi-Query:
Q: 8 × [batch, seq_len, d_head]
K: 1 × [batch, seq_len, d_head]  ← Shared!
V: 1 × [batch, seq_len, d_head]  ← Shared!

Each head uses the SAME K and V tensor!
\`\`\`

### Broadcasting

The shared K and V are **broadcast** to all query heads:

\`\`\`
Q_head1 [batch, seq_len, d_head]  ×  K^T [d_head, seq_len]
Q_head2 [batch, seq_len, d_head]  ×  K^T [d_head, seq_len]
...

Same K matrix broadcast to all heads!
\`\`\`

## Summary

> **Multi-Query Attention** = All attention heads share the same Keys and Values, while keeping unique Queries, reducing KV cache size by 8x and speeding up inference significantly.

**Think of it as:**
- 📚 Shared library (same books for everyone)
- 🔍 Different searches (each person looks for different things)
- 💾 Huge memory savings (one copy instead of eight)
- ⚡ Faster generation (less data to move around)

**The Key Trade-off:**
\`\`\`
Memory & Speed  ⬆️⬆️⬆️
Quality         ⬇️ (slightly)

Worth it for most applications!
\`\`\`

## What's Next?

We've covered attention optimizations. Now let's explore how modern transformers encode positional information differently.

Next: **RoPE (Rotary Position Embedding)** - A clever way to encode position without absolute embeddings!
`,
};
