+++
title = "TMS-Gateway 유지보수·추가 개발"
date = 2026-08-28T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "백엔드 개발"
list_title = "TMS-Gateway"
period = "2023.05 - 2025.08"
org = "라온로드"
employer = "라온로드"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "2023.05 - 2025.08"
company_url = "https://www.laonroad.com/"
company_label = "회사 홈페이지"
subtitle = "TMS Backend Maintenance | 2023.05 - 2025.08"
description = "기존 마이크로서비스 구조에서 외부 요청과 내부 TMS 서비스 사이의 진입점을 담당하는 게이트웨이 유지보수·추가 개발"
index = 2
solution_key = "tms"
solution_role = "child"
visual_text = "GW"
visual_image = [
  "/images/career/tmsgateway/gateway-flow.svg",
]

tasks = [
  { title = "API 게이트웨이 유지보수", desc = "기존 reverse proxy와 서비스별 라우팅 구조를 파악하고 백엔드 서비스 연동 변경과 운영 이슈에 대응했습니다." },
  { title = "사용자·접근 제어 기능 보완", desc = "세션 기반 로그인과 사용자·관리자 API, 변경 요청 권한 검사와 요청 제한 기능을 유지보수하고 필요한 기능을 추가했습니다." },
  { title = "실시간 알림 흐름 유지보수", desc = "Kafka 알림을 소비해 로그인 사용자에게 WebSocket으로 전달하는 흐름과 알림 제외 설정을 유지보수했습니다." },
]
stack = ["Go", "Gin", "Reverse Proxy", "PostgreSQL", "Kafka", "WebSocket", "Docker", "Swagger/OpenAPI"]
tags = ["career", "backend", "gateway", "microservices", "maintenance", "tms"]
+++

## 업무 개요

TMS-Gateway는 외부 클라이언트가 여러 TMS 백엔드 서비스에 접근할 때 거치는 API 진입점입니다. 하나의 Go 서비스 안에서 reverse proxy, 사용자와 권한 관리, 요청 제한, 실시간 알림 전달을 담당하고 있었습니다.

이 서비스의 초기 아키텍처를 설계하거나 처음부터 구축한 것은 아닙니다. 기존 마이크로서비스 구조와 코드를 인수해 **유지보수와 요구사항에 따른 추가 개발**을 담당했습니다.

## 코드로 확인한 서비스 역할

### 내부 서비스 API 라우팅

- Gin의 `/api/v1/{service}` 경로를 기준으로 TMS Hub, Base, Collect, Calculate, DT, Signal, System, Observe, DTN, ATS 등의 내부 REST API로 요청 전달
- Go 표준 라이브러리의 reverse proxy를 사용해 외부 요청을 각 서비스 포트로 중계
- 조회 이외의 변경 요청은 사용자 세션과 권한을 확인한 뒤 전달
- 연결할 수 없는 서비스와 잘못된 경로를 게이트웨이 오류 응답으로 처리

### 사용자·권한과 운영 API

- 세션 기반 로그인·로그아웃과 세션 만료 시간 갱신
- 회원 가입·탈퇴, 비밀번호 변경, 사용자 승인과 권한 변경 등 사용자·관리자 API 운영
- PostgreSQL에 사용자, 관리자, 알림과 일정 관련 데이터를 저장·조회
- 공통 미들웨어에서 CORS, 요청 로그, 장애 복구와 요청 처리량 제한 적용

### Kafka·WebSocket 알림 전달

- Kafka의 TMS 알림 토픽을 consumer group으로 구독
- 사용자가 설정한 제외 조건을 반영해 전달할 알림 선별
- 로그인 상태를 확인한 WebSocket 연결에 알림을 실시간 broadcast
- 세션 만료와 연결 종료 시 사용자 상태와 WebSocket 연결 정리

## 담당 범위

기존 구조를 새로 설계한 것으로 표현하지 않고, 다음 범위의 실무 경험으로 정리했습니다.

- 여러 TMS 서비스로 연결되는 라우팅과 reverse proxy 코드 유지보수
- 사용자·세션·권한 관련 API 및 데이터 처리 기능 보완
- Kafka 소비부터 WebSocket 전달까지 이어지는 알림 흐름의 이슈 대응
- 신규 TMS 서비스나 변경된 연동 조건을 게이트웨이에 반영하는 추가 개발
- Docker 실행 환경, 환경설정과 Swagger/OpenAPI 문서 유지보수

## 결과

마이크로서비스로 분리된 TMS 백엔드의 공통 진입점을 운영하면서 서비스별 연결 관계와 인증·권한·알림 흐름을 파악하고, 기존 시스템을 안정적으로 유지하는 동시에 필요한 변경 사항을 반영했습니다.
