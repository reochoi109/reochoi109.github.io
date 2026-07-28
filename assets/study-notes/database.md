# 데이터베이스 이론·면접 학습 노트

관계형 모델부터 Transaction, Index, PostgreSQL의 MVCC까지 **설계 원리와 성능 Trade-off**를 연결해 설명할 수 있도록 정리한 문서입니다.

## 목차

1. [관계형 모델과 Key](#1-관계형-모델과-key)
2. [관계와 정규화](#2-관계와-정규화)
3. [JOIN](#3-join)
4. [Transaction과 ACID](#4-transaction과-acid)
5. [격리 수준과 MVCC](#5-격리-수준과-mvcc)
6. [Lock과 Deadlock](#6-lock과-deadlock)
7. [Index](#7-index)
8. [복합 Index와 실행 계획](#8-복합-index와-실행-계획)
9. [RDB와 NoSQL](#9-rdb와-nosql)
10. [PostgreSQL 핵심](#10-postgresql-핵심)
11. [핵심 용어](#11-핵심-용어)

---

## 1. 관계형 모델과 Key

### Relation

관계형 모델에서 Relation은 Attribute로 구성된 Tuple의 집합입니다. 실무에서는 Relation, Table, Tuple, Row, Attribute, Column을 문맥에 따라 비슷한 의미로 사용하지만, 관계형 이론과 SQL 구현에는 차이가 있습니다. 예를 들어 SQL Table은 중복 Row를 허용할 수 있고 `NULL`도 사용합니다.

### Key의 포함 관계

![Super Key부터 Primary Key까지의 관계](./static/images/study/database-key-relations.svg)

| Key | 의미 |
|---|---|
| Super Key | Row를 유일하게 식별할 수 있는 Attribute 집합 |
| Candidate Key | 불필요한 Attribute를 제거한 최소 Super Key |
| Primary Key | Candidate Key 중 대표 식별자로 선택한 Key |
| Alternate Key | Primary Key로 선택되지 않은 Candidate Key |
| Composite Key | 두 개 이상의 Attribute로 구성된 Key |
| Foreign Key | 다른 Table의 Candidate Key를 참조해 참조 무결성을 표현하는 Key |

### 면접 답변

> Primary Key는 각 Row를 대표해 유일하게 식별하는 Candidate Key입니다. 하나의 Table에는 Primary Key Constraint가 하나이고, 복합 Primary Key라면 여러 Column으로 구성할 수 있습니다. Primary Key Column은 `NULL`을 허용하지 않습니다.

Foreign Key가 반드시 다른 Table의 Primary Key만 참조하는 것은 아닙니다. DBMS가 허용하는 고유한 Candidate Key, 일반적으로 `PRIMARY KEY`나 `UNIQUE` Constraint를 참조할 수 있습니다.

### 자연 Key와 대리 Key

| 구분 | 자연 Key | 대리 Key |
|---|---|---|
| 값 | 업무 의미가 있는 값 | 시스템이 만든 식별자 |
| 예 | 이메일, 사업자 번호 | Auto Increment ID, UUID |
| 장점 | 별도 ID 없이 업무 식별 가능 | 작고 안정적인 참조, 변경 영향이 적음 |
| 주의 | 업무 규칙에 따라 변경될 수 있음 | 업무상 중복은 별도 `UNIQUE`로 막아야 함 |

대리 Key를 사용하더라도 이메일처럼 업무상 고유해야 하는 값에는 Database Constraint를 두어야 경쟁 조건에서도 중복을 막을 수 있습니다.

---

## 2. 관계와 정규화

### 관계 Cardinality

```text
Customer 1 ───── N Order

Student 1 ───── N Enrollment N ───── 1 Course
                  └─ Mapping Table ─┘
```

- `1:1`: 한 Entity가 상대 Entity 하나와 관계
- `1:N`: 한 Parent가 여러 Child를 가지며 일반적으로 N 쪽에 Foreign Key 배치
- `N:M`: Mapping Table을 만들어 두 개의 `1:N` 관계로 분해

N:M Mapping Table에는 두 Foreign Key 외에도 수강 시각, 상태, 수량처럼 **관계 자체의 Attribute**를 둘 수 있습니다.

### 정규화

> 정규화는 데이터 중복으로 인한 삽입·수정·삭제 이상을 줄이기 위해 Relation을 적절히 분해하는 과정입니다.

| 정규형 | 핵심 조건 |
|---|---|
| 1NF | 하나의 Cell에는 원자적인 값 하나 |
| 2NF | 1NF이며, 일반 Attribute가 복합 Candidate Key 일부에만 종속되지 않음 |
| 3NF | 2NF이며, 일반 Attribute 사이의 이행적 함수 종속 제거 |
| BCNF | 모든 결정자가 Candidate Key |

정규화가 항상 최고 성능을 의미하지는 않습니다. 읽기 성능이나 분석 편의를 위해 의도적으로 중복을 허용하는 비정규화도 있지만, 동기화 규칙과 일관성 비용을 함께 설계해야 합니다.

---

## 3. JOIN

> JOIN은 관계 조건을 이용해 여러 Table의 Row를 하나의 결과로 결합하는 연산입니다.

| JOIN | 결과 |
|---|---|
| INNER JOIN | 양쪽에 조건이 일치하는 Row만 반환 |
| LEFT OUTER JOIN | 왼쪽 Row는 모두 유지하고 오른쪽이 없으면 `NULL` |
| RIGHT OUTER JOIN | 오른쪽 Row를 모두 유지 |
| FULL OUTER JOIN | 양쪽의 일치·불일치 Row를 모두 반환 |
| CROSS JOIN | 양쪽 Row의 Cartesian Product |

```sql
SELECT c.id, c.name, o.id AS order_id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

LEFT JOIN 뒤 `WHERE o.status = 'PAID'`를 사용하면 오른쪽이 `NULL`인 Row가 제거되어 사실상 INNER JOIN처럼 동작할 수 있습니다. 오른쪽 Table의 보존 조건이라면 `ON` 절에 둘지 의도를 검토해야 합니다.

### JOIN 실행 방식

- Nested Loop Join: 바깥 Row마다 안쪽을 탐색하며 작은 결과와 Index가 있을 때 유리
- Hash Join: 한쪽으로 Hash Table을 만들어 Equality JOIN 처리
- Merge Join: 정렬된 두 입력을 함께 순회하며 Equality·Range 조건에 활용

SQL에 JOIN 종류를 작성하는 것과 DB Optimizer가 선택하는 물리적 JOIN Algorithm은 구분해야 합니다.

---

## 4. Transaction과 ACID

### 면접 답변

> Transaction은 Database의 상태를 하나의 논리적 작업 단위로 변경하는 연산 집합입니다. 전부 성공하면 Commit하고 중간에 문제가 생기면 Rollback하여 데이터의 정확성을 지킵니다.

### ACID

| 속성 | 의미 | 구현 관점 |
|---|---|---|
| Atomicity | 모든 작업이 전부 반영되거나 전부 취소 | Undo, MVCC, Transaction Log |
| Consistency | 성공 전후에 정의된 무결성 규칙 만족 | Constraint와 올바른 Transaction Logic |
| Isolation | 동시 Transaction의 중간 상태를 제어 | Lock, MVCC, Isolation Level |
| Durability | Commit된 결과가 장애 후에도 복구 가능 | WAL, Flush, Replication |

Consistency는 “Column Type이 그대로다”만 의미하지 않습니다. 잔액 합계, Foreign Key, Unique Constraint처럼 애플리케이션과 Database가 정의한 불변식이 Transaction 전후에 유지되어야 한다는 뜻입니다.

```sql
BEGIN;

UPDATE accounts SET balance = balance - 10000 WHERE id = 1;
UPDATE accounts SET balance = balance + 10000 WHERE id = 2;

COMMIT;
```

Rollback은 무조건 “이전 Commit 시점 전체”로 Database를 되돌리는 것이 아니라 **현재 Transaction이 만든 변경을 취소**합니다. Savepoint를 사용하면 Transaction 일부만 되돌릴 수도 있습니다.

---

## 5. 격리 수준과 MVCC

### 동시성 이상 현상

| 현상 | 설명 |
|---|---|
| Dirty Read | Commit되지 않은 다른 Transaction의 값을 읽음 |
| Non-repeatable Read | 같은 Row를 다시 읽었더니 다른 Commit 값이 보임 |
| Phantom Read | 같은 조건 조회에서 Row 집합이 달라짐 |
| Lost Update | 두 변경 중 하나가 다른 변경을 덮어씀 |
| Write Skew | 서로 다른 Row를 갱신해 함께 지켜야 할 규칙이 깨짐 |

### SQL 격리 수준

| 수준 | 일반적 특성 |
|---|---|
| Read Uncommitted | Dirty Read를 허용할 수 있음 |
| Read Committed | Statement마다 Commit된 Snapshot을 읽음 |
| Repeatable Read | Transaction 동안 같은 Snapshot을 유지 |
| Serializable | 동시 실행 결과가 어떤 직렬 실행과 동등하도록 보장 |

정확한 동작은 DBMS마다 다릅니다. 예를 들어 PostgreSQL의 Read Uncommitted는 Read Committed처럼 동작하고, Repeatable Read는 표준 최소 요구보다 더 강하게 Phantom Read를 막지만 Serialization Anomaly 가능성은 별도로 고려합니다.

### MVCC

![PostgreSQL MVCC에서 Row Version을 읽는 과정](./static/images/study/postgresql-mvcc.svg)

> MVCC는 Row의 여러 Version과 Transaction Snapshot을 이용해 Reader와 Writer가 불필요하게 서로 막지 않도록 하는 동시성 제어 방식입니다.

Update 시 기존 Tuple을 제자리에서 모든 Reader에게 즉시 덮어쓰기보다 새로운 Version을 만들고, 각 Transaction은 자신의 Snapshot에서 보이는 Version을 선택합니다. 오래된 Version은 더 이상 어떤 Transaction에도 보이지 않을 때 정리할 수 있습니다.

MVCC가 모든 동시성 문제를 해결하는 것은 아닙니다. 같은 Row를 수정하는 Writer끼리는 충돌할 수 있고, 업무 규칙에 따라 명시적 Lock이나 Serializable 격리가 필요합니다.

---

## 6. Lock과 Deadlock

### Lock

- Shared Lock: 여러 Reader가 함께 획득할 수 있지만 Writer와 충돌
- Exclusive Lock: 다른 Reader·Writer를 제한하고 변경을 보호
- Row Lock, Page Lock, Table Lock: 보호 범위에 따른 구분
- Optimistic Lock: 충돌이 적다고 가정하고 Version 조건으로 변경 성공 여부 확인
- Pessimistic Lock: 먼저 Lock을 획득한 뒤 안전하게 처리

### Deadlock

![두 Transaction의 Lock 순환 대기](./static/images/study/database-deadlock.svg)

```text
T1: Row A Lock 획득 → Row B 대기
T2: Row B Lock 획득 → Row A 대기
```

DBMS는 대기 그래프 등을 이용해 Deadlock을 탐지하고 Transaction 하나를 Victim으로 Rollback해 순환을 끊을 수 있습니다. 애플리케이션은 해당 오류를 안전하게 재시도할 수 있어야 합니다.

예방 방법:

- 여러 Row와 Table을 항상 같은 순서로 Lock
- Transaction을 짧게 유지
- 사용자 입력이나 외부 API를 Transaction 내부에서 기다리지 않기
- 적절한 Index로 Lock 대상과 실행 시간을 줄이기
- 재시도 가능한 멱등 로직 설계

---

## 7. Index

### 면접 답변

> Index는 검색 Key와 Row 위치 정보를 별도 자료구조로 관리하여 전체 Table Scan 없이 필요한 Row 후보를 빠르게 찾도록 돕습니다. 읽기 성능을 높이는 대신 저장 공간을 사용하고 Insert, Update, Delete 때 Index도 갱신해야 합니다.

![B-Tree Index 탐색 구조](./static/images/study/btree-index.svg)

### B-Tree가 적합한 이유

- Key가 정렬되어 Equality와 Range 조건을 모두 지원합니다.
- Node 하나에 많은 Key를 저장하는 높은 Fan-out으로 Tree 높이가 낮습니다.
- Disk·Buffer Page 단위 접근에 적합합니다.
- 균형을 유지해 탐색·삽입·삭제가 일반적으로 `O(log n)`입니다.

Hash Index는 Equality 검색에 적합하지만 정렬 순서가 없어서 Range, 정렬, Prefix 조건에 제한적입니다. 현대 DBMS는 B-Tree 외에도 Hash, GIN, GiST, BRIN 등 Workload에 맞는 Index를 제공합니다.

### Index가 항상 빠르지 않은 이유

조건이 Table의 대부분을 반환한다면 Index를 따라 여러 Page를 무작위 접근하는 것보다 Sequential Scan이 더 저렴할 수 있습니다. Optimizer는 통계와 비용을 기반으로 실행 계획을 선택합니다.

---

## 8. 복합 Index와 실행 계획

### 복합 Index

```sql
CREATE INDEX idx_orders_customer_created
ON orders (customer_id, created_at);
```

일반적인 B-Tree 복합 Index는 선두 Column부터 정렬됩니다.

- `WHERE customer_id = ?`: 활용 가능
- `WHERE customer_id = ? AND created_at >= ?`: 활용 가능
- `WHERE created_at >= ?`: 선두 Column이 없어 효율이 제한될 수 있음

Column 순서는 Equality, Range, 정렬, Cardinality만으로 기계적으로 정하지 않고 실제 Query Pattern과 DBMS 특성을 함께 봐야 합니다.

### Cardinality와 Selectivity

- Cardinality: Column의 서로 다른 값 개수
- Selectivity: 문맥에 따라 정의가 달라질 수 있지만 Query 조건이 전체 Row 중 얼마나 적은 Row를 고르는지를 나타내는 지표로 사용

Boolean Column은 Cardinality가 낮아도 `true`가 1%뿐이고 그 값만 자주 찾는다면 **Partial Index**가 효과적일 수 있습니다. “Boolean에는 Index가 항상 쓸모없다”는 결론은 잘못입니다.

```sql
CREATE INDEX idx_jobs_pending
ON jobs (created_at)
WHERE processed = false;
```

### 실행 계획

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT *
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

확인할 항목:

- 예상 Row와 실제 Row 차이
- Sequential Scan과 Index Scan 선택
- Join 순서와 Join Algorithm
- Sort, Hash가 Memory를 넘어서 Disk를 사용했는지
- 읽은 Buffer와 실행 시간

“Table마다 Index는 4~5개” 같은 고정 숫자보다 실제 Query, 쓰기 빈도, 저장 공간, 실행 계획으로 판단해야 합니다.

---

## 9. RDB와 NoSQL

### 비교

| 기준 | 관계형 DB | NoSQL |
|---|---|---|
| 모델 | Table과 관계 | Key-Value, Document, Wide-column, Graph 등 |
| Schema | 명시적 Schema와 Constraint가 강점 | 제품에 따라 유연하거나 명시적 |
| 관계 처리 | JOIN과 관계 무결성 | Aggregate 중심 모델링이 흔함 |
| Transaction | 강력한 Transaction 지원 | 제품별 범위와 보장이 다양 |
| 확장 | Scale-up과 Scale-out 모두 가능 | 분산 Scale-out을 주요 목표로 한 제품이 많음 |

NoSQL은 “SQL을 전혀 못 쓰고 Transaction도 없다”는 뜻이 아닙니다. SQL과 유사한 Query를 제공하거나 다중 Document Transaction을 지원하는 제품도 있습니다. 반대로 RDB도 Partitioning과 Replication으로 수평 확장이 가능합니다.

선택 질문:

- 데이터 사이 관계와 Constraint가 중요한가?
- 필요한 Query Pattern이 무엇인가?
- 단일 Row, Aggregate, 다중 Entity 중 Transaction 범위는 어디까지인가?
- 일관성, 지연, 가용성 중 어떤 요구가 우선인가?
- 운영팀이 복구·Backup·관측 가능한 기술인가?

---

## 10. PostgreSQL 핵심

### Index 종류

- B-Tree: Equality, Range, 정렬의 기본 선택
- Hash: Equality
- GIN: 배열, JSONB, 전문 검색처럼 하나의 값에 여러 구성 요소
- GiST: 기하, 범위, 유사도 등 확장 가능한 검색
- BRIN: 물리적 저장 순서와 값이 상관된 매우 큰 Table

### WAL

WAL(Write-Ahead Logging)은 Data Page보다 변경 Log를 먼저 안정적인 저장소에 기록하는 원칙입니다. Crash Recovery와 Replication의 기반이며 Durability에 핵심 역할을 합니다.

### VACUUM

PostgreSQL MVCC는 Update와 Delete 이후 더 이상 보이지 않는 Tuple Version을 남길 수 있습니다. VACUUM은 이를 재사용할 수 있도록 정리하고 Transaction ID Wraparound를 방지합니다. Autovacuum 설정과 긴 Transaction은 운영 성능에 큰 영향을 줄 수 있습니다.

### Connection

PostgreSQL은 Connection마다 Backend Process를 사용하는 구조이므로 Connection 수가 지나치게 많으면 Memory와 Scheduling 비용이 커질 수 있습니다. PgBouncer 같은 Connection Pooler와 애플리케이션 Pool 크기를 Workload에 맞게 조정합니다.

---

## 11. 핵심 용어

| 용어 | 설명 |
|---|---|
| Constraint | Database가 데이터에 강제하는 무결성 규칙 |
| Functional Dependency | 한 Attribute 집합이 다른 Attribute 값을 결정하는 관계 |
| Cardinality | 문맥에 따라 Row 수 또는 서로 다른 값의 수 |
| Selectivity | 조건이 전체 데이터 중 일부를 골라내는 정도 |
| Snapshot | Transaction이 특정 시점에 볼 수 있는 데이터 Version의 기준 |
| MVCC | 여러 Row Version으로 동시 Reader·Writer의 충돌을 줄이는 방식 |
| WAL | 실제 Data Page보다 변경 Log를 먼저 기록하는 복구 기법 |
| Covering Index | Query가 필요한 값을 Index만으로 제공할 수 있는 Index |
| Partial Index | 조건을 만족하는 Row 일부만 포함하는 Index |
| Optimizer | 통계와 비용을 이용해 Query 실행 계획을 선택하는 구성 요소 |

---

## 빠른 복습 체크리스트

- Super Key, Candidate Key, Primary Key를 포함 관계로 설명할 수 있는가?
- N:M 관계를 Mapping Table로 바꾸고 관계 Attribute를 배치할 수 있는가?
- ACID의 각 속성을 구현 방식과 함께 설명할 수 있는가?
- Isolation Level과 동시성 이상 현상을 연결할 수 있는가?
- MVCC가 Reader와 Writer의 충돌을 줄이는 원리를 설명할 수 있는가?
- Deadlock 예방과 재시도 전략을 설명할 수 있는가?
- 복합 Index의 Column 순서를 Query Pattern으로 판단할 수 있는가?
- Boolean Column에도 Index가 유용할 수 있는 사례를 말할 수 있는가?
- PostgreSQL에서 WAL, VACUUM, Autovacuum의 역할을 설명할 수 있는가?
