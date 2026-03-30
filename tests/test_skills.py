"""
Skill validation tests for Antigravity Kit.
"""

import yaml
from pathlib import Path


SKILLS_DIR = Path(__file__).parent.parent / "skills"
SOURCE_SKILLS_DIR = Path(__file__).parent.parent / ".agent" / "skills"


def get_all_skills():
    return [d for d in SKILLS_DIR.iterdir() if d.is_dir()]


def test_all_skills_have_yaml():
    skills = get_all_skills()
    assert len(skills) > 0, "No skills found"

    for skill_dir in skills:
        assert (skill_dir / "skill.yaml").exists(), f"{skill_dir.name}: missing skill.yaml"


def test_skill_yaml_has_required_fields():
    required_fields = {"name", "description", "source"}

    for skill_dir in get_all_skills():
        yaml_path = skill_dir / "skill.yaml"
        with open(yaml_path) as f:
            data = yaml.safe_load(f)

        missing = required_fields - set(data.keys())
        assert not missing, f"{skill_dir.name}: missing fields {missing}"


def test_skill_sources_exist():
    """Each skill's source SKILL.md must exist in .agent/skills/."""
    root = Path(__file__).parent.parent

    for skill_dir in get_all_skills():
        yaml_path = skill_dir / "skill.yaml"
        with open(yaml_path) as f:
            data = yaml.safe_load(f)

        source_path = root / data["source"]
        assert source_path.exists(), f"{skill_dir.name}: source '{data['source']}' not found"


if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-v"])
