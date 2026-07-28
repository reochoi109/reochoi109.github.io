#!/usr/bin/env python3
"""Validate interview flashcard coverage and required learning-note fields."""

from __future__ import annotations

from collections import Counter
from pathlib import Path
import sys
import tomllib


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content" / "ko" / "etc" / "memo" / "reo"
DECKS = {
    "development-languages.md": {"Go", "Python", "Gin", "FastAPI", "Django"},
    "data-structures-algorithms.md": {"선형 자료구조", "해시", "복잡도"},
    "network.md": {"HTTP", "TCP/IP", "WebSocket", "인증 상태"},
    "operating-system.md": {"프로세스와 스레드", "메모리", "동기화"},
    "database.md": {"데이터 모델링", "인덱스", "트랜잭션"},
    "backend-technologies.md": {"Kafka", "PostgreSQL", "WebSocket"},
}
DIFFICULTIES = {"초급", "중급", "고급"}
REQUIRED_CARD_FIELDS = {
    "subcategory",
    "difficulty",
    "question",
    "answer",
    "explanation",
    "points",
    "terms",
}


def load_front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    parts = text.split("+++", 2)
    if len(parts) != 3:
        raise ValueError("TOML front matter delimiter not found")
    return tomllib.loads(parts[1])


def main() -> int:
    errors: list[str] = []
    questions: set[str] = set()
    coverage: Counter[tuple[str, str]] = Counter()
    total = 0

    for filename, expected_subtopics in DECKS.items():
        path = CONTENT_DIR / filename
        try:
            data = load_front_matter(path)
        except (OSError, ValueError, tomllib.TOMLDecodeError) as exc:
            errors.append(f"{filename}: invalid front matter: {exc}")
            continue

        cards = data.get("cards")
        if not isinstance(cards, list):
            errors.append(f"{filename}: cards must be an array")
            continue

        actual_subtopics = {card.get("subcategory") for card in cards if isinstance(card, dict)}
        if actual_subtopics != expected_subtopics:
            errors.append(
                f"{filename}: subtopics are {sorted(str(item) for item in actual_subtopics)}, "
                f"expected {sorted(expected_subtopics)}"
            )

        for number, card in enumerate(cards, start=1):
            total += 1
            missing = sorted(REQUIRED_CARD_FIELDS - card.keys())
            if missing:
                errors.append(f"{filename} card {number}: missing {', '.join(missing)}")

            question = card.get("question")
            if question in questions:
                errors.append(f"{filename} card {number}: duplicate question {question!r}")
            elif isinstance(question, str):
                questions.add(question)

            subtopic = card.get("subcategory")
            difficulty = card.get("difficulty")
            if subtopic in expected_subtopics and difficulty in DIFFICULTIES:
                coverage[(filename, subtopic, difficulty)] += 1
            else:
                if subtopic not in expected_subtopics:
                    errors.append(f"{filename} card {number}: unknown subtopic {subtopic!r}")
                if difficulty not in DIFFICULTIES:
                    errors.append(f"{filename} card {number}: invalid difficulty {difficulty!r}")

            points = card.get("points")
            if not isinstance(points, list) or len(points) < 2:
                errors.append(f"{filename} card {number}: points requires at least 2 items")

            terms = card.get("terms")
            if not isinstance(terms, list) or not terms:
                errors.append(f"{filename} card {number}: terms requires at least 1 item")
            elif any(
                not isinstance(term, dict) or not {"name", "description"} <= term.keys()
                for term in terms
            ):
                errors.append(f"{filename} card {number}: every term needs name and description")

    for filename, subtopics in DECKS.items():
        for subtopic in sorted(subtopics):
            for difficulty in sorted(DIFFICULTIES):
                count = coverage[(filename, subtopic, difficulty)]
                if count != 1:
                    errors.append(
                        f"coverage: {filename} / {subtopic} / {difficulty} has {count}; expected 1"
                    )

    if total != 63:
        errors.append(f"card count is {total}; expected 63")

    if errors:
        print("Interview content validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Validated 63 interview cards: coverage, uniqueness, explanations, and terms OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
