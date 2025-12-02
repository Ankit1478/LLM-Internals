import { Article } from './types';

export const layerNormalization: Article = {
  module: 2,
  slug: 'layer-normalization',
  title: 'Layer Normalization',
  description: 'How transformers keep values stable during training and inference',
  readTime: 5,
  previousTopic: { module: 2, slug: 'feed-forward-networks', title: '6. Feed-Forward Networks' },
  nextTopic: { module: 2, slug: 'residual-connections', title: '8. Residual Connections' },
  content: `# Layer Normalization

## What is Layer Normalization?

Layer Normalization is like a **traffic controller** that keeps all the numbers flowing through the network in a stable, manageable range.

Without it, training transformers would be like trying to balance a tower of blocks on a windy day - everything would collapse!

## The Problem It Solves

Imagine you're cooking and your recipe says:
- Add 2 cups of flour
- Add 1 teaspoon of salt

But what if someone gave you the recipe in grams:
- Add 240 grams of flour  
- Add 6 grams of salt

The **numbers are very different** even though it's the same recipe!

In neural networks, this happens all the time - some values become huge (240) while others stay tiny (6). This makes training unstable.

## Simple Analogy

Think of a classroom test:
- Student A: scores 95, 98, 92, 97 (very high, consistent)
- Student B: scores 45, 50, 48, 52 (lower, but also consistent)

If you want to compare them fairly, you **normalize** to a standard scale (like percentiles).

Layer Norm does this for neural network values!

## How Does It Work?

For each layer, Layer Normalization:

1. **Calculate the mean** (average) of all values
2. **Calculate the standard deviation** (how spread out the values are)
3. **Normalize**: Subtract mean, divide by std dev
4. **Scale and shift** (learnable parameters γ and β)

\`\`\`
Step 1: Calculate Mean
values = [10, 20, 30, 40]
mean = (10 + 20 + 30 + 40) / 4 = 25

Step 2: Calculate Standard Deviation
std = how much values differ from mean ≈ 11.2

Step 3: Normalize
normalized = (values - mean) / std
= [(10-25)/11.2, (20-25)/11.2, (30-25)/11.2, (40-25)/11.2]
= [-1.34, -0.45, 0.45, 1.34]

Step 4: Scale and Shift (learnable)
final = γ * normalized + β
\`\`\`

## Visual Flow

\`\`\`mermaid
flowchart LR
    Input["Input Values<br/>[10, 20, 30, 40]"]
    Mean["Calculate Mean<br/>mean = 25"]
    Std["Calculate Std Dev<br/>std = 11.2"]
    Norm["Normalize<br/>(x - mean) / std"]
    Scale["Scale & Shift<br/>γ * x + β"]
    Output["Output<br/>[-1.34, -0.45, 0.45, 1.34]"]
    
    Input --> Mean
    Input --> Std
    Mean --> Norm
    Std --> Norm
    Norm --> Scale
    Scale --> Output
    
    style Input fill:#3b82f6,color:#fff
    style Norm fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## Why Normalize?

### Problem: Exploding/Vanishing Values

**Without Normalization:**
\`\`\`
Layer 1 output: [1, 2, 3]
Layer 2 output: [10, 20, 30]  (getting bigger!)
Layer 3 output: [100, 200, 300]  (too big!)
Layer 4 output: [1000, 2000, 3000]  (exploded! 💥)
\`\`\`

**With Layer Normalization:**
\`\`\`
Layer 1 output: [1, 2, 3] → normalized to [-1, 0, 1]
Layer 2 output: [10, 20, 30] → normalized to [-1, 0, 1]
Layer 3 output: [100, 200, 300] → normalized to [-1, 0, 1]
Layer 4 output: [1000, 2000, 3000] → normalized to [-1, 0, 1]

Always stable! ✅
\`\`\`

## Where Is It Used in Transformers?

Layer Norm appears **twice** in each transformer block!

\`\`\`mermaid
flowchart TD
    Input["Input"]
    
    subgraph Block["Transformer Block"]
        MHA["Multi-Head Attention"]
        LN1["Layer Norm 1<br/>🎯 Stabilize after attention"]
        FFN["Feed-Forward Network"]
        LN2["Layer Norm 2<br/>🎯 Stabilize after FFN"]
    end
    
    Output["Output"]
    
    Input --> MHA
    MHA --> LN1
    LN1 --> FFN
    FFN --> LN2
    LN2 --> Output
    
    style Input fill:#3b82f6,color:#fff
    style LN1 fill:#f59e0b,color:#fff
    style LN2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## The Math Formula

\`\`\`
LayerNorm(x) = γ * (x - μ) / (σ + ε) + β

Where:
μ (mu) = mean of the layer
σ (sigma) = standard deviation of the layer
ε (epsilon) = tiny number (like 1e-5) to prevent division by zero
γ (gamma) = learnable scale parameter
β (beta) = learnable shift parameter
\`\`\`

## Learnable Parameters: γ and β

After normalization, the network learns to **adjust** the scale and shift:

- **γ (gamma)**: "How much should I scale this?"
- **β (beta)**: "How much should I shift this?"

\`\`\`
Example:
normalized = [-1, 0, 1]

If γ = 2, β = 3:
output = 2 * [-1, 0, 1] + 3
       = [-2, 0, 2] + 3
       = [1, 3, 5]
\`\`\`

The network **learns** the best γ and β during training!

## Layer Norm vs Batch Norm

| Aspect | Batch Norm | Layer Norm |
|--------|-----------|------------|
| **Normalizes across** | Batch dimension | Feature dimension |
| **Works well for** | CNNs, large batches | Transformers, RNNs |
| **Batch size dependent?** | Yes ❌ | No ✅ |
| **Variable sequence length?** | Problematic ❌ | Works great ✅ |
| **Used in transformers?** | Rarely | Always ✅ |

**Why Layer Norm for Transformers?**
- Transformers have **variable sequence lengths** (10 words vs 1000 words)
- Batch Norm fails with small batches (like batch size = 1)
- Layer Norm normalizes **each example independently**

## Position-wise Application

Layer Norm is applied to **each token position independently**:

\`\`\`
Sentence: "The cat sat"

Position 0 "The" [512 values] → LayerNorm → normalized [512 values]
Position 1 "cat" [512 values] → LayerNorm → normalized [512 values]
Position 2 "sat" [512 values] → LayerNorm → normalized [512 values]
\`\`\`

Each position gets its own mean and standard deviation!

## Benefits of Layer Normalization

1. **Stable Training**: Prevents exploding/vanishing gradients
2. **Faster Convergence**: Model learns quicker
3. **Better Generalization**: Works across different batch sizes
4. **Independent of Batch Size**: Each example normalized separately
5. **Handles Variable Lengths**: Perfect for transformers with different sequence lengths

## Pre-Norm vs Post-Norm

There are two ways to place Layer Norm:

### Post-Norm (Original Transformer)
\`\`\`
x → Attention → Add x → LayerNorm → FFN → Add x → LayerNorm
\`\`\`

### Pre-Norm (Modern Transformers)
\`\`\`
x → LayerNorm → Attention → Add x → LayerNorm → FFN → Add x
\`\`\`

**Pre-Norm is now preferred** because:
- Easier to train (more stable)
- Can use higher learning rates
- Used in GPT-3, GPT-4, LLaMA

## Complete Architecture with Layer Norm

\`\`\`mermaid
flowchart TD
    X["Input x"]
    
    subgraph Block["Transformer Block (Pre-Norm)"]
        LN1["LayerNorm"]
        MHA["Multi-Head Attention"]
        Add1["Add (Residual)"]
        
        LN2["LayerNorm"]
        FFN["Feed-Forward"]
        Add2["Add (Residual)"]
    end
    
    Out["Output"]
    
    X --> LN1
    LN1 --> MHA
    MHA --> Add1
    X -.Residual.-> Add1
    
    Add1 --> LN2
    LN2 --> FFN
    FFN --> Add2
    Add1 -.Residual.-> Add2
    
    Add2 --> Out
    
    style X fill:#3b82f6,color:#fff
    style LN1 fill:#f59e0b,color:#fff
    style LN2 fill:#f59e0b,color:#fff
    style Out fill:#22c55e,color:#fff
\`\`\`

## Why ε (Epsilon)?

The tiny ε prevents division by zero:

\`\`\`
If all values are the same:
values = [5, 5, 5, 5]
mean = 5
std = 0  ← Problem! Can't divide by 0

With epsilon:
std + ε = 0 + 0.00001 = 0.00001
Now we can divide safely!
\`\`\`

## Real-World Impact

**Without Layer Norm:**
- Training fails or takes weeks
- Need to carefully tune learning rates
- Model explodes or doesn't learn

**With Layer Norm:**
- ✅ Training is stable
- ✅ Can use larger learning rates
- ✅ Faster convergence (hours instead of weeks)
- ✅ Better final performance

## Common Values

In practice, transformers use:
- **ε (epsilon)**: 1e-5 or 1e-6
- **γ (gamma)**: Initialized to 1
- **β (beta)**: Initialized to 0
- **Normalization dimension**: Usually d_model (e.g., 512, 768)

## Summary

> **Layer Normalization** = Keeping all values in a stable range by normalizing to mean=0, std=1, then learning to scale and shift.

**Think of it as:**
- 🎯 A stabilizer that prevents values from exploding
- ⚖️ A balancer that keeps everything on the same scale
- 🛡️ Aprotector that makes training robust

## What's Next?

Layer Norm keeps values stable, but we still need a way to preserve original information as it flows through layers.

Next: **Residual Connections** - The skip connections that make deep networks possible!
`,
};
