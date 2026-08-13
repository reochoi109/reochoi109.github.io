+++
type = "products"
aliases = ["/ko/side-projects/schemapad/"]
title = "SchemaPad"
date = 2026-07-20T00:00:00+09:00
subtitle = "개인 개발자를 위한 무료 브라우저 기반 ERD 편집기"
description = "회원가입과 설치 없이 브라우저에서 데이터베이스 구조를 시각적으로 설계할 수 있는 개인용 ERD 편집기입니다. 작업 내용은 브라우저에 저장되며, 완성한 ERD를 SQL로 내보내거나 기존 SQL을 가져올 수 있습니다."
list_description = "회원가입 없이 브라우저에서 ERD를 설계하고 SQL을 가져오거나 내보낼 수 있는 무료 도구입니다."
index = 3
status = "live"
status_label = "공개 운영"
visual_image = "/images/products/schemapad/landing.png"
site_url = "https://schemapad.xyz"
site_label = "schemapad.xyz"
stack = ["Next.js", "React", "TypeScript", "React Flow", "Zustand", "Cloudflare Pages"]

[[facts]]
label = "상태"
value = "공개 운영"

[[facts]]
label = "대상"
value = "개인 프로젝트를 진행하는 개발자"
+++

## 개요

SchemaPad는 개인 개발자가 회원가입이나 설치 없이 브라우저에서 ERD를 설계하고 SQL을 가져오거나 내보낼 수 있는 무료 편집기입니다. 작업은 사용자의 브라우저에 저장되며, 데이터베이스 설계에 필요한 핵심 흐름에 제품 범위를 맞췄습니다.

{{< product-record image="/images/products/schemapad/landing.png" alt="SchemaPad 메인 화면" caption="회원가입 없이 브라우저에서 ERD 설계를 시작할 수 있는 SchemaPad 메인 화면" >}}

## 배경

개인 프로젝트를 진행하면서 데이터베이스 구조를 설계하기 위해 여러 ERD 도구를 사용했습니다. 협업, 클라우드 저장, 프로젝트 관리처럼 팀에게 유용한 기능을 제공하는 도구들이 있었지만, 혼자 작은 프로젝트를 만드는 상황에서는 필요한 기능보다 제품이 무겁거나 유료 플랜의 비용이 부담될 수 있다고 생각했습니다.

개인 개발자에게 필요한 것은 오히려 단순하다고 보았습니다. **회원가입이나 별도의 프로그램 설치 없이 브라우저에서 바로 테이블과 관계를 그리고, 설계가 끝나면 실제 개발에 사용할 SQL로 가져갈 수 있는 무료 도구를 만들 수 없을까**라는 질문에서 SchemaPad를 시작했습니다.

## 기획

### 사용자와 사용 맥락

SchemaPad의 주요 사용자는 사이드 프로젝트나 작은 서비스를 혼자 개발하면서 데이터베이스 구조를 설계하는 개발자로 정의했습니다.

- 새로운 프로젝트의 데이터베이스 구조를 시각적으로 설계하고 싶은 개발자
- 복잡한 협업 기능보다 빠른 ERD 작성이 필요한 사용자
- 프로그램 설치나 회원가입 없이 바로 작업하고 싶은 사용자
- 완성한 ERD를 실제 개발에 사용할 SQL로 옮기고 싶은 사용자
- 기존 SQL의 테이블과 관계를 시각적으로 확인하고 싶은 사용자

팀 단위의 협업이나 대규모 프로젝트 관리보다 **개인이 데이터베이스 구조를 만들고 수정하는 핵심 작업**에 제품의 범위를 맞췄습니다.

### 기획 기준

무료 개인용 도구라는 방향에 맞춰 어떤 기능을 추가할 것인지뿐만 아니라 **무엇을 제공하지 않을지도 함께 결정했습니다.**

- 회원가입 없이 바로 사용할 수 있을 것
- 별도의 프로그램을 설치하지 않아도 될 것
- SQL을 직접 작성하지 않아도 UI만으로 데이터베이스를 설계할 수 있을 것
- 테이블과 컬럼, Key, 관계를 시각적으로 편집할 수 있을 것
- 작업 내용은 외부 서버가 아닌 사용자의 브라우저에 저장할 것
- 완성한 구조를 실제 개발에 사용할 SQL로 내보낼 수 있을 것
- 기존 SQL도 ERD로 가져올 수 있을 것
- 개인 사용에 필수적이지 않은 클라우드 저장과 동기화는 제외할 것

클라우드 기능을 추가하는 대신 제품과 운영 구조를 가볍게 유지하고, 개인 사용자가 비용 부담 없이 사용할 수 있는 ERD 편집기에 집중했습니다.

## 주요 기능

### ERD 중심의 화면 설계

SchemaPad의 중심은 SQL을 작성하는 화면이 아니라 **ERD Canvas**입니다.

사용자가 별도의 설정 과정을 거치지 않고 바로 데이터베이스 구조를 만들 수 있도록 넓은 Canvas를 중심으로 편집 화면을 구성했습니다.

테이블에서는 PK, FK, Auto Increment, NULL 여부와 컬럼명, 데이터 타입, 기본값, Comment를 한 화면에서 확인할 수 있습니다. 각 속성은 UI에서 직접 수정할 수 있어 SQL을 먼저 작성하지 않고도 데이터베이스 구조를 설계할 수 있도록 했습니다.

테이블을 Canvas에 자유롭게 배치하고 관계를 연결하면서 개별 테이블의 구조와 데이터베이스 전체 관계를 동시에 확인할 수 있도록 구성했습니다.

{{< product-gallery >}}
{
  "title": "주요 화면",
  "items": [
    { "image": "/images/products/schemapad/erd-canvas.png", "alt": "SchemaPad ERD Canvas", "caption": "테이블과 관계를 설계하는 메인 Canvas" },
    { "image": "/images/products/schemapad/table-settings.png", "alt": "SchemaPad 테이블 상세 설정", "caption": "ERD의 맥락을 유지하는 테이블 설정 패널" },
    { "image": "/images/products/schemapad/erd-documents.png", "alt": "SchemaPad 문서 관리", "caption": "브라우저에 저장된 ERD 문서 관리 화면" },
    { "image": "/images/products/schemapad/table-navigation.png", "alt": "SchemaPad 테이블 탐색", "caption": "큰 ERD를 위한 Tables 패널과 Map" }
  ]
}
{{< /product-gallery >}}

### 설계 흐름을 유지하는 상세 설정

테이블의 세부 속성을 수정하기 위해 별도의 화면으로 이동하면 현재 보고 있던 ERD의 맥락이 끊길 수 있다고 판단했습니다.

그래서 테이블명과 설명, 구분을 위한 색상, 컬럼별 Unique 설정 등은 오른쪽 패널에서 변경할 수 있도록 했습니다. 사용자는 현재 ERD와 관계를 그대로 확인하면서 선택한 테이블의 세부 속성을 수정할 수 있습니다.

### 핵심 워크플로우

SchemaPad는 **UI에서 새 데이터베이스를 설계하는 흐름**과 **기존 SQL을 가져와 수정하는 흐름**을 하나의 ERD 편집 경험으로 연결했습니다.

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
    { "id": "convert", "label": "ERD 변환" },
    { "id": "review", "label": "전체 구조 확인" },
    { "id": "edit", "label": "UI에서 수정" },
    { "id": "export", "label": "SQL Export" }
  ],
  "edges": [
    ["new", "create"],
    ["create", "table"],
    ["table", "columns"],
    ["columns", "relation"],
    ["relation", "review"],
    ["existing", "import"],
    ["import", "convert"],
    ["convert", "review"],
    ["review", "edit"],
    ["edit", "export"]
  ]
}
{{< /product-workflow >}}

새 프로젝트에서는 SQL을 작성하지 않고 UI에서 구조를 설계한 뒤 PostgreSQL, MySQL 또는 MariaDB SQL로 내보낼 수 있습니다. 기존 프로젝트에서는 SQL을 가져와 ERD로 확인하고 수정한 뒤 다시 SQL로 내보낼 수 있도록 했습니다.

SQL Import와 Export는 별도의 SQL 개발 환경이 아니라 **ERD 설계를 실제 개발 과정과 연결하는 입구와 출구**로 두었습니다.

### 브라우저 기반 문서 관리

개인 사용자를 위한 제품이라는 방향에 맞춰 별도의 사용자 계정과 클라우드 프로젝트 관리 기능을 만들지 않았습니다.

사용자가 만든 ERD 문서는 브라우저에 저장되며, 문서 목록에서 다시 열어 작업을 이어갈 수 있습니다. 각 문서에는 사용 중인 데이터베이스 종류와 테이블·관계 수를 함께 표시해 여러 ERD를 구분할 수 있도록 구성했습니다.

문서와 Import한 SQL은 외부 서버가 아닌 브라우저 `localStorage`에 저장합니다.

이를 통해 별도의 백엔드 데이터베이스와 계정 시스템 없이 서비스를 구성하고, 사용자의 데이터베이스 구조를 서버에 저장하지 않으면서 작업 내용을 유지할 수 있도록 했습니다.

대신 브라우저 데이터를 삭제하거나 기기를 변경하면 저장된 문서를 복구할 수 없고, `localStorage`는 암호화된 저장소가 아니기 때문에 자격 증명이나 개인정보 등 민감한 정보를 저장하지 않도록 서비스에서 안내했습니다.

클라우드 동기화의 편의성을 제공하지 않는 대신 **개인이 비용과 가입 부담 없이 바로 사용할 수 있는 제품**이라는 범위를 선택했습니다.

### 규모가 커졌을 때의 탐색

테이블 수가 적을 때는 Canvas만으로 전체 구조를 쉽게 확인할 수 있지만, 테이블이 많아지면 넓은 Canvas에서 원하는 테이블을 직접 찾는 과정이 불편해질 수 있습니다.

이를 위해 왼쪽 Tables 패널에서 전체 테이블을 목록으로 확인하고 검색할 수 있도록 했습니다. Canvas 오른쪽 아래에는 전체 ERD와 현재 보고 있는 위치를 확인할 수 있는 Map을 제공했습니다.

작은 ERD에서는 Canvas 자체에 집중하고, 구조가 커졌을 때는 검색과 Map을 이용해 원하는 테이블과 영역으로 이동할 수 있도록 설계했습니다.

## 설계 및 구현

SchemaPad는 Next.js, React, TypeScript를 기반으로 개발했습니다. ERD Canvas와 테이블·관계 표현에는 React Flow를 사용하고, 문서와 편집 상태는 Zustand로 관리했습니다.

PostgreSQL, MySQL, MariaDB SQL Import·Export를 구현해 UI에서 만든 데이터베이스 구조가 실제 개발 과정으로 이어질 수 있도록 했습니다.

무료 개인용 서비스라는 제품 방향은 배포 구조에도 반영했습니다.

**Next.js / React → Static Export → Cloudflare Pages**

**ERD Document → Browser localStorage**

애플리케이션을 정적 사이트로 빌드해 Cloudflare Pages에 배포하고, 별도의 백엔드 데이터베이스와 클라우드 저장 시스템을 운영하지 않는 구조를 선택했습니다.

클라우드 백업과 여러 기기 간 동기화를 제공하지 않는 대신 서버 운영 비용과 제품 복잡도를 줄여 **개인이 가입과 비용 부담 없이 바로 사용할 수 있는 서비스**라는 방향을 유지했습니다.

## 결과

SchemaPad는 아이디어나 프로토타입에 머무르지 않고 실제 웹 서비스로 구현해 공개했습니다.

ERD 문서 관리부터 테이블·컬럼 생성, PK·FK와 제약조건 설정, 관계 표현, ERD 탐색, 브라우저 저장, PostgreSQL·MySQL·MariaDB SQL Import·Export까지 처음 정의했던 개인 데이터베이스 설계 흐름을 구현했습니다.

개인정보 처리방침, 이용정책, 문의 페이지와 보안 헤더 등 공개 웹서비스 운영에 필요한 요소도 함께 구성했습니다.

현재도 별도의 회원가입이나 유료 플랜 없이 웹에서 사용할 수 있도록 **공개 운영 중입니다.**

## 회고

### 운영 이후 발견한 문제

SchemaPad를 직접 만들고 사용하면서 **ERD를 편하게 그리는 것과 데이터베이스 설계 과정 전체를 편하게 만드는 것은 다른 문제**라는 점을 발견했습니다.

실제 개발에서는 ERD를 한 번 완성하고 SQL로 내보내는 것으로 작업이 끝나지 않았습니다. 개발이 진행되면서 테이블과 컬럼, 관계가 계속 변경되고 SQL과 ERD 사이를 반복해서 확인하게 됩니다.

SchemaPad에서는 UI에서 구조를 수정하거나 SQL을 다시 Import·Export하는 방식으로 이 과정을 처리할 수 있지만, 변경이 반복될수록 두 표현 사이를 오가는 작업 자체가 새로운 불편함이 되었습니다.

또한 데이터베이스 구조가 복잡해질수록 SQL 문법이나 관계 설계에 대한 도움이 필요한 순간에는 현재 작업 환경을 벗어나 검색하거나 별도의 AI 도구에 질문해야 했습니다.

여기서 새로운 질문이 생겼습니다.

**ERD를 그리는 도구를 넘어 데이터베이스를 설계하는 과정 자체를 하나의 작업 환경으로 만들 수 없을까?**

### Nodalite로의 확장

SchemaPad는 현재도 **개인 개발자가 빠르게 데이터베이스 구조를 설계하기 위한 무료 ERD 편집기**로 공개 운영하고 있습니다.

동시에 SchemaPad를 직접 사용하며 발견한 더 큰 문제를 해결하기 위해 별도의 프로젝트인 **Nodalite**를 시작했습니다.

SchemaPad가 UI를 중심으로 ERD를 설계하고 SQL을 가져오거나 내보내는 도구라면, Nodalite에서는 SQL과 ERD를 하나의 작업 공간에서 직접 연결하고 변경 사항을 바로 확인할 수 있도록 작업 방식을 다시 설계했습니다.

또한 데스크톱 버전에서는 AI Agent를 연결해 데이터베이스 구조나 SQL에 대한 도움이 필요한 순간에도 현재 작업 맥락을 벗어나지 않도록 확장하고 있습니다.

SchemaPad를 대체하기보다 **첫 번째 제품을 실제로 만들고 운영하며 발견한 새로운 문제를 별도의 제품으로 발전시킨 프로젝트**입니다.
