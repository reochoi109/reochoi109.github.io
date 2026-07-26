+++
title = "코딩테스트 노트"
description = "이동 중에는 코드를 작성하기보다 풀이 흐름을 떠올리고 단계별로 확인하세요."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "two-sum-001"
problem_title = "목표 합을 만드는 두 수"
category = "해시"
pattern = "해시 맵"
difficulty = "초급"
estimated_time = "5분"
index = 1
source = "자체 제작"
prompt = "정수 배열 nums와 정수 target이 주어집니다. 서로 다른 위치의 두 수를 더해 target을 만들 수 있을 때, 두 수의 인덱스를 반환하세요. 정답은 하나만 존재하며 같은 원소를 두 번 사용할 수 없습니다."
constraints = ["2 ≤ nums의 길이 ≤ 10,000", "배열에는 음수가 포함될 수 있습니다.", "항상 하나의 정답이 존재합니다."]
hints = [
  "현재 숫자 x를 선택했다면, 이전에 target - x를 본 적이 있는지 확인하면 됩니다.",
  "지금까지 본 숫자와 그 인덱스를 해시 맵에 저장하면 한 번의 순회로 해결할 수 있습니다.",
]
approach = [
  "빈 해시 맵을 만들고 배열을 왼쪽부터 순회합니다.",
  "현재 값이 x라면 필요한 짝 complement = target - x를 계산합니다.",
  "complement가 맵에 있다면 저장된 인덱스와 현재 인덱스를 반환합니다.",
  "없다면 현재 값 x와 인덱스를 맵에 저장하고 다음 원소로 이동합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(n)"
gotchas = ["현재 값을 맵에 넣기 전에 짝을 먼저 찾아야 같은 원소를 두 번 사용하지 않습니다.", "값이 중복될 수 있으므로 값 자체가 아니라 인덱스를 반환해야 합니다."]
code_python = """
def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index

    return []
"""

[[examples]]
input = "nums = [2, 7, 11, 15], target = 9"
output = "[0, 1]"
explanation = "nums[0] + nums[1] = 2 + 7 = 9"

[[examples]]
input = "nums = [3, 2, 4], target = 6"
output = "[1, 2]"
explanation = "nums[1] + nums[2] = 2 + 4 = 6"

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
