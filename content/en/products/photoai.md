+++
title = "PhotoAI"
type = "products"
index = 4
status = "unreleased"
status_label = "Launch paused"
subtitle = "An AI portrait service for time-sensitive job applications"
description = "A service that turns one front-facing photo and a few options into an interview-ready portrait. The full product was built, but launch was paused when its core quality threshold could not be met consistently."
visual_image = "/images/products/photoai/hero.png"
stack = ["Next.js", "React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker"]

[[facts]]
label = "Status"
value = "Launch paused"

[[facts]]
label = "Role"
value = "Planning · UI/UX · Frontend · Backend"

[[facts]]
label = "Audience"
value = "Job seekers who urgently need a portrait"
+++

## Problem hypothesis

People sometimes need a new application photo just before a deadline or interview, when a studio may be too expensive, distant, or slow. PhotoAI began with a simple question: **could one front-facing photo reduce that time and cost?**

The intended result was not a novelty AI image, but a polished and recognizably personal portrait suitable for a job application.

## User context

- Job seekers facing an application or interview deadline
- People constrained by the time or distance required for a studio visit
- People who prefer a one-time purchase over a subscription

The product therefore prioritized a short path from upload to style selection and result, rather than a large feature set.

## Product decisions

The central promise was to **keep the person recognizable while refining only the setting needed for an interview portrait**.

- A KRW 3,900 one-time purchase with up to two generations
- Two distinct outputs: a natural interview portrait and a formal Korean application portrait
- Only options that directly affect the result, including background, outfit, and expression
- A three-step journey from upload to generation
- Clear positioning as an application portrait rather than an official ID photo

## Interface design

The opening message—“Interview photos, without the studio”—states the situation and value immediately. The landing page then moves through style comparison, pricing, process, and production principles so users can understand both the output and the service before paying.

The workspace separates upload and generation options into steps, keeping the current state and next action clear without presenting every choice at once.

{{< product-record image="/images/products/photoai/full-page.png" alt="Full PhotoAI landing page" caption="The complete landing journey from the problem and styles to pricing, process, and production principles" >}}

## Implementation scope

The project went beyond a concept prototype: frontend and backend flows were implemented for authentication and email verification, products, orders and payment, photo upload, asynchronous AI generation and polling, result downloads, and administration.

Uploaded portraits were treated as sensitive data, with a seven-day retention period and automated cleanup. Payment reconciliation and generation work were processed separately to handle duplicate requests and delays.

## Why it did not launch

The software worked, but it could not consistently keep the product's central promise: **preserving the same person's identity**. The generation model repeatedly produced variations that changed East Asian facial characteristics, and that gap could not be resolved to a product-ready standard.

Taking payment while showing only selected successful samples would have shifted quality risk onto users during an important application process. The launch was therefore paused despite the implementation being complete.

## What remained

The project clarified the difference between functioning software and a trustworthy product. For an AI product, defining the critical quality threshold and acceptable failure range before launch matters as much as completing the interface and engineering. Choosing not to launch became a product decision in service of the user and the promise itself.
