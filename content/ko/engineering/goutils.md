+++
aliases = ["/ko/projects/goutils/"]
title = "GOUTILS: 사내 공용 Go 모듈"
date = 2025-01-02T00:00:00+09:00
type = "engineering"
field = "Backend Development"
field_index = 1
list_title = "GOUTILS"
period = "2025.01 - 2025.07"
org = "㈜라온로드"
subtitle = "Backend Module | 2025.01 - 2025.07"
description = "프로젝트마다 반복되거나 다르게 구현된 백엔드 기능을 공용 Go 모듈로 구성하고, 사내 서비스에서 버전별로 사용할 수 있도록 배포·문서화했습니다."
index = 4
visual_text = ""
visual_image = [
  "/images/career/goutils/overview.png",
]

tasks = [
  { title = "공용 모듈 설계·개발", desc = "데이터베이스 연결, 로깅, 메시지 처리, 실시간 통신, 입력값 검증 등 반복되는 백엔드 기능을 모듈화했습니다." },
  { title = "버전 관리·배포", desc = "Bitbucket 저장소의 Git tag로 버전을 관리하고 각 서비스의 go.mod에서 필요한 버전을 참조하도록 구성했습니다." },
  { title = "문서화·적용", desc = "패키지별 사용 방법과 릴리스 내역을 Confluence에 문서화하고 실제 서비스에 적용했습니다." },
]

stack = ["Go", "go.mod", "Bitbucket", "Confluence"]
tags = ["project", "platform", "golang", "module", "backend"]
+++

## 프로젝트 개요

기존 서비스에는 데이터베이스 연결, 로깅, 메시지 처리와 실시간 통신처럼 반복되는 코드가 있었고, 프로젝트마다 구현 방식과 버전이 달랐습니다. 공통으로 사용할 수 있는 기능을 **goutils** 모듈로 분리해 직접 설계·개발했습니다.

## 구성한 기능

- 데이터베이스 연결과 풀 관리
- 로깅과 입력값 검증
- Kafka 메시지 처리
- WebSocket 등 실시간 통신
- HTTP 연동과 공통 응답 처리
- 파일 처리와 운영에 필요한 공통 기능

## 배포와 문서화

goutils는 Bitbucket private 저장소에서 관리했습니다. Git tag로 버전을 구분하고, 각 서비스의 go.mod에서 필요한 버전을 참조하도록 배포했습니다.

패키지별 사용 방법과 릴리스 내역은 Confluence에 문서화했고, 디지털 트윈 중계 서버를 포함한 실제 서비스에서 사용했습니다.

## 담당 범위

모듈 구조 설계, 기능 개발, 버전 관리 방식, 사내 배포와 문서화를 전담했습니다.
