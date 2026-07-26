+++
title = "코딩테스트 노트"
description = "음수로 최댓값과 최솟값이 뒤바뀌는 성질을 이용하는 상태 추적 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "maximum-product-subarray-004"
slug = "maximum-product-subarray"
problem_title = "연속 부분 배열의 최대 곱"
category = "배열 · 문자열"
pattern = "동적 상태 추적"
difficulty = "고급"
estimated_time = "25분"
index = 4
source = "자체 제작"
prompt = "하나 이상의 정수로 이루어진 배열 nums가 주어집니다. 비어 있지 않은 연속 부분 배열을 하나 선택했을 때 만들 수 있는 원소 곱의 최댓값을 반환하세요."
constraints = ["1 ≤ nums의 길이 ≤ 50,000", "-10 ≤ nums[i] ≤ 10", "정답은 32비트 부호 있는 정수 범위에 들어옵니다."]
hints = [
  "음수를 곱하면 가장 작은 음수 곱이 가장 큰 양수 곱으로 바뀔 수 있습니다.",
  "각 위치에서 끝나는 최대 곱과 최소 곱을 동시에 유지하고, 현재 값부터 새로 시작하는 선택도 비교하세요.",
]
approach = [
  "첫 값을 현재 최대 곱, 현재 최소 곱, 전체 정답으로 초기화합니다.",
  "다음 값이 음수라면 곱셈 후 역할이 바뀌므로 현재 최대와 최소를 먼저 교환합니다.",
  "현재 값부터 새로 시작하는 경우와 이전 상태에 현재 값을 곱하는 경우를 비교해 두 상태를 갱신합니다.",
  "각 위치의 현재 최대 곱으로 전체 정답을 갱신합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(1)"
gotchas = ["최대 곱만 저장하면 음수 두 개가 양수가 되는 경우를 놓칩니다.", "0을 만나면 현재 값인 0부터 새로 시작할 수 있어 상태가 자연스럽게 초기화됩니다.", "빈 부분 배열은 선택할 수 없습니다."]
code_python = """
def maximum_product_subarray(nums: list[int]) -> int:
    current_max = nums[0]
    current_min = nums[0]
    answer = nums[0]

    for value in nums[1:]:
        if value < 0:
            current_max, current_min = current_min, current_max

        current_max = max(value, current_max * value)
        current_min = min(value, current_min * value)
        answer = max(answer, current_max)

    return answer
"""

[[examples]]
input = "nums = [2, 3, -2, 4]"
output = "6"
explanation = "연속 부분 배열 [2, 3]의 곱이 6입니다."

[[examples]]
input = "nums = [-2, 3, -4]"
output = "24"
explanation = "음수 두 개를 포함한 전체 배열의 곱이 24입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
