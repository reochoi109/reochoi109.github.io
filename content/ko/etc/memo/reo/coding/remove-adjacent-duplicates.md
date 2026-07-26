+++
title = "코딩테스트 노트"
description = "연속해서 중복된 값을 한 번만 남기는 기본 배열 순회 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "remove-adjacent-duplicates-002"
slug = "remove-adjacent-duplicates"
problem_title = "연속 중복 값 정리하기"
category = "배열 · 문자열"
pattern = "선형 순회"
difficulty = "초급"
estimated_time = "5분"
index = 2
source = "자체 제작"
prompt = "정수 배열 values가 주어집니다. 같은 값이 연속으로 여러 번 나타나면 첫 번째 값만 남기고, 나머지를 제거한 새 배열을 반환하세요. 떨어져 있는 같은 값은 서로 다른 구간이므로 각각 남겨야 합니다."
constraints = ["0 ≤ values의 길이 ≤ 100,000", "-1,000,000 ≤ 각 값 ≤ 1,000,000", "입력 배열의 순서는 바꾸지 않습니다."]
hints = [
  "현재 값과 바로 앞에서 남긴 값을 비교해 보세요.",
  "결과 배열이 비어 있거나 마지막 값과 현재 값이 다를 때만 현재 값을 추가하면 됩니다.",
]
approach = [
  "빈 결과 배열을 준비합니다.",
  "입력 배열을 왼쪽부터 한 번 순회합니다.",
  "결과가 비어 있거나 결과의 마지막 값이 현재 값과 다르면 현재 값을 추가합니다.",
  "순회가 끝난 결과 배열을 반환합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(n)"
gotchas = ["배열 전체에서 중복을 제거하는 문제가 아니라 연속한 중복만 제거합니다.", "빈 배열이 들어올 수 있으므로 첫 원소를 바로 참조하지 않습니다."]
code_python = """
def remove_adjacent_duplicates(values: list[int]) -> list[int]:
    result: list[int] = []

    for value in values:
        if not result or result[-1] != value:
            result.append(value)

    return result
"""

[[examples]]
input = "values = [1, 1, 2, 2, 2, 3, 1, 1]"
output = "[1, 2, 3, 1]"
explanation = "네 개의 연속 구간에서 각 첫 값만 남깁니다."

[[examples]]
input = "values = []"
output = "[]"
explanation = "입력이 비어 있으면 결과도 빈 배열입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
