+++
aliases = ["/ko/projects/goutils/"]
title = "GOUTILS 개발"
date = 2025-01-02T00:00:00+09:00
type = "engineering"
field = "Backend Development"
field_index = 1
list_title = "GOUTILS"
period = "2025.01 - 2025.07"
org = "㈜라온로드"
company_url = "https://www.laonroad.com/"
company_label = "회사 홈페이지"
subtitle = "Backend Module | 2025.01 - 2025.07"
description = "DB·로깅·검증부터 Kafka·WebSocket·RTSP까지 반복되는 백엔드 기능을 공용 Go 모듈로 구성하고, 사내 서비스에서 버전별로 사용할 수 있도록 배포·문서화했습니다."
index = 4
visual_text = ""
visual_image = [
  "/images/career/goutils/overview.png",
]

tasks = [
  { title = "백엔드 기반 기능 표준화", desc = "로깅, 입력 검증, PostgreSQL·MySQL 풀, HTTP 클라이언트와 공통 API 응답을 패키지로 분리했습니다." },
  { title = "통신·미디어 기능 공용화", desc = "Kafka, WebSocket, TCP 서버, RTSP client/server 등 서비스 간 통신과 영상 중계 기능을 모듈화했습니다." },
  { title = "검증·버전 배포·문서화", desc = "브랜치 기능을 서비스에서 먼저 검증하고 Git tag와 go.mod로 배포했으며 사용법과 릴리스 내역을 Confluence에 기록했습니다." },
]

stack = ["Go", "Go Modules", "Gin", "PostgreSQL", "MySQL", "Kafka", "WebSocket", "RTSP", "Bitbucket", "Confluence"]
tags = ["project", "platform", "golang", "module", "backend"]
+++

## 프로젝트 개요

**GOUTILS**는 여러 Go 백엔드 서비스에서 반복해서 사용하는 인프라성 코드를 패키지 단위로 분리한 사내 공용 Go 모듈입니다. 데이터베이스와 API 기반 기능부터 메시징, 실시간 통신, RTSP 영상 처리, 운영 유틸리티까지 제공하며 각 서비스가 필요한 버전을 `go.mod`에서 선택해 사용하도록 구성했습니다.

## 프로젝트 목적

기존 서비스에는 같은 기반 기능이 반복해서 구현되어 있었고, 프로젝트마다 구현 방식과 사용 중인 코드의 버전도 달랐습니다. 공통 기능을 하나의 모듈로 분리해 중복 구현을 줄이고, 서비스별 버전 의존성을 명확하게 관리하는 것이 목적이었습니다.

## 담당 역할

공용 모듈의 구조 설계와 기능 개발부터 Git tag 기반 버전 관리, 사내 서비스 배포 방식, 패키지 사용 문서와 릴리스 내역 작성까지 전담했습니다.

## 주요 구현

### Web·API와 데이터 처리

- PostgreSQL·MySQL 연결 풀과 트랜잭션 공통 인터페이스
- Gin 미들웨어, 공통 API 응답과 에러 코드 형식
- Resty 기반 HTTP 클라이언트
- 커스텀 검증 규칙과 Gin 입력값 검증

### 로깅과 설정

- Logrus 로그 형식·레벨 설정과 Lumberjack 기반 파일 로테이션
- 환경변수와 INI 설정 파일 로드
- CLI 인자와 로그 레벨 처리

### 메시징·실시간 통신·미디어

- Kafka reader·writer와 topic 관리
- WebSocket client·server와 메시지 브로드캐스트
- gnet 기반 TCP 서버와 클라이언트 관리
- RTSP H264 client 수신과 RTSP server 스트림 중계

### 운영 유틸리티

- 주기 실행 스케줄러와 집계 구간 계산
- SQL 배치 구성 보조
- gzip·tar.gz·zip 파일 처리와 오래된 파일 정리
- ping, 시간 형식 변환과 네트워크 정보 조회

### 버전 배포와 적용 흐름

{{< product-workflow title="GOUTILS 배포 흐름" layout="column" >}}
{
  "nodes": [
    { "id": "branch", "label": "기능 브랜치 개발" },
    { "id": "preview", "label": "pseudo-version 또는 replace로 참조" },
    { "id": "verify", "label": "대상 서비스에서 기능 검증" },
    { "id": "merge", "label": "브랜치 병합" },
    { "id": "tag", "label": "Git tag로 버전 생성" },
    { "id": "adopt", "label": "서비스 go.mod에서 정식 버전 적용" }
  ],
  "edges": [
    ["branch", "preview"],
    ["preview", "verify"],
    ["verify", "merge"],
    ["merge", "tag"],
    ["tag", "adopt"]
  ]
}
{{< /product-workflow >}}

## 문제 해결 및 개선

### 서비스마다 달라지는 공통 코드

같은 기능을 서비스마다 별도로 구현하거나 복사해 사용하면 수정 내용이 달라지고, 어떤 버전을 사용하는지 추적하기 어려웠습니다. 공용 코드를 별도 모듈로 분리하고 Bitbucket private 저장소에서 관리했습니다.

### 버전과 사용 방법 관리

기능 브랜치 개발 중에는 커밋 기반 pseudo-version 또는 `replace` 지시문으로 대상 서비스에서 변경 사항을 먼저 확인할 수 있도록 했습니다. 확인이 끝난 기능은 병합 후 Git tag로 버전을 구분하고, 각 서비스가 `go.mod`에서 필요한 정식 버전을 명시적으로 참조하도록 구성했습니다.

패키지별 사용 방법과 릴리스 내역은 Confluence에 기록해 모듈 적용과 버전 변경에 필요한 내용을 확인할 수 있도록 했습니다.

## 결과

- 반복되던 백엔드 기반 기능을 하나의 Go 모듈로 통합
- Web·DB부터 Kafka·WebSocket·TCP·RTSP까지 재사용 가능한 멀티 패키지 구성
- 서비스별 모듈 버전을 `go.mod`에서 명시하도록 구성
- 브랜치 변경 사항을 대상 서비스에서 먼저 검증할 수 있는 참조 방식 문서화
- 패키지 사용법과 릴리스 내역을 Confluence에 문서화
- 디지털트윈 중계 서버를 포함한 실제 사내 서비스에 적용

## 참고

- 라온로드 공식 홈페이지: {{< reference-link url="https://www.laonroad.com/" label="Laon Road" >}}
