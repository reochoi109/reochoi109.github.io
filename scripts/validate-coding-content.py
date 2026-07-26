#!/usr/bin/env python3
"""Validate coding-test Markdown metadata and embedded Python syntax."""

from __future__ import annotations

import ast
from collections import Counter
from pathlib import Path
import sys
import tomllib


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content" / "ko" / "etc" / "memo" / "reo" / "coding"
EXPECTED_CATEGORIES = {
    "배열 · 문자열",
    "해시",
    "스택 · 큐",
    "그래프",
    "BFS",
    "DFS",
    "이분 탐색",
    "그리디",
    "동적 계획법",
    "최단 경로",
}
EXPECTED_DIFFICULTIES = {"초급", "중급", "고급"}
REQUIRED_FIELDS = {
    "description",
    "problem_id",
    "problem_title",
    "category",
    "pattern",
    "difficulty",
    "estimated_time",
    "source",
    "prompt",
    "constraints",
    "hints",
    "approach",
    "time_complexity",
    "space_complexity",
    "gotchas",
    "code_python",
    "examples",
}


def front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    parts = text.split("+++", 2)
    if len(parts) != 3:
        raise ValueError("TOML front matter delimiter not found")
    return tomllib.loads(parts[1])


def main() -> int:
    errors: list[str] = []
    ids: set[str] = set()
    indexes: set[int] = set()
    counts: Counter[tuple[str, str]] = Counter()
    problem_files = sorted(path for path in CONTENT_DIR.glob("*.md") if path.name != "_index.md")

    for path in problem_files:
        try:
            data = front_matter(path)
        except (OSError, ValueError, tomllib.TOMLDecodeError) as exc:
            errors.append(f"{path.name}: invalid front matter: {exc}")
            continue

        missing = sorted(REQUIRED_FIELDS - data.keys())
        if missing:
            errors.append(f"{path.name}: missing fields: {', '.join(missing)}")

        problem_id = data.get("problem_id")
        if problem_id in ids:
            errors.append(f"{path.name}: duplicate problem_id {problem_id!r}")
        elif isinstance(problem_id, str):
            ids.add(problem_id)

        index = data.get("index")
        if not isinstance(index, int):
            errors.append(f"{path.name}: index must be an integer")
        elif index in indexes:
            errors.append(f"{path.name}: duplicate index {index}")
        else:
            indexes.add(index)

        category = data.get("category")
        difficulty = data.get("difficulty")
        if category not in EXPECTED_CATEGORIES:
            errors.append(f"{path.name}: unknown category {category!r}")
        if difficulty not in EXPECTED_DIFFICULTIES:
            errors.append(f"{path.name}: unknown difficulty {difficulty!r}")
        if category in EXPECTED_CATEGORIES and difficulty in EXPECTED_DIFFICULTIES:
            counts[(category, difficulty)] += 1

        for field, minimum in (("constraints", 1), ("hints", 2), ("approach", 3), ("gotchas", 2), ("examples", 2)):
            value = data.get(field)
            if not isinstance(value, list) or len(value) < minimum:
                errors.append(f"{path.name}: {field} requires at least {minimum} items")

        examples = data.get("examples")
        if isinstance(examples, list):
            for number, example in enumerate(examples, start=1):
                if not isinstance(example, dict) or not {"input", "output", "explanation"} <= example.keys():
                    errors.append(f"{path.name}: example {number} requires input, output, and explanation")

        code = data.get("code_python")
        if isinstance(code, str):
            try:
                ast.parse(code)
            except SyntaxError as exc:
                errors.append(f"{path.name}: invalid Python syntax at line {exc.lineno}: {exc.msg}")

    for category in sorted(EXPECTED_CATEGORIES):
        for difficulty in sorted(EXPECTED_DIFFICULTIES):
            if counts[(category, difficulty)] != 1:
                errors.append(
                    f"coverage: {category} / {difficulty} has {counts[(category, difficulty)]} problems; expected 1"
                )

    if len(problem_files) != 30:
        errors.append(f"problem count is {len(problem_files)}; expected 30")

    if errors:
        print("Coding content validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Validated {len(problem_files)} problems: metadata, coverage, uniqueness, and Python syntax OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
