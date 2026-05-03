+++
title = "ODIN Sentinel Server (Realtime Events, BBox, Streaming)"
date = 2026-05-02T00:00:00+09:00
type = "Web"
period = "2023.05 - 2025.08"
org = "Video Analytics Platform (Internal)"
subtitle = "Video Analytics Platform | 2023.05 - 2025.08"
description = "Built real-time backend capabilities for a video analytics service: event notifications, BBox overlays, RTSP-to-WebSocket relay, and snapshot retention."
index = 3
visual_text = ""
visual_image = [
  "/images/odin.jpg",
]

tasks = [
  { title = "Event notify + snapshots", desc = "Handled event hooks, persisted metadata, broadcast notifications via WebSockets, and stored snapshots with a retention policy." },
  { title = "BBox overlays (per-camera WS)", desc = "Routed inference hooks by camera index and pushed BBox coordinates over per-camera WebSocket ports." },
  { title = "RTSP → WebSocket relay", desc = "Ingested RTSP (H264), relayed NALUs via WebSockets, and added reconnect/refresh handling plus frame buffering around events." },
]

stack = ["Go", "Gin", "gorilla/websocket", "PostgreSQL", "RTSP (H264)", "Redis (optional)"]
tags = ["project", "backend", "streaming", "websocket", "video"]
+++

