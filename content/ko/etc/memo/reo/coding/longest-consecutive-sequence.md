+++
title = "코딩테스트 노트"
description = "집합에서 연속 수열의 시작점만 탐색해 선형 시간에 최장 길이를 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "longest-consecutive-sequence-006"
slug = "longest-consecutive-sequence"
problem_title = "가장 긴 연속 정수 수열"
category = "해시"
pattern = "해시 집합"
difficulty = "고급"
estimated_time = "20분"
index = 6
source = "자체 제작"
prompt = "정렬되지 않은 정수 배열 nums가 주어집니다. 배열에 존재하는 값들로 만들 수 있는 연속 정수 수열 중 가장 긴 길이를 반환하세요. 같은 값이 여러 번 등장해도 한 번만 사용한 것으로 봅니다. 전체 정렬 없이 해결하세요."
constraints = ["0 ≤ nums의 길이 ≤ 100,000", "-1,000,000,000 ≤ nums[i] ≤ 1,000,000,000", "중복 값이 포함될 수 있습니다."]
hints = [
  "값 x - 1이 집합에 없다면 x는 어떤 연속 수열의 시작점입니다.",
  "시작점에서만 x + 1, x + 2를 확인하면 각 고유 값은 전체적으로 몇 번만 방문됩니다.",
]
approach = [
  "중복을 제거하고 빠르게 포함 여부를 확인할 수 있도록 모든 값을 집합에 넣습니다.",
  "각 값에 대해 바로 이전 값이 집합에 있으면 시작점이 아니므로 건너뜁니다.",
  "시작점이라면 다음 정수가 존재하는 동안 길이를 늘립니다.",
  "찾은 길이 중 최댓값을 반환합니다.",
]
time_complexity = "평균 O(n)"
space_complexity = "O(n)"
gotchas = ["모든 값에서 오른쪽으로 확장하면 같은 수열을 반복 탐색해 O(n²)이 될 수 있습니다.", "중복 값은 수열 길이를 늘리지 않으므로 먼저 집합으로 바꿉니다.", "빈 배열의 답은 0입니다."]
code_python = """
def longest_consecutive_sequence(nums: list[int]) -> int:
    values = set(nums)
    best = 0

    for value in values:
        if value - 1 in values:
            continue

        length = 1
        while value + length in values:
            length += 1
        best = max(best, length)

    return best
"""

[[examples]]
input = "nums = [100, 4, 200, 1, 3, 2]"
output = "4"
explanation = "1, 2, 3, 4가 길이 4의 연속 수열을 이룹니다."

[[examples]]
input = "nums = [1, 2, 0, 1]"
output = "3"
explanation = "중복된 1은 한 번만 보고 0, 1, 2의 길이를 계산합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
