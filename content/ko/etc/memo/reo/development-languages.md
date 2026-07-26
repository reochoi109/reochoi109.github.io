+++
title = "개발 언어"
description = "Go, Python과 백엔드 프레임워크의 핵심 동작 원리"
layout = "interview"
type = "page"
standalone = true
index = 1
robots = "noindex, nofollow, noarchive"

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true

[[cards]]
subcategory = "Go"
difficulty = "초급"
question = "Go에서 배열과 슬라이스는 어떻게 다른가요?"
answer = "배열은 길이가 타입에 포함되는 고정 크기 값이고, 슬라이스는 배열의 연속된 영역을 참조하는 가변 길이 자료구조입니다. 슬라이스는 포인터, 길이, 용량 정보를 가지며 append 시 용량이 부족하면 새로운 배열이 할당될 수 있습니다."
explanation = "슬라이스를 함수에 전달하면 슬라이스 헤더는 값으로 복사되지만 내부 배열은 공유될 수 있습니다. 그래서 요소 변경은 호출자에게 보일 수 있지만 append로 재할당된 새 배열은 공유되지 않을 수 있습니다. 메모리 공유 여부를 이해하는 것이 중요합니다."
points = ["배열의 길이는 타입의 일부다.", "슬라이스는 len과 cap을 가진다.", "append는 새 내부 배열을 만들 수 있다."]
terms = [{ name = "배열", description = "같은 타입의 값을 고정된 길이로 연속 저장하는 자료구조입니다." }, { name = "슬라이스", description = "Go에서 내부 배열의 구간을 가리키며 길이와 용량을 함께 관리하는 뷰입니다." }]

[[cards]]
subcategory = "Go"
difficulty = "중급"
question = "고루틴과 OS 스레드의 차이를 설명해보세요."
answer = "고루틴은 Go 런타임이 관리하는 경량 실행 단위입니다. 작은 초기 스택으로 시작하고 Go 스케줄러가 여러 고루틴을 소수의 OS 스레드에 다중화하기 때문에 많은 동시 작업을 비교적 적은 비용으로 처리할 수 있습니다."
explanation = "Go 스케줄러는 G(고루틴), M(OS 스레드), P(실행 권한과 로컬 큐)의 G-M-P 모델을 사용합니다. I/O 대기나 시스템 호출이 발생하면 다른 고루틴이 실행될 수 있도록 스케줄링하고, 필요하면 스택을 동적으로 확장합니다."
points = ["동시성은 병렬성과 같은 뜻이 아니다.", "고루틴도 블로킹과 누수 관리가 필요하다.", "채널과 context로 생명주기를 제어한다."]
terms = [{ name = "고루틴", description = "Go 런타임이 스케줄링하는 경량 실행 단위입니다." }, { name = "G-M-P", description = "고루틴(G), OS 스레드(M), 실행 권한과 큐(P)로 구성된 Go 스케줄러 모델입니다." }]
image = "/images/study/go-scheduler.svg"
image_alt = "여러 고루틴이 실행 큐와 OS 스레드에 배정되는 Go 스케줄러 구조"
image_caption = "G-M-P 모델을 단순화한 고루틴 스케줄링 흐름"

[[cards]]
subcategory = "Go"
difficulty = "고급"
question = "버퍼 채널과 버퍼가 없는 채널은 어떻게 다르며 언제 선택하나요?"
answer = "버퍼가 없는 채널은 송신자와 수신자가 만나는 시점에 값이 전달되어 두 고루틴을 동기화합니다. 버퍼 채널은 정해진 용량까지 송신자가 기다리지 않고 값을 넣을 수 있어 생산자와 소비자의 순간적인 속도 차이를 흡수합니다."
explanation = "버퍼는 처리량을 자동으로 높이는 장치가 아니라 대기 위치를 바꾸는 장치입니다. 버퍼가 가득 차면 송신자는 다시 블로킹됩니다. 용량을 정할 때는 허용 가능한 지연, 메모리 사용량, 백프레셔 전략과 종료 시 채널 소유권을 함께 고려해야 합니다."
points = ["채널은 송신 측 소유자가 닫는 것이 일반적이다.", "닫힌 채널 수신과 nil 채널의 동작을 구분한다.", "무제한 큐처럼 사용하지 않는다."]
terms = [{ name = "채널", description = "고루틴 사이에서 타입이 정해진 값을 전달하고 동기화하는 통신 수단입니다." }, { name = "백프레셔", description = "소비 속도가 느릴 때 생산 측의 전송 속도를 제한해 과부하를 막는 제어입니다." }]

[[cards]]
subcategory = "Python"
difficulty = "초급"
question = "Python의 리스트와 튜플은 어떻게 다른가요?"
answer = "리스트는 생성 후 요소를 변경할 수 있는 가변 객체이고, 튜플은 변경할 수 없는 불변 객체입니다. 고정된 값의 묶음에는 튜플이 의도를 더 명확하게 표현합니다."
explanation = "튜플 자체가 불변이라는 뜻이지 내부의 가변 객체까지 불변이 되는 것은 아닙니다. 튜플의 모든 요소가 해시 가능하면 딕셔너리 키나 집합 요소로 사용할 수 있습니다."
points = ["리스트는 대괄호, 튜플은 주로 소괄호로 표현한다.", "불변성은 API 의도를 드러낸다.", "튜플 내부의 리스트는 변경될 수 있다."]
terms = [{ name = "가변 객체", description = "생성된 뒤 내부 상태를 변경할 수 있는 객체입니다." }, { name = "해시 가능", description = "수명 동안 해시값이 변하지 않아 딕셔너리 키나 집합 요소로 사용할 수 있는 성질입니다." }]

[[cards]]
subcategory = "Python"
difficulty = "중급"
question = "이터레이터와 제너레이터를 설명해보세요."
answer = "이터레이터는 __next__로 값을 하나씩 반환하고 소진되면 StopIteration을 발생시키는 객체입니다. 제너레이터는 yield를 사용해 이터레이터를 간단하게 작성하는 함수입니다."
explanation = "제너레이터는 yield 시점의 실행 상태를 보존했다가 다음 요청에서 이어서 실행합니다. 전체 결과를 미리 메모리에 만들지 않는 지연 평가가 가능해 대용량 파일이나 스트림 처리에 유용하지만, 한 번 소진된 제너레이터는 다시 사용할 수 없습니다."
points = ["iter는 이터레이터를 얻고 next는 다음 값을 요청한다.", "지연 평가는 메모리를 절약한다.", "재사용하려면 제너레이터를 다시 생성한다."]
terms = [{ name = "이터레이터", description = "next 호출마다 다음 값을 반환하는 순회 상태 객체입니다." }, { name = "지연 평가", description = "값이 실제로 필요할 때 계산해 메모리와 초기 비용을 줄이는 방식입니다." }]

[[cards]]
subcategory = "Python"
difficulty = "고급"
question = "CPython의 GIL이 동시성에 미치는 영향을 설명해보세요."
answer = "GIL은 한 프로세스에서 한 번에 하나의 스레드만 Python 바이트코드를 실행하게 합니다. I/O 대기 작업은 스레드로 동시성을 얻을 수 있지만 CPU 집약 Python 코드의 병렬 실행은 제한됩니다."
explanation = "I/O 호출 중에는 GIL이 해제될 수 있고 NumPy 같은 일부 네이티브 확장도 연산 중 GIL을 해제합니다. CPU 집약 작업은 멀티프로세싱, 네이티브 코드 또는 작업 큐를 검토해야 하며, GIL이 있다고 해서 공유 가변 상태의 경쟁 조건이 모두 사라지는 것은 아닙니다."
points = ["GIL은 프로세스 단위다.", "I/O-bound와 CPU-bound를 구분한다.", "스레드 안전성을 자동 보장하지 않는다."]
terms = [{ name = "GIL", description = "CPython에서 한 시점에 하나의 스레드만 Python 바이트코드를 실행하도록 하는 잠금입니다." }, { name = "CPU-bound", description = "전체 처리 시간이 주로 CPU 계산 속도에 의해 결정되는 작업입니다." }, { name = "I/O-bound", description = "파일·네트워크 같은 입출력 대기가 처리 시간의 대부분인 작업입니다." }]

[[cards]]
subcategory = "Gin"
difficulty = "초급"
question = "Gin에서 요청이 Handler까지 전달되는 흐름을 설명해보세요."
answer = "라우터가 HTTP 메서드와 경로에 맞는 Handler 체인을 찾고 gin.Context와 함께 순서대로 실행합니다. Handler는 Context에서 요청 값을 읽고 상태 코드, 헤더와 응답 본문을 작성합니다."
explanation = "gin.Context는 요청마다 생성되며 경로 변수, 쿼리, 바인딩 결과와 미들웨어가 저장한 값을 전달합니다. 요청 이후 비동기 작업에서 Context를 그대로 사용하면 재사용 문제를 만들 수 있으므로 필요한 값만 복사하거나 Copy를 검토합니다."
points = ["라우팅은 메서드와 경로의 조합이다.", "Context는 요청 범위 객체다.", "응답을 중복 작성하지 않도록 한다."]
terms = [{ name = "Handler", description = "HTTP 요청을 받아 비즈니스 로직을 실행하고 응답을 만드는 함수입니다." }, { name = "gin.Context", description = "Gin에서 요청·응답 정보와 미들웨어 값을 전달하는 요청 범위 객체입니다." }]

[[cards]]
subcategory = "Gin"
difficulty = "중급"
question = "c.Next()와 c.Abort()는 어떻게 다른가요?"
answer = "c.Next()는 남은 Handler 체인을 실행한 뒤 현재 미들웨어로 돌아오며, c.Abort()는 이후 Handler 실행을 막습니다. 인증 실패처럼 요청을 중단할 때는 응답을 작성한 뒤 Abort 계열 메서드를 사용합니다."
explanation = "Abort는 이미 실행 중인 현재 Handler를 즉시 return시키지는 않습니다. 따라서 Abort를 호출한 뒤 현재 함수의 후속 코드가 실행되지 않도록 명시적으로 return하는 습관이 안전합니다. Next 전후에 시간을 기록하면 요청 처리 시간 미들웨어를 만들 수 있습니다."
points = ["Next 앞은 전처리, 뒤는 후처리다.", "Abort 후에도 현재 함수는 계속된다.", "중단 시 일관된 오류 응답을 작성한다."]
terms = [{ name = "미들웨어", description = "실제 Handler 전후에서 인증·로깅 같은 공통 처리를 수행하는 계층입니다." }, { name = "Handler Chain", description = "한 요청에 순서대로 적용되는 미들웨어와 최종 Handler의 목록입니다." }]

[[cards]]
subcategory = "Gin"
difficulty = "고급"
question = "Gin 서버의 Graceful Shutdown을 어떻게 설계하나요?"
answer = "http.Server의 Shutdown에 제한 시간이 있는 context를 전달해 새 연결 수락을 중단하고 진행 중인 요청이 끝날 시간을 줍니다. 이후 백그라운드 작업과 외부 연결을 의존 순서에 맞춰 정리합니다."
explanation = "SIGTERM 같은 종료 신호를 받고 readiness를 먼저 내려 새 트래픽을 차단하는 것이 좋습니다. HTTP 서버뿐 아니라 Kafka Consumer, WebSocket 연결, 작업 고루틴과 DB 풀도 종료 대상입니다. 무기한 대기를 막기 위해 전체 종료 시간 제한과 강제 종료 정책이 필요합니다."
points = ["readiness 차단 후 drain한다.", "Shutdown에는 timeout을 둔다.", "고루틴 종료를 WaitGroup 등으로 확인한다."]
terms = [{ name = "Graceful Shutdown", description = "새 요청은 막고 진행 중인 작업에 종료 시간을 준 뒤 자원을 정리하는 종료 방식입니다." }, { name = "Readiness", description = "인스턴스가 새 트래픽을 받을 준비가 되었는지를 나타내는 상태입니다." }]

[[cards]]
subcategory = "FastAPI"
difficulty = "초급"
question = "FastAPI는 타입 힌트를 어떻게 활용하나요?"
answer = "함수 매개변수와 Pydantic 모델의 타입 정보를 이용해 요청 데이터를 파싱하고 검증합니다. 같은 정의로 OpenAPI 스키마와 대화형 API 문서도 생성합니다."
explanation = "타입 힌트의 위치에 따라 경로, 쿼리, 헤더, 쿠키 또는 본문 값으로 해석됩니다. 검증에 실패하면 구조화된 422 응답을 만들며, response_model을 지정하면 응답 데이터도 문서화하고 필요한 필드만 직렬화할 수 있습니다."
points = ["타입 힌트는 런타임 검증 정보로 사용된다.", "Pydantic 모델로 본문 구조를 선언한다.", "응답 모델은 데이터 노출 범위를 줄인다."]
terms = [{ name = "타입 힌트", description = "변수·매개변수·반환값이 기대하는 타입을 표현하는 Python 문법입니다." }, { name = "Pydantic", description = "타입 정보를 이용해 데이터를 파싱하고 검증하는 Python 라이브러리입니다." }]

[[cards]]
subcategory = "FastAPI"
difficulty = "중급"
question = "FastAPI의 Dependency Injection은 어디에 활용하나요?"
answer = "Depends를 이용해 인증, 데이터베이스 세션, 공통 파라미터 같은 의존성을 선언하고 재사용합니다. 의존성은 다시 다른 의존성을 가질 수 있습니다."
explanation = "요청 안에서 같은 의존성은 기본적으로 캐시됩니다. yield 의존성을 사용하면 응답 처리 전후로 자원을 열고 닫는 로직을 표현할 수 있어 DB 세션 관리에 적합합니다. 테스트에서는 dependency_overrides로 구현을 교체할 수 있습니다."
points = ["공통 로직을 Handler에서 분리한다.", "yield 이후 코드에서 자원을 정리한다.", "테스트 대역으로 쉽게 교체할 수 있다."]
terms = [{ name = "의존성 주입", description = "객체가 필요한 기능을 내부에서 만들지 않고 외부에서 전달받는 설계 방식입니다." }, { name = "Depends", description = "FastAPI에서 의존성 함수와 실행 관계를 선언하는 도구입니다." }]

[[cards]]
subcategory = "FastAPI"
difficulty = "고급"
question = "async 엔드포인트에서 동기 I/O를 호출하면 어떤 문제가 생기나요?"
answer = "동기 I/O가 이벤트 루프를 막아 같은 Worker가 처리할 수 있는 다른 비동기 요청까지 지연시킵니다. 비동기 드라이버를 사용하거나 불가피한 동기 작업은 스레드 풀로 넘겨야 합니다."
explanation = "async def 자체가 모든 코드를 비동기로 만들지는 않습니다. 내부 호출이 실제로 await 가능한지 확인해야 합니다. CPU 집약 작업도 이벤트 루프를 막으므로 프로세스 풀이나 별도 작업 큐로 분리하고, 타임아웃과 취소 전파도 설계해야 합니다."
points = ["블로킹 호출을 이벤트 루프에서 실행하지 않는다.", "CPU 작업과 I/O 작업을 구분한다.", "비동기 DB·HTTP 클라이언트를 사용한다."]
terms = [{ name = "이벤트 루프", description = "준비된 비동기 작업을 순서대로 실행하고 I/O 완료를 감시하는 실행기입니다." }, { name = "블로킹 I/O", description = "입출력이 끝날 때까지 현재 실행 흐름을 멈추는 호출입니다." }]

[[cards]]
subcategory = "Django"
difficulty = "초급"
question = "Django의 MTV 패턴을 설명해보세요."
answer = "Model은 데이터와 도메인 규칙, Template은 표현, View는 요청 처리와 응답 생성을 담당합니다. URLconf가 요청 경로를 적절한 View에 연결합니다."
explanation = "일반적인 MVC와 용어는 다르지만 관심사를 분리한다는 목적은 같습니다. Django의 View는 MVC의 Controller 역할에 가깝고 Template은 View 역할에 가깝다고 설명할 수 있습니다."
points = ["Model은 ORM과 데이터 규칙을 담당한다.", "View는 유스케이스를 조정한다.", "Template에 비즈니스 로직을 넣지 않는다."]
terms = [{ name = "MTV", description = "Django의 Model·Template·View로 관심사를 나누는 구조입니다." }, { name = "ORM", description = "객체와 관계형 데이터베이스 테이블을 연결해 SQL 작업을 객체 API로 표현하는 계층입니다." }]

[[cards]]
subcategory = "Django"
difficulty = "중급"
question = "select_related와 prefetch_related는 어떻게 다른가요?"
answer = "select_related는 SQL JOIN으로 ForeignKey와 OneToOne 관계를 한 번에 가져옵니다. prefetch_related는 별도 쿼리로 다대다나 역참조 데이터를 가져와 Python에서 결합합니다."
explanation = "둘 다 반복 접근으로 추가 쿼리가 발생하는 N+1 문제를 줄이는 방법입니다. 무조건 적용하면 불필요한 데이터와 큰 JOIN을 만들 수 있으므로 실제 접근 관계와 쿼리 계획을 확인해야 합니다."
points = ["정방향 단일 관계는 select_related가 적합하다.", "다중 관계는 prefetch_related를 사용한다.", "테스트에서 쿼리 수를 측정한다."]
terms = [{ name = "N+1 문제", description = "목록 1회 조회 뒤 각 항목의 관계 데이터를 N번 추가 조회하는 성능 문제입니다." }, { name = "Eager Loading", description = "사용할 관계 데이터를 미리 함께 조회하는 방식입니다." }]

[[cards]]
subcategory = "Django"
difficulty = "고급"
question = "Django에서 트랜잭션 경계를 어떻게 관리하나요?"
answer = "transaction.atomic 블록으로 여러 DB 작업을 하나의 트랜잭션으로 묶습니다. 블록 밖으로 예외가 전달되면 롤백되고 정상 종료되면 커밋됩니다."
explanation = "트랜잭션 안에서 외부 API 호출이나 긴 계산을 수행하면 잠금 보유 시간이 길어집니다. 커밋 이후 실행해야 하는 작업은 transaction.on_commit을 활용할 수 있습니다. 중첩 atomic은 savepoint로 동작할 수 있으므로 예외 처리 위치도 중요합니다."
points = ["트랜잭션 범위를 짧게 유지한다.", "예외를 숨겨 롤백을 방해하지 않는다.", "외부 메시지 발행은 Outbox 패턴도 검토한다."]
terms = [{ name = "atomic", description = "Django에서 코드 블록을 하나의 데이터베이스 트랜잭션으로 묶는 도구입니다." }, { name = "Savepoint", description = "트랜잭션 전체를 끝내지 않고 일부 구간까지만 롤백할 수 있는 지점입니다." }, { name = "Outbox 패턴", description = "상태 변경과 발행할 이벤트를 같은 트랜잭션에 저장한 뒤 별도로 전송하는 패턴입니다." }]
+++
