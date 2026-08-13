+++
aliases = ["/en/projects/goutils/"]
title = "GOUTILS Development"
date = 2025-01-02T00:00:00+09:00
type = "engineering"
field = "Backend Development"
field_index = 1
list_title = "GOUTILS"
period = "2025.01 - 2025.07"
org = "Laon Road"
company_url = "https://www.laonroad.com/"
company_label = "Company website"
subtitle = "Backend Module | 2025.01 - 2025.07"
description = "Packaged recurring backend capabilities—from databases, logging, and validation to Kafka, WebSocket, and RTSP—into a versioned and documented internal Go module."
index = 4
visual_text = ""
visual_image = [
  "/images/career/goutils/overview.png",
]

tasks = [
  { title = "Backend infrastructure standards", desc = "Separated logging, validation, PostgreSQL/MySQL pools, HTTP clients, and common API responses into packages." },
  { title = "Shared communication and media", desc = "Modularized Kafka, WebSocket, TCP server, and RTSP client/server capabilities used across services." },
  { title = "Validation, releases, and docs", desc = "Validated branch changes in target services before Git tag releases, then documented usage and release notes in Confluence." },
]

stack = ["Go", "Go Modules", "Gin", "PostgreSQL", "MySQL", "Kafka", "WebSocket", "RTSP", "Bitbucket", "Confluence"]
tags = ["project", "platform", "golang", "module", "backend"]
+++

## Overview

**GOUTILS** is an internal Go module that separates recurring infrastructure code into reusable packages. It covers database and API foundations, messaging, real-time communication, RTSP media handling, and operational utilities, with each service selecting its required version from `go.mod`.

## Objective

Existing services repeatedly implemented the same infrastructure, with implementation details and code versions differing by project. The goal was to separate common functionality into one module, reduce duplicate implementation, and make each service's version dependency explicit.

## Responsibilities

I owned the module architecture and implementation, Git tag-based versioning, the internal distribution approach, package usage documentation, and release notes.

## Key implementation

### Web, API, and data

- Shared PostgreSQL and MySQL pools and transaction interfaces
- Gin middleware, shared API responses, and error-code formatting
- Resty-based HTTP client
- Custom validation rules and Gin request validation

### Logging and configuration

- Logrus formatting and levels with Lumberjack file rotation
- Environment-variable and INI configuration loading
- CLI argument and log-level handling

### Messaging, real-time communication, and media

- Kafka readers, writers, and topic management
- WebSocket clients, servers, and message broadcasting
- gnet-based TCP server and client management
- RTSP H264 client ingestion and RTSP server relaying

### Operational utilities

- Periodic scheduling and aggregation-window calculations
- SQL batch-building helpers
- gzip, tar.gz, and zip processing plus old-file cleanup
- Ping, time-format conversion, and network information

### Version distribution and adoption flow

{{< product-workflow title="GOUTILS distribution flow" layout="column" >}}
{
  "nodes": [
    { "id": "branch", "label": "Develop on a feature branch" },
    { "id": "preview", "label": "Reference a pseudo-version or replace" },
    { "id": "verify", "label": "Validate in the target service" },
    { "id": "merge", "label": "Merge the branch" },
    { "id": "tag", "label": "Create a Git tag" },
    { "id": "adopt", "label": "Adopt the release from service go.mod" }
  ],
  "edges": [
    ["branch", "preview"],
    ["preview", "verify"],
    ["verify", "merge"],
    ["merge", "tag"],
    ["tag", "adopt"]
  ]
}
{{< /product-workflow >}}

## Problem solving and improvements

### Common code diverging across services

Implementing or copying the same functionality in each service caused changes to diverge and made the version in use difficult to track. I separated the common code into a module maintained in a private Bitbucket repository.

### Managing versions and usage

During feature-branch development, a target service could reference a commit-based pseudo-version or use a `replace` directive to validate the change first. After validation, the feature was merged and identified with a Git tag, and each service referenced its required release explicitly from `go.mod`.

I documented package usage and release notes in Confluence so adoption and version-change information could be reviewed.

## Results

- Consolidated recurring backend infrastructure into one Go module
- Built reusable packages spanning Web and database foundations, Kafka, WebSocket, TCP, and RTSP
- Made module versions explicit in each service's `go.mod`
- Documented how to validate branch changes in target services before release
- Documented package usage and release notes in Confluence
- Adopted the module in internal services, including the digital twin relay server

## Reference

- Laon Road official website: {{< reference-link url="https://www.laonroad.com/" label="Laon Road" >}}
