+++
aliases = ["/en/projects/goutils/"]
title = "GOUTILS: Internal Shared Go Module"
date = 2026-05-02T00:00:00+09:00
type = "engineering"
field = "Backend Development"
field_index = 1
list_title = "GOUTILS"
period = "2025.01 - 2025.07"
org = "Laon Road"
subtitle = "Backend Module | 2025.01 - 2025.07"
description = "Packaged recurring and inconsistent backend implementations into a shared Go module, then versioned, distributed, and documented it for internal services."
index = 4
visual_text = ""
visual_image = [
  "/images/career/goutils/overview.png",
]

tasks = [
  { title = "Shared module design", desc = "Modularized recurring backend functions such as database access, logging, messaging, real-time communication, and validation." },
  { title = "Versioning and distribution", desc = "Managed versions with Git tags in Bitbucket and let each service reference the required version from go.mod." },
  { title = "Documentation and adoption", desc = "Documented package usage and release notes in Confluence and applied the module to production services." },
]

stack = ["Go", "go.mod", "Bitbucket", "Confluence"]
tags = ["project", "platform", "golang", "module", "backend"]
+++

## Overview

Existing services repeated backend infrastructure code such as database access, logging, messaging, and real-time communication. Implementations and versions also differed by project. I designed and built **goutils** to provide these functions as a shared module.

## Included functionality

- Database connections and pool management
- Logging and input validation
- Kafka message processing
- Real-time communication including WebSocket
- HTTP integration and shared API responses
- Shared file-processing and operational helpers

## Distribution and documentation

The module was maintained in a private Bitbucket repository. Versions were identified by Git tags, and each service referenced the required version from its go.mod file.

I documented package usage and release notes in Confluence. The module was used by internal services, including the digital twin relay server.

## Scope

I owned the module structure, implementation, versioning approach, internal distribution, and documentation.
