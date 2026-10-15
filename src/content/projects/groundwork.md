---
title: Groundwork
tagline: An AI agent that answers questions from documentation and checks its own citations
summary: A retrieval-augmented (RAG) agent built with LangGraph and Claude. It searches the docs, judges whether what it found is good enough, searches again if not, and checks every claim in its answer against the source before replying.
year: 2026
status: Source only
order: 5
featured: false
demo:
  kind: agent-graph
accent: '#4338ca'
repo: https://github.com/kdgbduyu28/groundwork
role: Agent design, retrieval, evaluation and UI
stack: [Python, LangGraph, Claude API, FastAPI, PostgreSQL, pgvector, Next.js, Tailwind, pytest, GitHub Actions]
skills: [AI agents & LLMs, Search & retrieval, Python data pipelines, Supabase & PostgreSQL, TypeScript, Testing, CI/CD & automation]
highlights:
  - Retries when the search results don't answer the question, instead of guessing
  - Checks each claim against the passage it cites, and labels an answer "unverified" when it can't
  - Hybrid search (meaning plus exact keywords), merged and re-ranked
  - Embeddings and re-ranking run locally, so search itself costs nothing
  - A chat UI that draws the agent's steps live as it works
  - A golden set of 50 test questions to measure whether each part actually helps
stats:
  - { value: '50', label: 'golden test questions' }
  - { value: '~190', label: 'doc pages indexed' }
  - { value: '2', label: 'self-correction loops' }
---

## The problem

Most "chat with your docs" demos search once and answer with whatever comes back. They look good in a demo and fall apart on real questions: they cite the wrong page, or confidently answer from something that doesn't actually say that.

The question Groundwork is built to answer is the one interviewers ask: **how do you know your search is any good?**

## What I built

An agent that answers questions about the LangGraph documentation, so anyone can check its answers against the real source. It is built as a graph with two loops:

- **Search again when needed.** A grader reads what was found. If it doesn't answer the question, the agent writes new searches aimed at what is missing and tries again, up to a limit.
- **Check before answering.** After drafting, a fact-checker compares every claim with the passage it cites. Unsupported claims send the draft back to be rewritten. If it still fails, the answer is clearly marked as unverified.

## How it works

- **Search:** two kinds of search run side by side. One matches meaning (embeddings in pgvector); the other matches exact words like class names (Postgres full-text). The results are merged and re-ranked by a cross-encoder.
- **Agent:** LangGraph, with Claude handling triage, query rewriting, grading, writing and fact-checking.
- **API and UI:** FastAPI streams every step to a Next.js chat UI, which lights up each step of the graph as it runs and links each citation to the exact section of the docs.
- **Evaluation:** a golden set of labelled questions, plus an ablation script that turns each part on one at a time to measure what it adds.

## Try it

The source, with a one-command local setup, is on [GitHub](https://github.com/kdgbduyu28/groundwork).
