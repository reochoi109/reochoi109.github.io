+++
title = "코딩테스트 노트"
description = "연속 구간 분할의 최댓값을 최소화하는 답을 이분 탐색합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "min-largest-partition-sum-012"
slug = "min-largest-partition-sum"
problem_title = "연속 작업 분배의 최대 부담 최소화"
category = "이분 탐색"
pattern = "답 탐색과 그리디 검증"
difficulty = "고급"
estimated_time = "30분"
index = 12
source = "자체 제작"
prompt = "순서대로 처리해야 하는 작업량 배열 workloads와 작업자 수 workers가 주어집니다. 각 작업자는 비어 있지 않은 연속 구간 하나를 맡고, 모든 작업을 정확히 한 번 배정해야 합니다. 작업자별 작업량 합 중 최댓값이 가능한 한 작아지도록 할 때 그 최솟값을 반환하세요."
constraints = ["1 ≤ workloads의 길이 ≤ 100,000", "1 ≤ workers ≤ workloads의 길이", "0 ≤ workloads[i] ≤ 1,000,000"]
hints = [
  "답은 가장 큰 단일 작업량 이상이고 전체 작업량 이하입니다.",
  "최대 허용 합 limit를 정했을 때, 왼쪽부터 가능한 한 많이 묶는 방식으로 필요한 최소 작업자 수를 구할 수 있습니다.",
]
approach = [
  "답의 탐색 범위를 max(workloads)부터 sum(workloads)까지로 설정합니다.",
  "중간값을 작업자 한 명이 맡을 수 있는 최대 합으로 가정합니다.",
  "왼쪽부터 작업을 담되 합이 중간값을 넘으면 새 작업자를 배정해 필요한 인원을 셉니다.",
  "필요 인원이 workers 이하면 상한을 낮추고, 더 많으면 하한을 높여 최소 가능한 값을 찾습니다.",
]
time_complexity = "O(n log S), S는 전체 작업량 합"
space_complexity = "O(1)"
gotchas = ["하한은 평균이 아니라 반드시 가장 큰 단일 작업량 이상이어야 합니다.", "검증 단계는 필요한 '최소' 작업자 수를 세며, workers보다 적게 나오면 일부 구간을 나눠 정확히 workers개로 만들 수 있습니다.", "작업 순서를 바꾸거나 떨어진 작업을 한 사람에게 묶을 수 없습니다."]
code_python = """
def minimize_largest_partition_sum(
    workloads: list[int],
    workers: int,
) -> int:
    left = max(workloads)
    right = sum(workloads)

    while left < right:
        limit = left + (right - left) // 2
        required_workers = 1
        current_sum = 0

        for work in workloads:
            if current_sum + work > limit:
                required_workers += 1
                current_sum = work
            else:
                current_sum += work

        if required_workers <= workers:
            right = limit
        else:
            left = limit + 1

    return left
"""

[[examples]]
input = "workloads = [7, 2, 5, 10, 8], workers = 2"
output = "18"
explanation = "[7, 2, 5]와 [10, 8]로 나누면 두 구간 합의 최댓값이 18입니다."

[[examples]]
input = "workloads = [1, 4, 4], workers = 3"
output = "4"
explanation = "각 작업자에게 작업 하나씩 배정하면 최대 부담은 4입니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
