+++
title = "코딩테스트 노트"
description = "두 접두사의 편집 비용을 상태로 정의하는 2차원 동적 계획법 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "edit-distance-030"
problem_title = "두 문자열의 최소 편집 횟수"
category = "동적 계획법"
pattern = "문자열 2차원 DP"
difficulty = "고급"
estimated_time = "40분"
index = 30
source = "자체 제작"
prompt = "문자열 source를 target으로 바꾸려고 합니다. 한 번의 연산으로 문자 하나를 삽입하거나, 삭제하거나, 다른 문자로 교체할 수 있습니다. 필요한 최소 연산 횟수를 반환하세요."
constraints = ["0 ≤ source와 target의 길이 ≤ 1,000", "문자열은 영문 소문자로만 이루어집니다.", "삽입·삭제·교체의 비용은 모두 1입니다."]
hints = [
  "dp[i][j]를 source의 앞 i글자를 target의 앞 j글자로 바꾸는 최소 비용으로 정의하세요.",
  "마지막 문자가 같으면 대각선 상태를 그대로 쓰고, 다르면 삽입·삭제·교체에 대응하는 세 이웃 상태의 최솟값에 1을 더합니다.",
]
approach = [
  "빈 source를 target의 앞 j글자로 바꾸는 비용은 j이므로 첫 행을 초기화합니다.",
  "각 행의 첫 값은 source의 앞 i글자를 모두 삭제하는 비용 i입니다.",
  "두 마지막 문자가 같으면 dp[i][j]는 dp[i-1][j-1]과 같습니다.",
  "다르면 삭제, 삽입, 교체 상태 중 최소 비용에 1을 더합니다. 메모리는 이전 행과 현재 행만 유지합니다.",
]
time_complexity = "O(nm), n과 m은 두 문자열의 길이"
space_complexity = "O(m), m은 target의 길이"
gotchas = ["빈 문자열과의 편집 거리를 초기화하지 않으면 이후 상태가 모두 잘못됩니다.", "삽입은 현재 행의 왼쪽, 삭제는 이전 행의 같은 열, 교체는 이전 행의 왼쪽 위 상태와 연결됩니다.", "문자가 같을 때는 연산 비용을 더하지 않습니다."]
code_python = """
def edit_distance(source: str, target: str) -> int:
    previous = list(range(len(target) + 1))

    for source_index, source_char in enumerate(source, start=1):
        current = [source_index]

        for target_index, target_char in enumerate(target, start=1):
            if source_char == target_char:
                current.append(previous[target_index - 1])
            else:
                delete_cost = previous[target_index]
                insert_cost = current[target_index - 1]
                replace_cost = previous[target_index - 1]
                current.append(1 + min(delete_cost, insert_cost, replace_cost))

        previous = current

    return previous[-1]
"""

[[examples]]
input = "source = \"cat\", target = \"cut\""
output = "1"
explanation = "가운데 문자 a를 u로 한 번 교체합니다."

[[examples]]
input = "source = \"\", target = \"code\""
output = "4"
explanation = "빈 문자열에 c, o, d, e를 차례로 삽입해야 합니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
