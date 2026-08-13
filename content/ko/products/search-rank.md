+++
title = "검색 노출 순위 확인 도구"
type = "products"
project_group = "work-improvement"
status = "internal"
status_label = "업무 도구"
subtitle = "반복적인 광고 상품 노출 확인을 자동화한 업무 도구"
description = "검색 키워드와 판매처를 입력하면 PC·모바일 환경의 쇼핑·검색 채널에서 상품 노출 여부와 순위를 일괄 확인하고 결과를 정리합니다."
list_description = "반복적인 광고 상품 검색과 순위 기록을 일괄 조회 흐름으로 바꾼 업무 개선 도구입니다."
visual_image = "/images/tools/search-rank/dashboard.png"

[[facts]]
label = "구분"
value = "업무 개선 도구"

[[facts]]
label = "핵심 기능"
value = "검색 노출·순위 일괄 확인"
+++

## 개요

검색 노출 순위 확인 도구는 광고 상품이 여러 검색 환경에서 실제로 노출되는지 반복해서 확인하던 작업을 줄이기 위해 만들었습니다. 검색 키워드와 판매처를 입력하면 최대 20개 항목을 한 번에 조회하고, 채널별 노출 여부와 순위를 확인할 수 있습니다.

{{< product-record image="/images/tools/search-rank/dashboard.png" alt="검색 노출 순위 확인 도구 대시보드" caption="키워드와 판매처, 검색 환경을 설정하고 결과를 한 번에 확인하는 화면" >}}

## 배경

퍼포먼스 마케팅 실무자는 광고 상품의 노출 상태를 확인하기 위해 같은 키워드를 PC와 모바일, 쇼핑과 일반 검색에서 반복해서 조회하고 결과를 따로 기록하고 있었습니다.

이 과정은 판단이 필요한 업무라기보다 동일한 검색과 기록을 되풀이하는 작업에 가까웠습니다. 그래서 확인 조건을 한 번 입력하면 여러 항목을 순서대로 조회하고 결과를 정리하는 도구로 바꿨습니다.

## 작업 흐름

{{< product-workflow title="검색 노출 확인 흐름" >}}
{
  "nodes": [
    { "id": "input", "label": "키워드·판매처 입력" },
    { "id": "channel", "label": "검색 환경 선택" },
    { "id": "check", "label": "최대 20개 일괄 확인" },
    { "id": "review", "label": "노출·순위 검토" },
    { "id": "export", "label": "스크린샷·CSV 저장" }
  ],
  "edges": [
    ["input", "channel"],
    ["channel", "check"],
    ["check", "review"],
    ["review", "export"]
  ]
}
{{< /product-workflow >}}

## 주요 기능

- 최대 20개 키워드·판매처 조합 일괄 확인
- PC·모바일 환경과 검색 채널 선택
- 상품 노출 여부와 확인된 순위 정리
- 확인 화면 스크린샷과 결과 CSV 저장

{{< product-record image="/images/tools/search-rank/demo.gif" alt="검색 노출 순위 확인 도구 실행 화면" caption="설정한 항목을 순서대로 조회하고 결과를 정리하는 실제 실행 화면" >}}

## 결과

반복 검색과 수기 기록에 쓰이던 단계를 하나의 확인 흐름으로 묶었습니다. 이를 통해 사용자는 검색 자체보다 결과를 검토하고 다음 조치를 판단하는 일에 더 집중할 수 있게 됐습니다.

외부 검색 결과는 시점과 채널 환경에 따라 달라질 수 있으므로, 이 도구는 절대적인 순위를 보장하는 분석 서비스가 아니라 반복 확인을 보조하는 업무 도구로 설계했습니다.
