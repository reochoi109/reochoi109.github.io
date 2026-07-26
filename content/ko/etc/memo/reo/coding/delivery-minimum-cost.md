+++
title = "코딩테스트 노트"
description = "우선순위 큐와 다익스트라로 양수 가중치 그래프의 최소 비용을 구합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "delivery-minimum-cost-022"
problem_title = "배송 최소 비용"
category = "최단 경로"
pattern = "다익스트라 · 우선순위 큐"
difficulty = "초급"
estimated_time = "20분"
index = 22
source = "자체 제작"
prompt = "0번부터 n-1번까지 도시와 단방향 도로 (출발, 도착, 비용)가 주어집니다. start에서 end까지 이동하는 최소 비용을 반환하세요. 도달할 수 없으면 -1을 반환하세요."
constraints = ["1 ≤ n ≤ 100,000", "1 ≤ 도로 비용 ≤ 1,000,000", "0 ≤ 도로 수 ≤ 200,000"]
hints = ["현재까지 알려진 거리가 가장 작은 정점을 먼저 확정해야 합니다.", "우선순위 큐에서 꺼낸 거리가 이미 기록된 거리보다 크면 오래된 항목이므로 건너뛰세요."]
approach = ["각 도시에 (도착, 비용) 목록을 저장하고 모든 거리를 무한대로 초기화합니다.", "시작 거리 0을 최소 힙에 넣습니다.", "가장 가까운 도시를 꺼내 각 도로를 거친 새 비용이 더 작으면 거리를 갱신해 힙에 넣습니다.", "목적지를 꺼내면 그 비용을 반환하고 끝까지 못 만나면 -1을 반환합니다."]
time_complexity = "O((n + m) log n)"
space_complexity = "O(n + m)"
gotchas = ["다익스트라는 음수 비용 간선에는 사용할 수 없습니다.", "힙에 같은 정점이 여러 번 들어갈 수 있으므로 오래된 거리인지 반드시 확인합니다."]
code_python = """
import heapq


def minimum_delivery_cost(
    n: int,
    roads: list[tuple[int, int, int]],
    start: int,
    end: int,
) -> int:
    graph = [[] for _ in range(n)]
    for source, target, cost in roads:
        graph[source].append((target, cost))

    distances = [float("inf")] * n
    distances[start] = 0
    heap = [(0, start)]
    while heap:
        distance, node = heapq.heappop(heap)
        if distance != distances[node]:
            continue
        if node == end:
            return distance
        for neighbor, cost in graph[node]:
            new_distance = distance + cost
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                heapq.heappush(heap, (new_distance, neighbor))
    return -1
"""

[[examples]]
input = "n = 4, roads = [(0, 1, 5), (0, 2, 2), (2, 1, 1), (1, 3, 3)], start = 0, end = 3"
output = "6"
explanation = "0 → 2 → 1 → 3의 비용은 2 + 1 + 3입니다."

[[examples]]
input = "n = 3, roads = [(0, 1, 4)], start = 0, end = 2"
output = "-1"
explanation = "0에서 2로 이어지는 경로가 없습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
