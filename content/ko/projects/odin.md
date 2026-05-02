+++
title = "ODIN Sentinel 서버(실시간 이벤트·BBox·스트리밍)"
date = 2026-05-02T00:00:00+09:00
type = "Web"
period = "2023.05 - 2025.08"
org = "영상 분석 플랫폼(내부)"
subtitle = "영상 분석 플랫폼 | 2023.05 - 2025.08"
description = "영상 분석 서비스 운영을 위해 이벤트 알림, BBox 오버레이, RTSP→WebSocket 릴레이를 구축하고, 스냅샷 보관 정책과 상태 점검까지 포함한 실시간 백엔드 기능을 개발했습니다."
index = 3
visual_text = ""
visual_image = [
  "/images/projects/odin/ko/odin-architecture.svg",
  "/images/projects/odin/ko/odin-flows.svg",
]

tasks = [
  { title = "이벤트 알림 + 스냅샷 보관", desc = "이벤트 hook을 받아 DB 저장 후 WebSocket 브로드캐스트 파이프라인을 구성하고, 스냅샷(Base64)을 파일로 저장/보관 정책 기반으로 정리했습니다." },
  { title = "BBox 오버레이(카메라별 WS)", desc = "추론 결과를 카메라 idx로 라우팅해 카메라별 WebSocket 포트로 BBox 좌표를 실시간 전송했습니다." },
  { title = "RTSP → WebSocket Relay", desc = "RTSP(H264) 수신 후 NALU 단위로 WebSocket 릴레이, 재연결/주기 갱신과 이벤트 전후 프레임 버퍼링을 적용했습니다." },
]

stack = ["Go", "Gin", "gorilla/websocket", "PostgreSQL", "RTSP(H264)", "Redis(옵션)"]
tags = ["project", "backend", "streaming", "websocket", "video"]
+++

