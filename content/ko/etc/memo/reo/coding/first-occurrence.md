+++
title = "코딩테스트 노트"
description = "정렬 배열에서 같은 값 중 가장 왼쪽 위치를 경계 이분 탐색으로 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "first-occurrence-010"
slug = "first-occurrence"
problem_title = "정렬 배열의 첫 번째 위치"
category = "이분 탐색"
pattern = "왼쪽 경계 탐색"
difficulty = "초급"
estimated_time = "10분"
index = 10
source = "자체 제작"
prompt = "오름차순으로 정렬된 정수 배열 nums와 정수 target이 주어집니다. target과 같은 값이 처음 나타나는 인덱스를 반환하세요. target이 없으면 -1을 반환합니다."
constraints = ["0 ≤ nums의 길이 ≤ 100,000", "-1,000,000,000 ≤ nums[i], target ≤ 1,000,000,000", "nums는 오름차순으로 정렬되어 있습니다."]
hints = [
  "target을 찾았더라도 더 왼쪽에 같은 값이 있을 수 있습니다.",
  "값이 target 이상이면 오른쪽 경계를 현재 위치까지 당기고, 작을 때만 왼쪽 경계를 넘기세요.",
]
approach = [
  "탐색 구간을 반열린 구간 [left, right)로 정의합니다.",
  "중앙 값이 target보다 작으면 첫 위치는 오른쪽에 있으므로 left를 옮깁니다.",
  "중앙 값이 target 이상이면 현재 위치도 후보이므로 right를 중앙으로 옮깁니다.",
  "수렴한 위치가 배열 안이고 target과 같으면 그 인덱스를, 아니면 -1을 반환합니다.",
]
time_complexity = "O(log n)"
space_complexity = "O(1)"
gotchas = ["target을 처음 발견하자마자 반환하면 중복 값의 첫 위치를 보장하지 못합니다.", "탐색 종료 뒤 left가 배열 길이와 같을 수 있으므로 범위를 먼저 확인합니다."]
code_python = """
def first_occurrence(nums: list[int], target: int) -> int:
    left = 0
    right = len(nums)

    while left < right:
        middle = left + (right - left) // 2
        if nums[middle] < target:
            left = middle + 1
        else:
            right = middle

    if left < len(nums) and nums[left] == target:
        return left
    return -1
"""

[[examples]]
input = "nums = [1, 2, 2, 2, 4], target = 2"
output = "1"
explanation = "값 2가 나타나는 인덱스 1, 2, 3 중 첫 번째인 1을 반환합니다."

[[examples]]
input = "nums = [1, 3, 5], target = 2"
output = "-1"
explanation = "target이 배열에 존재하지 않습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
