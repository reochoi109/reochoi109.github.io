+++
title = "코딩테스트 노트"
description = "끝나는 시각을 기준으로 선택해 가장 많은 일정을 배치하는 그리디 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "non-overlapping-intervals-026"
problem_title = "겹치지 않는 일정 최대 선택"
category = "그리디"
pattern = "종료 시각 기준 정렬"
difficulty = "중급"
estimated_time = "18분"
index = 26
source = "자체 제작"
prompt = "여러 일정의 시작 시각과 종료 시각이 intervals에 주어집니다. 한 번에 하나의 일정만 수행할 수 있고, 어떤 일정이 끝나는 시각에 다른 일정을 바로 시작할 수 있습니다. 선택할 수 있는 일정의 최대 개수를 반환하세요."
constraints = ["1 ≤ intervals의 길이 ≤ 200,000", "각 일정은 [start, end]이며 0 ≤ start < end ≤ 1,000,000입니다.", "시작·종료 시각이 같은 일정이 여러 개 있을 수 있습니다."]
hints = [
  "지금 가장 빨리 끝나는 일정을 선택하면 다음 일정을 위한 시간이 가장 많이 남습니다.",
  "종료 시각 오름차순으로 정렬한 뒤, 마지막으로 선택한 종료 시각 이상에서 시작하는 일정만 고르세요.",
]
approach = [
  "모든 일정을 종료 시각 기준으로 정렬하고, 종료 시각이 같으면 시작 시각 기준으로 정렬합니다.",
  "마지막으로 선택한 일정의 종료 시각을 기록합니다.",
  "현재 일정의 시작 시각이 기록된 종료 시각 이상이면 해당 일정을 선택합니다.",
  "선택할 때마다 개수를 늘리고 마지막 종료 시각을 갱신합니다.",
]
time_complexity = "O(n log n)"
space_complexity = "O(n), 정렬 과정에서 사용하는 메모리 기준"
gotchas = ["시작 시각이 아니라 종료 시각으로 정렬해야 교환 논법이 성립합니다.", "start == last_end인 일정은 겹치지 않으므로 선택할 수 있습니다.", "입력 순서를 보존해야 한다는 조건은 없으므로 정렬해도 됩니다."]
code_python = """
def max_non_overlapping(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda interval: (interval[1], interval[0]))
    selected = 0
    last_end = -1

    for start, end in intervals:
        if start >= last_end:
            selected += 1
            last_end = end

    return selected
"""

[[examples]]
input = "intervals = [[1, 4], [2, 3], [3, 5], [5, 7]]"
output = "3"
explanation = "[2, 3], [3, 5], [5, 7]을 차례로 선택할 수 있습니다."

[[examples]]
input = "intervals = [[0, 2], [0, 3], [2, 4], [3, 5]]"
output = "2"
explanation = "[0, 2]와 [2, 4]처럼 겹치지 않는 일정 두 개를 선택합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
