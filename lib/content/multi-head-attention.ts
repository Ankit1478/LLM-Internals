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

## What is Multi-Head Attention?

Think of it like having **multiple experts** looking at the same sentence, each focusing on different aspects.

**Single Attention (Self-Attention):**
> One expert looks at the sentence

**Multi-Head Attention:**
> 8 experts look at the same sentence, each noticing different patterns!

## Real-Life Analogy

Imagine you show a painting to different people:

- **Art Critic**: Focuses on technique and style
- **Historian**: Focuses on historical context
- **Psychologist**: Focuses on emotions and meanings
- **Photographer**: Focuses on composition and lighting

Each person sees **different aspects** of the same painting.

Multi-Head Attention does the same with sentences! Each "head" is a different expert.

## Why Do We Need Multiple Heads?

### Example Sentence:
**"The bank by the river processes transactions"**

Different heads can focus on different relationships:

**Head 1 (Syntax):**
> "bank" ← connects to → "river" (location relationship)

**Head 2 (Semantics):**
> "bank" ← connects to → "transactions" (financial relationship)

**Head 3 (Grammar):**
> "bank" ← connects to → "processes" (subject-verb relationship)

One head alone might miss important patterns!

## How Does It Work?

\`\`\`mermaid
flowchart TB
    Input["Input: 'The bank by river'"]
    
    subgraph "Split into Heads"
        H1["Head 1<br/>Focus: Syntax"]
        H2["Head 2<br/>Focus: Semantics"]
        H3["Head 3<br/>Focus: Grammar"]
        H4["Head 4<br/>Focus: Context"]
    end
    
    subgraph "Each Head Does Self-Attention"
        A1["Self Attention"]
        A2["Self Attention"]
        A3["Self Attention"]
        A4["Self Attention"]
    end
    
    Concat["Concatenate Results"]
    Output["Final Understanding"]
    
    Input --> H1 & H2 & H3 & H4
    H1 --> A1
    H2 --> A2
    H3 --> A3
    H4 --> A4
    A1 & A2 & A3 & A4 --> Concat
    Concat --> Output
    
    style Input fill:#3b82f6,color:#fff
    style Output fill:#22c55e,color:#fff
    style Concat fill:#f59e0b,color:#fff
\`\`\`

## Step-by-Step Process

### 1. Create Multiple Heads

Instead of one set of Q, K, V → Create 8 sets of Q, K, V!

\`\`\`
Original embedding size: 512

Split into 8 heads:
Head 1: size 64 (512 ÷ 8)
Head 2: size 64
Head 3: size 64
...
Head 8: size 64
\`\`\`

### 2. Each Head Runs Self-Attention Independently

\`\`\`
Head 1: Focuses on word positions
Head 2: Focuses on semantic similarity  
Head 3: Focuses on syntax patterns
Head 4: Focuses on long-range dependencies
...
\`\`\`

### 3. Concatenate All Results

After each head finishes, we combine their outputs:

\`\`\`
Head 1 output: [64 dimensions]
Head 2 output: [64 dimensions]
...
Head 8 output: [64 dimensions]

Concatenate → [512 dimensions]
\`\`\`

### 4. Linear Transformation

Pass through a final layer to combine information:

\`\`\`
Combined [512] → Linear Layer → Output [512]
\`\`\`

## Visual Example: "it was too tired"

\`\`\`mermaid
graph LR
    subgraph "Head 1: Grammar"
        it1["it"] -.90%.-> was1["was"]
    end
    
    subgraph "Head 2: Reference"
        it2["it"] -.95%.-> cat2["cat"]
    end
    
    subgraph "Head 3: Context"
        tired3["tired"] -.80%.-> cat3["cat"]
    end
    
    style it1 fill:#3b82f6,color:#fff
    style it2 fill:#3b82f6,color:#fff
    style tired3 fill:#8b5cf6,color:#fff
\`\`\`

Each head discovers **different connections**!

## The Math (Simplified)

\`\`\`python
# For each head h:
def single_head_attention(Q, K, V):
    scores = Q @ K.T  # Matrix multiplication
    attention = softmax(scores)
    output = attention @ V
    return output

# Multi-Head Attention
def multi_head_attention(input, num_heads=8):
    # Split into heads
    Q_heads = split(Q, num_heads)  # 8 separate Q matrices
    K_heads = split(K, num_heads)  # 8 separate K matrices
    V_heads = split(V, num_heads)  # 8 separate V matrices
    
    # Run attention for each head in parallel
    head_outputs = []
    for i in range(num_heads):
        output = single_head_attention(Q_heads[i], K_heads[i], V_heads[i])
        head_outputs.append(output)
    
    # Concatenate all heads
    combined = concatenate(head_outputs)
    
    # Final linear transformation
    result = linear_layer(combined)
    return result
\`\`\`

## Why 8 Heads? Why Not 1 or 100?

**1 Head (Single Attention):**
- ❌ Might miss important patterns
- ❌ Can only focus on one type of relationship

**8 Heads (Standard):**
- ✅ Good balance between coverage and efficiency
- ✅ Enough diversity to capture different patterns
- ✅ Computationally efficient

**100 Heads:**
- ❌ Too many, redundant information
- ❌ Very slow to compute
- ❌ Diminishing returns

## What Does Each Head Learn?

In practice, different heads specialize in:

1. **Position Relationships** - "word 3 connects to word 7"
2. **Syntax Patterns** - "subject connects to verb"
3. **Semantic Similarity** - "cat and kitten are related"
4. **Long-Range Dependencies** - "beginning of sentence affects end"
5. **Rare Words** - "focuses on uncommon tokens"
6. **Frequent Patterns** - "common grammatical structures"

The model learns this **automatically** during training!

## Architecture Diagram

\`\`\`mermaid
flowchart TD
    I["Input Embeddings<br/>[batch, seq_len, 512]"]
    
    subgraph MHA["Multi-Head Attention"]
        L1["Linear: Q, K, V<br/>[512 → 512]"]
        S["Split into 8 heads<br/>[512 → 8 × 64]"]
        
        subgraph Heads["Parallel Attention (8 heads)"]
            H1["Head 1"]
            H2["Head 2"]
            H3["..."]
            H8["Head 8"]
        end
        
        C["Concatenate<br/>[8 × 64 → 512]"]
        L2["Linear Output<br/>[512 → 512]"]
    end
    
    O["Output<br/>[batch, seq_len, 512]"]
    
    I --> L1
    L1 --> S
    S --> H1 & H2 & H3 & H8
    H1 & H2 & H3 & H8 --> C
    C --> L2
    L2 --> O
    
    style I fill:#3b82f6,color:#fff
    style O fill:#22c55e,color:#fff
    style MHA fill:#1e293b,color:#fff
\`\`\`

## Key Benefits

1. **Richer Representations**: Multiple perspectives on the same data
2. **Better Generalization**: Different heads learn different patterns
3. **Parallel Processing**: All heads run simultaneously (fast on GPUs)
4. **Robust Learning**: If one head fails, others compensate


## Common Configuration

| Model | Embedding Size | Num Heads | Head Dimension |
|-------|---------------|-----------|----------------|
| GPT-2 Small | 768 | 12 | 64 |
| GPT-2 Medium | 1024 | 16 | 64 |
| BERT Base | 768 | 12 | 64 |
| GPT-3 | 12288 | 96 | 128 |

Notice: **Head dimension is usually 64 or 128**!

## Summary

> **Multi-Head Attention** = Running multiple self-attention mechanisms in parallel, each learning to focus on different aspects of the input, then combining all their insights.

**Think of it as:**
- 🧠 One brain with multiple specialists
- 👀 Multiple eyes looking at different details
- 🎯 Multiple search engines with different algorithms

## What's Next?

After attention computes relationships between words, we need to process each word individually.

Next: **Feed-Forward Networks** - The processing layer after attention!
`,
};
