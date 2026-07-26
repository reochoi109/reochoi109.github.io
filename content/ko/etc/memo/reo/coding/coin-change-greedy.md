+++
title = "코딩테스트 노트"
description = "큰 단위가 작은 단위의 배수일 때 적용할 수 있는 기본 그리디 문제입니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "coin-change-greedy-025"
problem_title = "가장 적은 동전으로 거스름돈 주기"
category = "그리디"
pattern = "큰 단위부터 선택"
difficulty = "초급"
estimated_time = "8분"
index = 25
source = "자체 제작"
prompt = "동전의 종류가 500원, 100원, 50원, 10원이고 각 동전은 충분히 많습니다. 10원의 배수인 금액 amount를 거슬러 줄 때 필요한 동전의 최소 개수를 반환하세요."
constraints = ["0 ≤ amount ≤ 1,000,000", "amount는 10의 배수입니다.", "사용할 수 있는 동전은 500원, 100원, 50원, 10원입니다."]
hints = [
  "각 동전 단위가 바로 다음 작은 단위의 배수라는 점을 확인하세요.",
  "가장 큰 동전부터 가능한 만큼 사용해도 이후 선택을 손해 보게 만들지 않습니다.",
]
approach = [
  "동전을 500원부터 내림차순으로 살펴봅니다.",
  "현재 금액을 동전 단위로 나눈 몫만큼 해당 동전을 사용합니다.",
  "나머지 금액만 다음 동전 단위로 넘깁니다.",
  "모든 단위를 처리하며 사용한 동전 수를 더합니다.",
]
time_complexity = "O(k), k는 동전 종류의 수이며 여기서는 O(1)"
space_complexity = "O(1)"
gotchas = ["동전 체계가 임의로 주어지면 큰 동전부터 고르는 방법이 항상 최적은 아닙니다.", "amount가 0이면 동전도 0개여야 합니다.", "몫과 나머지를 갱신하지 않고 중복 계산하지 않도록 주의하세요."]
code_python = """
def min_coin_count(amount: int) -> int:
    count = 0

    for coin in (500, 100, 50, 10):
        used, amount = divmod(amount, coin)
        count += used

    return count
"""

[[examples]]
input = "amount = 1,260"
output = "6"
explanation = "500원 2개, 100원 2개, 50원 1개, 10원 1개를 사용합니다."

[[examples]]
input = "amount = 0"
output = "0"
explanation = "거슬러 줄 금액이 없으므로 동전이 필요하지 않습니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
