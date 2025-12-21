import { Article } from './types';

export const verificationAgent: Article = {
  module: 3,
  slug: 'verification-agent',
  title: 'Verification Agent',
  description: 'Fact-checks outputs for accuracy',
  readTime: 3,
  content: `# Verification Agent

## What is it?

The Verification Agent checks if information is TRUE. It's the fact-checker.

Think of it like: A journalist verifying sources before publishing.

## Evaluation vs Verification

Evaluation: Is it good quality? (subjective)

Verification: Is it factually correct? (objective)

Example: "The code is clean" = Evaluation

Example: "Python was created in 1991" = Verification (can be checked)

## Code Example

\`\`\`python|javascript
class VerificationAgent:
    def __init__(self, llm, search_tool):
        self.llm = llm
        self.search = search_tool

    def verify(self, claim):
        # Search for evidence
        evidence = self.search(claim)

        # Check if claim is supported
        result = self.llm.generate(f"""
            Claim: {claim}
            Evidence: {evidence}

            Is this claim TRUE, FALSE, or UNCERTAIN?
            Explain why.
        """)
        return result

    def verify_all(self, text):
        # Extract claims from text
        claims = self.extract_claims(text)

        # Verify each claim
        results = []
        for claim in claims:
            results.append({
                "claim": claim,
                "verdict": self.verify(claim)
            })
        return results

# Usage
verifier = VerificationAgent(llm, search)
result = verifier.verify("React was created by Facebook in 2013")
# Returns: "TRUE - React was released by Facebook in May 2013"
|||
class VerificationAgent {
    constructor(llm, searchTool) {
        this.llm = llm;
        this.search = searchTool;
    }

    async verify(claim) {
        // Search for evidence
        const evidence = await this.search(claim);

        // Check if claim is supported
        const result = await this.llm.generate(\`
            Claim: \${claim}
            Evidence: \${evidence}

            Is this claim TRUE, FALSE, or UNCERTAIN?
            Explain why.
        \`);
        return result;
    }

    async verifyAll(text) {
        // Extract claims from text
        const claims = await this.extractClaims(text);

        // Verify each claim
        const results = [];
        for (const claim of claims) {
            results.push({
                claim: claim,
                verdict: await this.verify(claim)
            });
        }
        return results;
    }
}

// Usage
const verifier = new VerificationAgent(llm, search);
const result = await verifier.verify("React was created by Facebook in 2013");
// Returns: "TRUE - React was released by Facebook in May 2013"
\`\`\`

## Example Prompts

Extract claims to verify:
\`\`\`
Extract all factual claims from this text that can be verified:

Text: {text}

List each claim on a new line. Only include statements that are:
- Factual (not opinions)
- Verifiable (can be checked)
- Specific (has dates, numbers, names)
\`\`\`

Verify a claim:
\`\`\`
You are a Verification Agent. Your job is to fact-check claims.

Claim: {claim}
Evidence found: {search_results}

Based on the evidence, is this claim:
- TRUE: Evidence supports the claim
- FALSE: Evidence contradicts the claim
- UNCERTAIN: Not enough evidence

Format:
VERDICT: [TRUE/FALSE/UNCERTAIN]
CONFIDENCE: [HIGH/MEDIUM/LOW]
EVIDENCE: [quote the supporting/contradicting evidence]
EXPLANATION: [brief explanation]
\`\`\`

## When to Use

Medical or health information

Legal content

Financial data

News or factual articles

Any content where accuracy is critical

## Key Point

Verification Agent = Fact Checker. Don't trust, verify with evidence.
`,
  previousTopic: { module: 3, slug: 'evaluation-agent', title: 'Evaluation Agent' },
  nextTopic: { module: 3, slug: 'reflection-agent', title: 'Reflection Agent' },
};
