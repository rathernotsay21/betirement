# Naming Conventions
  - qa (10): Quality assurance & security
  - dx (6): Developer experience
  - biz (6): Business & product
  - test (5): Testing
  - spec (5): Specialized domains
  - research (5): Research & analysis
  - core (5): Core development
  - lang (4): Language specialists
  - infra (4): Infrastructure
  - eng (4): Engineering
  - prod (3): Product
  - design (2): Design
  - mkt (1): Marketing
  - data (1): Data

## 📚 Categories

### Core Development (core)
Essential development subagents for everyday coding tasks.

- [**api-designer**](core.api-designer.md) - REST and GraphQL API architect
- [**backend-developer**](core.backend-developer.md) - Server-side expert for scalable APIs
- [**frontend-developer**](core.frontend-developer.md) - UI/UX specialist for React, Vue, and Angular
- [**fullstack-developer**](core.fullstack-developer.md) - End-to-end feature development
- [**ui-designer**](core.ui-designer.md) - Visual design and interaction specialist

### Language Specialists (lang)
Language-specific experts with deep framework knowledge.

- [**javascript-pro**](lang.javascript-pro.md) - JavaScript development expert
- [**nextjs-developer**](lang.nextjs-developer.md) - Next.js 14+ full-stack specialist
- [**react-specialist**](lang.react-specialist.md) - React 18+ modern patterns expert
- [**typescript-pro**](lang.typescript-pro.md) - TypeScript specialist

### Infrastructure (infra)
DevOps, cloud, and deployment specialists.

- [**cloud-architect**](infra.cloud-architect.md) - AWS/GCP/Azure specialist
- [**deployment-engineer**](infra.deployment-engineer.md) - Deployment automation specialist
- [**devops-engineer**](infra.devops-engineer.md) - CI/CD and automation expert
- [**security-engineer**](infra.security-engineer.md) - Infrastructure security specialist

### Quality & Security (qa)
Testing, security, and code quality experts.

- [**accessibility-tester**](qa.accessibility-tester.md) - A11y compliance expert
- [**architect-reviewer**](qa.architect-reviewer.md) - Architecture review specialist
- [**code-reviewer**](qa.code-reviewer.md) - Code quality guardian
- [**compliance-auditor**](qa.compliance-auditor.md) - Regulatory compliance expert
- [**debugger**](qa.debugger.md) - Advanced debugging specialist
- [**error-detective**](qa.error-detective.md) - Error analysis and resolution expert
- [**performance-engineer**](qa.performance-engineer.md) - Performance optimization expert
- [**qa-expert**](qa.qa-expert.md) - Test automation specialist
- [**security-auditor**](qa.security-auditor.md) - Security vulnerability expert
- [**test-automator**](qa.test-automator.md) - Test automation framework expert

### Data & AI (data)
Data engineering, ML, and AI specialists.

- [**data-analyst**](data.data-analyst.md) - Data insights and visualization specialist

### Developer Experience (dx)
Tooling and developer productivity experts.

- [**build-engineer**](dx.build-engineer.md) - Build system specialist
- [**dependency-manager**](dx.dependency-manager.md) - Package and dependency specialist
- [**documentation-engineer**](dx.documentation-engineer.md) - Technical documentation expert
- [**dx-optimizer**](dx.dx-optimizer.md) - Developer experience optimization specialist
- [**git-workflow-manager**](dx.git-workflow-manager.md) - Git workflow and branching expert
- [**refactoring-specialist**](dx.refactoring-specialist.md) - Code refactoring expert

### Specialized Domains (spec)
Domain-specific technology experts.

- [**api-documenter**](spec.api-documenter.md) - API documentation specialist
- [**blockchain-developer**](spec.blockchain-developer.md) - Web3 and crypto specialist
- [**fintech-engineer**](spec.fintech-engineer.md) - Financial technology specialist
- [**risk-manager**](spec.risk-manager.md) - Risk assessment and management expert
- [**seo-specialist**](spec.seo-specialist.md) - Search engine optimization expert

### Business & Product (biz)
Product management and business analysis.

- [**business-analyst**](biz.business-analyst.md) - Requirements specialist
- [**content-marketer**](biz.content-marketer.md) - Content marketing specialist
- [**product-manager**](biz.product-manager.md) - Product strategy expert
- [**project-manager**](biz.project-manager.md) - Project management specialist
- [**technical-writer**](biz.technical-writer.md) - Technical documentation specialist
- [**ux-researcher**](biz.ux-researcher.md) - User research expert

### Engineering (eng)
Engineering practices and architecture.

- [**backend-architect**](eng.backend-architect.md) - Backend architecture expert
- [**devops-automator**](eng.devops-automator.md) - DevOps automation specialist
- [**rapid-prototyper**](eng.rapid-prototyper.md) - Rapid prototyping expert
- [**test-writer-fixer**](eng.test-writer-fixer.md) - Test writing and fixing specialist

### Testing (test)
Specialized testing experts.

- [**api-tester**](test.api-tester.md) - API testing specialist
- [**performance-benchmarker**](test.performance-benchmarker.md) - Performance benchmarking expert
- [**test-results-analyzer**](test.test-results-analyzer.md) - Test results analysis specialist
- [**tool-evaluator**](test.tool-evaluator.md) - Testing tool evaluation expert
- [**workflow-optimizer**](test.workflow-optimizer.md) - Test workflow optimization specialist

### Product (prod)
Product-specific specialists.

- [**feedback-synthesizer**](prod.feedback-synthesizer.md) - User feedback analysis expert
- [**sprint-prioritizer**](prod.sprint-prioritizer.md) - Sprint planning and prioritization specialist
- [**trend-researcher**](prod.trend-researcher.md) - Product trend research expert

### Marketing (mkt)
Marketing and growth specialists.

- [**growth-hacker**](mkt.growth-hacker.md) - Growth hacking and viral marketing expert

### Design (design)
Design and user experience specialists.

- [**ui-designer**](design.ui-designer.md) - User interface design expert
- [**ux-researcher**](design.ux-researcher.md) - User experience research specialist

### Research & Analysis (research)
Research, search, and analysis specialists.

- [**competitive-analyst**](research.competitive-analyst.md) - Competitive intelligence specialist
- [**market-researcher**](research.market-researcher.md) - Market analysis and consumer insights
- [**research-analyst**](research.research-analyst.md) - Comprehensive research specialist
- [**search-specialist**](research.search-specialist.md) - Advanced information retrieval expert
- [**trend-analyst**](research.trend-analyst.md) - Emerging trends and forecasting expert

## 🤖 Understanding Subagents

Subagents are specialized AI assistants that enhance Claude Code's capabilities by providing task-specific expertise. They act as dedicated helpers that Claude Code can call upon when encountering particular types of work.

### What Makes Subagents Special?

**Independent Context Windows**  
Every subagent operates within its own isolated context space, preventing cross-contamination between different tasks and maintaining clarity in the primary conversation thread.

**Domain-Specific Intelligence**  
Subagents come equipped with carefully crafted instructions tailored to their area of expertise, resulting in superior performance on specialized tasks.

**Shared Across Projects**  
After creating a subagent, you can utilize it throughout various projects and distribute it among team members to ensure consistent development practices.

**Granular Tool Permissions**  
You can configure each subagent with specific tool access rights, enabling fine-grained control over which capabilities are available for different task types.

### Core Advantages

- **Memory Efficiency**: Isolated contexts prevent the main conversation from becoming cluttered with task-specific details
- **Enhanced Accuracy**: Specialized prompts and configurations lead to better results in specific domains
- **Workflow Consistency**: Team-wide subagent sharing ensures uniform approaches to common tasks
- **Security Control**: Tool access can be restricted based on subagent type and purpose

### Getting Started with Subagents

**1. Access the Subagent Manager**
```bash
/agents
```

**2. Create Your Subagent**
- Choose between project-specific or global subagents
- Let Claude generate an initial version, then refine it to your needs
- Provide detailed descriptions of the subagent's purpose and activation triggers
- Configure tool access (leave empty to inherit all available tools)
- Customize the system prompt using the built-in editor (press `e`)

**3. Deploy and Utilize**
Your subagent becomes immediately available. Claude Code will automatically engage it when suitable, or you can explicitly request its help:
```
> Have the code-reviewer subagent analyze my latest commits
```

### Subagent Storage Locations

| Type | Path | Availability | Precedence |
|------|------|--------------|------------|
| Project Subagents | `.claude/agents/` | Current project only | Higher |
| Global Subagents | `~/.claude/agents/` | All projects | Lower |

Note: When naming conflicts occur, project-specific subagents override global ones.



## 🛠️ How to Use Subagents

### Setting Up in Claude Code
1. Place subagent files in `.claude/agents/` within your project
2. Claude Code automatically detects and loads the subagents
3. Invoke them naturally in conversation or let Claude decide when to use them

### Creating New Subagents - Step by Step

**Step 1: Launch the Agent Interface**
```bash
/agents
```

**Step 2: Choose "Create New Agent"**
- Decide on project-level (current project) or user-level (all projects) scope

**Step 3: Configure Your Agent**
- **Recommended approach**: Let Claude draft an initial version, then customize
- Write a comprehensive description of the agent's role and activation scenarios  
- Grant specific tool permissions (or leave blank for full access)
- Browse available tools through the interface for easy selection
- Edit the system prompt directly by pressing `e` for advanced customization

**Step 4: Save and Start Using**
- Your agent is instantly ready for use
- Claude automatically delegates appropriate tasks to it
- Or manually invoke it:
```
> Ask the code-reviewer agent to examine my pull request
```

## 📖 Subagent Structure

Each subagent follows a standardized template:

```yaml
---
name: subagent-name
description: Brief description of capabilities
tools: List of MCP tools used
---

Role definition and expertise...

## MCP Tool Integration
Tool descriptions and usage patterns...

## Communication Protocol
Inter-agent communication specifications...

## Implementation Workflow
Structured development phases...
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- Submit new subagents via PR
- Improve existing definitions
- Add new MCP tool integrations
- Share usage examples
- Report issues and bugs

## 👥 Maintainers

This repository is maintained by the [VoltAgent](https://github.com/voltagent/voltagent) team:

- Core maintainers of the VoltAgent open-source AI agent framework and community member
- Committed to best practices and production readiness

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🔗 Related Resources

- [VoltAgent Framework](https://github.com/voltagent/voltagent)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Community Discord](https://s.voltagent.dev/discord)

---

<p align="center">
  Made with ❤️ by the VoltAgent Community
</p>
