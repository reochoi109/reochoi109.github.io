+++
title = "백엔드 기술"
description = "Kafka, PostgreSQL과 WebSocket의 실제 동작과 운영"
layout = "interview"
type = "page"
standalone = true
index = 6
robots = "noindex, nofollow, noarchive"

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true

[[cards]]
subcategory = "Kafka"
difficulty = "초급"
question = "Kafka의 Topic, Partition, Offset을 설명해보세요."
answer = "Topic은 같은 종류의 메시지를 묶는 논리 채널이고 Partition은 Topic의 메시지를 나누어 저장하는 순서 있는 로그입니다. Offset은 Partition 안에서 각 레코드의 위치를 나타내며 Consumer는 처리한 위치를 커밋해 다음 읽기 지점을 관리합니다."
explanation = "Kafka의 순서는 Topic 전체가 아니라 하나의 Partition 안에서만 보장됩니다. Producer가 메시지 키를 사용하면 같은 키가 같은 Partition에 배치되도록 할 수 있습니다. Offset은 메시지 자체의 전역 ID가 아니며 Partition 번호와 함께 해석해야 합니다."
points = ["Topic은 논리 분류, Partition은 저장·병렬성 단위다.", "Offset은 Partition 내부 위치다.", "순서 보장 범위는 하나의 Partition이다."]
terms = [{ name = "Topic", description = "Kafka에서 같은 목적의 레코드를 발행하고 구독하는 논리 이름입니다." }, { name = "Partition", description = "Topic 데이터를 나누어 순서대로 추가 저장하는 로그 단위입니다." }, { name = "Offset", description = "Partition 안에서 레코드 위치를 식별하는 증가 번호입니다." }]
image = "/images/study/kafka-flow.svg"
image_alt = "Producer가 Kafka Topic의 Partition에 메시지를 기록하고 Consumer Group이 나누어 읽는 구조"
image_caption = "Kafka의 발행·저장·소비 흐름"

[[cards]]
subcategory = "Kafka"
difficulty = "중급"
question = "Kafka Consumer Group과 Rebalancing을 설명해보세요."
answer = "같은 Consumer Group에서는 하나의 Partition을 동시에 한 Consumer만 담당해 메시지 처리를 분산합니다. Consumer의 추가·이탈이나 Partition 변경으로 담당 관계를 다시 배정하는 과정이 Rebalancing입니다."
explanation = "Rebalancing 중에는 처리가 일시 중단될 수 있고, 처리 완료와 Offset 커밋 시점이 어긋나면 중복 처리가 발생할 수 있습니다. 처리 시간을 세션 설정에 맞추고, 불필요한 재시작을 줄이며, Cooperative Sticky Assignor 같은 점진적 재할당 전략을 검토합니다."
points = ["그룹 내 최대 병렬성은 Partition 수의 영향을 받는다.", "Rebalancing은 담당 Partition을 다시 나누는 과정이다.", "처리 로직은 중복에 안전하게 만든다."]
terms = [{ name = "Consumer Group", description = "Partition을 분담해 하나의 논리 구독자로 동작하는 Consumer 집합입니다." }, { name = "Rebalancing", description = "그룹 구성 변화에 따라 Partition 담당을 다시 배정하는 과정입니다." }, { name = "Assignor", description = "Consumer들에게 Partition을 어떤 방식으로 배분할지 결정하는 전략입니다." }]

[[cards]]
subcategory = "Kafka"
difficulty = "고급"
question = "Kafka의 At-least-once 처리에서 중복을 어떻게 제어하나요?"
answer = "메시지 처리는 성공했지만 Offset 커밋 전에 장애가 나면 같은 메시지를 다시 읽어 중복이 발생합니다. 이벤트 ID와 유니크 제약, 처리 이력 또는 멱등한 상태 갱신으로 재처리해도 결과가 같도록 만듭니다."
explanation = "DB 변경과 Offset 커밋은 서로 다른 시스템의 작업이므로 단순히 커밋 순서를 바꿔 원자성을 얻을 수 없습니다. 상태 변경과 발행 이벤트를 같은 DB 트랜잭션에 저장하는 Transactional Outbox, Kafka 트랜잭션과 읽기 격리 설정 등을 요구사항에 맞게 사용합니다."
points = ["At-least-once는 유실을 줄이는 대신 중복을 허용한다.", "Consumer 비즈니스 로직의 멱등성이 가장 중요한 방어다.", "Exactly-once의 범위와 외부 시스템 포함 여부를 확인한다."]
terms = [{ name = "At-least-once", description = "메시지가 최소 한 번 처리되도록 보장하지만 중복 처리를 허용하는 전달 의미입니다." }, { name = "멱등성", description = "같은 입력을 반복 처리해도 최종 결과가 한 번 처리한 것과 같은 성질입니다." }, { name = "Transactional Outbox", description = "업무 데이터와 발행 이벤트를 같은 DB 트랜잭션에 저장한 뒤 안전하게 전달하는 패턴입니다." }]

[[cards]]
subcategory = "PostgreSQL"
difficulty = "초급"
question = "PostgreSQL의 MVCC는 무엇이며 어떤 장점이 있나요?"
answer = "MVCC는 행의 여러 버전을 유지하고 트랜잭션마다 일관된 Snapshot을 보여주는 동시성 제어 방식입니다. 읽기가 쓰기를 직접 막지 않고 쓰기도 일반적인 읽기를 막지 않아 높은 동시성을 제공합니다."
explanation = "UPDATE는 기존 행을 제자리에서 덮기보다 새 행 버전을 만들고 이전 버전을 나중에 정리합니다. 어떤 버전이 보이는지는 트랜잭션 ID와 Snapshot으로 판단합니다. 오래된 버전이 쌓이지 않도록 VACUUM이 필요하며 같은 행을 수정하는 쓰기끼리는 여전히 충돌할 수 있습니다."
points = ["각 트랜잭션은 규칙에 맞는 행 버전을 본다.", "읽기와 쓰기의 잠금 충돌을 줄인다.", "불필요한 행 버전은 VACUUM으로 정리한다."]
terms = [{ name = "MVCC", description = "여러 행 버전을 유지해 동시 트랜잭션에 적절한 버전을 보여주는 제어 방식입니다." }, { name = "Snapshot", description = "특정 트랜잭션에서 어떤 데이터 버전이 보이는지를 정하는 시점 정보입니다." }, { name = "Tuple", description = "PostgreSQL 내부에서 테이블의 한 행 버전을 부르는 용어입니다." }]
image = "/images/study/postgresql-mvcc.svg"
image_alt = "서로 다른 PostgreSQL 트랜잭션 Snapshot이 같은 행의 서로 다른 버전을 보는 구조"
image_caption = "MVCC Snapshot에 따른 행 버전 가시성"

[[cards]]
subcategory = "PostgreSQL"
difficulty = "중급"
question = "EXPLAIN과 EXPLAIN ANALYZE를 어떻게 사용하나요?"
answer = "EXPLAIN은 옵티마이저가 예상한 실행 계획과 비용·행 수를 보여줍니다. EXPLAIN ANALYZE는 쿼리를 실제 실행해 각 노드의 실제 시간과 행 수를 추가하므로 예상치와 실제치의 차이, 병목 노드와 잘못된 통계를 찾는 데 사용합니다."
explanation = "실제 실행되는 쓰기 쿼리에 ANALYZE를 붙이면 데이터가 변경되므로 트랜잭션과 롤백을 고려해야 합니다. estimated rows와 actual rows 차이가 크면 통계 갱신, 데이터 상관관계나 조건을 점검합니다. BUFFERS 옵션으로 캐시와 디스크 페이지 접근량도 확인할 수 있습니다."
points = ["계획 트리는 안쪽 노드부터 실행 흐름을 읽는다.", "예상 행 수와 실제 행 수 차이를 확인한다.", "ANALYZE는 쿼리를 실제 실행한다."]
terms = [{ name = "옵티마이저", description = "통계와 비용 모델로 가능한 실행 방법 중 예상 비용이 낮은 계획을 선택하는 구성 요소입니다." }, { name = "Plan Node", description = "스캔·조인·정렬처럼 실행 계획을 구성하는 개별 연산입니다." }, { name = "BUFFERS", description = "실행 중 공유 버퍼와 디스크 블록을 얼마나 읽고 썼는지 보여주는 EXPLAIN 옵션입니다." }]

[[cards]]
subcategory = "PostgreSQL"
difficulty = "고급"
question = "VACUUM과 Autovacuum이 필요한 이유를 설명해보세요."
answer = "PostgreSQL의 UPDATE와 DELETE가 만든 더 이상 보이지 않는 행 버전은 즉시 물리 삭제되지 않습니다. VACUUM은 재사용 가능한 공간을 표시하고 통계를 지원하며, Transaction ID Wraparound를 막습니다. Autovacuum은 테이블 변화량을 기준으로 이를 자동 실행합니다."
explanation = "일반 VACUUM은 보통 파일 크기를 운영체제에 즉시 반환하지 않고 내부 재사용 공간을 확보합니다. VACUUM FULL은 파일을 다시 쓰고 강한 잠금이 필요합니다. 쓰기가 많은 테이블은 기본 임계값보다 빠르게 실행되도록 scale factor와 threshold를 조정하고 장기 트랜잭션을 관리해야 합니다."
points = ["Dead Tuple 정리와 XID Wraparound 방지가 핵심이다.", "일반 VACUUM과 VACUUM FULL의 잠금·공간 반환 방식이 다르다.", "테이블별 쓰기 패턴에 맞게 Autovacuum을 관찰하고 조정한다."]
terms = [{ name = "Dead Tuple", description = "어떤 활성 트랜잭션에서도 더 이상 보이지 않아 재사용 가능한 이전 행 버전입니다." }, { name = "Autovacuum", description = "테이블 변경량을 감시해 VACUUM과 ANALYZE를 자동 수행하는 PostgreSQL 작업입니다." }, { name = "XID Wraparound", description = "유한한 트랜잭션 ID가 순환해 오래된 행의 가시성 판단이 깨질 수 있는 문제입니다." }]

[[cards]]
subcategory = "WebSocket"
difficulty = "초급"
question = "WebSocket 연결의 기본 생명주기를 설명해보세요."
answer = "클라이언트가 HTTP Upgrade로 연결을 요청하고 서버가 승인하면 양방향 메시지 통신을 시작합니다. 통신 중에는 데이터 프레임과 ping·pong 제어 프레임을 처리하고, 종료할 때 Close 프레임을 교환한 뒤 TCP 연결을 정리합니다."
explanation = "연결 성공 뒤에도 인증 만료, 네트워크 단절과 프록시 타임아웃을 처리해야 합니다. 정상 종료와 비정상 단절을 구분해 클라이언트 재연결 정책을 적용하고, 서버는 연결별 구독과 버퍼를 반드시 해제해야 합니다."
points = ["Handshake, 메시지 교환, 연결 종료 단계로 나눈다.", "ping·pong으로 반쯤 끊긴 연결을 감지한다.", "종료 시 연결 관련 자원을 정리한다."]
terms = [{ name = "Close Frame", description = "WebSocket 연결을 정상 종료하기 위한 상태 코드와 이유를 전달하는 제어 프레임입니다." }, { name = "Ping/Pong", description = "상대의 응답 가능 여부를 확인하고 연결 유지를 돕는 WebSocket 제어 프레임입니다." }, { name = "Half-open Connection", description = "한쪽은 끊겼지만 다른 쪽이 아직 연결된 것으로 인식하는 상태입니다." }]

[[cards]]
subcategory = "WebSocket"
difficulty = "중급"
question = "WebSocket 서버에서 연결별 동시 읽기와 쓰기를 어떻게 관리하나요?"
answer = "일반적으로 연결마다 하나의 읽기 루프와 하나의 쓰기 루프를 두고, 여러 고루틴이 보낼 메시지는 전송 채널에 넣어 쓰기 루프 하나가 직렬화합니다. 종료 신호와 Context로 두 루프의 생명주기를 함께 관리합니다."
explanation = "WebSocket 라이브러리는 동일 연결에 대한 여러 동시 writer를 안전하게 지원하지 않는 경우가 많습니다. 느린 클라이언트 때문에 전송 큐가 쌓이면 큐 크기를 제한하고 메시지 드롭, 연결 종료 또는 흐름 제어 정책을 선택합니다. 오류가 나면 한쪽 루프만 남지 않도록 전체 연결을 닫습니다."
points = ["한 연결의 쓰기는 전용 루프에서 직렬화한다.", "전송 큐는 반드시 크기 제한과 포화 정책을 가진다.", "읽기·쓰기 루프가 함께 종료되도록 설계한다."]
terms = [{ name = "Read Pump", description = "한 WebSocket 연결에서 메시지를 계속 읽고 처리하는 전용 루프입니다." }, { name = "Write Pump", description = "전송 큐의 메시지를 한 연결에 순서대로 기록하는 전용 루프입니다." }, { name = "Bounded Queue", description = "최대 길이가 정해져 과도한 메모리 증가를 막는 대기열입니다." }]

[[cards]]
subcategory = "WebSocket"
difficulty = "고급"
question = "WebSocket 서비스를 여러 인스턴스로 확장하는 방법을 설명해보세요."
answer = "각 연결은 특정 인스턴스에 붙어 있으므로 연결 레지스트리를 인스턴스별로 관리하고, Kafka나 Redis Pub/Sub 같은 메시징 계층으로 이벤트를 모든 관련 인스턴스에 전달합니다. 각 인스턴스는 자신이 가진 대상 연결에만 메시지를 전송합니다."
explanation = "Sticky Session은 재연결 전까지 같은 서버로 라우팅하는 데 도움이 되지만 서버 간 이벤트 전달을 대체하지 않습니다. 로드밸런서의 Upgrade와 idle timeout, 연결 수와 파일 디스크립터 한도, 배포 중 Drain을 확인해야 합니다. 유실 복구가 필요하면 Pub/Sub만이 아니라 내구성 있는 로그와 이벤트 순번을 사용합니다."
points = ["연결 상태와 이벤트 전달 경로를 분리한다.", "브로커로 인스턴스 간 이벤트를 Fan-out한다.", "Drain·재연결·유실 복구까지 운영 흐름을 설계한다."]
terms = [{ name = "Sticky Session", description = "같은 클라이언트의 요청이나 연결을 일정 기간 같은 서버로 보내는 라우팅 방식입니다." }, { name = "Pub/Sub", description = "발행자가 채널에 이벤트를 보내고 여러 구독자가 이를 수신하는 메시징 모델입니다." }, { name = "Connection Draining", description = "배포나 종료 전 새 연결을 막고 기존 연결이 정리될 시간을 주는 과정입니다." }]
+++
