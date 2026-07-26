+++
title = "코딩테스트 노트"
description = "DFS 탐색 중인 경로를 구분해 방향 그래프의 순환을 감지합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "directed-cycle-020"
problem_title = "의존성 그래프의 순환"
category = "DFS"
pattern = "3색 DFS · 사이클 감지"
difficulty = "중급"
estimated_time = "20분"
index = 20
source = "자체 제작"
prompt = "0번부터 n-1번까지 정점과 방향 간선 목록 edges가 주어집니다. 방향을 따라 출발점으로 돌아오는 순환 경로가 하나라도 있는지 반환하세요."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ edges의 길이 ≤ 200,000", "자기 자신을 향하는 간선도 주어질 수 있습니다."]
hints = ["방문하지 않음, 현재 DFS 경로에서 탐색 중, 탐색 완료의 세 상태를 구분하세요.", "탐색 중인 정점을 다시 만나는 간선은 현재 경로의 조상을 향하므로 순환을 뜻합니다."]
approach = ["방향 인접 리스트와 모든 정점의 상태 배열을 만듭니다.", "정점에 진입할 때 상태를 탐색 중으로 바꿉니다.", "이웃이 탐색 중이면 순환이고, 미방문이면 재귀적으로 검사합니다.", "모든 이웃을 안전하게 처리하면 완료 상태로 바꾸며, 어느 DFS든 순환을 찾으면 True를 반환합니다."]
time_complexity = "O(n + m)"
space_complexity = "O(n + m)"
gotchas = ["완료된 정점을 다시 만나는 것은 순환의 증거가 아닙니다.", "무방향 그래프의 부모 제외 방식과 혼동하지 말고 현재 재귀 경로 상태를 확인해야 합니다."]
code_python = """
import sys


def has_directed_cycle(n: int, edges: list[tuple[int, int]]) -> bool:
    sys.setrecursionlimit(max(1_000_000, n * 2))
    graph = [[] for _ in range(n)]
    for start, end in edges:
        graph[start].append(end)

    state = [0] * n

    def dfs(node: int) -> bool:
        state[node] = 1
        for neighbor in graph[node]:
            if state[neighbor] == 1:
                return True
            if state[neighbor] == 0 and dfs(neighbor):
                return True
        state[node] = 2
        return False

    return any(state[node] == 0 and dfs(node) for node in range(n))
"""

[[examples]]
input = "n = 4, edges = [(0, 1), (1, 2), (2, 0), (2, 3)]"
output = "True"
explanation = "0 → 1 → 2 → 0으로 돌아오는 순환이 있습니다."

[[examples]]
input = "n = 4, edges = [(0, 1), (0, 2), (2, 3)]"
output = "False"
explanation = "모든 간선이 앞으로만 이어지고 출발점으로 돌아오지 않습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
