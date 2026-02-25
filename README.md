# BotVault

BotVault hosts RiveScript-based rule-driven chatbots with zero hallucinations, full auditability, and predictable responses every single time. The explicit anti-ChatGPT for regulated industries.

## Features

- **Zero Hallucinations**: Rule-based responses eliminate AI hallucination risks
- **Full Auditability**: Complete rule trace for every response
- **Compliance-Ready**: Built for regulated industries (healthcare, legal, banking)
- **Predictable Responses**: Identical responses every single time
- **Cost Predictability**: Fixed pricing vs token-based LLM costs
- **Easy Setup**: Low complexity compared to LLM implementations

## How It Works

1. **Upload Your Rules**: Upload RiveScript .rs rule files defining exact bot behaviors
2. **Get API Endpoint**: Instantly receive a secure REST API endpoint with conversation logging
3. **Embed Widget**: Add our embeddable chat widget to your site—no coding required

## Comparison: Rule Bots vs LLM Bots

| Feature | BotVault (RiveScript) | LLM Chatbot |
|---------|----------------------|-------------|
| Response consistency | Always identical | Varies every time |
| Auditability | Full rule trace | Black box |
| Hallucination risk | Zero | Always present |
| Compliance-ready | Yes | Requires extensive guardrails |
| Setup complexity | Low | High |
| Cost predictability | Fixed | Token-based, variable |

## Use Cases

### Legal FAQ Bot
- Exact policy responses, zero interpretation of contract terms
- Perfect for law firms and legal departments

### Medical Triage Bot
- Symptom → "consult your doctor", nothing more
- HIPAA-ready with secure data handling

### Bank FAQ Bot
- Regulatory-approved answers only
- Complete audit trail included

### HR Policy Bot
- Consistent responses to employee policy questions
- No surprises, guaranteed compliance

## What is RiveScript?

RiveScript is a simple scripting language designed for chatbots. If you can write `if/then` statements, you can write RiveScript. Thousands of existing rule files are available, and we provide templates for common use cases.

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Components**: Radix UI / shadcn/ui
- **Icons**: Lucide React
- **Chat Engine**: RiveScript
- **Deployment**: Vercel (migrating to AWS)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## FAQ

- **Do I need to know how to code?** No. RiveScript is rule-based, not programming
- **Is this HIPAA compliant?** BotVault is architected to support HIPAA compliance
- **Where is conversation data stored?** All data stored securely on AWS with encryption
- **Can I migrate an existing chatbot?** Yes, we help convert from other rule engines or reimplement LLM bots

## Contact

- **LinkedIn**: [Abhishek Sinha](https://www.linkedin.com/in/abhisheksinha1506/)
- **Email**: abhisheksinha1594@gmail.com

---

Currently in early access · Hosted on Vercel · Migrating to AWS for full launch
