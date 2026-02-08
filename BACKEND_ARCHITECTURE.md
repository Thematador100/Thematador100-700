# Backend Architecture & Advanced Use Cases

This application currently runs as a "Thick Client" (Single Page Application), meaning all AI logic and prompts (`geminiService.ts`) are executed directly in the user's browser.

To unlock "God Mode" capabilities, you must deploy the provided `api/gemini.ts` to a secure backend environment (e.g., Vercel Serverless Functions, AWS Lambda, or a Node.js Express server).

## Why Deploy a Backend? (The Advanced Use Cases)

Moving the formulas to a server unlocks five critical capabilities that are impossible in a browser-only environment.

### 1. The "Sleep-Working" Workforce (True Autonomy)
*   **Current State:** AI Agents in the Command Center only "live" while your browser tab is open. If you close the window, they die.
*   **Advanced State:** With a backend, you can run **Cron Jobs** (scheduled tasks).
    *   *Example:* "Check SEC EDGAR filings for TSLA every morning at 6:00 AM. If a new 8-K is filed, analyze it using the `edgarAnomaly` protocol and email me the Red Flags Report."
    *   *Example:* "Monitor this Reddit thread every hour. If sentiment shifts to negative, alert me via SMS."

### 2. Massive Data Processing & Storage
*   **Current State:** You are limited by the browser's memory. Uploading a 50MB CSV file might crash the tab. Data is lost if you clear your cache.
*   **Advanced State:**
    *   **Database:** Connect a PostgreSQL or Firebase database to save every generated report, creating a searchable "Intelligence Archive" that grows over time.
    *   **Queues:** Upload a list of 10,000 prospects. The backend splits this into 10,000 jobs, puts them in a queue (Redis/Bull), and processes them in parallel using 50 concurrent AI workers.

### 3. "God Mode" Scraping (Bypassing CORS)
*   **Current State:** Browsers enforce CORS (Cross-Origin Resource Sharing), preventing the app from directly fetching data from most websites (e.g., you can't fetch `google.com` from `your-app.com`).
*   **Advanced State:** Servers do not have CORS limits. Your backend can:
    *   Spin up a "Headless Browser" (Puppeteer/Playwright).
    *   Visit *any* website, log in, click buttons, and scrape dynamic data.
    *   Feed that raw HTML directly into the Gemini 1.5 Pro model (which has a 2M token context window) to "read" entire websites in seconds.

### 4. SaaS Monetization
*   **Current State:** Users must bring their own API Key. You cannot charge them for the service because you cannot hide your own key.
*   **Advanced State:**
    *   Your `API_KEY` is stored securely on the server (`process.env.API_KEY`).
    *   Users log in (Auth0/Clerk/Firebase Auth).
    *   You integrate Stripe to charge a monthly subscription ($97-$497/mo).
    *   The backend verifies the subscription before processing the AI request.

### 5. Third-Party Webhooks (Inbound Intelligence)
*   **Current State:** The app only reacts when you click a button.
*   **Advanced State:** The app can react to the *world*.
    *   **Typeform Webhook:** When a prospect fills out a survey, your backend instantly receives the data, runs the `analyzeProspects` protocol, and emails you a dossier before you even see the notification.
    *   **CRM Webhook:** When a deal stage changes in HubSpot, the AI automatically generates a `salesCopilot` objection-handling script and pushes it to the sales rep's Slack.

## Migration Guide

The file `api/gemini.ts` has been updated to be a **"Golden Copy"** of the frontend logic. It contains the exact prompts, schemas, and logic used in the client, but structured for a serverless request/response cycle.

**To Deploy on Vercel:**

1.  Move `api/gemini.ts` to a folder named `api` in your project root (if not already there).
2.  Ensure your `vercel.json` or project settings configure this file as a Serverless Function.
3.  Set your `API_KEY` in the Vercel Project Settings (Environment Variables).
4.  Update the frontend `geminiService.ts` to fetch from `/api/gemini` instead of calling `GoogleGenAI` directly.

```typescript
// Frontend Update Example (in geminiService.ts)
async function callGeminiBackend(action: string, payload: any) {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  });
  return await response.json();
}
```
