+++
title = "Headway/GAP KPI Pipeline for Signal Ops"
date = 2026-04-28T00:00:00+09:00
type = "Web"
period = "2026.01 - 2026.04"
org = "Traffic Signal Analytics (Internal)"
subtitle = "Traffic Signal Analytics | 2026.01 - 2026.04"
description = "Built a KPI pipeline that computes lane-level Headway/GAP and aggregates per signal cycle, publishing metrics that support day-to-day signal operations."
index = 2
visual_text = ""
visual_image = [
  "/images/projects/1_headway/en/headway-flow.svg",
  "/images/projects/1_headway/en/headway.png",
]

tasks = [
  { title = "KPI computation & aggregation", desc = "Paired detection events per lane to compute Headway/GAP, then aggregated per signal cycle for operational reporting." },
  { title = "Quality stabilization", desc = "Applied phase-aware constraints and outlier/consistency filtering to remove physically impossible noise and stabilize metrics." },
  { title = "Validation & publishing", desc = "Validated at ≥95% correctness via sampling and published cycle-level KPIs to a shared Tibero analytics DB." },
]
stack = ["Go", "SQL", "ODBC", "Tibero (shared RDB)"]
tags = ["project", "data-pipeline", "traffic"]
+++

## Goal

Build reliable **Headway/GAP-based traffic-flow metadata (KPIs)** and publish them to a **shared database** so a traffic-signal vendor could use them as indicators for **signal operations improvement**.

## What I built

- Lane-level event processing: group-by lane, sort by timestamp, generate consecutive vehicle pairs.
- Phase-aware validation: only accept consecutive pairs that belong to the **same signal phase window** (prevents cross-phase mixing and improves KPI stability).
- KPI computation:
  - `Headway = Δt (seconds)`
  - `GAP = Headway - (vehicle_length / speed_mps)` (unit conversion included)
- Quality gates: remove noisy/impossible samples (short/long intervals, physically inconsistent GAP), then aggregate per signal **cycle** (thresholds not disclosed).
- Metadata publishing: write cycle-level KPIs (avg/sum, valid volume, early-vs-later segments) into a **shared enterprise RDB (Tibero)** for vendor consumption.

## Key challenge (camera-based detection)

The upstream data came from **camera-based object detection + ROI crossing**, not radar. In practice, each intersection has different viewing angles and occlusions, which can cause tracking artifacts (e.g., vehicles too close, ID switches, missed/duplicated crossings). The main challenge was making the KPI pipeline robust against these artifacts by applying phase-aware pairing and conservative quality gates (without exposing internal thresholds).

## Validation (metric)

Manual spot-check validation showed **≥95% correctness** for the generated KPIs (lane pairing + phase constraints + outlier filtering).

## Why it matters

Headway and GAP KPIs provide a compact view of how smoothly vehicles are discharging on each lane. By publishing stable, cycle-level metadata into a shared DB, downstream signal-optimization stakeholders can iterate faster without re-implementing low-level event logic.
