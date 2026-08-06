+++
aliases = ["/en/projects/headway/"]
title = "Traffic Analysis – Vehicle Passage Interval Analysis"
date = 2026-04-28T00:00:00+09:00
type = "engineering"
period = "2023.07 - 2023.09"
org = "Laon Road"
subtitle = "Traffic Analysis | 2023.07 - 2023.09"
description = "Calculated vehicle passage intervals from lane- and signal-cycle-level detection data and published the results for traffic-signal optimization."
index = 2
visual_text = ""
visual_image = [
  "/images/headway-flow.svg",
]

tasks = [
  { title = "Interval calculation", desc = "Grouped detections by lane, ordered them by passage time, and calculated Headway and GAP." },
  { title = "Detection-data correction", desc = "Compared video footage with detection results and adjusted correction values for camera angle and vehicle-overlap cases." },
  { title = "Aggregation and integration", desc = "Aggregated results by lane and signal cycle and published them to a shared database." },
]
stack = ["Go", "MySQL", "Tibero", "ODBC"]
tags = ["project", "data-pipeline", "traffic"]
+++

## Overview

I developed a feature that calculates the time interval and physical gap between consecutive vehicles in the same lane using camera-based vehicle detections. The results were published to a database shared by participating companies and used as input for traffic-signal optimization.

## Analysis flow

- Group detections by lane and sort them by passage time
- Generate consecutive vehicle pairs within the same lane
- **Headway**: time difference between the passage of the leading and following vehicles
- **GAP**: Headway minus the occupancy time calculated from vehicle length and speed
- Analyze vehicles within the same signal interval and exclude invalid values
- Aggregate averages, sums, and valid samples by lane and signal cycle
- Write results to the shared Tibero database through ODBC

## Correcting camera-based detection data

Camera position and viewing angle differed by intersection. Overlapping or closely spaced vehicles could also cause detection boxes and vehicle IDs to be associated incorrectly.

I compared the recorded video with detection results and adjusted correction values for each intersection. The analysis step also applied signal-window and outlier conditions to determine which records should be included.

## Use of results

The lane- and signal-cycle-level results were published to the shared database so traffic-signal companies could use them as input when reviewing signal optimization.
