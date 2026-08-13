+++
type = "products"
aliases = ["/ko/side-projects/slowmind/"]
title = "Slow Mind"
date = 2026-07-20T00:00:00+09:00
subtitle = "무료 명상·집중 웹 앱"
description = "여섯 가지 자연 환경의 영상과 앰비언트 사운드, 집중 타이머를 제공하는 가벼운 명상 웹 앱입니다. 가입이나 설치 없이 바로 사용할 수 있습니다."
list_description = "가입 없이 자연 환경 영상과 사운드, 집중 타이머를 바로 사용할 수 있는 명상 웹 앱입니다."
index = 4
status = "live"
status_label = "공개 운영"
visual_image = "/images/products/slowmind/landing.png"
site_url = "https://slowmind.xyz"
site_label = "slowmind.xyz"

[[facts]]
label = "상태"
value = "공개 운영"

[[facts]]
label = "핵심 경험"
value = "명상 환경 · 집중 타이머"
+++

## 개요

Slow Mind는 자연 환경 영상과 앰비언트 사운드, 집중 타이머를 한 화면에서 제공하는 무료 웹 앱입니다. 가입이나 설치 없이 원하는 환경을 선택하고 바로 명상 또는 집중을 시작할 수 있도록 만들었습니다.

{{< product-record image="/images/products/slowmind/landing.png" alt="Slow Mind 메인 화면" caption="원하는 자연 환경을 선택하고 명상 또는 집중을 바로 시작하는 메인 화면" >}}

## 배경

잠시 마음을 가라앉히거나 집중을 시작하고 싶을 때, 회원가입이나 복잡한 설정 없이 바로 사용할 수 있는 작은 도구를 만들고 싶었습니다.

많은 명상 콘텐츠를 탐색하게 하기보다 **원하는 환경을 고르고 그 안에 머무르는 경험**에 집중해 Slow Mind를 만들었습니다.

## 기획

기능의 수보다 시작까지 필요한 단계를 줄이는 것을 우선했습니다.

- 회원가입이나 설치 없이 바로 시작할 수 있을 것
- 화면과 소리가 서로 사용자의 주의를 빼앗지 않을 것
- 별도 설명 없이 핵심 조작을 이해할 수 있을 것
- 짧은 휴식과 긴 집중 세션을 모두 지원할 것
- 콘텐츠를 탐색하기보다 선택한 환경에 머물 수 있을 것

## 와이어프레임

공개 페이지와 명상·집중 모드의 핵심 플레이어 상태를 전체 페이지 단위로 설계했습니다.

{{< product-wireframes product="slowmind" >}}

## 주요 기능

### 자연 환경 선택과 명상 모드

사용자는 Forest, Ocean, Space, Mountain, Rain, Sky 중 원하는 자연 환경을 선택할 수 있습니다. 각 환경에는 영상과 앰비언트 사운드를 함께 제공하고, 재생·일시 정지·음소거·볼륨처럼 꼭 필요한 조작만 남겼습니다.

{{< product-gallery >}}
{
  "title": "주요 화면",
  "items": [
    { "image": "/images/products/slowmind/environment-selection.png", "alt": "Slow Mind 자연 환경 선택 화면", "caption": "여섯 가지 자연 환경 중 현재 필요한 분위기를 선택하는 화면" },
    { "image": "/images/products/slowmind/meditation-mode.png", "alt": "Slow Mind 명상 모드 화면", "caption": "핵심 재생 제어만 남긴 명상 화면" },
    { "image": "/images/products/slowmind/focus-timer.png", "alt": "Slow Mind 집중 타이머 화면", "caption": "짧은 휴식과 집중 작업을 위한 Focus Mode" }
  ]
}
{{< /product-gallery >}}

명상 모드에서는 화면과 소리가 사용자의 주의를 빼앗지 않도록 조작 요소를 최소화했습니다. 콘텐츠를 계속 탐색하기보다 선택한 환경에 머물 수 있도록 시각적 정보의 밀도를 낮췄습니다.

### 집중 타이머

같은 자연 환경을 명상뿐 아니라 조용한 작업에도 사용할 수 있도록 Focus Mode를 구성했습니다.

5분, 10분, 15분, 30분 타이머와 시간 제한이 없는 세션을 제공해 짧은 호흡부터 집중 작업까지 하나의 경험 안에서 이어갈 수 있도록 했습니다.

## 설계 및 구현

영상과 사운드, 타이머를 하나의 상태 흐름으로 연결하고 사용자가 환경을 바꾸더라도 핵심 조작 방식은 달라지지 않도록 구성했습니다. 재생·일시 정지·음소거·볼륨처럼 세션에 필요한 조작만 남기고 계정이나 별도 저장 기능은 제외했습니다.

## 결과

Slow Mind는 현재도 무료로 공개 운영하고 있습니다.

이 제품에서 계속 확인하는 기준은 기능의 수가 아니라 **사용자가 필요하다고 느낀 순간 얼마나 적은 단계로 시작할 수 있는가**입니다.

## 회고

작은 서비스일수록 기능을 추가하는 일보다 사용자가 바로 목적에 도달하도록 방해 요소를 제거하는 일이 중요하다는 점을 확인했습니다. 앞으로도 콘텐츠의 양보다 시작 속도와 세션의 몰입감을 기준으로 개선할 계획입니다.
