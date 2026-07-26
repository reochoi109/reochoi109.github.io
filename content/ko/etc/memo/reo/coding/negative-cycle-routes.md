+++
title = "코딩테스트 노트"
description = "벨만-포드로 음수 간선과 도달 가능한 음수 순환을 함께 처리합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "negative-cycle-routes-024"
problem_title = "할인 경로와 무한 순환"
category = "최단 경로"
pattern = "벨만-포드 · 음수 사이클"
difficulty = "고급"
estimated_time = "40분"
index = 24
source = "자체 제작"
prompt = "0번부터 n-1번까지 도시와 가중치가 음수일 수도 있는 단방향 간선 (출발, 도착, 비용)이 주어집니다. start에서 각 도시까지의 최단 비용을 구하세요. start에서 도달 가능한 음수 순환이 있으면 None을 반환하고, 순환이 없으면 도달 불가능한 도시는 None으로 표시한 리스트를 반환하세요."
constraints = ["1 ≤ n ≤ 2,000", "0 ≤ edges의 길이 ≤ 10,000", "-1,000,000 ≤ 간선 비용 ≤ 1,000,000"]
hints = ["최단 경로가 순환을 사용하지 않는다면 간선 수는 최대 n-1개입니다.", "모든 간선을 n-1번 완화한 뒤에도 거리가 줄어드는 간선이 있고 그 출발점이 start에서 도달 가능하다면 음수 순환입니다."]
approach = ["시작점 거리를 0, 나머지는 무한대로 초기화합니다.", "최대 n-1번 모든 간선을 보며 출발점이 도달 가능하고 더 짧아지면 거리를 갱신합니다.", "한 회차에 갱신이 없다면 더 일찍 반복을 끝냅니다.", "간선을 한 번 더 검사해 갱신 가능하면 None을, 아니면 무한대만 None으로 바꾼 거리 목록을 반환합니다."]
time_complexity = "O(n × m)"
space_complexity = "O(n)"
gotchas = ["start에서 도달할 수 없는 음수 순환은 결과에 영향을 주지 않으므로 무시합니다.", "n번째 완화 검사는 실제 거리 갱신이 아니라 음수 순환 존재 판정에 사용합니다."]
code_python = """
def shortest_paths_with_negatives(
    n: int,
    edges: list[tuple[int, int, int]],
    start: int,
) -> list[int | None] | None:
    distances = [float("inf")] * n
    distances[start] = 0

    for _ in range(n - 1):
        changed = False
        for source, target, cost in edges:
            if distances[source] == float("inf"):
                continue
            new_distance = distances[source] + cost
            if new_distance < distances[target]:
                distances[target] = new_distance
                changed = True
        if not changed:
            break

    for source, target, cost in edges:
        if (
            distances[source] != float("inf")
            and distances[source] + cost < distances[target]
        ):
            return None

    return [
        None if distance == float("inf") else int(distance)
        for distance in distances
    ]
"""

[[examples]]
input = "n = 4, edges = [(0, 1, 4), (0, 2, 5), (1, 2, -2), (2, 3, 3)], start = 0"
output = "[0, 4, 2, 5]"
explanation = "음수 간선은 있지만 순환은 없으며 0 → 1 → 2 경로가 비용 2입니다."

[[examples]]
input = "n = 3, edges = [(0, 1, 1), (1, 2, -2), (2, 1, -2)], start = 0"
output = "None"
explanation = "start에서 도달 가능한 1 → 2 → 1 순환의 총비용이 -4입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
