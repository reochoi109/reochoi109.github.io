+++
title = "코딩테스트 노트"
description = "문자 빈도 서명을 키로 사용해 같은 구성의 단어를 그룹화합니다."
layout = "coding-study"
type = "page"
standalone = true
robots = "noindex, nofollow, noarchive"
problem_id = "group-anagrams-005"
slug = "group-anagrams"
problem_title = "문자 구성이 같은 단어 묶기"
category = "해시"
pattern = "빈도 서명"
difficulty = "중급"
estimated_time = "15분"
index = 5
source = "자체 제작"
prompt = "영어 소문자로만 이루어진 단어 배열 words가 주어집니다. 글자의 순서만 다르고 각 글자의 개수가 같은 단어들을 하나의 그룹으로 묶어 반환하세요. 그룹의 순서는 처음 등장한 서명의 순서를 따르고, 각 그룹 안의 단어 순서는 입력 순서를 유지합니다."
constraints = ["0 ≤ words의 길이 ≤ 20,000", "0 ≤ 각 단어의 길이 ≤ 100", "각 단어는 영어 소문자 a부터 z까지만 포함합니다."]
hints = [
  "같은 그룹의 단어는 알파벳 26개의 등장 횟수가 모두 같습니다.",
  "길이 26의 빈도 배열을 튜플로 바꾸면 해시 맵의 키로 사용할 수 있습니다.",
]
approach = [
  "각 단어마다 알파벳 26개의 빈도를 계산합니다.",
  "빈도 배열을 불변 튜플로 변환해 단어의 서명으로 사용합니다.",
  "서명을 키로 하는 해시 맵의 목록에 현재 단어를 추가합니다.",
  "맵의 값들을 삽입 순서대로 반환합니다.",
]
time_complexity = "O(S)"
space_complexity = "O(S)"
gotchas = ["빈 문자열도 빈도 서명을 가지므로 서로 같은 그룹에 들어갑니다.", "정렬한 문자열을 키로 써도 되지만 각 단어 길이가 k일 때 O(k log k)가 필요합니다.", "반환 순서를 명확히 하기 위해 입력에서 처음 본 서명의 순서를 사용합니다."]
code_python = """
def group_anagrams(words: list[str]) -> list[list[str]]:
    groups: dict[tuple[int, ...], list[str]] = {}

    for word in words:
        counts = [0] * 26
        for char in word:
            counts[ord(char) - ord("a")] += 1

        signature = tuple(counts)
        groups.setdefault(signature, []).append(word)

    return list(groups.values())
"""

[[examples]]
input = 'words = ["eat", "tea", "tan", "ate", "nat", "bat"]'
output = '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]'
explanation = "문자 빈도가 같은 단어들이 입력 순서대로 묶입니다."

[[examples]]
input = 'words = ["", "", "a"]'
output = '[["", ""], ["a"]]'
explanation = "빈 문자열 두 개는 같은 빈도 서명을 가집니다."

[build]
list = "local"
publishResources = false
render = "always"

[sitemap]
disable = true
+++
