+++
aliases = ["/en/engineering/headway/", "/en/projects/headway/"]
title = "Traffic Management System (TMS) Development and Maintenance"
date = 2026-04-28T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "Backend Development"
list_title = "Traffic Management System (TMS)"
period = "May 2023 - Aug 2025"
org = "Laon Road"
employer = "Laon Road"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "May 2023 - Aug 2025"
company_url = "https://www.laonroad.com/"
company_label = "Company website"
subtitle = "Backend Development | May 2023 - Aug 2025"
description = "Developed and maintained the backend of the company's Traffic Management System (TMS) and responded to operational issues."
index = 3
visual_text = ""
visual_image = [
  "/images/career/headway/headway-gap.svg",
]

tasks = [
  { title = "Backend development and maintenance", desc = "Analyzed the existing codebase, implemented requirements, and developed new features." },
  { title = "Operational issue response", desc = "Investigated production issues and applied fixes to the service." },
  { title = "Traffic-analysis feature", desc = "Built Headway and GAP analysis and data integration as a representative TMS feature." },
]
stack = ["Go", "MySQL", "Tibero", "ODBC"]
tags = ["project", "data-pipeline", "traffic"]
+++

## Overview

I developed and maintained the backend of Laon Road's Traffic Management System (TMS), covering existing-code analysis, requirement implementation, new feature development, and operational issue response.

This page presents one representative feature from that work: Headway and GAP analysis using vehicle-detection data. It combines detection time, speed, vehicle type, lane, and signal-cycle data to select valid vehicle pairs and produce lane- and cycle-level metrics.

## Objective

The broader objective was to keep the TMS reliable while translating operational requirements into backend improvements. The representative Headway and GAP feature quantified vehicle passage intervals and produced consistent input for signal-operation and optimization analysis.

## Responsibilities

I analyzed and maintained the existing service, resolved operational issues, and implemented requirements and new features. For Headway and GAP analysis, I developed the detection grouping and calculation logic, signal-window handling, corrections for different camera installations, result aggregation, and Tibero database integration.

## Key implementation

### Analysis flow

{{< product-workflow title="Vehicle passage interval analysis flow" layout="column" >}}
{
  "nodes": [
    { "id": "detect", "label": "Receive vehicle detections" },
    { "id": "lane", "label": "Group by lane" },
    { "id": "sort", "label": "Sort by passage time" },
    { "id": "pair", "label": "Create consecutive pairs" },
    { "id": "calculate", "label": "Calculate Headway and GAP" },
    { "id": "aggregate", "label": "Aggregate by signal cycle" },
    { "id": "store", "label": "Write to Tibero" }
  ],
  "edges": [
    ["detect", "lane"],
    ["lane", "sort"],
    ["sort", "pair"],
    ["pair", "calculate"],
    ["calculate", "aggregate"],
    ["aggregate", "store"]
  ]
}
{{< /product-workflow >}}

### Calculating Headway and GAP

The project calculated **time intervals** at a fixed detection point, not the physical space headway between vehicles.

- **Headway**: time from the front of the leading vehicle passing the detection point until the front of the following vehicle passes the same point
- **GAP**: time from the rear of the leading vehicle passing the detection point until the front of the following vehicle passes it

After sorting each lane's detections by passage time, I paired adjacent vehicles as the leading and following vehicle and calculated:

```text
Headway = following passage time - leading passage time
Leading occupancy time = leading vehicle length / leading vehicle speed
GAP = Headway - leading occupancy time
```

When length is expressed in meters and speed in kilometers per hour, the speed must be converted when calculating occupancy time:

```text
Leading occupancy time (seconds) = 3.6 × length (m) / speed (km/h)
```

For example, with a 2.4-second Headway, a 4.5-meter leading vehicle, and a speed of 36 km/h, occupancy time is 0.45 seconds and GAP is 1.95 seconds.

### Selecting valid pairs within a signal interval

I did not calculate every pair of adjacent timestamps. After sorting each lane's detections with millisecond precision, I accepted a pair only when both vehicles passed consecutively within the **same signal interval**. I also verified that the calculated Headway was shorter than the interval duration so that vehicles across a signal boundary were not connected.

### Calculating GAP with vehicle-type-specific length

Rather than using one average length, the calculation loaded the overall length mapped to each detected vehicle type. It converted speed from `km/h` to `m/s`, calculated how long the leading vehicle occupied the detection point, and subtracted that value from Headway. This allowed differences between passenger cars and large vehicles to be reflected in GAP.

### Outlier filtering and cycle-level aggregation

- Exclude suspected duplicate or over-detections with Headway of **0.8 seconds or less**
- Exclude non-consecutive traffic with Headway of **3.5 seconds or more**
- Exclude physically invalid results where GAP is **less than 0.01 seconds**
- Aggregate Headway and GAP averages and sums, plus traffic volume, by lane and signal cycle
- Separately calculate Headway and GAP sums and valid volume for the first six vehicles and the vehicles that follow
- Process aggregate writes transactionally and publish them to Tibero through ODBC

## Problem solving and improvements

### Delayed detections caused by vehicle length and camera angle

The initial data contained many abnormal passage intervals. Investigation showed that vehicles had different lengths and camera angles varied by intersection, so a closely following vehicle could remain hidden behind the vehicle ahead and be detected late.

A compact car following a large vehicle was particularly likely to remain occluded in the camera view and appear later than its actual passage. The delayed detection timestamp affected consecutive vehicle pairing and the resulting Headway and GAP.

I compared recorded footage directly with detection results, examined the effects of vehicle length and camera angle, and adjusted correction values for each camera installation. The GAP calculation also used the length mapped to each vehicle type, while staged checks for signal interval, Headway, and GAP prevented delayed detections or non-consecutive vehicles from entering the aggregates.

## Results

I implemented one processing flow from chronological ordering and valid-pair selection through vehicle-type-specific GAP calculation, outlier filtering, and lane- and cycle-level aggregation. It delivered averages, sums, valid volume, and separate first-six/following-vehicle metrics in a form suitable for downstream signal-optimization analysis.

## Reference

- Laon Road official website: {{< reference-link url="https://www.laonroad.com/" label="Laon Road" >}}
- Traffic-engineering concepts: {{< reference-link url="https://transpro.tistory.com/entry/%EC%B0%A8%EB%91%90%EA%B0%84%EA%B2%A9-%EC%B0%A8%EB%91%90%EA%B1%B0%EB%A6%AC-%EC%B0%A8%EA%B0%84%EA%B2%A9" label="Time Headway, Space Headway, and Gap" >}} (Korean)
