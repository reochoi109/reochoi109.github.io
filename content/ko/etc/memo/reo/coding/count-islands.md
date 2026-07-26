+++
title = "코딩테스트 노트"
description = "재귀 DFS로 격자의 연결된 땅을 하나씩 지우며 섬을 셉니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "count-islands-019"
problem_title = "격자의 섬 개수"
category = "DFS"
pattern = "격자 DFS · 플러드 필"
difficulty = "초급"
estimated_time = "15분"
index = 19
source = "자체 제작"
prompt = "문자 '1'은 땅, '0'은 물인 격자가 주어집니다. 상하좌우로 붙은 땅을 하나의 섬으로 볼 때 섬의 총개수를 반환하세요."
constraints = ["1 ≤ 행과 열의 수 ≤ 500", "격자는 '0'과 '1'로만 구성됩니다.", "대각선으로 닿은 땅은 연결된 것으로 보지 않습니다."]
hints = ["아직 방문하지 않은 땅을 발견할 때마다 새로운 섬 하나를 찾은 것입니다.", "그 땅에서 DFS를 실행해 이어진 모든 땅을 방문 처리하세요."]
approach = ["격자의 모든 칸을 순서대로 확인합니다.", "땅을 발견하면 섬 개수를 올리고 그 위치에서 DFS를 시작합니다.", "DFS는 현재 땅을 물로 바꾸고 상하좌우의 땅을 계속 방문합니다.", "모든 칸을 확인한 뒤 섬 개수를 반환합니다."]
time_complexity = "O(r × c)"
space_complexity = "O(r × c), 최악의 재귀 스택"
gotchas = ["대각선 방향을 포함하지 않도록 이동 방향을 네 개만 둡니다.", "입력 격자를 변경하는 풀이이므로 원본이 필요하다면 복사해서 전달해야 합니다."]
code_python = """
import sys


def count_islands(grid: list[list[str]]) -> int:
    sys.setrecursionlimit(max(1_000_000, len(grid) * len(grid[0]) + 10))
    rows, cols = len(grid), len(grid[0])

    def dfs(row: int, col: int) -> None:
        if not (0 <= row < rows and 0 <= col < cols):
            return
        if grid[row][col] != "1":
            return
        grid[row][col] = "0"
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(row + dr, col + dc)

    islands = 0
    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == "1":
                islands += 1
                dfs(row, col)
    return islands
"""

[[examples]]
input = "grid = [['1', '1', '0'], ['0', '1', '0'], ['0', '0', '1']]"
output = "2"
explanation = "왼쪽 위의 세 칸과 오른쪽 아래 한 칸이 각각 섬을 이룹니다."

[[examples]]
input = "grid = [['0', '0'], ['0', '0']]"
output = "0"
explanation = "땅이 한 칸도 없습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
