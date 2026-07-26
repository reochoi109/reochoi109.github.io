+++
title = "코딩테스트 노트"
description = "이전 상태의 답을 재사용하는 동적 계획법의 기본 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "climbing-stairs-028"
problem_title = "계단을 오르는 방법의 수"
category = "동적 계획법"
pattern = "1차원 점화식"
difficulty = "초급"
estimated_time = "10분"
index = 28
source = "자체 제작"
prompt = "n개의 계단을 올라야 합니다. 한 번에 1칸 또는 2칸을 오를 수 있을 때, 정확히 n번째 계단에 도착하는 서로 다른 방법의 수를 반환하세요."
constraints = ["0 ≤ n ≤ 45", "이동 순서가 다르면 서로 다른 방법입니다.", "n = 0일 때는 아무것도 하지 않는 한 가지 방법이 있다고 정의합니다."]
hints = [
  "n번째 계단으로 오는 마지막 이동은 n-1에서 1칸 또는 n-2에서 2칸입니다.",
  "ways[n] = ways[n-1] + ways[n-2]이며 직전 두 값만 보관할 수 있습니다.",
]
approach = [
  "ways[i]를 i번째 계단에 도착하는 방법의 수로 정의합니다.",
  "0칸과 1칸의 방법 수를 각각 1로 초기화합니다.",
  "2부터 n까지 직전 두 방법 수를 더해 현재 방법 수를 계산합니다.",
  "직전 두 값만 갱신하며 n번째 값을 반환합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(1)"
gotchas = ["n = 0을 0가지로 처리하면 점화식의 초기값이 깨집니다.", "반복문 범위에 n을 포함해야 합니다.", "방법의 수를 구하는 문제이지 최소 이동 횟수를 구하는 문제가 아닙니다."]
code_python = """
def count_stair_ways(n: int) -> int:
    previous, current = 1, 1

    for _ in range(2, n + 1):
        previous, current = current, previous + current

    return current
"""

[[examples]]
input = "n = 4"
output = "5"
explanation = "1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2의 다섯 방법입니다."

[[examples]]
input = "n = 0"
output = "1"
explanation = "계단을 오르지 않는 빈 이동을 한 가지 방법으로 셉니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
