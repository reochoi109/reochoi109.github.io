+++
title = "코딩테스트 노트"
description = "스택으로 가장 최근에 열린 괄호와 닫는 괄호의 짝을 확인합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "valid-brackets-007"
slug = "valid-brackets"
problem_title = "올바른 괄호 문자열"
category = "스택 · 큐"
pattern = "스택"
difficulty = "초급"
estimated_time = "5분"
index = 7
source = "자체 제작"
prompt = "소괄호 (), 대괄호 [], 중괄호 {}로만 이루어진 문자열 text가 주어집니다. 모든 여는 괄호가 같은 종류의 닫는 괄호와 올바른 순서로 짝을 이루면 true, 그렇지 않으면 false를 반환하세요."
constraints = ["0 ≤ text의 길이 ≤ 100,000", "text에는 괄호 문자 (), [], {}만 들어 있습니다."]
hints = [
  "닫는 괄호는 아직 닫히지 않은 괄호 중 가장 최근에 열린 것과 짝을 이뤄야 합니다.",
  "여는 괄호는 스택에 넣고, 닫는 괄호를 만나면 스택 맨 위와 비교하세요.",
]
approach = [
  "닫는 괄호를 키, 대응하는 여는 괄호를 값으로 갖는 표를 만듭니다.",
  "여는 괄호는 스택에 추가합니다.",
  "닫는 괄호라면 스택이 비었거나 맨 위가 짝이 아닐 때 즉시 false를 반환하고, 맞으면 꺼냅니다.",
  "모든 문자를 처리한 뒤 스택이 비어 있을 때만 true를 반환합니다.",
]
time_complexity = "O(n)"
space_complexity = "O(n)"
gotchas = ["문자열을 모두 처리해도 여는 괄호가 스택에 남을 수 있습니다.", "종류별 개수만 세면 ([)]처럼 닫히는 순서가 잘못된 경우를 잡지 못합니다."]
code_python = """
def has_valid_brackets(text: str) -> bool:
    matching = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for char in text:
        if char not in matching:
            stack.append(char)
        elif not stack or stack.pop() != matching[char]:
            return False

    return not stack
"""

[[examples]]
input = 'text = "([]){}"'
output = "true"
explanation = "각 닫는 괄호가 가장 최근에 열린 같은 종류의 괄호와 짝을 이룹니다."

[[examples]]
input = 'text = "([)]"'
output = "false"
explanation = "대괄호가 닫히기 전에 소괄호가 닫혀 순서가 어긋납니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
