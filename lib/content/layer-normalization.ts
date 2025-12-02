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

## For Full-Stack Developers

If you're a full-stack developer wanting to add AI to your web apps, understanding Layer Normalization helps you:

**In Web Development:**
- Integrate AI models into your backend (Node.js, Python)
- Use AI APIs (OpenAI, Hugging Face) more effectively
- Build features like chatbots, text generation, content moderation
- Understand why AI responses might be unstable (normalization issues!)

**Real-World Example:**
When you call an AI API in your Express/FastAPI server, Layer Normalization is running inside the model to keep predictions stable.

## What is Layer Normalization?

**Layer Normalization** = Keeping numbers balanced so everything works smoothly

Think of it like input validation in your backend - you normalize user input to prevent errors. Layer Normalization does the same for AI model values.

## The Problem

Numbers can get out of control:

**Without Layer Normalization:**
\`\`\`plaintext
Layer 1: 5, 10, 15
Layer 2: 50, 100, 150 (getting bigger!)
Layer 3: 500, 1000, 1500 (too big!)
→ System breaks!
\`\`\`

**With Layer Normalization:**
\`\`\`plaintext
Layer 1: 5, 10, 15 → Balanced to -1, 0, 1
Layer 2: 50, 100, 150 → Balanced to -1, 0, 1
Layer 3: 500, 1000, 1500 → Balanced to -1, 0, 1
→ Always stable!
\`\`\`

## Why Is This Important?

After each step in the Transformer, numbers can become very different:

\`\`\`plaintext
Word "the" → numbers: 2, 5, 8
Word "cat" → numbers: 1000, 2500, 4000 (way too big!)
Word "sat" → numbers: 0.1, 0.2, 0.3 (too small!)
\`\`\`

This is a problem! Layer Normalization makes them all similar.

## How Does It Work?

Two simple steps:

### Step 1: Find the Average

\`\`\`plaintext
Numbers: 10, 20, 30, 40
Average = 25
\`\`\`

### Step 2: Adjust Based on Average

Make all numbers closer to the average:

\`\`\`plaintext
Original: 10, 20, 30, 40
After:    -1,  0,  1,  2
\`\`\`

All numbers are now in a similar range!

## Visual Diagram

\`\`\`mermaid
flowchart LR
    Input["Numbers<br/>10, 20, 30, 40"]
    Step1["Find Average<br/>25"]
    Step2["Balance Numbers"]
    Output["Result<br/>-1, 0, 1, 2"]

    Input --> Step1
    Step1 --> Step2
    Step2 --> Output

    style Input fill:#3b82f6,color:#fff
    style Step2 fill:#f59e0b,color:#fff
    style Output fill:#22c55e,color:#fff
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

## Simple Code

\`\`\`python|javascript
# Layer Normalization
def layer_norm(numbers):
    # Find average
    avg = sum(numbers) / len(numbers)

    # Balance the numbers
    balanced = [num - avg for num in numbers]

    return balanced

# Example
numbers = [10, 20, 30, 40]
result = layer_norm(numbers)
# Result: [-15, -5, 5, 15] (balanced!)
|||
// Layer Normalization
function layerNorm(numbers) {
    // Find average
    const avg = numbers.reduce((a, b) => a + b) / numbers.length;

    // Balance the numbers
    const balanced = numbers.map(num => num - avg);

    return balanced;
}

// Example
const numbers = [10, 20, 30, 40];
const result = layerNorm(numbers);
// Result: [-15, -5, 5, 15] (balanced!)
\`\`\`

## Each Word Gets Balanced

Every word in the sentence is balanced separately:

\`\`\`plaintext
Sentence: "The cat sat"

"The" → has 512 numbers → Balance them
"cat" → has 512 numbers → Balance them
"sat" → has 512 numbers → Balance them
\`\`\`

**Note:** Each word is represented by 512 numbers (a vector). Layer Normalization balances all 512 numbers for each word.

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

> **Layer Normalization** = Balancing numbers so they stay in a similar range

**Remember:**
1. Numbers can get too big or too small
2. Layer Normalization keeps them balanced
3. Applied after attention and feed-forward
4. Makes the Transformer stable

**Simple idea:** Keep all numbers similar so nothing breaks!

## How This Relates to Web Development

**Backend API Integration:**
\`\`\`javascript
// When you call an AI API from your Express server
app.post('/api/chat', async (req, res) => {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: req.body.messages
    });

    // Layer Normalization is running inside GPT model
    // to keep responses stable and consistent
    res.json(response);
});
\`\`\`

**Why This Matters for Full-Stack Devs:**
- You're using models that rely on Layer Normalization
- Understanding this helps debug AI integration issues
- Makes you better at choosing and using AI APIs
- Helps when fine-tuning models for your specific use case

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
