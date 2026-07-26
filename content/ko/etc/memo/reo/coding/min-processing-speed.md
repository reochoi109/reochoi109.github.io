+++
title = "코딩테스트 노트"
description = "가능 여부가 단조롭게 바뀌는 최소 처리 속도를 매개변수 탐색으로 구합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "min-processing-speed-011"
slug = "min-processing-speed"
problem_title = "마감 시간을 맞추는 최소 처리 속도"
category = "이분 탐색"
pattern = "매개변수 탐색"
difficulty = "중급"
estimated_time = "20분"
index = 11
source = "자체 제작"
prompt = "여러 작업의 양을 나타내는 양의 정수 배열 jobs와 제한 시간 hours가 주어집니다. 한 시간에는 한 작업만 처리하며, 선택한 정수 속도 speed만큼 처리할 수 있습니다. 한 작업을 시작한 시간에는 남은 양이 speed보다 작아도 한 시간이 필요합니다. 모든 작업을 hours시간 안에 끝낼 수 있는 최소 speed를 반환하세요."
constraints = ["1 ≤ jobs의 길이 ≤ 100,000", "jobs의 길이 ≤ hours ≤ 1,000,000,000", "1 ≤ jobs[i] ≤ 1,000,000,000"]
hints = [
  "속도가 커질수록 필요한 총 시간은 같거나 줄어듭니다.",
  "속도 speed로 양 work를 처리하는 시간은 올림 나눗셈 (work + speed - 1) // speed입니다.",
]
approach = [
  "가능한 최소 속도 1과 최대 속도 max(jobs)를 탐색 범위로 둡니다.",
  "중간 속도에서 각 작업의 올림 처리 시간을 합산합니다.",
  "총 시간이 hours 이하면 가능한 속도이므로 더 작은 쪽을 탐색합니다.",
  "불가능하면 속도를 높이고, 범위가 수렴하면 최소 가능 속도를 반환합니다.",
]
time_complexity = "O(n log M), M은 jobs의 최댓값"
space_complexity = "O(1)"
gotchas = ["작업마다 시간이 따로 계산되므로 전체 작업량을 한 번에 나눠서는 안 됩니다.", "나눗셈 결과는 버림이 아니라 올림이어야 합니다.", "가능한 속도를 찾았을 때도 더 작은 답을 위해 탐색을 계속합니다."]
code_python = """
def minimum_processing_speed(jobs: list[int], hours: int) -> int:
    left = 1
    right = max(jobs)

    while left < right:
        speed = left + (right - left) // 2
        required = sum((work + speed - 1) // speed for work in jobs)

        if required <= hours:
            right = speed
        else:
            left = speed + 1

    return left
"""

[[examples]]
input = "jobs = [3, 6, 7, 11], hours = 8"
output = "4"
explanation = "속도 4면 각각 1, 2, 2, 3시간으로 총 8시간이 필요합니다."

[[examples]]
input = "jobs = [10, 10], hours = 2"
output = "10"
explanation = "각 작업을 한 시간 안에 끝내야 하므로 속도 10이 필요합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
