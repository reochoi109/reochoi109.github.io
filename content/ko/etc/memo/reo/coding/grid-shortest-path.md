+++
title = "코딩테스트 노트"
description = "격자를 그래프로 보고 BFS로 최소 이동 횟수를 구합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "grid-shortest-path-016"
problem_title = "격자에서 가장 짧은 길"
category = "BFS"
pattern = "격자 BFS · 최단 거리"
difficulty = "초급"
estimated_time = "15분"
index = 16
source = "자체 제작"
prompt = "0은 이동 가능한 칸, 1은 벽인 직사각형 격자가 주어집니다. 왼쪽 위 (0, 0)에서 오른쪽 아래까지 상하좌우로 이동하는 최소 횟수를 반환하세요. 도착할 수 없으면 -1을 반환하세요."
constraints = ["1 ≤ 행과 열의 수 ≤ 1,000", "시작 칸과 도착 칸도 벽일 수 있습니다.", "한 번 이동할 때 인접한 한 칸으로 갑니다."]
hints = ["모든 이동 비용이 1이므로 가까운 칸부터 방문하는 BFS가 맞습니다.", "큐에 넣는 순간 방문 처리하면 같은 칸이 여러 번 들어가지 않습니다."]
approach = ["시작이나 도착이 벽이면 즉시 -1을 반환합니다.", "시작 좌표와 거리 0을 큐에 넣고 방문 처리합니다.", "큐에서 꺼낸 칸의 상하좌우 중 범위 안의 이동 가능한 미방문 칸을 추가합니다.", "도착 칸을 꺼내면 거리를 반환하고 큐가 비면 -1을 반환합니다."]
time_complexity = "O(r × c)"
space_complexity = "O(r × c)"
gotchas = ["시작점과 도착점이 같은 1×1 격자의 답은 0입니다.", "큐에서 꺼낼 때가 아니라 넣을 때 방문 처리해야 중복 삽입을 막습니다."]
code_python = """
from collections import deque


def grid_shortest_path(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    if grid[0][0] == 1 or grid[rows - 1][cols - 1] == 1:
        return -1

    queue = deque([(0, 0, 0)])
    visited = {(0, 0)}
    while queue:
        row, col, distance = queue.popleft()
        if (row, col) == (rows - 1, cols - 1):
            return distance
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = row + dr, col + dc
            if (
                0 <= nr < rows
                and 0 <= nc < cols
                and grid[nr][nc] == 0
                and (nr, nc) not in visited
            ):
                visited.add((nr, nc))
                queue.append((nr, nc, distance + 1))
    return -1
"""

[[examples]]
input = "grid = [[0, 0, 1], [1, 0, 0], [1, 1, 0]]"
output = "4"
explanation = "오른쪽, 아래, 오른쪽, 아래로 네 번 이동합니다."

[[examples]]
input = "grid = [[0, 1], [1, 0]]"
output = "-1"
explanation = "시작점에서 이동할 수 있는 인접 칸이 없습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
