---
version: "1.0"
scope: planning
---

# Planning Prompt

Use this prompt when orchestrating multi-step tasks.

## Planning Framework

1. **Decompose**: Break the task into atomic steps
2. **Assign**: Route each step to the appropriate agent
3. **Sequence**: Identify dependencies and parallelism
4. **Validate**: Define success criteria per step
5. **Execute**: Run with checkpoints

## Agent Routing

| Task Type | Agent |
|-----------|-------|
| Backend/API | backend-specialist |
| Frontend/UI | frontend-specialist |
| Database | database-architect |
| Security | security-auditor |
| Testing | test-engineer |
| DevOps/CI | devops-engineer |
| Debugging | debugger |
| Planning | project-planner |
| Research | explorer-agent |
| Multi-step | orchestrator |
