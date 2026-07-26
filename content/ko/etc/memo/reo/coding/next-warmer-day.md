+++
title = "코딩테스트 노트"
description = "단조 스택으로 각 위치의 다음 큰 값을 한 번의 순회에서 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "next-warmer-day-008"
slug = "next-warmer-day"
problem_title = "더 따뜻한 날까지의 거리"
category = "스택 · 큐"
pattern = "단조 스택"
difficulty = "중급"
estimated_time = "15분"
index = 8
source = "자체 제작"
prompt = "날짜 순서대로 기록한 정수 기온 배열 temperatures가 주어집니다. 각 날짜마다 이후에 처음으로 더 높은 기온이 나타나기까지 기다려야 하는 날짜 수를 반환하세요. 더 높은 기온이 이후에 없다면 0을 기록합니다."
constraints = ["1 ≤ temperatures의 길이 ≤ 100,000", "-100 ≤ temperatures[i] ≤ 100"]
hints = [
  "아직 더 따뜻한 날을 찾지 못한 날짜의 인덱스를 스택에 보관하세요.",
  "현재 기온이 스택 맨 위 날짜의 기온보다 높다면 그 날짜의 답을 확정할 수 있습니다.",
]
approach = [
  "답 배열을 0으로 초기화하고 미해결 날짜 인덱스를 담을 스택을 만듭니다.",
  "기온을 왼쪽부터 순회하며 현재 기온보다 낮은 기온의 인덱스를 스택에서 반복해 꺼냅니다.",
  "꺼낸 인덱스의 답을 현재 인덱스와의 차이로 기록합니다.",
  "현재 인덱스를 스택에 넣고, 끝까지 남은 인덱스의 답은 0으로 둡니다.",
]
time_complexity = "O(n)"
space_complexity = "O(n)"
gotchas = ["같은 기온은 '더 높은' 기온이 아니므로 스택에서 꺼내지 않습니다.", "스택에는 기온이 아니라 거리 계산에 필요한 인덱스를 저장합니다."]
code_python = """
def days_until_warmer(temperatures: list[int]) -> list[int]:
    answer = [0] * len(temperatures)
    stack: list[int] = []

    for today, temperature in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temperature:
            previous = stack.pop()
            answer[previous] = today - previous
        stack.append(today)

    return answer
"""

[[examples]]
input = "temperatures = [30, 40, 35, 50]"
output = "[1, 2, 1, 0]"
explanation = "둘째 날의 다음 높은 기온은 이틀 뒤의 50도입니다."

[[examples]]
input = "temperatures = [50, 40, 40, 30]"
output = "[0, 0, 0, 0]"
explanation = "각 날짜 이후에 더 높은 기온이 없습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
