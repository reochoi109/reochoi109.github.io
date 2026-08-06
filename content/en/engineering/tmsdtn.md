+++
aliases = ["/en/projects/tmsdtn/"]
title = "Digital Twin Road Simulation Relay Server"
date = 2026-05-02T00:00:00+09:00
type = "engineering"
period = "2024.09 - 2024.12"
org = "Laon Road"
subtitle = "Backend Project | 2024.09 - 2024.12"
description = "Designed and built a Go relay server that asynchronously processes simulation requests and results and delivers generated traffic data to clients."
index = 1
visual_text = ""
visual_image = [
  "/images/tmsdtn.png",
]

tasks = [
  { title = "End-to-end backend ownership", desc = "Designed and implemented the REST APIs, Kafka request/result flow, data storage, and WebSocket delivery." },
  { title = "Memory handling improvement", desc = "Changed the 9,000-point result flow from in-memory accumulation to write-on-receive processing." },
  { title = "Result storage and delivery", desc = "Generated JSON result files, compressed them as tar.gz, and streamed stored results to multiple users over WebSocket." },
]
stack = ["Go", "Gin", "Kafka", "PostgreSQL", "WebSocket", "Docker", "Swagger/OpenAPI"]
tags = ["project", "digital-twin", "traffic", "backend", "simulation"]
+++

## Overview

This backend relay service sits between the simulation server and its clients. It handles analysis requests, progress and result collection, traffic-data transformation, and delivery. I designed and implemented the entire backend.

## Responsibilities

- Built REST APIs and a shared response format for analysis requests, progress, and results
- Exposed simulation outputs such as traffic volume, level of service (LOS), and carbon emissions
- Used Kafka and per-job IDs to process long-running simulation requests and results asynchronously
- Received and stored generated traffic-analysis results and transformed them into client-facing responses
- Streamed stored results to multiple users over WebSocket and synchronized start/end states

## Data processing improvement

A 15-minute simulation result arrives as 9,000 time-point records. The previous approach kept every record in memory until reception completed and then generated the file in one batch, which increased memory usage.

I changed the flow to append each record to a file as it arrived and remove the recorded data from memory immediately. This kept only the record currently being processed in memory instead of the entire result set.

The completed result was stored as JSON and compressed as tar.gz for storage and delivery.

## Architecture

![](/images/projects/tmsdtn/ko/tmsdtn-architecture.svg)

![](/images/projects/tmsdtn/ko/tmsdtn-sequence.svg)

## Scope

This was a new backend service built from the ground up. I owned the full flow from API contracts and asynchronous messaging to data storage and real-time delivery.
