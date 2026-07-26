+++
title = "코딩테스트 노트"
description = "진입 차수와 큐를 이용해 선행 관계를 만족하는 순서를 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "course-order-014"
problem_title = "선행 과목 순서 정하기"
category = "그래프"
pattern = "위상 정렬 · 진입 차수"
difficulty = "중급"
estimated_time = "20분"
index = 14
source = "자체 제작"
prompt = "0번부터 n-1번까지 과목이 있고 prerequisites의 (course, before)는 course를 듣기 전에 before를 이수해야 한다는 뜻입니다. 모든 과목을 들을 수 있는 순서 하나를 반환하세요. 순환 의존성이 있어 불가능하면 빈 리스트를 반환하세요."
constraints = ["1 ≤ n ≤ 100,000", "0 ≤ prerequisites의 길이 ≤ 200,000", "동일한 선행 관계는 중복해서 주어지지 않습니다."]
hints = ["선행 과목이 하나도 남지 않은 과목부터 선택해야 합니다.", "과목을 처리할 때 그 과목을 선행 조건으로 삼는 이웃들의 진입 차수를 1씩 줄이세요."]
approach = ["before에서 course로 향하는 그래프를 만들고 각 과목의 진입 차수를 계산합니다.", "진입 차수가 0인 모든 과목을 큐에 넣습니다.", "큐에서 과목을 꺼내 결과에 추가하고 이웃의 진입 차수를 줄입니다.", "결과 길이가 n이면 순서를, 아니면 순환이 있으므로 빈 리스트를 반환합니다."]
time_complexity = "O(n + m)"
space_complexity = "O(n + m)"
gotchas = ["간선 방향은 선행 과목 before에서 수강 과목 course입니다.", "처리 결과가 n개인지 확인하지 않으면 순환을 감지할 수 없습니다."]
code_python = """
from collections import deque


def course_order(
    n: int, prerequisites: list[tuple[int, int]]
) -> list[int]:
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for course, before in prerequisites:
        graph[before].append(course)
        indegree[course] += 1

    queue = deque(i for i in range(n) if indegree[i] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == n else []
"""

[[examples]]
input = "n = 4, prerequisites = [(1, 0), (2, 0), (3, 1), (3, 2)]"
output = "[0, 1, 2, 3]"
explanation = "0을 먼저 듣고 1과 2를 들은 뒤 3을 들을 수 있습니다."

[[examples]]
input = "n = 2, prerequisites = [(0, 1), (1, 0)]"
output = "[]"
explanation = "두 과목이 서로를 선행 조건으로 요구해 순환이 생깁니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
