import { Article } from './types';

export const feedForwardNetworks: Article = {
  module: 2,
  slug: 'feed-forward-networks',
  title: 'Feed-Forward Networks',
  description: 'How transformers process each token individually after attention',
  readTime: 6,
  previousTopic: { module: 2, slug: 'multi-head-attention', title: '5. Multi-Head Attention' },
  nextTopic: { module: 2, slug: 'layer-normalization', title: '7. Layer Normalization' },
  content: `# Feed-Forward Networks

## What is a Feed-Forward Network?

After attention tells us **which words are related**, the Feed-Forward Network (FFN) processes **each word individually** to extract deeper meaning.

Think of it as:
- **Attention**: "Who should I pay attention to?"
- **Feed-Forward**: "Now let me think deeply about what I learned"

## Simple Analogy

Imagine you're studying for an exam:

**Step 1 (Attention):**
> You gather relevant information from different sources

**Step 2 (Feed-Forward):**
> You sit down and **process** that information in your brain
> You connect concepts, understand patterns, memorize

Feed-Forward Networks are that "thinking" step!

## Where Does It Fit?

\`\`\`mermaid
flowchart TD
    Input["Token Embedding"]
    
    subgraph Transformer["Transformer Block"]
        Attn["Multi-Head Attention<br/>👥 What to focus on?"]
        Add1["Add & Normalize"]
        FFN["Feed-Forward Network<br/>🧠 Process the information"]
        Add2["Add & Normalize"]
    end
    
    Output["Enhanced Representation"]
    
    Input --> Attn
    Attn --> Add1
    Add1 --> FFN
    FFN --> Add2
    Add2 --> Output
    
    style Input fill:#3b82f6,color:#fff
    style FFN fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## How Does It Work?

FFN is actually **two linear transformations** with an activation function in between.

### The Structure

\`\`\`
Input (d_model = 512)
    ↓
Linear Layer 1 (512 → 2048)  [Expand!]
    ↓
Activation (ReLU or GELU)
    ↓
Linear Layer 2 (2048 → 512)  [Compress back!]
    ↓
Output (d_model = 512)
\`\`\`

It's like **expanding, processing, then compressing** back!

## Why Expand Then Compress?

### The Bottleneck Analogy

Imagine you're explaining something:

1. **Expand**: You first explain in great detail with many examples (2048 dimensions)
2. **Activation**: You emphasize the important parts (non-linearity)
3. **Compress**: You summarize back to key points (512 dimensions)

The expansion gives the network **room to think**!

## The Mathematics

\`\`\`python
FFN(x) = Linear2(Activation(Linear1(x)))

# More explicitly:
def FFN(x):
    # x shape: [batch, seq_len, 512]
    
    # Expand
    expanded = Linear1(x)  # [batch, seq_len, 2048]
    
    # Non-linear activation
    activated = ReLU(expanded)  # [batch, seq_len, 2048]
    
    # Compress back
    output = Linear2(activated)  # [batch, seq_len, 512]
    
    return output
\`\`\`

## Visual Flow

\`\`\`mermaid
flowchart LR
    X["x<br/>[512]"]
    W1["Linear 1<br/>512 → 2048"]
    Act["ReLU/GELU"]
    W2["Linear 2<br/>2048 → 512"]
    Out["output<br/>[512]"]
    
    X --> W1
    W1 --> Act
    Act --> W2
    W2 --> Out
    
    style X fill:#3b82f6,color:#fff
    style Act fill:#f59e0b,color:#fff
    style Out fill:#22c55e,color:#fff
\`\`\`

## Why Non-Linearity (ReLU/GELU)?

Without activation, FFN would just be one big linear transformation!

**Without Activation:**
\`\`\`
Linear1(Linear2(x)) = Combined_Linear(x)
// Just multiplying matrices, could be done in one step!
\`\`\`

**With Activation:**
\`\`\`
Linear2(ReLU(Linear1(x)))
// Now we can learn complex, non-linear patterns!
\`\`\`

### ReLU vs GELU

**ReLU (Rectified Linear Unit):**
\`\`\`
ReLU(x) = max(0, x)

Examples:
ReLU(-2) = 0
ReLU(0)  = 0
ReLU(3)  = 3
\`\`\`

**GELU (Gaussian Error Linear Unit):**
> Smoother version of ReLU, better for transformers
> Used in BERT, GPT-2, GPT-3

\`\`\`
GELU(x) ≈ x * sigmoid(1.702 * x)
// Smooth curve instead of hard cutoff
\`\`\`

## Position-wise: Key Insight!

**Critical:** FFN is applied to **each position independently**!

\`\`\`
Sentence: "The cat sat"

Position 0 "The" → FFN → processed "The"
Position 1 "cat" → FFN → processed "cat"  
Position 2 "sat" → FFN → processed "sat"

Same FFN weights, different inputs!
\`\`\`

This is why it's called **Position-wise Feed-Forward**.


## Why 4x Expansion?

Most transformers use **d_ff = 4 × d_model**

| Model | d_model | d_ff | Ratio |
|-------|---------|------|-------|
| BERT Base | 768 | 3072 | 4x |
| GPT-2 Small | 768 | 3072 | 4x |
| GPT-3 | 12288 | 49152 | 4x |
| LLaMA | 4096 | 11008 | ~2.7x |

The 4x ratio is empirically proven to work well!

## What Does FFN Learn?

Research shows FFN layers learn to:

1. **Store Knowledge**: Like a memory bank
   - "Paris" → activates neurons for "France", "capital", "Eiffel Tower"

2. **Feature Extraction**: Detect patterns
   - "ing" ending → activates "verb" neurons
   - Question words → activates "question" neurons

3. **Non-linear Transformations**: Complex mappings
   - Combining multiple features into new representations

## FFN vs Attention

| Aspect | Attention | Feed-Forward |
|--------|-----------|--------------|
| **Purpose** | Find relationships | Process information |
| **Scope** | Looks at all tokens | Looks at one token |
| **Parameters** | Fewer | More (most of transformer!) |
| **Complexity** | O(n²) | O(n) |

**Key Insight:** FFN has **most of the parameters** in a transformer!

\`\`\`
GPT-2 Small parameters:
- Attention layers: ~25% of parameters
- FFN layers: ~50% of parameters
- Embeddings: ~25% of parameters
\`\`\`

## Complete Transformer Block

\`\`\`mermaid
flowchart TD
    Input["Input Token<br/>[512]"]
    
    subgraph Block["Transformer Block"]
        MHA["Multi-Head Attention"]
        Add1["Residual + LayerNorm"]
        FFN["Feed-Forward Network<br/>512 → 2048 → 512"]
        Add2["Residual + LayerNorm"]
    end
    
    Output["Output<br/>[512]"]
    
    Input --> MHA
    MHA --> Add1
    Input -.Residual.-> Add1
    Add1 --> FFN
    FFN --> Add2
    Add1 -.Residual.-> Add2
    Add2 --> Output
    
    style Input fill:#3b82f6,color:#fff
    style FFN fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`



Modern transformers prefer **GELU** or **SwiGLU** (GPT-4, LLaMA).

## Key Takeaways

> **Feed-Forward Networks** are the "thinking" layers that process each token individually after attention gathers context.

**Remember:**
- **Expand → Activate → Compress** (512 → 2048 → 512)
- **Position-wise**: Same weights, applied to each token independently
- **Most parameters**: FFN has more parameters than attention
- **Non-linear**: Activation function enables complex pattern learning
- **4x expansion**: Standard ratio for hidden dimension

## What's Next?

We've learned how attention gathers context and FFN processes it. But there's a problem:

> What if the network gets unstable during training?

Next: **Layer Normalization** - Keeping values stable!
`,
};
