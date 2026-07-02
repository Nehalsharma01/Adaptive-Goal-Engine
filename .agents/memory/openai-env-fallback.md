---
name: OpenAI client env var fallback
description: The integrations-openai-ai-server lib checks for AI_INTEGRATIONS_OPENAI_API_KEY but this project uses OPENAI_API_KEY — patch the client to fall back.
---

The rule: `lib/integrations-openai-ai-server/src/client.ts` and `image/client.ts` must read:
```ts
const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
```

**Why:** The Replit OpenAI integration template hardcodes `AI_INTEGRATIONS_OPENAI_API_KEY` as the env var name, but this project uses the user's own `OPENAI_API_KEY` secret directly (set via Replit secrets). Without the fallback the server crashes on startup.

**How to apply:** Whenever the integrations-openai-ai-server lib is used without the Replit AI Integration provisioned, patch both `client.ts` and `image/client.ts` to use the OR pattern above.
