// User agents of the crawlers that feed AI answer engines. Shared between
// robots.ts, which grants them access, and next.config.ts, which makes sure
// they receive metadata in the initial HTML: none of them run JavaScript.

/**
 * Fetch pages to cite them in live answers (ChatGPT search, Claude, Perplexity
 * and friends). Blocking these removes the site from AI answers, so they are
 * always allowed.
 */
export const AI_SEARCH_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
];

/**
 * Collect content to train models. Allowed or refused as a group through
 * siteConfig.allowAiTraining. Google-Extended and Applebot-Extended are
 * robots.txt tokens only: refusing them does not affect Google Search or
 * Apple search results.
 */
export const AI_TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
];
