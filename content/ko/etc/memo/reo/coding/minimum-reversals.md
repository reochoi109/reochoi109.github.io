+++
title = "코딩테스트 노트"
description = "비용이 0과 1뿐인 그래프를 덱으로 탐색해 최소 비용을 구합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "minimum-reversals-023"
problem_title = "최소 방향 전환"
category = "최단 경로"
pattern = "0-1 BFS · 덱"
difficulty = "중급"
estimated_time = "25분"
index = 23
source = "자체 제작"
prompt = "0번부터 n-1번까지 교차로와 현재 방향이 정해진 단방향 도로 (a, b)가 주어집니다. 도로는 원하는 만큼 뒤집을 수 있고, 한 도로를 뒤집는 비용은 1입니다. start에서 end로 이동할 수 있게 만드는 최소 뒤집기 횟수를 반환하세요. 도로를 어느 방향으로도 사용할 수 없는 경우는 없습니다."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ roads의 길이 ≤ 200,000", "각 도로는 서로 다른 두 교차로를 연결합니다."]
hints = ["기존 방향 a → b로 이동하는 비용은 0, 반대로 b → a로 이동하는 비용은 1인 간선으로 바꾸세요.", "가중치가 0인 새 상태는 덱의 앞, 1인 새 상태는 뒤에 넣으면 거리 순서가 유지됩니다."]
approach = ["각 도로 a → b에 대해 (b, 0)을 a에, (a, 1)을 b에 추가합니다.", "시작 거리를 0으로 두고 덱에서 정점을 꺼냅니다.", "더 짧은 거리를 찾으면 비용 0 간선은 덱 앞에, 비용 1 간선은 덱 뒤에 넣습니다.", "탐색이 끝난 뒤 목적지의 최소 비용을 반환합니다."]
time_complexity = "O(n + m)"
space_complexity = "O(n + m)"
gotchas = ["역방향 간선도 그래프에 넣되 비용을 1로 지정해야 합니다.", "일반 BFS처럼 모두 덱 뒤에 넣으면 비용 순서가 보장되지 않습니다."]
code_python = """
from collections import deque


def minimum_reversals(
    n: int,
    roads: list[tuple[int, int]],
    start: int,
    end: int,
) -> int:
    graph = [[] for _ in range(n)]
    for a, b in roads:
        graph[a].append((b, 0))
        graph[b].append((a, 1))

    distances = [float("inf")] * n
    distances[start] = 0
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor, cost in graph[node]:
            new_distance = distances[node] + cost
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                if cost == 0:
                    queue.appendleft(neighbor)
                else:
                    queue.append(neighbor)
    return int(distances[end]) if distances[end] != float("inf") else -1
"""

[[examples]]
input = "n = 4, roads = [(0, 1), (2, 1), (2, 3)], start = 0, end = 3"
output = "1"
explanation = "1 ← 2 도로를 1 → 2로 한 번 뒤집으면 0 → 1 → 2 → 3으로 갑니다."

[[examples]]
input = "n = 3, roads = [(0, 1), (1, 2)], start = 0, end = 2"
output = "0"
explanation = "기존 방향만 따라 목적지에 도달하므로 뒤집을 필요가 없습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
