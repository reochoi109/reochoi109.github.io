+++
title = "코딩테스트 노트"
description = "마감일과 최소 힙을 결합해 제한된 날짜 안의 보상을 최대화하는 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "deadline-reward-027"
problem_title = "마감일 안에 얻는 최대 보상"
category = "그리디"
pattern = "마감일 정렬 + 최소 힙"
difficulty = "고급"
estimated_time = "35분"
index = 27
source = "자체 제작"
prompt = "각 작업은 [deadline, reward]로 표현되며 수행하는 데 정확히 하루가 걸립니다. 작업은 1일부터 시작하고 해당 deadline일까지 완료해야 보상을 얻습니다. 하루에 하나의 작업만 할 수 있을 때 얻을 수 있는 최대 보상을 반환하세요."
constraints = ["1 ≤ 작업 수 ≤ 200,000", "1 ≤ deadline ≤ 200,000", "1 ≤ reward ≤ 1,000,000", "작업 순서는 자유롭게 정할 수 있습니다."]
hints = [
  "마감일 d까지 선택할 수 있는 작업은 최대 d개입니다.",
  "마감일 순서로 작업을 추가하고 선택 개수가 현재 마감일보다 많아지면, 지금까지의 작업 중 보상이 가장 작은 것을 버리세요.",
]
approach = [
  "작업을 마감일 오름차순으로 정렬합니다.",
  "각 작업의 보상을 최소 힙에 넣어 지금까지 선택한 작업 후보를 관리합니다.",
  "힙 크기가 현재 작업의 마감일보다 커지면 가장 작은 보상을 제거합니다.",
  "모든 작업을 처리한 뒤 힙에 남은 보상의 합을 반환합니다.",
]
time_complexity = "O(n log n)"
space_complexity = "O(n)"
gotchas = ["마감일이 같은 작업을 모두 수행할 수 있는 것은 아니며 d일까지 최대 d개만 가능합니다.", "보상이 가장 큰 작업을 무조건 먼저 고르면 촘촘한 마감일 제약을 놓칠 수 있습니다.", "최대 힙이 아니라 버릴 최소 보상을 빠르게 찾는 최소 힙을 사용합니다."]
code_python = """
import heapq


def max_deadline_reward(jobs: list[list[int]]) -> int:
    selected_rewards: list[int] = []

    for deadline, reward in sorted(jobs):
        heapq.heappush(selected_rewards, reward)

        if len(selected_rewards) > deadline:
            heapq.heappop(selected_rewards)

    return sum(selected_rewards)
"""

[[examples]]
input = "jobs = [[1, 10], [1, 30], [2, 20], [2, 50]]"
output = "80"
explanation = "첫째 날 보상 30인 작업, 둘째 날 보상 50인 작업을 수행합니다."

[[examples]]
input = "jobs = [[1, 100], [2, 20], [2, 30], [3, 40]]"
output = "170"
explanation = "마감일 안에 보상 100, 30, 40인 세 작업을 수행할 수 있습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
