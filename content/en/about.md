+++
title = "About"
date = 2026-04-28T00:00:00+09:00
layout = "about"
name_line = "Sinuk Choi · Backend Engineer"
intro = [
  "Backend engineer with experience building Go APIs and Kafka-based asynchronous data-processing systems.",
  "I have designed a new backend service from the ground up and maintained existing traffic-analysis services while adding new features.",
  "I also built a shared Go module for recurring backend functions and documented its usage and releases.",
]
links = [
  { label = "Email", url = "mailto:reochoi109@gmail.com" },
  { label = "GitHub", url = "https://github.com/reochoi109" },
  { label = "Blog", url = "https://reo-tech.tistory.com/" },
]
+++

## Core experience

- Designed and implemented the REST APIs, Kafka request/result flow, data storage, and WebSocket delivery for a digital twin relay server
- Changed a 9,000-point, 15-minute result flow to write each record on arrival and remove it from memory immediately
- Compared camera footage with vehicle-detection results, adjusted per-intersection correction values, and implemented vehicle passage-interval analysis
- Designed and built an internal shared Go module, distributed it through Git tags/go.mod, and documented it in Confluence

## How I work

- I verify code and data first and document only results I can explain and support.
- Before changing an existing service, I study its structure and data flow to avoid disrupting operations.
- I turn recurring implementations into shared components and document them for other developers.
