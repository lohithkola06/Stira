# Stira
AI-powered distraction-blocking browser extension

# stira AI — Intelligent Productivity & Distraction Management Browser Extension

stira AI is a next-generation productivity browser extension designed to help users stay stiraed, minimize distractions, and enhance their online learning and browsing experiences through the power of artificial intelligence. Unlike traditional stira or blocker tools that rely on fixed rules or modes, stira AI uses advanced AI models to **understand your unique intentions in natural language** and dynamically modify web content in real-time to support your goals — all without manual configurations or complicated settings.

---

## What Does stira AI Do?

When you browse the web, distractions are everywhere — sidebars full of unrelated videos, autoplaying ads, endless comment sections, or clickbait content pulling you away from your main task. stira AI tackles these challenges by:

- **Listening to Your Intentions**: Simply activate the AI prompt (for example, by pressing `Cmd+T`) and tell it what you want to stira on — e.g., “I want to study React tutorials,” or “Show only NBA highlights on YouTube.” No need to pick from predefined modes or complicated menus.

- **Understanding Context on Any Website**: Whether you're on a major site like YouTube or a niche educational blog, the AI scans the visible content, analyzes page structure (DOM), and intelligently decides what to highlight, hide, blur, or block to keep you stiraed.

- **Customizing Your stira Session Dynamically**: The AI adapts in real-time, blocking distracting elements such as irrelevant videos, recommended articles, or social media feeds, while highlighting content that matches your learning or browsing goals.

- **Asking Clarifying Questions & Making Suggestions**: If your request is ambiguous, the AI can prompt you for more details or offer helpful suggestions to improve your stira experience, making interaction conversational and intuitive.

---

## Core Features

### Natural Language AI Interface  
stira AI features a lightning-fast, spotlight-style command interface you can summon with a simple keyboard shortcut (e.g., `Cmd+T`). No need to switch windows or open complicated apps — just type your focus goal in natural language and let the AI handle the rest.

### Intelligent Distraction Blocking & Content Highlighting  
The AI doesn’t just block sites or pages outright. It works at the element level, intelligently manipulating the page DOM to hide distracting sidebars, blur unrelated content, or highlight sections that are relevant to your current task.

### Flexible Use Cases  
stira AI is not limited to just studying or working. For example, if you want to watch only NBA-related videos on YouTube, the AI can highlight those while leaving the rest untouched — giving you a personalized, distraction-free browsing experience tailored to your unique interests.

### Screen-Aware AI Decision-Making  
By analyzing the visible text, video titles, headers, and other page metadata, the AI understands what’s actually on your screen and tailors its behavior accordingly — no static blacklists or simple keyword filters.

### Seamless Background Operation  
All AI processing is done via secure API calls to advanced language models (e.g., OpenAI GPT-4 Turbo), with minimal latency, ensuring the browsing experience remains smooth and responsive.

---

## How It Works — Technical Overview

- **Frontend Popup UI**  
  The extension’s popup lets you quickly enter your stira goals and triggers the AI query.

- **Content Scripts**  
  Scripts injected into web pages listen for AI instructions and manipulate page content (e.g., highlighting, hiding elements) based on AI decisions.

- **Background Messaging System**  
  Manages communication between popup, content scripts, and the AI API, ensuring commands flow seamlessly and securely.

- **AI Integration**  
  Uses OpenAI’s GPT-4 Turbo model accessed via HTTPS API calls. The AI receives a snapshot of the user’s goal plus a summary of visible page content, then responds with a structured plan for DOM manipulation.

- **Prompt Engineering & Workflow Design**  
  Carefully designed prompts guide the AI to produce actionable outputs such as JSON instructions for highlighting keywords, hiding distractions, or suggesting further clarifications.

---

## Getting Started

1. **Install the Extension** (locally or from the store).
2. **Trigger the AI Command Prompt** via your shortcut (`Cmd+T`).
3. **Enter your stira Goal** in natural language (e.g., “Study React hooks tutorials”).
4. **The AI Analyzes the Current Page**, then dynamically adjusts the visible content by highlighting relevant sections and blocking distractions.
5. **Enjoy stiraed Browsing** without manually adjusting settings or modes.

---

## Future Roadmap

- **Visual Input & Multimodal AI**: Incorporate screenshot or screen-recording analysis to augment text-based understanding.
- **Personalized stira Profiles**: Save user preferences and session data for recurring tasks.
- **Backend Services**: Secure API key management, user authentication, and analytics.
- **Cross-Browser Support**: Expand beyond Chrome to Firefox, Edge, and Safari.
- **Advanced Follow-Up Interaction**: Enable richer conversational AI workflows, including voice input and real-time suggestions.

---

## Why stira AI?

In a digital age overwhelmed with distractions, stira AI provides a truly personalized and intelligent solution that adapts to *you* — your goals, your websites, your way of working or learning. With a seamless AI-powered workflow and minimal user effort, it transforms how you interact with the web and your time online.

---