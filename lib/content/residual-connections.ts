import { Article } from './types';

export const residualConnections: Article = {
  module: 2,
  slug: 'residual-connections',
  title: 'Residual Connections',
  description: 'How skip connections enable training of very deep neural networks',
  readTime: 5,
  previousTopic: { module: 2, slug: 'layer-normalization', title: '7. Layer Normalization' },
  nextTopic: { module: 2, slug: 'attention-complexity', title: '9. Attention Mechanics & Complexity' },
  content: `# Residual Connections

## Part of Transformer Architecture

We're continuing to build the Transformer:

**Lesson 4:** Self-Attention (Done!)
**Lesson 5:** Multi-Head Attention (Done!)
**Lesson 6:** Feed-Forward Networks (Done!)
**Lesson 7:** Layer Normalization (Done!)
**Lesson 8:** Residual Connections (This lesson)

## For Full-Stack Developers

If you're coming from web development, think of Residual Connections like:

**Middleware in Express.js:**
\`\`\`javascript
// Without residual: data gets transformed
app.use((req, res, next) => {
    req.data = transform(req.data); // Original lost!
    next();
});

// With residual: keep original + add changes
app.use((req, res, next) => {
    req.data = req.data + transform(req.data); // Original preserved!
    next();
});
\`\`\`

**Why this matters for AI in web apps:**
- Deep models (like GPT) use residual connections
- Understanding this helps you debug model behavior
- Important when fine-tuning models for your app

## What are Residual Connections?

**Residual Connections** = A shortcut that adds the original input back to the output

**Simple Idea:**
\`\`\`plaintext
Normal:    Input → Layer → Output
Residual:  Input → Layer → Output + Input
                            ↑       ↑
                         new stuff + original
\`\`\`

**The Formula:**
\`\`\`plaintext
Output = Layer(Input) + Input
\`\`\`

That's it! Just addition.

## Real-World Example

Think of editing a document:

**Without Residual:**
\`\`\`plaintext
Original text → Edit → Edited version
(original is gone!)
\`\`\`

**With Residual:**
\`\`\`plaintext
Original text → Edit → Original + Edits
(you keep both!)
\`\`\`

Like Git - you keep the original and add changes on top!

## Why Do We Need This?

**The Problem:** Information gets lost in deep networks

**Without Residual Connections:**
\`\`\`plaintext
Layer 1:  Data = 100%
Layer 10: Data = 50% (getting weaker)
Layer 50: Data = 5% (almost gone)
Layer 100: Data = 0.1% (lost!)
\`\`\`

**With Residual Connections:**
\`\`\`plaintext
Layer 1:  Data = 100% (shortcut keeps it!)
Layer 10: Data = 100% (still strong!)
Layer 50: Data = 100% (still here!)
Layer 100: Data = 100% (preserved!)
\`\`\`

The shortcut ensures the original information never gets lost!

## Visual Diagram

\`\`\`mermaid
flowchart LR
    Input["Input"]
    Layer["Process Layer"]
    Add["Add Together"]
    Output["Output"]

    Input --> Layer
    Layer --> Add
    Input -.Shortcut.-> Add
    Add --> Output

    style Input fill:#3b82f6,color:#fff
    style Add fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

The dotted line is the **shortcut** that preserves the original!

## Used Twice in Transformers

Each Transformer block uses residual connections **two times**:

\`\`\`mermaid
flowchart TD
    Input["Word: 'cat'"]

    Attention["Multi-Head Attention"]
    Add1["Add Original<br/>(Shortcut 1)"]

    FFN["Feed-Forward Network"]
    Add2["Add Original<br/>(Shortcut 2)"]

    Output["Smarter 'cat'"]

    Input --> Attention
    Attention --> Add1
    Input -.Shortcut 1.-> Add1

    Add1 --> FFN
    FFN --> Add2
    Add1 -.Shortcut 2.-> Add2

    Add2 --> Output

    style Input fill:#3b82f6,color:#fff
    style Add1 fill:#f59e0b,color:#fff
    style Add2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

After attention → Add original back
After feed-forward → Add original back again

## Simple Code Example

\`\`\`python|javascript
# Residual Connection
def residual_connection(input_data, layer):
    # Process through layer
    output = layer(input_data)

    # Add original back (the shortcut!)
    result = output + input_data

    return result

# Example
input_data = [1, 2, 3, 4]
output = [0.5, 0.5, 0.5, 0.5]

result = output + input_data
# Result: [1.5, 2.5, 3.5, 4.5]
# Original [1,2,3,4] is preserved!
|||
// Residual Connection
function residualConnection(inputData, layer) {
    // Process through layer
    const output = layer(inputData);

    // Add original back (the shortcut!)
    const result = output.map((val, i) => val + inputData[i]);

    return result;
}

// Example
const inputData = [1, 2, 3, 4];
const output = [0.5, 0.5, 0.5, 0.5];

const result = output.map((val, i) => val + inputData[i]);
// Result: [1.5, 2.5, 3.5, 4.5]
// Original [1,2,3,4] is preserved!
\`\`\`

## Step-by-Step Example

Let's see how it works with actual numbers:

\`\`\`plaintext
Input: [2, 4, 6, 8]

Step 1: Process through Attention
Output from attention: [1, 1, 1, 1]

Step 2: Add Residual (Add original back!)
Result = [1, 1, 1, 1] + [2, 4, 6, 8]
       = [3, 5, 7, 9]

Original [2, 4, 6, 8] is preserved in the result!
\`\`\`

## Why This is Powerful

**Enables Deep Networks:**
- Without residuals: Can only build ~10 layers
- With residuals: Can build 100+ layers!

**Example:**
- GPT-2: 48 layers
- GPT-3: 96 layers
- All possible because of residual connections!

**For web developers:** This is why modern AI models can be so powerful - they stack many layers using residual connections.

## Putting It All Together

Here's the complete Transformer block with everything we've learned:

\`\`\`mermaid
flowchart TD
    Input["Word: 'cat'"]

    Attention["Multi-Head Attention"]
    Norm1["Layer Normalization"]
    Add1["Add Original (Residual 1)"]

    FFN["Feed-Forward Network"]
    Norm2["Layer Normalization"]
    Add2["Add Original (Residual 2)"]

    Output["Smarter 'cat'"]

    Input --> Attention
    Attention --> Norm1
    Norm1 --> Add1
    Input -.Shortcut 1.-> Add1

    Add1 --> FFN
    FFN --> Norm2
    Norm2 --> Add2
    Add1 -.Shortcut 2.-> Add2

    Add2 --> Output

    style Input fill:#3b82f6,color:#fff
    style Add1 fill:#f59e0b,color:#fff
    style Add2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
\`\`\`

## How This Relates to Web Development

**Backend Processing Analogy:**
\`\`\`javascript
// Processing user data through multiple steps
async function processUserData(userData) {
    let result = userData; // Start with original

    // Step 1: Process with validation
    const validated = await validate(result);
    result = result + validated; // Add back original (residual!)

    // Step 2: Process with enrichment
    const enriched = await enrich(result);
    result = result + enriched; // Add back previous (residual!)

    return result; // Contains original + all improvements
}
\`\`\`

This is similar to how residual connections work in Transformers!

## Summary

> **Residual Connections** = Adding the original input back to preserve information

**Remember:**
1. Simple addition: Output = Input + Layer(Input)
2. Preserves original information
3. Enables building deep networks (100+ layers)
4. Used twice in each Transformer block

**Think of it as:** Keeping the original while adding improvements on top!

## Connection to Previous Topics

| Topic | What It Does |
|-------|-------------|
| **Self-Attention** (Lesson 4) | Words look at each other |
| **Multi-Head Attention** (Lesson 5) | 8 different ways of looking |
| **Feed-Forward Network** (Lesson 6) | Each word thinks individually |
| **Layer Normalization** (Lesson 7) | Keep all numbers balanced |
| **Residual Connections** (This lesson) | Preserve original information |

All these parts work together to make the Transformer work!

## What's Next?

Now that we understand the core transformer architecture components, let's dive deeper into attention mechanics.

Next: **Attention Mechanics & Complexity** - Understanding the computational cost of attention!
`,
};
