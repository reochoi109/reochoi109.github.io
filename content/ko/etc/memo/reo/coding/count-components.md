+++
title = "코딩테스트 노트"
description = "인접 리스트와 방문 배열로 무방향 그래프의 덩어리를 세는 기본 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "count-components-013"
problem_title = "연결 요소의 개수"
category = "그래프"
pattern = "인접 리스트 · 그래프 순회"
difficulty = "초급"
estimated_time = "10분"
index = 13
source = "자체 제작"
prompt = "0번부터 n-1번까지 n개의 정점과 무방향 간선 목록 edges가 주어집니다. 서로 경로로 이어진 정점들의 묶음인 연결 요소가 모두 몇 개인지 반환하세요."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ edges의 길이 ≤ 200,000", "간선에는 중복과 자기 자신을 잇는 간선이 없습니다."]
hints = ["간선을 양쪽 정점의 목록에 모두 넣어 인접 리스트를 만드세요.", "아직 방문하지 않은 정점에서 탐색을 시작할 때마다 새로운 연결 요소를 발견한 것입니다."]
approach = ["빈 인접 리스트를 만들고 각 무방향 간선을 양쪽에 등록합니다.", "모든 정점을 순서대로 확인하며 방문하지 않은 정점을 찾습니다.", "그 정점에서 스택 탐색을 시작하고 도달하는 모든 정점을 방문 처리합니다.", "새 탐색을 시작한 횟수를 반환합니다."]
time_complexity = "O(n + m), m은 간선 수"
space_complexity = "O(n + m)"
gotchas = ["간선을 한쪽 방향에만 넣으면 무방향 연결 관계를 놓칩니다.", "간선이 하나도 없는 경우 각 정점이 독립된 연결 요소입니다."]
code_python = """
def count_components(n: int, edges: list[tuple[int, int]]) -> int:
    graph = [[] for _ in range(n)]
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)

    visited = [False] * n
    count = 0

    for start in range(n):
        if visited[start]:
            continue
        count += 1
        visited[start] = True
        stack = [start]
        while stack:
            node = stack.pop()
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    stack.append(neighbor)
    return count
"""

[[examples]]
input = "n = 5, edges = [(0, 1), (1, 2), (3, 4)]"
output = "2"
explanation = "{0, 1, 2}와 {3, 4}, 두 묶음입니다."

[[examples]]
input = "n = 4, edges = []"
output = "4"
explanation = "간선이 없으므로 모든 정점이 하나의 연결 요소입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
