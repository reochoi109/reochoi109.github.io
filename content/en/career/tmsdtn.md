+++
aliases = ["/en/engineering/tmsdtn/", "/en/projects/tmsdtn/"]
title = "DTN Traffic Simulation Relay Server"
date = 2026-05-02T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "Backend Development"
list_title = "DTN Traffic Simulation"
period = "2024.09 - 2024.12"
org = "Laon Road"
employer = "Laon Road"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "May 2023 - Aug 2025"
company_url = "https://www.laonroad.com/"
company_label = "Company website"
blog_url = "https://m.blog.naver.com/PostView.naver?blogId=laonroad&logNo=224340608032&navType=by"
blog_label = "Official DTN post"
subtitle = "Backend Project | 2024.09 - 2024.12"
description = "Designed and built the Go relay server that handles long-running simulation requests, job state, and high-volume results for DTN traffic-policy validation."
index = 1
visual_text = ""
visual_image = [
  "/images/career/tmsdtn/overview.png",
]

tasks = [
  { title = "End-to-end server ownership", desc = "Owned the complete backend scope, from REST APIs and job-state management to Kafka integration, storage, and WebSocket delivery." },
  { title = "High-volume result processing", desc = "Wrote 9,000 time points as ordered JSON Lines instead of rebuilding one large JSON object, reducing additional memory during file generation." },
  { title = "Service-ready analysis results", desc = "Processed static metrics and dynamic twin data separately and replayed archived results through session-specific WebSocket servers." },
]
stack = ["Go", "Gin", "Kafka", "PostgreSQL", "WebSocket", "Docker", "Swagger/OpenAPI"]
tags = ["project", "digital-twin", "traffic", "backend", "simulation"]
+++

## Overview

DTN (Digital Twin Network) uses real traffic data to recreate road traffic in a digital environment and test operational alternatives virtually.

I built the relay server between the user-facing client and the traffic simulation server. It submits analysis requests as simulation jobs, collects and transforms execution state and results, stores the output, and serves it to clients through APIs and WebSocket.

## Objective

DTN evaluates signal-plan changes, incidents, roadworks, and other scenarios before they are applied to real roads. Its product goal is to give operators evidence for traffic-policy decisions by comparing traffic volume, travel speed, queue length, level of service (LOS), carbon emissions, and other measures.

From the server perspective, the key objective was to decouple long-running work from synchronous API requests and connect static analysis metrics and dynamic twin data under one job state so clients could query and replay the result reliably.

## Responsibilities

I was the sole developer responsible for the server-side scope. I designed and implemented the requirements and API contracts, Kafka-based asynchronous processing, PostgreSQL and file storage, WebSocket delivery, the Docker runtime setup, and Swagger/OpenAPI documentation.

The traffic simulation model and user interface were outside my scope; I focused on the backend that connected them and exposed simulation output as service-ready data.

## Key implementation

### Analysis job lifecycle

- Built REST APIs and a shared response format for analysis requests, progress, and completed results
- Issued a UUID for each request and linked it to an analysis sequence so request, progress, success, and failure could be tracked as one asynchronous lifecycle
- Expired unfinished jobs after a time limit and reconciled stale in-progress database state during service startup
- Documented the client-server API contract with Swagger/OpenAPI

### Separate static and dynamic result pipelines

- Sent analysis parameters through Kafka and correlated asynchronous results by UUID
- Batch-stored **static metrics**—traffic volume, LOS and control delay, carbon emissions, signal-cycle values, route speed, and occupancy—by data type in PostgreSQL
- Processed **dynamic data**—vehicles, signal state, lane queues, route speed, and saturation—separately while preserving time-point and packet order
- Notified the dynamic pipeline only after all required static result types were stored, then updated completion and file state after both result paths were ready

### Twin-data transformation

- Mapped simulator lane numbers to the service database's lane identifiers for a stable client-facing identity model
- Classified saturation values as smooth, delayed, or congested and attached the corresponding display location when the state changed
- Built aggregate responses for total, vehicle-class, and movement-level traffic volumes and exposed each measure through REST APIs

### Result replay and multi-user delivery

- Wrote the completed 9,000 time points as ordered JSON Lines and retained the file as a tar.gz archive
- Allocated an available WebSocket port for each replay and extracted its archive into a session-specific temporary path to prevent result collisions
- Read the file line by line, streamed each point over WebSocket, and marked the final packet so the client could detect replay completion
- Shut down timed-out or completed servers, removed temporary files, and returned ports to the pool for reuse

## Problem solving and improvements

### Memory performance across 9,000 time points

A 15-minute dynamic result arrives in 900 chunks containing 9,000 time points. The initial file-generation path merged the received chunks into one large map and serialized the entire object at once, requiring a consolidated map and serialization buffer in addition to the received data already held in memory.

I changed file generation to write one time point at a time. The process iterates through chunk and time-point order, builds a small map for one record, and appends it as one JSON Lines entry. This removes the need to rebuild all 9,000 points as one result object and byte array.

This bounded the additional memory used during file generation and produced an ordered, streaming-friendly artifact. Once writing completed, the file was compressed as tar.gz and the original was removed so storage and replay used the same artifact lifecycle.

### Synchronizing completion across asynchronous results

Static metrics and dynamic twin data arrive through different Kafka flows. Marking a job complete when only one path finished could expose incomplete queries or a missing replay artifact.

After all required static result types were stored, the static reader sent the UUID and analysis sequence to the dynamic processor through an internal channel. File generation and final state updates began only when that notification and the complete dynamic packet set were both available. Failure messages and timeouts were applied to the same job state so long-running work could not remain indefinitely in progress.

## Results

- Built an asynchronous, job-level workflow for tracking long-running simulations independently of API requests
- Synchronized static metric storage and dynamic twin-file creation to keep completion state consistent
- Removed whole-result reconstruction during file generation and introduced ordered JSON Lines output for 9,000 time points
- Built a replay lifecycle spanning archive storage, session-specific extraction, WebSocket delivery, cleanup, and port reuse
- Exposed one backend interface covering analysis requests, state checks, metric queries, and result replay

## Reference

- Laon Road official blog: {{< reference-link url="https://m.blog.naver.com/PostView.naver?blogId=laonroad&logNo=224340608032&navType=by" label="DTN: A Digital Twin for Validating Traffic Policies in a Virtual Environment" >}} (Korean)
