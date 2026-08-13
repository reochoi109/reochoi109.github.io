+++
type = "products"
aliases = ["/en/side-projects/schemapad/"]
title = "SchemaPad"
date = 2026-07-20T00:00:00+09:00
subtitle = "Browser-based ERD editor"
description = "A free ERD editor for drawing tables and relationships in the browser, with PostgreSQL and MySQL SQL import and export. Documents stay in the user's browser."
index = 3
visual_image = "/images/products/schemapad/cover.png"
site_url = "https://schemapad.xyz"
site_label = "schemapad.xyz"

[[facts]]
label = "Status"
value = "Live"

[[facts]]
label = "Core workflow"
value = "ERD editing · SQL import/export"
+++

## Problem and goal

I wanted a lightweight way to sketch a database structure and move it into SQL without requiring an account, installation, or server-side document storage. SchemaPad connects early schema design and the visualization of existing SQL in one browser-based workspace.

## Core workflow

Users can create tables and columns, connect relationships, and arrange an ERD visually. PostgreSQL and MySQL SQL can be imported to inspect an existing schema or exported after editing a design.

Documents remain in the user's browser. This keeps the starting flow simple and suits small schemas and early drafts that do not need a larger collaborative platform.

## Product decisions

- Let users begin creating and connecting tables before reading instructions
- Keep visual editing and SQL exchange in one workflow
- Focus on the essential work needed for an individual schema draft
- Store documents in the browser rather than sending them to a server

## Wireframes

The screen design covers public pages and the editor's navigation, properties, relationships, and SQL export states.

{{< product-wireframes product="schemapad" >}}

## What the project taught me

This project translated a database workflow I knew as an engineer into a user-facing product flow. I focused the structure on keeping three core actions—drawing, importing, and exporting—connected instead of expanding the feature set broadly.
