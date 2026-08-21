+++
aliases = ["/ko/engineering/odin/", "/ko/projects/odin/"]
title = "AI 영상관제 솔루션 Odin 서버 개발"
date = 2026-05-02T00:00:00+09:00
type = "career"
field = "Backend Development"
field_index = 1
career_title = "백엔드 개발"
list_title = "Odin 서버"
period = "2025.01 - 2025.04"
org = "라온로드"
employer = "라온로드"
employer_index = 1
employer_url = "https://www.laonroad.com/"
employment_period = "2023.05 - 2025.08"
company_url = "https://www.laonroad.com/"
company_label = "회사 홈페이지"
official_url = "https://laonpeople.com/odinai-server/"
official_label = "Odin AI Server 공식 페이지"
blog_url = "https://laonpeople.com/blog/%EA%B7%B8%EB%9E%98%EC%84%9C-%EB%AD%90%EA%B0%80-%EC%A2%8B%EC%95%84%EC%A7%84-%EA%B1%B4%EB%8D%B0-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EA%B4%80%EC%A0%9C%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-5%EA%B0%80/"
blog_label = "Odin AI 공식 블로그"
subtitle = "Backend Development | 2025.01 - 2025.04"
description = "AI 영상관제 솔루션 Odin 서버 개발"
index = 2
visual_text = ""
visual_image = [
  "/images/career/odin/overview.jpg",
]

tasks = [
  { title = "이벤트 알림 + 스냅샷 보관", desc = "이벤트 hook을 받아 DB 저장 후 WebSocket 브로드캐스트 파이프라인을 구성하고, 스냅샷(Base64)을 파일로 저장/보관 정책 기반으로 정리했습니다." },
  { title = "BBox 오버레이(카메라별 WS)", desc = "추론 결과를 카메라 idx로 라우팅해 카메라별 WebSocket 포트로 BBox 좌표를 실시간 전송했습니다." },
  { title = "RTSP → WebSocket Relay", desc = "RTSP(H264) 수신 후 NALU 단위로 WebSocket 릴레이, 재연결/주기 갱신과 이벤트 전후 프레임 버퍼링을 적용했습니다." },
]

stack = ["Go", "Gin", "gorilla/websocket", "PostgreSQL", "RTSP(H264)", "Redis(옵션)"]
tags = ["project", "backend", "streaming", "websocket", "video"]
+++

## 프로젝트 개요

Odin AI Server는 VLM 영상 분석과 관제 기능을 결합한 다채널 AI 영상관제 솔루션입니다. 공식 제품 구조는 카메라 스트림을 수집·분배하는 영상중계 서버와 Multi-GPU 영상분석 서버를 분리하고, RTSP·ONVIF 같은 표준 프로토콜로 기존 CCTV를 연동합니다.

이 프로젝트에는 라온로드 소속 개발자로 참여해 라온피플과 협업했습니다.

저는 서버 개발의 일부에 참여해 분석 이벤트, 객체 위치(BBox), 실시간 영상 스트림을 운영 화면에 전달하는 기능을 구현했습니다.

## 프로젝트 목적

제품 전체는 대규모 CCTV 환경의 영상을 안정적으로 수집·분배하고 VLM 분석 결과를 실제 관제 업무에 활용할 수 있도록 하는 것을 목표로 합니다.

제가 맡은 기능의 목적은 분석 서버에서 생성된 이벤트와 객체 위치를 운영자에게 즉시 전달하고, 브라우저에서 카메라 영상을 확인하며 이벤트 전후 상황과 스냅샷을 함께 검토할 수 있도록 하는 것이었습니다.

## 담당 역할

제품 서버 전체가 아니라 실시간 관제에 필요한 일부 백엔드 기능을 담당했습니다. 이벤트 알림과 스냅샷 보관, 카메라별 BBox 오버레이 전달, RTSP 영상의 WebSocket 중계를 개발했습니다.

## 주요 구현

### 이벤트 알림과 스냅샷 관리

- 이벤트 hook 수신
- 이벤트 데이터 PostgreSQL 저장
- WebSocket을 통한 이벤트 브로드캐스트
- Base64 스냅샷 파일 저장과 보관 정책 기반 정리

### 카메라별 BBox 오버레이

- 추론 결과를 카메라 idx 기준으로 라우팅
- 카메라별 WebSocket 포트를 통해 BBox 좌표 실시간 전송

### RTSP 영상 중계

- RTSP(H264) 스트림 수신
- H264 데이터를 NALU 단위로 WebSocket 릴레이
- 스트림 재연결과 주기 갱신
- 이벤트 전후 프레임 버퍼링

## 문제 해결 및 개선

### 스냅샷 파일 보관

이벤트 hook에 포함된 Base64 스냅샷을 파일로 저장하고 보관 정책에 따라 정리하도록 구성했습니다.

### 영상 중계 안정성

RTSP 스트림에 재연결과 주기 갱신을 적용하고, 이벤트 발생 시점의 전후 영상을 전달할 수 있도록 프레임을 버퍼링했습니다.

## 결과

- 이벤트 저장과 WebSocket 알림 구성
- 카메라별 BBox 좌표 실시간 전달
- RTSP(H264) 영상의 WebSocket 중계
- 스냅샷 보관 정책과 이벤트 전후 프레임 처리 적용

## 참고

- 라온피플 공식 사이트: {{< reference-link url="https://laonpeople.com/odinai-server/" label="Odin AI Server" >}}
- 라온피플 공식 블로그: {{< reference-link url="https://laonpeople.com/blog/%EA%B7%B8%EB%9E%98%EC%84%9C-%EB%AD%90%EA%B0%80-%EC%A2%8B%EC%95%84%EC%A7%84-%EA%B1%B4%EB%8D%B0-%EC%83%9D%EC%84%B1%ED%98%95-ai-%EA%B4%80%EC%A0%9C%EB%A1%9C-%EB%8B%AC%EB%9D%BC%EC%A7%84-5%EA%B0%80/" label="그래서 뭐가 좋아진 건데? 생성형 AI 관제로 달라진 5가지 변화" >}}
