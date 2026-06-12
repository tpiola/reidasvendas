# Claude Mega-Prompt Template

Source: Notion — Claude Mega-Prompt Template
Page ID: 7128a253-0044-82a8-9116-01b005253002
URL: https://app.notion.com/p/Claude-Mega-Prompt-Template-7128a253004482a8911601b005253002

> Most people prompt Claude like they're texting a friend. That works for quick questions. But when you need Claude to perform like a specialist, you need to talk to it like a system. XML tags are how you do that. This template shows you the structure, the logic behind each tag, and gives you a ready-to-use framework.

## Why XML Tags Change Everything

Claude was trained to recognize XML tags as structural boundaries. When you wrap your instructions in tags like <role> or <task>, Claude doesn't just read your words. It parses them. It knows where your role definition ends and your task begins. It knows which part is context and which part is the actual instruction.

The difference is real. A plain-text prompt dumps everything into one stream and hopes Claude figures out what matters. An XML-structured prompt tells Claude exactly what each piece of information is and how to use it.

Plain text prompt:

```javascript
You are a business strategist. I want you to analyze my startup idea.
My idea is a mobile app for dog walkers. Give me market risks,
personas, and a recommendation. Be detailed and direct.
```

Same prompt, XML-structured:

```xml
<role>
You are a pragmatic business strategist with expertise in
dissecting business ideas for real-world applicability.
</role>

<task>
Analyze the given business idea objectively. Consider genuine
merits and potential pitfalls. Provide a blunt, balanced
validation and recommendation.
</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
featuring real-time GPS tracking and automated scheduling.
</business_idea>

<response_format>
Business overview, 3 target personas with pain points, market
risks, alternative models, and a final recommendation.
</response_format>
```

The XML version gives Claude clear compartments. It knows the role is separate from the task, the business idea is the input data, and the response format is the output spec. That separation is what produces sharper, more structured responses.

## The 8 Tags That Make a Mega-Prompt

You don't need all of these every time. Pick the ones your task actually requires. Think of this as a menu, not a checklist.

### <role> — Who Claude Becomes

Tell Claude what expert hat to wear. The more specific the role, the more specialized the output.

Weak: You are a marketing expert.

Strong: You are a conversion-focused email copywriter who specializes in SaaS onboarding sequences for B2B products.

Three things to include: the expertise, the specialization, and the context (industry, audience, or application).

```xml
<role>
You are a conversion-focused email copywriter specializing in
SaaS onboarding sequences for B2B products. You prioritize
clarity over cleverness and always tie copy back to user pain points.
</role>
```

### <goal> — What Success Looks Like

This is the big-picture outcome. Not the steps, not the format. Just the destination.

Keep it to 1-2 sentences. If you need more, your goal is probably multiple goals, and you should split them into separate prompts.

```xml
<goal>
Create a 5-email onboarding sequence that reduces churn during the
first 14 days by addressing the top 3 reasons users abandon the product.
</goal>
```

### <key_tasks> — The Step-by-Step Playbook

Break the work into numbered steps. This prevents Claude from skipping parts or reordering your logic. Each step should be one clear action.

```xml
<key_tasks>
Step 1: Identify the top 3 churn reasons from the provided user feedback.
Step 2: Map each churn reason to a specific email in the sequence.
Step 3: Write subject lines and body copy for all 5 emails.
Step 4: Add a suggested send schedule with timing rationale.
</key_tasks>
```

> When to skip this tag: If your task is simple enough to describe in a single sentence, you don't need <key_tasks>. The <goal> tag handles it.

### <response_structure> — How Claude Should Think

This controls tone, depth, and persona style. It's about the character of the response, not the format (that's <response_format> below).

```xml
<response_structure>
- Provide detailed, actionable guidance (not surface-level tips).
- Use a direct, conversational tone. No corporate speak.
- Adopt the perspective of a senior copywriter reviewing a junior's draft.
- Reference real-world SaaS examples where relevant.
</response_structure>
```

### <session_structure> — How the Conversation Should Flow

Use this when you want Claude to guide a multi-turn conversation rather than dump everything in one response. It sets the interaction pattern.

```xml
<session_structure>
- Approach: Guided problem-solving.
- Start by asking 3 clarifying questions about my product and audience.
- After I answer, present a draft sequence outline for approval.
- Only write the full emails after I approve the outline.
</session_structure>
```

> When to skip this tag: If you want everything in a single response, drop this tag entirely.

### <examples> — Show Claude What Good Looks Like

Few-shot examples are the most powerful steering tool you have. One strong example beats a paragraph of instructions.

Give Claude the input AND the output you want. Label them clearly.

```xml
<examples>
Example 1:
Input: "Users say the dashboard is confusing."
Output:
  Subject: Your dashboard, simplified
  Body: Hey [Name], we heard you. The dashboard can feel like a lot
  on day one. Here's a 2-minute video walkthrough that covers the
  3 panels you'll actually use daily...

Example 2:
Input: "Users forget to complete setup."
Output:
  Subject: You're 80% there (one step left)
  Body: Hey [Name], you started something good. Your account is set up,
  your team is invited, but there's one setting that unlocks [key feature]...
</examples>
```

### <information_about_me> — Your Context Data

Feed Claude the specific details about your business, audience, product, or situation. This is the raw material Claude works with.

Only include variables that are relevant to your goal and tasks. Random background info just adds noise.

```xml
<information_about_me>
- Product: TaskFlow, a project management SaaS for remote teams (10-50 employees)
- Top churn reasons: 1) Dashboard overwhelm, 2) Incomplete onboarding,
  3) No integration with existing tools
- Brand voice: Friendly, direct, slightly informal. Never corporate.
- Current onboarding: Single welcome email, no follow-up sequence.
</information_about_me>
```

### <response_format> — The Output Blueprint

Tell Claude exactly what shape the final output should take. This is where you specify format, not tone.

```xml
<response_format>
For each email, provide:
1. Email number and send day (e.g., "Email 1 - Day 0")
2. Subject line
3. Body copy (150-200 words)
4. CTA button text
5. Internal note explaining the strategic purpose of this email

Deliver as a numbered sequence, not a table.
</response_format>
```

## Quick Reference — When to Use Each Tag

## The Full Template (Copy and Customize)

Grab this, fill in what you need, delete what you don't. The tag names are flexible. You can rename them to anything that makes sense for your use case (<brand_info> instead of <information_about_me>, <steps> instead of <key_tasks>, etc.). Claude reads the structure, not the exact tag name.

```xml
<role>
[What expert role should Claude adopt? Include expertise,
specialization, and industry context.]
</role>

<goal>
[What is the single outcome you want? Keep it to 1-2 sentences.]
</goal>

<key_tasks>
Step 1: [First action]
Step 2: [Second action]
Step 3: [Third action]
</key_tasks>

<response_structure>
- [Tone and depth guidance]
- [Persona or perspective to adopt]
- [Any stylistic constraints]
</response_structure>

<session_structure>
- [Interaction approach: single response vs. multi-turn]
- [Who leads: you or Claude?]
- [Any checkpoints or approvals needed]
</session_structure>

<examples>
Example 1:
Input: [Sample input]
Output: [The exact output you'd want to see]
</examples>

<information_about_me>
- [Relevant detail #1]
- [Relevant detail #2]
- [Relevant detail #3]
</information_about_me>

<response_format>
[Exact output structure: list, table, narrative, code block, etc.]
[Any length or formatting constraints]
</response_format>
```

## Full Example — Business Idea Validator

Here's a complete mega-prompt you can test right now. It combines role, task, context, and a structured response format.

```xml
<role>
You are a pragmatic business strategist with expertise in dissecting
business ideas for real-world applicability.
</role>

<task>
Analyze the given business idea objectively, considering its genuine
merits and potential pitfalls. Create 3 theoretical customer personas
and have each give realistic feedback. End with a blunt validation
and recommendation.
</task>

<business_idea>
A mobile app connecting dog owners with vetted local dog walkers,
featuring real-time GPS tracking and automated scheduling.
</business_idea>

<response_format>
Structure your response as:
1. Business idea overview (2-3 sentences)
2. Potential target markets
3. Three personas, each with: age, occupation, pain points, and their
   honest reaction to this product (written in first person)
4. Market risks
5. Alternative business models worth considering
6. Final validation and recommendation (be direct, not diplomatic)
</response_format>
```

> Notice the <response_format> tag uses a numbered list to describe the output structure, but doesn't force Claude into XML-formatted output. You're structuring your input to Claude, not demanding a rigid output format. Let Claude write naturally within the structure you define.

### Stay ahead in AI with our ultimate resource:

* <https://www.godofprompt.ai/complete-ai-bundle>
Keep learning,

🔑 God of Prompt
