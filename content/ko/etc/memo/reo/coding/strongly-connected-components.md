+++
title = "코딩테스트 노트"
description = "두 번의 DFS로 서로 왕복 가능한 정점 묶음을 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "scc-021"
problem_title = "서로 왕복 가능한 그룹"
category = "DFS"
pattern = "강한 연결 요소 · Kosaraju"
difficulty = "고급"
estimated_time = "40분"
index = 21
source = "자체 제작"
prompt = "0번부터 n-1번까지 정점과 방향 간선이 주어집니다. 같은 그룹 안의 어떤 두 정점도 서로 도달할 수 있도록 정점을 강한 연결 요소로 나누세요. 각 그룹 내부와 전체 그룹 목록은 가장 작은 정점 순으로 정렬해 반환하세요."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ edges의 길이 ≤ 200,000", "모든 정점은 정확히 한 그룹에 포함됩니다."]
hints = ["원래 그래프에서 DFS가 끝나는 순서를 기록하면 요소 사이의 방향을 거슬러 탐색할 출발 순서를 얻습니다.", "간선을 모두 뒤집은 그래프에서 종료 순서의 역순으로 DFS하면 한 번에 하나의 강한 연결 요소만 모입니다."]
approach = ["원래 그래프와 모든 간선을 뒤집은 역방향 그래프를 만듭니다.", "원래 그래프의 모든 정점을 DFS하고 각 정점의 탐색이 끝나는 순간 순서 목록에 넣습니다.", "종료 순서를 거꾸로 보며 역방향 그래프에서 미방문 정점마다 DFS를 실행해 그룹을 모읍니다.", "각 그룹과 그룹 목록을 정렬해 반환합니다."]
time_complexity = "O(n + m), 정렬 비용 제외"
space_complexity = "O(n + m)"
gotchas = ["첫 DFS는 진입 순서가 아니라 종료 순서를 기록해야 합니다.", "두 번째 DFS에서는 반드시 모든 간선을 뒤집은 그래프를 사용해야 합니다."]
code_python = """
import sys


def strongly_connected_components(
    n: int, edges: list[tuple[int, int]]
) -> list[list[int]]:
    sys.setrecursionlimit(max(1_000_000, n * 2))
    graph = [[] for _ in range(n)]
    reverse = [[] for _ in range(n)]
    for start, end in edges:
        graph[start].append(end)
        reverse[end].append(start)

    visited = [False] * n
    order = []

    def finish_dfs(node: int) -> None:
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                finish_dfs(neighbor)
        order.append(node)

    for node in range(n):
        if not visited[node]:
            finish_dfs(node)

    visited = [False] * n
    groups = []

    def collect_dfs(node: int, group: list[int]) -> None:
        visited[node] = True
        group.append(node)
        for neighbor in reverse[node]:
            if not visited[neighbor]:
                collect_dfs(neighbor, group)

    for node in reversed(order):
        if not visited[node]:
            group = []
            collect_dfs(node, group)
            groups.append(sorted(group))
    return sorted(groups, key=lambda group: group[0])
"""

[[examples]]
input = "n = 5, edges = [(0, 1), (1, 2), (2, 0), (2, 3), (3, 4), (4, 3)]"
output = "[[0, 1, 2], [3, 4]]"
explanation = "0·1·2는 서로 왕복 가능하고, 3·4도 서로 왕복 가능합니다."

[[examples]]
input = "n = 3, edges = [(0, 1), (1, 2)]"
output = "[[0], [1], [2]]"
explanation = "역방향으로 돌아오는 경로가 없어 각 정점이 독립 그룹입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
