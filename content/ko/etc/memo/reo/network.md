+++
title = "네트워크"
description = "HTTP, TCP/IP와 실시간 연결"
layout = "interview"
type = "page"
standalone = true
index = 3
robots = "noindex, nofollow, noarchive"

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true

[[cards]]
subcategory = "HTTP"
difficulty = "초급"
question = "HTTP의 멱등성이란 무엇이며 어떤 메서드가 멱등한가요?"
answer = "같은 요청을 한 번 보내거나 여러 번 보내도 서버의 최종 상태가 같은 성질을 멱등성이라고 합니다. GET, PUT, DELETE는 의미상 멱등하고 POST는 일반적으로 멱등하지 않습니다."
explanation = "멱등하다고 응답까지 항상 같다는 뜻은 아닙니다. DELETE를 반복하면 상태 코드는 달라질 수 있지만 대상이 삭제된 최종 상태는 같습니다. 결제 같은 POST 요청은 Idempotency-Key를 받아 서버가 중복 처리를 막도록 설계할 수 있습니다."
points = ["멱등성은 최종 서버 상태를 기준으로 한다.", "안전한 메서드와 멱등 메서드는 다른 개념이다.", "재시도 정책은 멱등성을 고려해야 한다."]
terms = [{ name = "멱등성", description = "같은 연산을 여러 번 수행해도 한 번 수행한 것과 최종 상태가 같은 성질입니다." }, { name = "안전한 메서드", description = "서버 상태를 변경하도록 의도되지 않은 HTTP 메서드입니다." }]

[[cards]]
subcategory = "TCP/IP"
difficulty = "중급"
question = "TCP 3-way handshake가 필요한 이유를 설명해보세요."
answer = "클라이언트와 서버가 서로 통신 가능한지 확인하고 양쪽의 초기 시퀀스 번호를 동기화하기 위해 SYN, SYN-ACK, ACK 세 단계를 수행합니다."
explanation = "첫 SYN으로 클라이언트의 초기 번호를 알리고, SYN-ACK로 서버 번호와 클라이언트 번호 수신을 확인합니다. 마지막 ACK로 서버 번호 수신을 확인해야 양방향 연결 준비가 검증됩니다. 연결 종료는 각 방향을 독립적으로 닫아 일반적으로 네 단계가 사용됩니다."
points = ["TCP는 연결 지향·신뢰성 있는 바이트 스트림이다.", "시퀀스 번호로 순서와 재전송을 관리한다.", "handshake에도 네트워크 왕복 시간이 든다."]
terms = [{ name = "시퀀스 번호", description = "TCP 바이트 스트림의 순서를 식별해 재정렬과 재전송에 사용하는 번호입니다." }, { name = "RTT", description = "패킷이 상대에게 갔다가 응답이 돌아오는 데 걸리는 왕복 시간입니다." }]
image = "/images/study/tcp-handshake.svg"
image_alt = "클라이언트와 서버 사이 TCP SYN, SYN-ACK, ACK 흐름"
image_caption = "TCP 연결을 수립하는 3-way handshake"

[[cards]]
subcategory = "WebSocket"
difficulty = "고급"
question = "여러 서버에서 WebSocket 연결을 운영할 때 무엇을 고려해야 하나요?"
answer = "연결은 특정 서버 메모리에 유지되므로 사용자와 연결 서버의 매핑, 서버 간 메시지 전달, 재연결과 연결 종료 감지가 필요합니다. Redis Pub/Sub이나 메시지 브로커로 인스턴스 간 이벤트를 전달할 수 있습니다."
explanation = "로드밸런서의 idle timeout과 Upgrade 지원을 확인하고 필요하면 sticky session을 사용합니다. 연결 수뿐 아니라 파일 디스크립터, 메모리, ping/pong, 느린 소비자에 대한 백프레셔를 관리해야 합니다. 재연결 시 놓친 이벤트를 복구할 순번이나 조회 API도 필요합니다."
points = ["연결 상태는 분산 시스템의 상태다.", "heartbeat로 끊어진 연결을 감지한다.", "재연결·중복·순서 보장 정책을 정의한다."]
terms = [{ name = "WebSocket", description = "하나의 TCP 연결에서 클라이언트와 서버가 양방향으로 메시지를 주고받는 프로토콜입니다." }, { name = "Heartbeat", description = "주기적인 ping·pong으로 연결이 살아 있는지 확인하는 신호입니다." }, { name = "백프레셔", description = "느린 수신자로 인해 버퍼가 무한히 증가하지 않도록 송신량을 제어하는 방식입니다." }]

[[cards]]
subcategory = "HTTP"
difficulty = "중급"
question = "HTTP Keep-Alive와 HTTP/2 Multiplexing의 차이를 설명해보세요."
answer = "Keep-Alive는 여러 HTTP 요청에 하나의 TCP 연결을 재사용해 연결 수립 비용을 줄입니다. HTTP/1.1에서는 한 연결의 요청 처리가 순서 제약을 받지만 HTTP/2는 하나의 연결 안에서 여러 스트림의 프레임을 섞어 전송해 요청과 응답을 동시에 진행할 수 있습니다."
explanation = "HTTP/2는 헤더 압축과 스트림 우선순위도 제공하지만 TCP 계층의 패킷 손실이 전체 스트림에 영향을 줄 수 있습니다. HTTP/3는 QUIC 위에서 스트림별 손실 영향을 분리합니다. 프로토콜 버전뿐 아니라 서버·프록시 지원과 실제 RTT를 함께 확인해야 합니다."
points = ["Keep-Alive는 연결 재사용, Multiplexing은 동시 스트림 처리다.", "HTTP/2도 하나의 TCP 연결을 주로 사용한다.", "애플리케이션 계층과 전송 계층의 HOL Blocking을 구분한다."]
terms = [{ name = "Multiplexing", description = "하나의 연결에서 여러 논리 스트림의 데이터를 교차 전송하는 방식입니다." }, { name = "HOL Blocking", description = "앞선 데이터의 지연이 뒤따르는 독립 작업까지 막는 현상입니다." }, { name = "QUIC", description = "UDP 위에서 보안과 다중 스트림을 제공하며 HTTP/3가 사용하는 전송 프로토콜입니다." }]

[[cards]]
subcategory = "HTTP"
difficulty = "고급"
question = "HTTP 캐시의 재검증과 무효화 전략을 설명해보세요."
answer = "Cache-Control의 max-age로 신선한 기간을 정하고 만료 뒤에는 ETag와 If-None-Match 또는 Last-Modified와 If-Modified-Since로 원본 변경 여부를 재검증할 수 있습니다. 변경되지 않았다면 304로 본문 전송을 줄입니다."
explanation = "개인화 응답은 public 캐시에 저장되지 않도록 private 또는 no-store를 사용하고, Vary로 캐시 키에 영향을 주는 요청 헤더를 알립니다. CDN 캐시는 배포 시 버전이 포함된 URL을 사용하거나 purge로 제거합니다. 오래된 데이터 허용 범위와 원본 부하 사이의 균형이 핵심입니다."
points = ["캐시 키와 유효 기간을 명확히 정의한다.", "no-cache는 저장 금지가 아니라 사용 전 재검증을 뜻한다.", "정적 자산은 콘텐츠 해시 URL과 긴 max-age가 효과적이다."]
terms = [{ name = "ETag", description = "응답 표현의 버전을 식별하기 위해 서버가 제공하는 검증자입니다." }, { name = "304 Not Modified", description = "캐시된 표현이 여전히 유효해 본문을 다시 보낼 필요가 없음을 알리는 상태 코드입니다." }, { name = "Vary", description = "어떤 요청 헤더 값에 따라 캐시된 응답을 구분해야 하는지 지정하는 헤더입니다." }]

[[cards]]
subcategory = "TCP/IP"
difficulty = "초급"
question = "TCP와 UDP의 차이를 설명하고 각각의 사용 사례를 들어보세요."
answer = "TCP는 연결을 맺고 순서 보장, 재전송과 흐름 제어를 제공하는 신뢰성 있는 바이트 스트림입니다. UDP는 연결 수립 없이 데이터그램을 보내며 전달과 순서를 보장하지 않는 대신 지연과 오버헤드가 작습니다."
explanation = "웹 요청과 파일 전송은 신뢰성이 중요한 TCP를 주로 사용합니다. 실시간 음성·영상, DNS처럼 일부 손실보다 지연이 중요한 경우 UDP가 적합합니다. QUIC처럼 UDP 위에서 애플리케이션이 신뢰성과 혼잡 제어를 구현할 수도 있습니다."
points = ["TCP는 바이트 스트림, UDP는 메시지 경계를 가진 데이터그램이다.", "UDP가 항상 더 빠른 것은 아니다.", "요구하는 신뢰성·순서·지연 특성으로 선택한다."]
terms = [{ name = "데이터그램", description = "독립적인 목적지 정보와 메시지 경계를 가진 패킷 전송 단위입니다." }, { name = "흐름 제어", description = "수신자가 처리할 수 있는 속도에 맞춰 송신량을 조절하는 기능입니다." }, { name = "재전송", description = "손실된 것으로 판단한 데이터를 다시 보내 신뢰성을 확보하는 동작입니다." }]

[[cards]]
subcategory = "TCP/IP"
difficulty = "고급"
question = "TCP의 흐름 제어와 혼잡 제어는 어떻게 다른가요?"
answer = "흐름 제어는 수신 버퍼가 넘치지 않도록 수신자가 광고한 윈도 크기에 맞춰 송신량을 제한합니다. 혼잡 제어는 네트워크 경로가 감당할 수 있는 용량을 추정해 혼잡 윈도를 조절하며 패킷 손실과 RTT 변화를 기준으로 전송 속도를 낮추거나 높입니다."
explanation = "실제 송신 가능량은 수신 윈도와 혼잡 윈도 중 작은 값으로 제한됩니다. Slow Start는 혼잡 윈도를 빠르게 늘리고 임계값 이후 증가 폭을 줄입니다. 손실이 발생하면 알고리즘에 따라 윈도를 축소합니다. 수신자는 충분히 빨라도 네트워크가 혼잡할 수 있다는 점이 두 제어의 차이입니다."
points = ["흐름 제어의 대상은 수신자, 혼잡 제어의 대상은 네트워크다.", "송신 윈도는 rwnd와 cwnd의 최솟값에 영향받는다.", "손실뿐 아니라 지연 증가도 혼잡의 신호가 될 수 있다."]
terms = [{ name = "수신 윈도(rwnd)", description = "수신자가 현재 추가로 받을 수 있다고 광고하는 바이트 크기입니다." }, { name = "혼잡 윈도(cwnd)", description = "송신자가 네트워크 혼잡을 고려해 전송 중으로 허용하는 데이터 양입니다." }, { name = "Slow Start", description = "연결 초기 혼잡 윈도를 빠르게 증가시켜 가용 대역폭을 탐색하는 단계입니다." }]

[[cards]]
subcategory = "WebSocket"
difficulty = "초급"
question = "WebSocket은 어떻게 연결되고 HTTP와 어떤 차이가 있나요?"
answer = "클라이언트가 HTTP Upgrade 요청을 보내고 서버가 101 Switching Protocols로 승인하면 같은 TCP 연결이 WebSocket 프레임 통신으로 전환됩니다. 이후에는 클라이언트와 서버가 요청·응답 순서 없이 양방향으로 메시지를 보낼 수 있습니다."
explanation = "WebSocket은 연결을 유지하므로 실시간 알림과 채팅에 적합하지만 연결 상태와 자원 사용을 서버가 관리해야 합니다. 인증은 초기 핸드셰이크나 연결 직후 메시지에서 처리하고, 프록시가 Upgrade 헤더와 긴 연결 시간을 지원하는지 확인해야 합니다."
points = ["초기 연결은 HTTP 핸드셰이크를 사용한다.", "연결 후에는 WebSocket 프레임을 교환한다.", "양방향 실시간성이 필요할 때 선택한다."]
terms = [{ name = "HTTP Upgrade", description = "현재 HTTP 연결을 다른 프로토콜로 전환해달라고 요청하는 메커니즘입니다." }, { name = "101 Switching Protocols", description = "서버가 프로토콜 전환 요청을 수락했음을 나타내는 HTTP 상태 코드입니다." }, { name = "프레임", description = "WebSocket 연결에서 메시지와 제어 정보를 전송하는 프로토콜 단위입니다." }]

[[cards]]
subcategory = "WebSocket"
difficulty = "중급"
question = "WebSocket 재연결과 메시지 유실을 어떻게 처리하나요?"
answer = "클라이언트는 지수 백오프와 무작위 지연을 사용해 재연결하고, 서버는 각 이벤트에 증가하는 순번이나 ID를 부여합니다. 클라이언트가 마지막 수신 ID를 보내면 서버가 누락 구간을 저장소나 조회 API에서 다시 제공하도록 설계할 수 있습니다."
explanation = "연결이 끊긴 정확한 시점을 양쪽이 다르게 인식할 수 있어 중복 수신도 발생합니다. 따라서 클라이언트 처리는 이벤트 ID를 기준으로 멱등해야 합니다. 모든 이벤트 복구가 필요하지 않은 화면 갱신이라면 최신 스냅샷만 다시 받는 전략이 더 단순할 수 있습니다."
points = ["재연결 폭주를 막기 위해 백오프와 jitter를 사용한다.", "순번으로 누락과 중복을 판별한다.", "이벤트 재생과 최신 상태 재조회 중 요구사항에 맞게 선택한다."]
terms = [{ name = "지수 백오프", description = "재시도 간격을 매번 일정 배수로 늘려 서버 부담을 낮추는 방식입니다." }, { name = "Jitter", description = "여러 클라이언트의 재시도 시점이 겹치지 않도록 대기 시간에 무작위 값을 더하는 기법입니다." }, { name = "멱등 처리", description = "같은 이벤트를 중복 처리해도 최종 결과가 한 번 처리한 것과 같도록 만드는 방식입니다." }]
+++
