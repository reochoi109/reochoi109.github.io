# 운영체제 이론·면접 학습 노트

프로세스와 Thread, 동기화, Scheduling, 가상 Memory를 **CPU와 Operating System이 실제로 어떤 상태를 관리하는지** 중심으로 정리한 문서입니다.

## 목차

1. [운영체제와 System Call](#1-운영체제와-system-call)
2. [Process와 Memory 구조](#2-process와-memory-구조)
3. [Process 상태와 Context Switch](#3-process-상태와-context-switch)
4. [Thread와 Multi-tasking](#4-thread와-multi-tasking)
5. [IPC](#5-ipc)
6. [동기화](#6-동기화)
7. [Deadlock](#7-deadlock)
8. [CPU Scheduling](#8-cpu-scheduling)
9. [Paging과 Segmentation](#9-paging과-segmentation)
10. [Virtual Memory와 Page Fault](#10-virtual-memory와-page-fault)
11. [Page 교체와 Thrashing](#11-page-교체와-thrashing)
12. [핵심 용어](#12-핵심-용어)

---

## 1. 운영체제와 System Call

### 운영체제의 역할

> 운영체제는 Hardware Resource를 추상화하고 여러 Program에 CPU, Memory, Storage, I/O Device를 안전하고 효율적으로 배분하는 System Software입니다.

주요 책임:

- Process와 Thread Scheduling
- Virtual Memory와 Memory 보호
- File System과 Storage 관리
- Device Driver와 I/O
- 권한, 격리, 보안
- Network Stack

### User Mode와 Kernel Mode

일반 Application은 제한된 User Mode에서 실행됩니다. Hardware 제어나 Page Table 변경처럼 보호가 필요한 연산은 Kernel Mode에서만 가능합니다.

System Call은 Application이 Kernel 기능을 요청하는 공식 Interface입니다. `read`, `write`, `open`, `socket`, `fork` 등이 대표적입니다. System Call은 단순한 함수 호출과 달리 Mode 전환과 Kernel 검증을 포함하므로 비용이 더 큽니다.

```text
Application
    │ system call
    ▼
Kernel ─── File System / Network / Scheduler / Driver
    │
    ▼
Hardware
```

---

## 2. Process와 Memory 구조

### Process

> Process는 실행 중인 Program의 Instance로, 독립된 Virtual Address Space와 실행 상태, 열린 File, 권한 같은 Resource를 가집니다.

Program은 Disk의 실행 File이고 Process는 그 Program이 Memory에 적재되어 실행되는 동적인 상태입니다. 하나의 Program에서 여러 Process가 실행될 수 있습니다.

![Process 주소 공간과 Thread가 공유하는 영역](./static/images/study/process-thread-memory.svg)

### 일반적인 Virtual Address Space

| 영역 | 저장 내용 |
|---|---|
| Text(Code) | 실행할 Machine Instruction, 읽기 전용 상수 |
| Data | 초기화된 Global·Static Variable |
| BSS | 초기화되지 않았거나 0으로 초기화되는 Global·Static Variable |
| Heap | Runtime에 동적으로 할당되는 Memory |
| Memory Mapping | Shared Library, Memory-mapped File, Anonymous Mapping |
| Stack | 함수 Call Frame, Local Variable, Return Address |

이 배치는 대표적인 개념도이며 정확한 위치와 성장 방향은 OS, CPU Architecture, 실행 형식, ASLR에 따라 달라집니다.

### PCB

Process Control Block은 Kernel이 Process를 관리하기 위한 자료구조입니다.

- Process ID와 상태
- Program Counter와 CPU Register
- Scheduling 정보와 우선순위
- Virtual Memory 관리 정보
- 열린 File과 I/O 상태
- 계정, 권한, 사용 시간

PCB 자체의 정확한 이름과 구성은 OS 구현마다 다릅니다.

---

## 3. Process 상태와 Context Switch

### Process 상태

![Process 상태 전이](./static/images/study/process-state-flow.svg)

| 상태 | 의미 |
|---|---|
| New | Process 생성 중 |
| Ready | CPU를 받으면 실행 가능 |
| Running | CPU에서 Instruction 실행 중 |
| Waiting/Blocked | I/O나 Event를 기다려 실행할 수 없음 |
| Terminated | 실행 종료 |

### Context

Context는 실행을 중단했다가 같은 지점에서 재개하기 위해 필요한 CPU Register, Program Counter, Stack Pointer, Memory 관리 정보 등의 상태입니다.

### Context Switch

> Context Switch는 CPU에서 실행 중인 Process나 Thread의 상태를 저장하고 다른 실행 단위의 상태를 복원해 CPU 제어권을 넘기는 작업입니다.

발생 사례:

- Time Slice 만료
- 더 높은 우선순위 Task 준비
- 실행 중인 Task가 I/O 대기
- Interrupt 또는 Exception

Context Switch 동안 사용자 작업은 직접 진행되지 않고 Register 저장·복원, Scheduler 실행, 주소 공간 전환, Cache와 TLB 영향 등이 생길 수 있습니다. Thread Switch가 항상 매우 싸다고 단정할 수는 없지만 같은 Process의 Thread는 Address Space를 공유하므로 Process Switch보다 적은 상태를 바꾸는 경우가 많습니다.

---

## 4. Thread와 Multi-tasking

### Thread

> Thread는 Process 안의 실행 흐름입니다. 같은 Process의 Thread는 Code, Data, Heap, 열린 File 등을 공유하지만 각자 Stack, Program Counter, Register 상태를 가집니다.

Thread마다 Stack이 필요한 이유는 독립적으로 함수를 호출하면서 Parameter, Local Variable, Return Address를 저장해야 하기 때문입니다.

### Process와 Thread 비교

| 기준 | Process | Thread |
|---|---|---|
| 주소 공간 | 기본적으로 서로 격리 | 같은 Process 안에서 공유 |
| 통신 | IPC 필요 | 공유 Memory를 직접 사용 가능 |
| 장애 격리 | 상대적으로 강함 | 한 Thread의 치명적 오류가 Process 전체에 영향 |
| 생성·전환 비용 | 일반적으로 더 큼 | 일반적으로 더 작음 |
| 동기화 | 공유 IPC라면 필요 | 공유 상태 접근 시 필요 |

### Concurrency와 Parallelism

- Concurrency: 여러 작업이 진행 중인 기간이 겹치는 구조
- Parallelism: 여러 CPU Core에서 같은 순간에 실제로 여러 작업 실행

Single Core도 빠르게 실행 대상을 바꾸어 Concurrency를 제공할 수 있습니다. Multi Core라고 모든 작업이 자동으로 Parallel 실행되는 것은 아니며 Scheduler와 Program 구조의 영향을 받습니다.

### Multi-process와 Multi-thread 선택

Multi-process:

- Memory와 장애 격리가 중요
- 서로 다른 Runtime이나 권한 필요
- IPC 비용을 감당할 수 있음

Multi-thread:

- 공유 데이터가 많고 통신이 빈번
- Resource 사용을 줄이고 싶음
- 공유 상태를 안전하게 동기화할 수 있음

CPU-bound 작업의 Parallelism은 언어 Runtime의 제약도 고려해야 합니다. 예를 들어 CPython Thread는 GIL의 영향을 받지만 I/O-bound 작업에는 여전히 유용할 수 있고 Multi-processing이나 Native Extension은 다른 특성을 가집니다.

---

## 5. IPC

독립된 Process는 기본적으로 서로의 Virtual Address Space에 직접 접근할 수 없습니다. 운영체제는 IPC(Inter-Process Communication)를 제공합니다.

| 방식 | 특징 | 적합한 사례 |
|---|---|---|
| Pipe | 단방향 Byte Stream, 친족 Process에 자주 사용 | Shell Pipeline |
| Named Pipe | 이름을 가진 Pipe | Local Process 통신 |
| Message Queue | Message 경계를 유지하고 Kernel이 중개 | 비동기 Command |
| Shared Memory | 같은 Physical Page를 Mapping | 큰 데이터의 빠른 교환 |
| Unix Domain Socket | Local 양방향 통신, 권한 제어 | Local Service |
| Network Socket | Host 경계를 넘을 수 있음 | 분산 Service |
| Signal | 작은 Event 알림 | 종료·재적재 요청 |

### Shared Memory와 Message Passing

Shared Memory는 초기 Mapping 뒤 일반 Memory 접근처럼 빠르게 데이터를 교환할 수 있지만 Race Condition을 막기 위한 동기화와 Data Layout 관리가 필요합니다.

Message Passing은 Kernel이나 Broker가 Message를 중개해 경계와 소유권이 명확하지만 복사, System Call, Serialization 비용이 생길 수 있습니다. “Kernel이 자동으로 모든 동기화를 해결한다”고 단정하지 말고 API의 전달·순서·Blocking 보장을 확인해야 합니다.

---

## 6. 동기화

### Race Condition과 Critical Section

Race Condition은 여러 실행 흐름의 접근 순서에 따라 결과가 달라지는 상황입니다. 공유 상태를 읽고 수정하는 Code 영역 중 한 번에 제한된 실행 흐름만 들어가야 하는 부분을 Critical Section이라고 합니다.

```text
count = count + 1

1. count 읽기
2. 1 더하기
3. count 쓰기
```

두 Thread가 이 연산을 동시에 수행하면 한 증가가 사라지는 Lost Update가 생길 수 있습니다.

### 동기화 도구

| 도구 | 핵심 용도 |
|---|---|
| Mutex | 소유권을 가진 하나의 실행 흐름만 Critical Section 진입 |
| Semaphore | 정해진 수의 Permit으로 동시 접근 수 제한 또는 Event 전달 |
| Read-Write Lock | 여러 Reader 또는 하나의 Writer 허용 |
| Condition Variable | 특정 조건이 참이 될 때까지 Lock을 놓고 대기 |
| Atomic Operation | Hardware가 보장하는 분리 불가능한 단일 연산 |
| Spinlock | 잠깐 대기할 때 CPU를 양보하지 않고 반복 확인 |

### Mutex와 Semaphore

> Mutex는 일반적으로 Lock을 획득한 실행 흐름이 해제해야 하는 소유권 개념이 있습니다. Semaphore는 Permit의 개수를 세며 획득과 반환 주체가 반드시 같다는 소유권 의미가 없습니다.

Binary Semaphore의 값이 0 또는 1이라고 해서 Mutex와 완전히 같은 것은 아닙니다. 용도와 소유권, 우선순위 역전 대응 같은 의미가 다를 수 있습니다.

### Condition Variable 사용 원칙

```text
lock(mutex)
while condition is false:
    wait(condition_variable, mutex)
use_shared_state()
unlock(mutex)
```

Wake-up 이후 다른 Thread가 먼저 상태를 바꿀 수 있고 Spurious Wake-up도 허용하는 구현이 있으므로 조건은 `if`가 아니라 반복해서 검사합니다.

---

## 7. Deadlock

> Deadlock은 실행 흐름들이 서로가 가진 Resource를 기다리며 어느 쪽도 진행하지 못하는 상태입니다.

### Coffman의 네 조건

1. Mutual Exclusion: Resource를 동시에 하나만 사용
2. Hold and Wait: Resource를 보유한 채 다른 Resource를 대기
3. No Preemption: 다른 실행 흐름의 Resource를 강제로 회수할 수 없음
4. Circular Wait: 대기 관계가 Cycle을 형성

![Deadlock의 순환 대기](./static/images/study/os-deadlock-cycle.svg)

### 대응

- Prevention: 네 조건 중 하나가 성립하지 않도록 설계
- Avoidance: 앞으로 필요한 Resource 정보를 이용해 안전 상태에서만 할당
- Detection and Recovery: Cycle을 탐지해 Process 종료·Rollback·Resource 회수
- Timeout·Watchdog: 일정 시간 이후 실패 처리
- Ignore: 발생 가능성과 대응 비용을 비교해 특별한 일반 해법을 두지 않음

실무에서는 Lock을 항상 같은 전역 순서로 획득하고, Critical Section을 짧게 유지하며, 중첩 Lock을 줄이는 방법이 중요합니다.

Deadlock과 Starvation은 다릅니다. Starvation은 다른 작업이 계속 먼저 선택되어 특정 작업이 매우 오래 실행 기회를 얻지 못하는 상태입니다.

---

## 8. CPU Scheduling

### 목표 지표

- CPU Utilization: CPU가 유용한 작업을 한 비율
- Throughput: 단위 시간에 완료한 작업 수
- Turnaround Time: 도착부터 완료까지 걸린 시간
- Waiting Time: Ready Queue에서 기다린 시간
- Response Time: 요청부터 첫 반응까지 걸린 시간
- Fairness: 특정 작업이 과도하게 불리하지 않음

### Algorithm

| Algorithm | 특징 | 주의점 |
|---|---|---|
| FCFS | 먼저 도착한 순서 | 긴 작업 뒤 짧은 작업이 기다리는 Convoy Effect |
| SJF | 실행 시간이 짧은 작업 우선 | 실행 시간 예측 필요, 긴 작업 Starvation |
| SRTF | SJF의 선점형 | 빈번한 선점 비용 |
| Round Robin | Time Quantum만큼 순환 | Quantum이 작으면 전환 비용, 크면 FCFS에 가까움 |
| Priority | 우선순위가 높은 작업 | 낮은 우선순위 Starvation, Aging으로 완화 |
| MLFQ | 동작에 따라 Queue와 우선순위 이동 | 정책 조정이 복잡 |

현대 범용 OS Scheduler는 이 표의 단일 Algorithm 그대로라기보다 공정성, 우선순위, Multi Core, Cache Affinity를 함께 고려하는 복합 정책을 사용합니다.

---

## 9. Paging과 Segmentation

### 주소 변환

- Virtual Address: Process가 사용하는 독립된 주소
- Physical Address: 실제 RAM의 위치
- MMU: Virtual Address를 Physical Address로 변환하는 Hardware
- Page Table: Process별 Page Mapping과 권한 정보
- TLB: 최근 주소 변환을 저장하는 CPU Cache

### Paging

> Virtual Address Space를 고정 크기 Page로, Physical Memory를 같은 크기의 Frame으로 나누어 Mapping하는 방식입니다.

장점:

- Process의 Page를 연속되지 않은 Frame에 배치 가능
- 외부 단편화를 줄임
- Page 단위 보호, 공유, Demand Loading

주의:

- 마지막 Page의 남는 공간에서 내부 단편화
- Page Table이 Memory를 사용
- 주소 변환 비용이 있어 TLB가 중요

### Segmentation

Code, Data, Stack처럼 논리적 의미와 가변 크기를 가진 Segment로 주소 공간을 나눕니다. 보호와 공유 의미를 표현하기 쉽지만 크기가 다른 Segment의 할당·해제가 반복되면 외부 단편화가 생길 수 있습니다.

현대 System은 Paging을 기본으로 사용하면서 Memory Mapping과 Page 권한으로 논리 영역을 표현하는 경우가 많습니다. 교과서의 순수 Segmentation 모델과 현재 CPU·OS 구현을 구분해야 합니다.

---

## 10. Virtual Memory와 Page Fault

### Virtual Memory

> Virtual Memory는 Process마다 독립되고 큰 연속 주소 공간을 제공하고, 필요한 부분만 Physical Memory나 File·Swap과 Mapping하는 Memory 추상화입니다.

![Virtual Page와 Physical Frame의 Mapping](./static/images/study/virtual-memory.svg)

장점:

- Process 격리와 보호
- 실제 RAM보다 큰 논리 주소 공간
- 필요한 Page만 적재하는 Demand Paging
- Shared Library와 File Mapping
- Copy-on-Write를 이용한 효율적인 복제

### Page Fault

> CPU가 접근한 Virtual Page에 현재 유효한 Mapping이 없거나 접근 권한이 맞지 않을 때 발생하는 Exception입니다.

정상적인 Demand Page 처리:

1. CPU가 Virtual Address에 접근
2. Page Table Entry가 Present가 아님을 MMU가 확인
3. Kernel의 Page Fault Handler로 Trap
4. 접근이 유효한지 VMA와 권한 확인
5. 빈 Frame을 찾거나 기존 Page 교체
6. File이나 Swap에서 Page를 읽거나 0으로 초기화
7. Page Table과 TLB를 갱신
8. 중단된 Instruction 재실행

잘못된 주소나 권한 위반이면 Process에 Segmentation Fault 같은 오류 Signal을 전달할 수 있습니다. 따라서 Page Fault가 모두 Program Error인 것은 아닙니다.

### Minor와 Major Page Fault

- Minor Page Fault: Disk I/O 없이 Mapping을 만들 수 있음
- Major Page Fault: Storage에서 Page를 읽어야 해 큰 지연 발생

---

## 11. Page 교체와 Thrashing

Physical Memory에 빈 Frame이 부족하면 Victim Page를 선택해야 합니다.

| Algorithm | 원리 | 특징 |
|---|---|---|
| FIFO | 가장 먼저 들어온 Page 교체 | 단순하지만 Belady's Anomaly 가능 |
| OPT | 앞으로 가장 늦게 사용할 Page | 최적 비교 기준이지만 미래를 몰라 실제 구현 불가 |
| LRU | 가장 오래 참조되지 않은 Page | Locality를 반영하지만 정확한 구현 비용 큼 |
| Clock | Reference Bit를 순환 확인 | LRU의 근사로 널리 사용 |
| LFU | 참조 횟수가 가장 적은 Page | 오래된 빈도 편향과 관리 비용 |

### Thrashing

Working Set보다 할당 Frame이 부족해 Page Fault와 교체가 반복되고 CPU는 실제 작업보다 Paging을 기다리는 상태입니다.

완화:

- Process별 Working Set을 고려해 Frame 배분
- 동시에 Memory에 올리는 Process 수 조절
- Memory 사용량과 Major Fault 관측
- Locality가 좋은 Algorithm과 Data Layout
- RAM 확장 또는 Workload 분리

---

## 12. 핵심 용어

| 용어 | 설명 |
|---|---|
| Interrupt | Hardware 등이 CPU에 비동기 Event를 알리는 신호 |
| Exception | Instruction 실행 중 동기적으로 발생한 Event |
| Trap | Kernel로 제어를 넘기는 Exception의 한 형태로 쓰이는 용어 |
| Preemption | OS가 실행 중인 작업에서 CPU를 회수하는 것 |
| Time Slice | 선점형 Scheduling에서 한 작업에 연속으로 주는 CPU 시간 |
| Context Switch | 실행 상태를 저장·복원해 CPU 실행 대상을 바꾸는 과정 |
| Critical Section | 공유 상태에 대한 동시 접근을 제어해야 하는 Code 영역 |
| TLB | Virtual-to-Physical 주소 변환 Cache |
| Working Set | 일정 기간 Process가 활발히 사용하는 Page 집합 |
| Copy-on-Write | 공유 Page를 쓰려고 할 때 복사해 각자 변경하도록 하는 기법 |
| ASLR | 주소 공간 배치를 무작위화해 공격 난이도를 높이는 보호 기법 |

---

## 빠른 복습 체크리스트

- Program과 Process를 구분하고 PCB가 필요한 이유를 설명할 수 있는가?
- Process 상태 전이와 Context Switch 발생 시점을 설명할 수 있는가?
- Thread가 공유하는 영역과 독립적으로 가지는 상태를 말할 수 있는가?
- Shared Memory와 Message Passing의 Trade-off를 비교할 수 있는가?
- Mutex와 Binary Semaphore가 완전히 같지 않은 이유를 설명할 수 있는가?
- Deadlock 네 조건과 예방 방법을 연결할 수 있는가?
- Scheduling 지표에 따라 Algorithm의 장단점을 설명할 수 있는가?
- Paging과 Segmentation의 단편화 차이를 설명할 수 있는가?
- TLB와 Page Table의 역할을 구분할 수 있는가?
- Page Fault 처리와 Thrashing을 순서대로 설명할 수 있는가?
