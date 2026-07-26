+++
title = "코딩테스트 노트"
description = "양수 배열에서 조건을 만족하는 최소 구간을 슬라이딩 윈도로 찾습니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "min-subarray-length-003"
slug = "min-subarray-length"
problem_title = "합이 기준 이상인 최소 구간"
category = "배열 · 문자열"
pattern = "슬라이딩 윈도"
difficulty = "중급"
estimated_time = "15분"
index = 3
source = "자체 제작"
prompt = "양의 정수 배열 nums와 양의 정수 target이 주어집니다. 합이 target 이상인 연속 부분 배열 가운데 길이가 가장 짧은 것의 길이를 반환하세요. 조건을 만족하는 구간이 없으면 0을 반환합니다."
constraints = ["1 ≤ nums의 길이 ≤ 100,000", "1 ≤ nums[i] ≤ 10,000", "1 ≤ target ≤ 1,000,000,000"]
hints = [
  "모든 수가 양수이므로 오른쪽 끝을 늘리면 합은 감소하지 않습니다.",
  "현재 합이 target 이상인 동안 왼쪽 끝을 줄이며 가장 짧은 길이를 갱신하세요.",
]
approach = [
  "왼쪽 포인터, 현재 구간 합, 최소 길이를 준비합니다.",
  "오른쪽 포인터를 이동하며 현재 값을 구간 합에 더합니다.",
  "합이 target 이상인 동안 최소 길이를 갱신하고 왼쪽 값을 빼며 포인터를 당깁니다.",
  "최소 길이를 한 번도 갱신하지 못했다면 0을 반환합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(1)"
gotchas = ["음수가 포함되면 창을 줄일 때 합의 변화가 단조롭지 않아 이 풀이를 쓸 수 없습니다.", "조건은 target과 같은 경우도 포함하는 '이상'입니다."]
code_python = """
def min_subarray_length(nums: list[int], target: int) -> int:
    left = 0
    window_sum = 0
    best = len(nums) + 1

    for right, value in enumerate(nums):
        window_sum += value

        while window_sum >= target:
            best = min(best, right - left + 1)
            window_sum -= nums[left]
            left += 1

    return 0 if best == len(nums) + 1 else best
"""

[[examples]]
input = "nums = [2, 3, 1, 2, 4, 3], target = 7"
output = "2"
explanation = "[4, 3]의 합이 7이므로 길이 2가 최소입니다."

[[examples]]
input = "nums = [1, 1, 1, 1], target = 10"
output = "0"
explanation = "전체를 더해도 target에 도달하지 못합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
