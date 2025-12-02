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

## Part of Transformer Architecture

We're continuing to build the Transformer:

**Lesson 4:** Self-Attention (Done!)
**Lesson 5:** Multi-Head Attention (Done!)
**Lesson 6:** Feed-Forward Networks (Done!)
**Lesson 7:** Layer Normalization (This lesson)

## What is Layer Normalization?

**Layer Normalization** = Keeping all numbers in a similar range so the model stays stable

When numbers become too large or too small, the model stops learning properly. Layer Normalization fixes this problem.

## The Problem

In neural networks, numbers can grow out of control:

**Without Layer Normalization:**
- Some numbers become huge: 1000, 5000, 10000
- Some numbers become tiny: 0.001, 0.0001
- The model becomes unstable and breaks

**With Layer Normalization:**
- All numbers stay in a similar range
- The model stays stable
- Training works smoothly

## Why Do We Need This?

After attention and feed-forward operations, the numbers can grow or shrink dramatically:

**Example:**
- Word "the": outputs [2, 5, 8]
- Word "cat": outputs [1000, 2500, 4000]
- Word "sat": outputs [0.1, 0.2, 0.3]

These numbers are very different in scale. This causes problems:
- Some values dominate others
- Training becomes unstable
- The model learns slowly or not at all

**Layer Normalization fixes this** by adjusting all values to a similar scale.

## How Does It Work?

Layer Normalization follows these steps:

### Step 1: Calculate the Mean (Average)

Find the average of all values in the layer

\`\`\`
Values: [10, 20, 30, 40]
Mean = (10 + 20 + 30 + 40) / 4 = 25
\`\`\`

### Step 2: Calculate Standard Deviation

Measure how spread out the values are from the mean

\`\`\`
Standard deviation ≈ 11.2 (measures the spread)
\`\`\`

### Step 3: Normalize

Subtract the mean and divide by standard deviation

\`\`\`
Normalized = (value - mean) / std_dev

10 → (10 - 25) / 11.2 = -1.34
20 → (20 - 25) / 11.2 = -0.45
30 → (30 - 25) / 11.2 = 0.45
40 → (40 - 25) / 11.2 = 1.34
\`\`\`

Now all values are in a similar range around 0!

## Visual Diagram

\`\`\`mermaid
flowchart LR
    Input["Input Values<br/>[10, 20, 30, 40]"]
    Mean["Calculate Mean<br/>mean = 25"]
    Std["Calculate Std Dev<br/>std = 11.2"]
    Norm["Normalize<br/>(x - mean) / std"]
    Output["Output<br/>[-1.34, -0.45, 0.45, 1.34]"]

    Input --> Mean
    Input --> Std
    Mean --> Norm
    Std --> Norm
    Norm --> Output

    style Input fill:#3b82f6,color:#fff
    style Norm fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## Why Is This Important?

**Without Layer Normalization:**
\`\`\`
After Step 1: Numbers = 2, 5, 8
After Step 2: Numbers = 20, 50, 80 (getting bigger!)
After Step 3: Numbers = 200, 500, 800 (too big!)
After Step 4: Numbers = 2000, 5000, 8000 (EXPLODED!)

Result: Everything breaks!
\`\`\`

**With Layer Normalization:**
\`\`\`
After Step 1: Numbers = 2, 5, 8 → Normalized to -1, 0, 1
After Step 2: Numbers = 20, 50, 80 → Normalized to -1, 0, 1
After Step 3: Numbers = 200, 500, 800 → Normalized to -1, 0, 1
After Step 4: Numbers = 2000, 5000, 8000 → Normalized to -1, 0, 1

Result: Always stable!
\`\`\`

## Where Is It Used in Transformers?

Layer Normalization is used **after each step** in the Transformer!

\`\`\`mermaid
flowchart TD
    Input["Word: 'cat'"]

    Step1["Multi-Head Attention"]
    LN1["Layer Normalization<br/>Keep numbers stable"]

    Step2["Feed-Forward Network"]
    LN2["Layer Normalization<br/>Keep numbers stable"]

    Output["Smarter 'cat'"]

    Input --> Step1
    Step1 --> LN1
    LN1 --> Step2
    Step2 --> LN2
    LN2 --> Output

    style Input fill:#3b82f6,color:#fff
    style LN1 fill:#f59e0b,color:#fff
    style LN2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

After attention → Normalize
After feed-forward → Normalize

This keeps everything stable!

## Code Example

\`\`\`python|javascript
# Layer Normalization (simplified)
def layer_normalization(values):
    # Step 1: Calculate mean
    mean = sum(values) / len(values)

    # Step 2: Calculate standard deviation
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    std_dev = variance ** 0.5

    # Step 3: Normalize
    normalized = [(x - mean) / (std_dev + 1e-5) for x in values]

    return normalized

# Example
values = [10, 20, 30, 40]
result = layer_normalization(values)
# Result: [-1.34, -0.45, 0.45, 1.34]
|||
// Layer Normalization (simplified)
function layerNormalization(values) {
    // Step 1: Calculate mean
    const mean = values.reduce((a, b) => a + b) / values.length;

    // Step 2: Calculate standard deviation
    const variance = values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // Step 3: Normalize
    const normalized = values.map(x => (x - mean) / (stdDev + 1e-5));

    return normalized;
}

// Example
const values = [10, 20, 30, 40];
const result = layerNormalization(values);
// Result: [-1.34, -0.45, 0.45, 1.34]
\`\`\`

## Applied to Each Position

Layer Normalization is applied independently to each token:

\`\`\`
Sentence: "The cat sat"

Position 0 "The": [512 values] → Normalize → [512 normalized values]
Position 1 "cat": [512 values] → Normalize → [512 normalized values]
Position 2 "sat": [512 values] → Normalize → [512 normalized values]
\`\`\`

**What does [512 values] mean?**

Each word is represented by a **vector** (a list of numbers). In transformers, this vector typically has 512 numbers.

\`\`\`
Example:
Word "cat" = [0.5, -0.2, 1.3, 0.8, ... 512 numbers total]
           ↑
         This is a vector (array of numbers)
\`\`\`

Layer Normalization takes these 512 numbers, calculates their mean and standard deviation, and normalizes all 512 values.

## Putting It All Together

Here's how everything works in the Transformer:

\`\`\`mermaid
flowchart TD
    Input["Start: Word 'cat'"]

    Attention["Multi-Head Attention<br/>Look at other words"]
    LN1["Layer Normalization<br/>Keep numbers stable"]

    FFN["Feed-Forward Network<br/>Think about information"]
    LN2["Layer Normalization<br/>Keep numbers stable"]

    Output["Result: Smarter 'cat'"]

    Input --> Attention
    Attention --> LN1
    LN1 --> FFN
    FFN --> LN2
    LN2 --> Output

    style Input fill:#3b82f6,color:#fff
    style LN1 fill:#f59e0b,color:#fff
    style LN2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## Summary

> **Layer Normalization** = Standardizing values to prevent instability during training

**Key Points:**
1. Prevents values from becoming too large or too small
2. Calculates mean and standard deviation
3. Normalizes values to have mean=0 and std=1
4. Applied after each major operation (attention, feed-forward)
5. Makes training stable and faster

**Result:** The model learns more efficiently and reliably.

## Connection to Previous Topics

| Topic | What It Does |
|-------|-------------|
| **Self-Attention** (Lesson 4) | Words look at each other |
| **Multi-Head Attention** (Lesson 5) | 8 different ways of looking |
| **Feed-Forward Network** (Lesson 6) | Each word thinks individually |
| **Layer Normalization** (This lesson) | Keep all numbers stable |

All these parts work together to make the Transformer work!

## What's Next?

We learned how to keep numbers stable. But what if we want to keep some original information?

Next: **Residual Connections** - A smart way to remember the original input!
`,
};
