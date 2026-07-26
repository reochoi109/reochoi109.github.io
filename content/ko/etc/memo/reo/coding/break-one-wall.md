+++
title = "코딩테스트 노트"
description = "위치와 벽 사용 여부를 함께 상태로 관리하는 BFS 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "break-one-wall-018"
problem_title = "벽 하나를 넘는 최단 경로"
category = "BFS"
pattern = "상태 확장 BFS"
difficulty = "고급"
estimated_time = "35분"
index = 18
source = "자체 제작"
prompt = "0은 빈칸, 1은 벽인 격자에서 왼쪽 위에서 오른쪽 아래까지 이동합니다. 이동 중 벽을 최대 한 번 통과할 수 있을 때 상하좌우 최소 이동 횟수를 반환하세요. 도달할 수 없으면 -1을 반환하세요. 시작과 도착은 빈칸입니다."
constraints = ["1 ≤ 행과 열의 수 ≤ 1,000", "시작 칸과 도착 칸은 항상 0입니다.", "벽 통과 기회는 사용하지 않아도 됩니다."]
hints = ["같은 좌표라도 벽을 이미 통과한 상태와 아직 기회가 남은 상태는 서로 다릅니다.", "visited를 좌표뿐 아니라 wall_used 값까지 포함한 3차원 상태로 관리하세요."]
approach = ["상태를 (행, 열, 벽 사용 여부, 거리)로 정의하고 시작 상태를 큐에 넣습니다.", "빈칸으로 이동할 때는 벽 사용 여부를 그대로 유지합니다.", "벽으로 이동할 때 아직 기회를 쓰지 않았다면 사용 여부를 1로 바꿔 넣습니다.", "목적지 상태를 처음 꺼낸 거리를 반환하고 모든 상태가 소진되면 -1을 반환합니다."]
time_complexity = "O(r × c)"
space_complexity = "O(r × c)"
gotchas = ["좌표만 방문 처리하면 벽을 쓰지 않고 도착한 더 유리한 상태를 잃을 수 있습니다.", "벽을 만났을 때만 wall_used를 변경해야 하며 빈칸 이동에서는 유지합니다."]
code_python = """
from collections import deque


def shortest_path_break_one(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue = deque([(0, 0, 0, 0)])
    visited = [[[False, False] for _ in range(cols)] for _ in range(rows)]
    visited[0][0][0] = True

    while queue:
        row, col, used, distance = queue.popleft()
        if (row, col) == (rows - 1, cols - 1):
            return distance
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = row + dr, col + dc
            if not (0 <= nr < rows and 0 <= nc < cols):
                continue
            next_used = used + grid[nr][nc]
            if next_used <= 1 and not visited[nr][nc][next_used]:
                visited[nr][nc][next_used] = True
                queue.append((nr, nc, next_used, distance + 1))
    return -1
"""

[[examples]]
input = "grid = [[0, 1, 0], [0, 1, 0], [0, 1, 0]]"
output = "4"
explanation = "가운데 열의 벽 하나를 통과하면 네 번 이동해 도착합니다."

[[examples]]
input = "grid = [[0, 1, 1], [1, 1, 1], [1, 1, 0]]"
output = "-1"
explanation = "목적지까지 가려면 벽을 한 번보다 많이 통과해야 합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
