+++
title = "코딩테스트 노트"
description = "선택과 건너뛰기 상태를 비교하는 대표적인 1차원 동적 계획법 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "max-non-adjacent-sum-029"
problem_title = "인접하지 않은 수의 최대 합"
category = "동적 계획법"
pattern = "선택 또는 건너뛰기"
difficulty = "중급"
estimated_time = "20분"
index = 29
source = "자체 제작"
prompt = "0 이상의 정수로 이루어진 배열 numbers가 주어집니다. 서로 이웃한 두 원소를 동시에 고를 수 없을 때, 고른 원소 합의 최댓값을 반환하세요. 아무 원소도 고르지 않을 수 있습니다."
constraints = ["0 ≤ numbers의 길이 ≤ 200,000", "0 ≤ numbers[i] ≤ 1,000,000", "선택한 두 인덱스의 차이는 항상 2 이상이어야 합니다."]
hints = [
  "현재 원소를 고르면 바로 이전 원소는 고를 수 없습니다.",
  "i까지의 최댓값은 i-1까지의 최댓값과 i-2까지의 최댓값에 numbers[i]를 더한 값 중 큰 쪽입니다.",
]
approach = [
  "best[i]를 0번부터 i번 원소까지 고려했을 때 가능한 최대 합으로 정의합니다.",
  "현재 원소를 건너뛰면 이전 최댓값을 그대로 사용합니다.",
  "현재 원소를 고르면 두 칸 전의 최댓값에 현재 값을 더합니다.",
  "두 선택 중 큰 값을 저장하되 직전 두 상태만 유지합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(1)"
gotchas = ["현재 원소를 선택할 때 직전 상태가 아니라 두 칸 전 상태를 더해야 합니다.", "빈 배열은 0을 반환해야 합니다.", "모든 값이 0이어도 아무것도 선택하는 경우를 허용하므로 정답은 0입니다."]
code_python = """
def max_non_adjacent_sum(numbers: list[int]) -> int:
    two_back = 0
    one_back = 0

    for value in numbers:
        current = max(one_back, two_back + value)
        two_back, one_back = one_back, current

    return one_back
"""

[[examples]]
input = "numbers = [2, 7, 9, 3, 1]"
output = "12"
explanation = "인덱스 0, 2, 4의 값 2 + 9 + 1을 선택합니다."

[[examples]]
input = "numbers = [5, 1, 1, 5]"
output = "10"
explanation = "서로 인접하지 않은 첫 번째와 마지막 5를 선택합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
