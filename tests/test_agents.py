"""
Agent validation tests for Antigravity Kit.

Tests that all agent definitions are valid and complete.
"""

import os
import yaml
from pathlib import Path


AGENTS_DIR = Path(__file__).parent.parent / "agents"
SOURCE_AGENTS_DIR = Path(__file__).parent.parent / ".agent" / "agents"


def get_all_agents():
    """Return list of all agent directories."""
    return [d for d in AGENTS_DIR.iterdir() if d.is_dir()]


def test_all_agents_have_required_files():
    """Each agent folder must have agent.yaml and prompt.md."""
    agents = get_all_agents()
    assert len(agents) > 0, "No agents found"

    for agent_dir in agents:
        assert (agent_dir / "agent.yaml").exists(), f"{agent_dir.name}: missing agent.yaml"
        assert (agent_dir / "prompt.md").exists(), f"{agent_dir.name}: missing prompt.md"


def test_agent_yaml_has_required_fields():
    """Each agent.yaml must have name, description, model, tools."""
    required_fields = {"name", "description", "model", "tools"}

    for agent_dir in get_all_agents():
        yaml_path = agent_dir / "agent.yaml"
        with open(yaml_path) as f:
            data = yaml.safe_load(f)

        missing = required_fields - set(data.keys())
        assert not missing, f"{agent_dir.name}: missing fields {missing}"


def test_agent_models_are_valid():
    """All agents must reference a valid Claude model."""
    valid_models = {
        "claude-fable-5",
        "claude-opus-4-8",
        "claude-sonnet-4-6",
        "claude-haiku-4-5-20251001",
    }

    for agent_dir in get_all_agents():
        yaml_path = agent_dir / "agent.yaml"
        with open(yaml_path) as f:
            data = yaml.safe_load(f)

        assert data["model"] in valid_models, \
            f"{agent_dir.name}: invalid model '{data['model']}'"


def test_agent_prompt_not_empty():
    """Each prompt.md must have content."""
    for agent_dir in get_all_agents():
        prompt_path = agent_dir / "prompt.md"
        content = prompt_path.read_text(encoding="utf-8").strip()
        assert len(content) > 100, f"{agent_dir.name}: prompt.md is too short"


if __name__ == "__main__":
    import pytest
    pytest.main([__file__, "-v"])
