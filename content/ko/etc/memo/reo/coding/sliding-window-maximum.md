+++
title = "코딩테스트 노트"
description = "값이 큰 후보만 덱에 유지해 모든 고정 길이 구간의 최댓값을 구합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "sliding-window-maximum-009"
slug = "sliding-window-maximum"
problem_title = "이동 구간의 최댓값"
category = "스택 · 큐"
pattern = "단조 덱"
difficulty = "고급"
estimated_time = "25분"
index = 9
source = "자체 제작"
prompt = "정수 배열 nums와 창의 길이 k가 주어집니다. 길이가 k인 창을 배열의 왼쪽 끝부터 오른쪽으로 한 칸씩 옮길 때, 각 창의 최댓값을 순서대로 반환하세요."
constraints = ["1 ≤ nums의 길이 ≤ 100,000", "1 ≤ k ≤ nums의 길이", "-1,000,000,000 ≤ nums[i] ≤ 1,000,000,000"]
hints = [
  "현재 값보다 작거나 같은 이전 값은 현재 값이 창 안에 있는 동안 최댓값이 될 수 없습니다.",
  "인덱스를 값이 내림차순이 되도록 덱에 유지하면 맨 앞이 현재 창의 최댓값입니다.",
]
approach = [
  "최댓값 후보의 인덱스를 보관할 덱과 결과 배열을 준비합니다.",
  "현재 창의 왼쪽 경계보다 오래된 인덱스를 덱 앞에서 제거합니다.",
  "현재 값보다 작거나 같은 후보를 덱 뒤에서 제거한 뒤 현재 인덱스를 추가합니다.",
  "첫 창이 완성된 시점부터 덱 앞 인덱스의 값을 결과에 추가합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(k)"
gotchas = ["덱에 값만 저장하면 창을 벗어났는지 알 수 없으므로 인덱스를 저장합니다.", "같은 값의 오래된 인덱스를 제거해도 더 최신 인덱스가 같은 최댓값 역할을 할 수 있습니다.", "결과는 인덱스 k - 1부터 기록합니다."]
code_python = """
from collections import deque


def sliding_window_maximum(nums: list[int], k: int) -> list[int]:
    candidates: deque[int] = deque()
    answer: list[int] = []

    for right, value in enumerate(nums):
        left = right - k + 1

        while candidates and candidates[0] < left:
            candidates.popleft()
        while candidates and nums[candidates[-1]] <= value:
            candidates.pop()

        candidates.append(right)
        if left >= 0:
            answer.append(nums[candidates[0]])

    return answer
"""

[[examples]]
input = "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3"
output = "[3, 3, 5, 5, 6, 7]"
explanation = "길이 3인 각 연속 구간의 최댓값을 차례로 기록합니다."

[[examples]]
input = "nums = [4, 2], k = 1"
output = "[4, 2]"
explanation = "창의 길이가 1이면 각 원소가 곧 해당 창의 최댓값입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
