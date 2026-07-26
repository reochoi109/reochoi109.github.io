+++
title = "코딩테스트 노트"
description = "DFS 방문 순서와 저점 값을 이용해 끊어지는 간선을 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "critical-bridges-015"
problem_title = "네트워크의 단절 간선"
category = "그래프"
pattern = "단절선 · Tarjan DFS"
difficulty = "고급"
estimated_time = "40분"
index = 15
source = "자체 제작"
prompt = "0번부터 n-1번까지 정점으로 구성된 무방향 그래프가 주어집니다. 제거했을 때 연결 요소의 수가 증가하는 모든 단절선을 (작은 정점, 큰 정점) 형태로 정렬해 반환하세요. 그래프는 처음부터 여러 연결 요소일 수 있습니다."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ edges의 길이 ≤ 200,000", "중복 간선과 자기 자신을 잇는 간선은 없습니다."]
hints = ["DFS 트리에서 자식이 조상의 정점으로 돌아갈 수 있는 가장 이른 방문 순서를 low 값으로 기록하세요.", "자식의 low 값이 현재 정점의 방문 순서보다 크면 그 자식은 현재 간선 없이 조상으로 돌아갈 수 없습니다."]
approach = ["각 정점의 최초 방문 순서 discovery와 도달 가능한 최소 순서 low를 관리합니다.", "DFS 자식을 탐색한 뒤 low 값을 합치고 low[child] > discovery[node]이면 현재 간선을 답에 추가합니다.", "이미 방문한 이웃이 부모가 아니라면 역방향 간선으로 보고 low를 갱신합니다.", "연결되지 않은 그래프를 위해 모든 미방문 정점에서 DFS를 시작한 뒤 답을 정렬합니다."]
time_complexity = "O(n + m)"
space_complexity = "O(n + m)"
gotchas = ["무방향 간선에서 바로 되돌아가는 부모 간선은 low 갱신에서 제외해야 합니다.", "깊은 그래프에서는 Python 재귀 한도를 입력 크기에 맞게 늘려야 합니다."]
code_python = """
import sys


def critical_bridges(
    n: int, edges: list[tuple[int, int]]
) -> list[tuple[int, int]]:
    sys.setrecursionlimit(max(1_000_000, n * 2))
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    discovery = [-1] * n
    low = [0] * n
    timer = 0
    bridges = []

    def dfs(node: int, parent: int) -> None:
        nonlocal timer
        discovery[node] = low[node] = timer
        timer += 1
        for neighbor in graph[node]:
            if neighbor == parent:
                continue
            if discovery[neighbor] == -1:
                dfs(neighbor, node)
                low[node] = min(low[node], low[neighbor])
                if low[neighbor] > discovery[node]:
                    bridges.append((min(node, neighbor), max(node, neighbor)))
            else:
                low[node] = min(low[node], discovery[neighbor])

    for node in range(n):
        if discovery[node] == -1:
            dfs(node, -1)
    return sorted(bridges)
"""

[[examples]]
input = "n = 5, edges = [(0, 1), (1, 2), (2, 0), (1, 3), (3, 4)]"
output = "[(1, 3), (3, 4)]"
explanation = "삼각형 내부 간선은 우회할 수 있지만 1-3과 3-4는 우회 경로가 없습니다."

[[examples]]
input = "n = 4, edges = [(0, 1), (1, 2), (2, 3), (3, 0)]"
output = "[]"
explanation = "모든 간선에 반대편으로 도는 우회 경로가 있습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
