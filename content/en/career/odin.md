+++
aliases = ["/en/engineering/odin/", "/en/projects/odin/"]
title = "Odin AI Server Development"
date = 2026-05-02T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "Backend Development"
list_title = "Odin AI Server"
period = "2025.01 - 2025.04"
org = "Laon People"
employer = "Laon Road"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "May 2023 - Aug 2025"
company_url = "https://laonpeople.com/en/"
company_label = "Company website"
official_url = "https://laonpeople.com/odinai-server/"
official_label = "Official Odin AI Server page"
blog_url = "https://laonpeople.com/blog/%EA%B7%B8%EB%9E%98%EC%84%9C-%EB%AD%90%EA%B0%80-%EC%A2%8B%EC%95%84%EC%A7%84-%EA%B1%B4%EB%8D%B0-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EA%B4%80%EC%A0%9C%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-5%EA%B0%80/"
blog_label = "Official Odin AI blog post"
subtitle = "Backend Development | 2025.01 - 2025.04"
description = "Contributed selected real-time monitoring backend features to Odin AI Server, including event notifications, BBox delivery, RTSP relaying, and snapshot management."
index = 2
visual_text = ""
visual_image = [
  "/images/career/odin/overview.jpg",
]

tasks = [
  { title = "Event notify + snapshots", desc = "Handled event hooks, persisted metadata, broadcast notifications via WebSockets, and stored snapshots with a retention policy." },
  { title = "BBox overlays (per-camera WS)", desc = "Routed inference hooks by camera index and pushed BBox coordinates over per-camera WebSocket ports." },
  { title = "RTSP → WebSocket relay", desc = "Ingested RTSP (H264), relayed NALUs via WebSockets, and added reconnect/refresh handling plus frame buffering around events." },
]

stack = ["Go", "Gin", "gorilla/websocket", "PostgreSQL", "RTSP (H264)", "Redis (optional)"]
tags = ["project", "backend", "streaming", "websocket", "video"]
+++

## Overview

Odin AI Server is a multi-channel AI video-monitoring solution that combines VLM analysis with an operations platform. Its published architecture separates the video relay layer from Multi-GPU analysis servers and connects existing CCTV through standard protocols including RTSP and ONVIF.

I contributed selected server features that delivered analysis events, object locations (BBox), and live camera streams to the monitoring interface.

## Objective

The product is designed to collect and distribute video reliably across large CCTV deployments and make VLM output usable in operational monitoring workflows.

My features focused on notifying operators of analysis events immediately, delivering object locations and camera footage to the browser, and making surrounding frames and snapshots available for review.

## Responsibilities

I was responsible for selected real-time monitoring features rather than the complete product backend: event notifications and snapshot retention, per-camera BBox overlay delivery, and RTSP-to-WebSocket relaying.

## Key implementation

### Event notifications and snapshot management

- Received event hooks
- Stored event data in PostgreSQL
- Broadcast events over WebSocket
- Stored Base64 snapshots as files and cleaned them up according to the retention policy

### Per-camera BBox overlays

- Routed inference results by camera index
- Sent BBox coordinates in real time through per-camera WebSocket ports

### RTSP video relay

- Ingested RTSP (H264) streams
- Relayed H264 data as NALUs over WebSocket
- Added stream reconnect and periodic refresh handling
- Buffered frames around events

## Problem solving and improvements

### Snapshot file retention

I stored Base64 snapshots included in event hooks as files and cleaned them up according to a retention policy.

### Video relay reliability

I added reconnect and periodic refresh handling to the RTSP stream and buffered frames so footage around an event could be delivered.

## Results

- Implemented event persistence and WebSocket notifications
- Delivered per-camera BBox coordinates in real time
- Relayed RTSP (H264) video over WebSocket
- Applied snapshot retention and frame handling around events

## Reference

- Laon People official website: {{< reference-link url="https://laonpeople.com/odinai-server/" label="Odin AI Server" >}}
- Laon People official blog: {{< reference-link url="https://laonpeople.com/blog/%EA%B7%B8%EB%9E%98%EC%84%9C-%EB%AD%90%EA%B0%80-%EC%A2%8B%EC%95%84%EC%A7%84-%EA%B1%B4%EB%8D%B0-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EA%B4%80%EC%A0%9C%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-5%EA%B0%80/" label="Five Ways Generative AI Is Changing Video Monitoring" >}} (Korean)
