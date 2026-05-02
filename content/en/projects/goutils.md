+++
title = "GOUTILS: Internal Go Shared Utilities"
date = 2026-05-02T00:00:00+09:00
type = "Web"
period = "2023.05 - 2025.08"
org = "Backend Platform (Internal)"
subtitle = "Backend Platform | 2023.05 - 2025.08"
description = "Standardized recurring infra code into a shared Go module: logging, validation, DB pools, HTTP clients, Kafka/WebSocket/RTSP utilities, and operational helpers."
index = 4
visual_text = ""
visual_image = [
  "/images/projects/goutils/en/goutils-overview.svg",
  "/images/projects/goutils/en/goutils-packages.svg",
]

tasks = [
  { title = "Standard libraries", desc = "Packaged shared conventions such as logging (logrus+lumberjack), request validation, common API error/response formats, and Gin middleware." },
  { title = "Infra helpers", desc = "Modularized DB/DB pools (Postgres/MySQL), HTTP client wrappers (resty), scheduling/batch helpers, and file compression/cleanup utilities." },
  { title = "Realtime/network modules", desc = "Provided reusable patterns for Kafka, WebSockets, RTSP (client/server), and TCP servers (gnet)." },
]

stack = ["Go", "logrus+lumberjack", "pgx/mysql", "resty", "kafka-go", "gorilla/websocket", "gortsplib"]
tags = ["project", "platform", "golang", "library", "backend"]
+++

## Summary

A shared Go module that reduces repeated infra code and helps new services adopt consistent patterns quickly.
