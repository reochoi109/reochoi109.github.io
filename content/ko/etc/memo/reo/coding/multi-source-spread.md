+++
title = "코딩테스트 노트"
description = "여러 시작점을 한 큐에 넣는 다중 시작점 BFS 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "multi-source-spread-017"
problem_title = "신호가 모두 퍼지는 시간"
category = "BFS"
pattern = "다중 시작점 BFS"
difficulty = "중급"
estimated_time = "20분"
index = 17
source = "자체 제작"
prompt = "격자에서 1은 신호 발생지, 0은 신호를 받아야 하는 칸, -1은 막힌 칸입니다. 매분 신호는 상하좌우의 0인 칸으로 동시에 퍼집니다. 모든 0에 신호가 도달하는 최소 시간을 반환하고, 불가능하면 -1을 반환하세요."
constraints = ["1 ≤ 행과 열의 수 ≤ 1,000", "격자에는 적어도 하나의 신호 발생지가 있습니다.", "막힌 칸으로는 신호가 지나갈 수 없습니다."]
hints = ["모든 시작점을 동시에 큐에 넣어야 실제 동시 전파 시간을 표현할 수 있습니다.", "아직 남은 0의 개수를 세면 도달 불가능 여부를 쉽게 판정할 수 있습니다."]
approach = ["모든 1을 거리 0으로 큐에 넣고 0의 개수를 셉니다.", "큐에서 칸을 꺼내 상하좌우의 0을 1로 바꾸고 거리 1을 더해 넣습니다.", "신호가 새 칸에 도달할 때마다 남은 0을 줄이고 최대 시간을 갱신합니다.", "탐색 후 0이 남았으면 -1, 아니면 최대 시간을 반환합니다."]
time_complexity = "O(r × c)"
space_complexity = "O(r × c)"
gotchas = ["시작점마다 BFS를 따로 실행하면 시간도 느리고 동시 전파를 잘못 계산합니다.", "처음부터 0이 없다면 걸린 시간은 0입니다."]
code_python = """
from collections import deque


def spread_time(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    remaining = 0
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 1:
                queue.append((row, col, 0))
            elif grid[row][col] == 0:
                remaining += 1

    elapsed = 0
    while queue:
        row, col, minute = queue.popleft()
        elapsed = max(elapsed, minute)
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = row + dr, col + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                grid[nr][nc] = 1
                remaining -= 1
                queue.append((nr, nc, minute + 1))

    return elapsed if remaining == 0 else -1
"""

[[examples]]
input = "grid = [[1, 0, 0], [0, -1, 0], [0, 0, 1]]"
output = "2"
explanation = "두 발생지에서 동시에 퍼져 모든 열린 칸에 2분 안에 도달합니다."

[[examples]]
input = "grid = [[1, -1, 0], [-1, -1, 0], [0, 0, 0]]"
output = "-1"
explanation = "막힌 칸이 신호 발생지와 나머지 열린 영역을 분리합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
