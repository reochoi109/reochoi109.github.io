+++
hide_from_career_list = true
title = "자사 교통관제시스템(TMS) 백엔드 개발·유지보수"
date = 2026-08-28T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "백엔드 개발"
list_title = "교통관제시스템(TMS)"
period = "2023.05 - 2025.08"
org = "라온로드"
employer = "라온로드"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "2023.05 - 2025.08"
company_url = "https://www.laonroad.com/"
company_label = "회사 홈페이지"
subtitle = "Main Solution · Backend Development | 2023.05 - 2025.08"
description = "자사 핵심 솔루션인 교통관제시스템(TMS)의 백엔드 유지보수와 기능 개발을 재직 기간 전체에 걸쳐 담당"
index = 1
visual_text = "TMS"
solution_key = "tms"
solution_role = "root"

tasks = [
  { title = "백엔드 개발·유지보수", desc = "기존 서비스의 코드와 데이터 흐름을 파악해 요구사항과 신규 기능을 반영했습니다." },
  { title = "운영 이슈 대응", desc = "운영 중 발생한 문제의 원인을 로그와 데이터로 확인하고 수정 사항을 적용했습니다." },
  { title = "TMS 주요 개발", desc = "TMS-Gateway 유지보수·추가 개발과 DTN 중계 서버, Headway·GAP 분석 기능 개발을 담당했습니다." },
]
stack = ["Go", "MySQL", "PostgreSQL", "Kafka", "WebSocket"]
tags = ["career", "backend", "traffic", "tms"]
+++

## 업무 개요

교통관제시스템(TMS)은 라온로드의 핵심 자사 솔루션입니다. 재직 기간 전체에 걸쳐 TMS 백엔드의 기존 코드와 데이터 흐름을 파악하고, 요구사항 반영과 신규 기능 개발, 운영 이슈 대응을 담당했습니다.

## TMS 주요 개발

- **TMS-Gateway**: 기존 마이크로서비스 구조의 API 진입점에서 reverse proxy, 사용자·권한, 요청 제한과 실시간 알림 기능을 유지보수하고 필요한 기능을 추가했습니다.
- **TMS-DTN 중계 서버**: 교통 시뮬레이션 요청과 결과를 Kafka로 비동기 처리하고, 정적 분석 지표와 동적 트윈 데이터를 API와 WebSocket으로 제공했습니다.
- **Headway·GAP 분석 기능**: 차량 검지 데이터를 이용해 차두시간과 차간시간을 계산하고, 신호 주기별 결과를 집계해 공동 데이터베이스에 제공했습니다.

각 개발 사례의 구현 범위와 문제 해결 과정은 하위 프로젝트 페이지에 별도로 정리했습니다.
