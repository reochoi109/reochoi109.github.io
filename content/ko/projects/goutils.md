+++
title = "GOUTILS: 사내 공용 Go 유틸 라이브러리"
date = 2026-05-02T00:00:00+09:00
type = "Web"
period = "2023.05 - 2025.08"
org = "Backend Platform (Internal)"
subtitle = "Backend Platform | 2023.05 - 2025.08"
description = "서비스마다 반복되던 인프라 코드를 공용 Go 모듈로 표준화해, 로깅/검증/DB풀/HTTP/Kafka/WebSocket/RTSP 등 재사용 가능한 패키지로 제공했습니다."
index = 4
visual_text = ""
visual_image = [
  "/images/projects/goutils/ko/goutils-overview.svg",
  "/images/projects/goutils/ko/goutils-packages.svg",
]

tasks = [
  { title = "표준화 패키지 제공", desc = "로깅(logrus+lumberjack), 입력 검증(validator), 공통 API 응답/에러 포맷, gin middleware 등 서비스 공통 규격을 패키지로 정리했습니다." },
  { title = "인프라 연동 유틸", desc = "DB/DB풀(Postgres·MySQL), HTTP 클라이언트(resty), 스케줄러/배치 유틸, 파일 압축/정리 등 운영에 필요한 도구들을 모듈화했습니다." },
  { title = "실시간/네트워크 모듈", desc = "Kafka, WebSocket, RTSP(client/server), TCP(gnet) 등 실시간/네트워크 기능을 재사용 가능한 구성 패턴으로 제공했습니다." },
]

stack = ["Go", "logrus+lumberjack", "pgx/mysql", "resty", "kafka-go", "gorilla/websocket", "gortsplib"]
tags = ["project", "platform", "golang", "library", "backend"]
+++

## 요약

팀 내에서 자주 재사용되는 “인프라성 코드”를 패키지 단위로 분리해, 신규 서비스가 빠르게 동일한 표준을 적용할 수 있도록 했습니다.
