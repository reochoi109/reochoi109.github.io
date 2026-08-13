+++
title = "Nodalite"
type = "products"
index = 1
status = "live"
status_label = "공개 운영"
subtitle = "SQL과 ERD를 하나의 작업 흐름으로 연결하는 데이터베이스 설계 도구"
description = "가볍게 사용할 수 있는 Web ERD 도구와 프로젝트 중심의 Desktop 작업 환경을 함께 배포했습니다. SQL과 ERD를 오가며 데이터베이스 구조를 설계하고 이해하는 과정을 하나의 작업 흐름으로 연결합니다."
list_description = "SQL과 ERD를 하나의 작업 공간에서 함께 다루는 데이터베이스 설계 도구입니다."
visual_image = "/images/products/nodalite/desktop-start.png"
site_url = "https://nodalite.com"
site_label = "nodalite.com"
stack = ["Next.js", "React", "TypeScript", "Electron"]

[[facts]]
label = "상태"
value = "공개 운영"

[[facts]]
label = "대상"
value = "데이터베이스 구조를 설계하거나 SQL을 시각화하려는 사용자"
+++

## 개요

Nodalite는 SQL과 ERD를 하나의 작업 흐름에서 함께 다루는 데이터베이스 설계 도구입니다. 빠르게 구조를 확인하는 Web과 프로젝트 단위로 지속해서 작업하는 Desktop 앱으로 역할을 나눠 제공하고 있습니다.

{{< product-record image="/images/products/nodalite/desktop-full-workspace.png" alt="Nodalite Desktop 전체 작업 공간" caption="프로젝트 탐색기, ERD 캔버스와 AI 데이터베이스 작업을 한 화면에서 이어가는 Desktop 전체 작업 공간" >}}

## 배경

백엔드 개발을 하면서 데이터베이스 구조를 확인하기 위해 ERD 도구를 사용하는 일이 많았습니다.

하지만 실제 개발에서는 ERD만 따로 그리기보다 SQL을 작성하거나 기존 DDL을 확인하면서 데이터베이스 구조를 파악하는 경우가 많았습니다. SQL은 에디터에서 작성하고, 전체 구조를 확인하려면 별도의 ERD 도구로 이동해야 했습니다.

반대로 ERD에서 구조를 먼저 설계하더라도 실제 프로젝트에서 사용하려면 다시 SQL로 옮기는 과정이 필요했습니다.

**SQL과 ERD를 서로 다른 작업으로 나누지 않고 하나의 작업 흐름 안에서 함께 다룰 수 없을까?**

Nodalite는 이 질문에서 시작했습니다.

## 기획

### 사용자와 사용 맥락

데이터베이스를 다루는 상황은 크게 두 가지로 나눠봤습니다.

하나는 SQL을 빠르게 시각화하거나 작은 구조를 확인하는 **가벼운 작업**이고, 다른 하나는 실제 프로젝트의 데이터베이스를 지속적으로 설계하고 수정하는 **프로젝트 단위의 작업**입니다.

* 기존 SQL의 구조를 빠르게 ERD로 확인하고 싶은 경우
* 작은 데이터베이스 구조를 설치 없이 간단하게 설계하는 경우
* 새로운 프로젝트의 데이터베이스를 처음부터 설계하는 경우
* 기존 프로젝트의 SQL과 ERD를 함께 보면서 구조를 파악하는 경우
* 테이블과 관계가 많아 SQL만으로 전체 구조를 이해하기 어려운 경우
* 개발 과정에서 데이터베이스 구조를 지속적으로 수정하고 관리하는 경우

이 두 사용 맥락을 하나의 인터페이스에 모두 담기보다 **Web과 Desktop의 역할을 나누어 개발하는 방향**을 선택했습니다.

### Web과 Desktop

Nodalite는 같은 데이터베이스 설계 경험을 공유하면서도 사용 목적에 따라 Web과 Desktop을 다르게 구성하고 있습니다.

#### Web — 빠르고 가벼운 ERD 작업

Web은 설치 없이 바로 접근할 수 있는 가벼운 ERD 도구입니다.

SQL을 입력해 데이터베이스 구조를 빠르게 시각화하거나, 몇 개의 테이블과 관계를 간단하게 설계하는 상황을 우선합니다.

별도의 프로젝트 환경을 구성하지 않고 브라우저를 열어 바로 사용할 수 있도록 해 **접근성과 빠른 확인**에 초점을 맞췄습니다.

#### Desktop — 프로젝트 중심의 DB 작업 환경

Desktop은 Nodalite가 지향하는 본격적인 제품에 가깝습니다.

실제 개발에서는 ERD를 한 번 만들고 끝내기보다 프로젝트의 SQL과 데이터베이스 구조가 계속 변경됩니다. 따라서 단순한 다이어그램 편집기보다 개발 과정에서 지속적으로 열어두고 사용할 수 있는 작업 환경이 필요하다고 판단했습니다.

Electron 기반 Desktop에서는 프로젝트와 파일을 중심으로 SQL 작성, ERD 시각화, 관계 탐색과 데이터베이스 설계를 하나의 작업 공간에서 이어갈 수 있도록 개발하고 있습니다.

Web이 **필요할 때 빠르게 사용하는 도구**라면, Desktop은 **실제 프로젝트와 함께 지속적으로 사용하는 데이터베이스 작업 환경**을 목표로 합니다.

### 두 가지 설계 흐름

데이터베이스 작업은 항상 같은 지점에서 시작하지 않습니다.

새 프로젝트에서는 ERD에서 구조를 먼저 설계할 수 있고, 기존 프로젝트에서는 이미 작성된 SQL에서 시작하는 경우가 많습니다.

Nodalite는 두 경우 모두 같은 작업 흐름으로 이어질 수 있도록 구성했습니다.

{{< product-workflow title="두 가지 ERD 설계 흐름" >}}
{
  "nodes": [
    { "id": "new", "label": "새 프로젝트" },
    { "id": "create", "label": "ERD 생성" },
    { "id": "table", "label": "테이블 추가" },
    { "id": "columns", "label": "컬럼·타입·Key 설정" },
    { "id": "relation", "label": "관계 연결" },
    { "id": "existing", "label": "기존 프로젝트" },
    { "id": "import", "label": "SQL Import" },
    { "id": "parse", "label": "SQL 분석" },
    { "id": "visualize", "label": "ERD 변환" },
    { "id": "workspace", "label": "구조 확인·수정" },
    { "id": "sql", "label": "SQL 확인" }
  ],
  "edges": [
    ["new", "create"],
    ["create", "table"],
    ["table", "columns"],
    ["columns", "relation"],
    ["relation", "workspace"],
    ["existing", "import"],
    ["import", "parse"],
    ["parse", "visualize"],
    ["visualize", "workspace"],
    ["workspace", "sql"]
  ]
}
{{< /product-workflow >}}

새로운 데이터베이스라면 빈 캔버스에서 테이블과 컬럼, 관계를 직접 설계할 수 있습니다.

기존 프로젝트라면 SQL DDL을 가져와 테이블, 컬럼, Key와 관계를 분석하고 ERD로 변환해 전체 구조부터 확인할 수 있습니다.

출발점은 다르지만 이후에는 같은 구조를 보면서 수정하고 SQL과 ERD를 오갈 수 있도록 하는 것이 핵심입니다.

## 와이어프레임

프로젝트 시작부터 SQL 편집, ERD 탐색, AI 변경 검토까지 핵심 작업 공간과 상태를 설계했습니다.

{{< product-wireframes product="nodalite" >}}

## 주요 기능

### 작업 공간 설계

Desktop은 일반적인 다이어그램 편집기보다 개발자가 익숙하게 사용할 수 있는 **IDE 형태의 작업 공간**을 선택했습니다.

ERD를 완성된 그림이 아니라 프로젝트와 함께 계속 변경되는 설계 정보로 봤기 때문입니다.

프로젝트와 파일을 탐색하면서 필요한 SQL을 열고, ERD에서 전체 데이터베이스 구조를 확인하고, 다시 세부 구조를 수정하는 작업을 하나의 화면 안에서 이어갈 수 있도록 구성하고 있습니다.

테이블은 캔버스 위에서 자유롭게 배치할 수 있으며 컬럼의 데이터 타입과 Primary Key, Foreign Key 등의 정보를 구조적으로 확인할 수 있습니다.

{{< product-gallery >}}
{
  "title": "Desktop 작업 화면",
  "items": [
    { "image": "/images/products/nodalite/desktop-start.png", "alt": "Nodalite Desktop 시작 화면", "caption": "새 프로젝트를 만들거나 기존 SQL 프로젝트 폴더를 여는 시작 화면" },
    { "image": "/images/products/nodalite/desktop-start-closeup.png", "alt": "Nodalite Desktop 프로젝트 시작", "caption": "새 프로젝트 생성과 기존 폴더 열기" },
    { "image": "/images/products/nodalite/desktop-erd-canvas.png", "alt": "Nodalite Desktop ERD Canvas", "caption": "프로젝트 탐색기와 전체 ERD를 함께 보는 작업 공간" },
    { "image": "/images/products/nodalite/sql-erd-split.png", "alt": "Nodalite SQL과 ERD 분할 화면", "caption": "SQL과 ERD를 나란히 확인하는 분할 작업 화면" },
    { "image": "/images/products/nodalite/large-erd.png", "alt": "Nodalite 대규모 ERD", "caption": "여러 도메인과 관계를 색상으로 구분한 대규모 ERD" }
  ]
}
{{< /product-gallery >}}

### SQL에서 ERD로

기존 프로젝트의 데이터베이스를 확인하기 위해 이미 존재하는 구조를 ERD에 다시 입력하는 것은 불필요한 반복이라고 생각했습니다.

Nodalite에서는 PostgreSQL DDL을 입력하면 `CREATE TABLE`, 컬럼 타입, Primary Key, Foreign Key 등의 정보를 분석해 내부 데이터 구조로 변환하고 ERD로 시각화합니다.

SQL은 같은 구조라도 여러 형태로 작성될 수 있기 때문에 정해진 한 가지 문법 패턴만 처리하기보다 서로 다른 PostgreSQL 표현을 최대한 같은 데이터베이스 구조로 해석하는 방향으로 Parser를 개발하고 있습니다.

이를 통해 기존 프로젝트에서는 **SQL → 구조 분석 → ERD** 흐름으로 빠르게 전체 데이터베이스를 파악할 수 있도록 했습니다.

### 관계를 더 빠르게 읽기

ERD의 규모가 커지면 테이블보다 관계를 읽는 일이 어려워집니다.

여러 관계선이 교차하기 시작하면 특정 컬럼이 어느 테이블과 연결되어 있는지 선을 따라가며 확인해야 하기 때문입니다.

그래서 관계를 선택했을 때 해당 Edge가 다른 관계보다 명확하게 드러나도록 시각적인 하이라이트를 적용했습니다.

선의 색상만 변경하는 방식보다 연결된 경로 자체를 쉽게 따라갈 수 있도록 작은 점이나 점선이 관계선을 따라 이동하는 애니메이션을 사용했습니다.

1:N과 N:M 같은 관계도 동일한 시각 체계 안에서 읽을 수 있도록 구성하고 있습니다.

### Web은 더 단순하게

Desktop이 프로젝트 단위의 지속적인 작업에 초점을 맞춘다면 Web에서는 의도적으로 기능과 화면 구조를 가볍게 유지하고 있습니다.

프로젝트 환경을 구성하지 않아도 SQL을 입력해 바로 ERD를 확인하고, 테이블을 추가하거나 관계를 수정할 수 있는 흐름을 우선합니다.

Desktop의 모든 기능을 Web에 그대로 옮기는 것이 아니라 **브라우저에서 ERD가 필요한 순간 빠르게 사용할 수 있는 도구**라는 역할을 유지하는 것이 기준입니다.

## 설계 및 구현

### AI는 어디에 필요한가

Desktop을 프로젝트 중심의 작업 환경으로 확장하면서 AI 역시 단순한 채팅 기능보다 **현재 데이터베이스 구조를 이해하고 실제 설계 작업을 보조하는 기능**으로 활용하는 방향을 검토하고 있습니다.

사용자가 자연어로 테이블 추가나 관계 변경을 요청하면 현재 프로젝트와 스키마를 바탕으로 필요한 변경을 제안하고, 사용자가 확인한 이후 ERD와 SQL에 반영하는 방식입니다.

또한 현재 데이터베이스 구조를 분석해 관계나 설계상 확인할 부분을 설명하거나 SQL 변경안을 제시하는 데이터베이스 에이전트로 확장하는 것을 목표로 하고 있습니다.

AI가 사용자의 데이터베이스를 임의로 변경하는 것보다 **현재 구조 파악 → 변경 제안 → 사용자 확인 → 적용**의 흐름을 기본 원칙으로 두고 있습니다.

현재 데이터베이스 구조를 읽고 설명하거나 변경 작업을 수행하는 기본 기능을 구현했으며, 요청 과정과 수행 결과를 사용자가 확인할 수 있도록 작업 상태를 분리했습니다.

{{< product-gallery >}}
{
  "title": "AI 데이터베이스 작업",
  "items": [
    { "image": "/images/products/nodalite/ai-request.png", "alt": "Nodalite AI 작업 요청", "caption": "현재 데이터베이스 구조 설명을 요청하고 진행 상태를 확인하는 화면" },
    { "image": "/images/products/nodalite/ai-result.png", "alt": "Nodalite AI 작업 결과", "caption": "스키마 분석 결과와 실제 파일 변경 여부를 확인하는 화면" }
  ]
}
{{< /product-gallery >}}

## 결과

### 배포한 기능

PostgreSQL을 우선 대상으로 Web과 Desktop의 핵심 기능을 구현해 배포했습니다.

**Web**

* SQL 입력 및 ERD 변환
* ERD 캔버스
* 다중 테이블 렌더링
* 테이블 이동과 위치 관리
* 컬럼 및 데이터 타입 표현
* Primary Key / Foreign Key 표현
* 테이블 관계 및 Edge 렌더링
* 간단한 ERD 편집

**Desktop**

* Electron 기반 데스크톱 애플리케이션
* 프로젝트 중심 작업 공간
* 파일 및 SQL 작업 구조
* ERD 캔버스
* PostgreSQL DDL 분석
* SQL과 ERD를 연결하기 위한 데이터 모델
* 관계 탐색 및 Edge 하이라이트
* Web보다 지속적인 데이터베이스 설계 작업에 적합한 UI 구조

SQL Parser는 PostgreSQL부터 지원 범위를 넓히고 있으며 Index를 포함한 데이터베이스 객체와 다양한 DDL 표현을 순차적으로 지원할 계획입니다.

### 다음 단계

현재 가장 중요한 목표는 기능의 수를 늘리는 것보다 **SQL과 ERD 사이의 왕복 작업을 자연스럽게 만드는 것**입니다.

SQL을 변경했을 때 ERD가 어떻게 바뀌어야 하는지, 반대로 ERD에서 변경한 구조를 어떤 SQL로 표현할지에 대한 일관된 데이터 모델을 만드는 것이 핵심 과제입니다.

Desktop에서는 여기에 프로젝트와 파일이라는 실제 개발 환경의 맥락까지 연결해야 합니다.

이 기반을 먼저 안정화한 뒤 Index와 추가 PostgreSQL 문법, 대규모 ERD 탐색 기능, AI 기반 데이터베이스 설계 보조 기능으로 확장할 계획입니다.

## 회고

처음에는 ERD 화면에 테이블을 그리고 관계를 연결하는 기능에서 시작했습니다.

하지만 실제 제품으로 확장하면서 ERD는 단순한 그림이 아니라 **SQL이라는 텍스트 표현과 데이터베이스의 논리적인 구조를 연결하는 인터페이스**라는 점이 더 중요해졌습니다.

또한 같은 ERD 기능이라도 사용 상황에 따라 필요한 제품의 형태가 다르다는 점을 고민하게 됐습니다.

빠르게 SQL 구조를 확인하려는 사용자에게는 설치와 프로젝트 관리 기능이 오히려 부담이 될 수 있지만, 실제 프로젝트의 데이터베이스를 계속 관리하려는 사용자에게는 단순한 웹 도구만으로는 작업의 연속성을 제공하기 어렵습니다.

그래서 Nodalite를 모든 기능을 하나의 화면에 넣는 서비스로 만들기보다 **가벼운 Web과 프로젝트 중심 Desktop으로 역할을 나누고, 각각의 사용 맥락에 필요한 경험을 만드는 방향**으로 개발하고 있습니다.

현재 Nodalite는 Web과 Desktop 버전을 배포해 운영하고 있습니다. 앞으로도 기능의 수보다 실제 데이터베이스 작업에서 SQL과 ERD 사이의 불필요한 이동을 얼마나 줄일 수 있는지를 기준으로 제품을 개선할 계획입니다.
