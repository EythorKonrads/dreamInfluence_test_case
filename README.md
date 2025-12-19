# DreamInfluence — Solution Overview

This repository contains my implementation of the DreamInfluence campaign slider experience. The goal was to match the provided Figma design, deliver a smooth horizontal carousel that works with buttons and drag on desktop and mobile.

## Live Preview

[dreaminfluence.ekonrads.com](https://dreaminfluence.ekonrads.com/)

## What I Built

- A responsive, draggable horizontal carousel for campaigns with next/previous buttons that enable/disable based on scroll position.
- Mobile-aware sizing so each card fits the space to the right of the sidebar while peeking the next card.
- Sidebar that collapses on narrower viewports to preserve content space.

## Tech Stack

- Nuxt.js (Vue 2)
- SCSS modules per component

## Running Locally

```bash
npm install
npm run dev   # hot reload at http://localhost:3000

# production
npm run start
```

Node 22 recommended.

## Data Source

Campaigns are fetched from a simple REST endpoint: https://technical-case.dreaminfluencers.com/

## Design Reference

Original Figma: https://www.figma.com/file/AaLshtmpoOV9ynUwXNUVsn/Code-Task-(Swimlane)?node-id=1%3A3058
