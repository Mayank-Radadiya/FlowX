<p align="center">
  <img src="public/logo.svg" alt="FlowX Logo" width="80" height="80" />
</p>

<h1 align="center">FlowX</h1>

<p align="center">
  <strong>Visual workflow automation for the modern web</strong>
</p>

<p align="center">
  Build, connect, and automate workflows with a powerful drag-and-drop editor.<br/>
  Connect AI models, APIs, and triggers — no code required.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#how-workflows-work">How It Works</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a>
</p>

---



## Features

### Visual Workflow Builder
- Intuitive drag-and-drop canvas powered by React Flow
- Real-time node connections with visual edge routing
- Auto-save and persistent workflow state
- Responsive editor with zoom, pan, and minimap controls

### Extensible Node System
Built-in nodes for common automation tasks:

| Category | Nodes |
|----------|-------|
| **Triggers** | Manual Trigger, Google Forms, Stripe Webhooks |
| **AI Models** | OpenAI, Anthropic Claude, Google Gemini |
| **Actions** | HTTP Request |

Adding new nodes is straightforward — register in a single file and the system handles the rest.

### Execution Engine
- **Inngest-powered** background job processing for reliable, scalable execution
- Topological sorting ensures correct node execution order
- Context passing between nodes with Handlebars templating support
- Automatic retry handling and error recovery

### Execution History & Logs
- Complete execution history with status tracking (Queued, Running, Completed, Failed)
- Per-node execution logs with input/output context snapshots
- Timing metrics for performance analysis
- Detailed error messages for debugging failed workflows

### Authentication
- Email/password authentication via Better Auth
- Google OAuth integration
- Session management with secure token handling
- Protected routes and API endpoints

### Credentials Management
- Secure storage for API keys (OpenAI, Anthropic, Gemini)
- Per-user credential isolation
- Easy credential linking to nodes

### Scalable Architecture
- Type-safe API layer with tRPC
- PostgreSQL database with Prisma ORM
- Optimistic updates with React Query
- Sentry integration for error monitoring

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | Better Auth |
| **API Layer** | tRPC + React Query |
| **Workflow Engine** | Inngest |
| **Flow Editor** | React Flow (@xyflow/react) |
| **AI SDKs** | Vercel AI SDK (OpenAI, Anthropic, Google) |
| **State Management** | Jotai |
| **Animations** | Framer Motion |
| **Monitoring** | Sentry |

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/flowx.git
cd flowx
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/flowx"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# Sentry (optional)
SENTRY_DSN="your-sentry-dsn"
```

4. **Initialize the database**

```bash
npx prisma migrate dev
```

5. **Start the development server**

```bash
npm run dev
```

6. **Start Inngest Dev Server** (in a separate terminal)

```bash
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## Project Structure

```
flowx/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/             # Authentication pages (sign-in, sign-up)
│   │   ├── (marketing)/        # Landing page
│   │   ├── (workspace)/        # Main application
│   │   │   ├── (flows)/        # Workflow list, executions, credentials
│   │   │   └── (editor)/       # Visual workflow editor
│   │   └── api/                # API routes (tRPC, webhooks, auth)
│   │
│   ├── features/               # Feature-based modules
│   │   ├── auth/               # Authentication logic
│   │   ├── credentials/        # API key management
│   │   ├── editor/             # Workflow editor components
│   │   ├── execution/          # Execution engine & custom nodes
│   │   ├── landing/            # Marketing page components
│   │   └── workflows/          # Workflow CRUD operations
│   │
│   ├── components/             # Shared UI components
│   │   ├── ui/                 # Base components (Button, Card, etc.)
│   │   └── global/             # Layout components
│   │
│   ├── inngest/                # Workflow execution functions
│   │   ├── functions.ts        # Main execution orchestrator
│   │   └── channel/            # Node-specific execution channels
│   │
│   ├── trpc/                   # tRPC configuration
│   ├── lib/                    # Utilities (db client, helpers)
│   ├── hooks/                  # Shared React hooks
│   └── constants/              # App-wide constants
│
├── prisma/
│   └── schema.prisma           # Database schema
│
├── public/                     # Static assets
└── ...config files
```

---

## How Workflows Work

FlowX workflows are built on three core concepts:

### 1. Nodes
Nodes are the building blocks of workflows. Each node performs a specific action:

- **Trigger Nodes** — Start workflow execution (Manual, Webhook, Form submission)
- **AI Nodes** — Process data with LLMs (OpenAI, Claude, Gemini)
- **Action Nodes** — Perform operations (HTTP requests, data transformation)

### 2. Connections
Connections define the data flow between nodes. When a node completes:
1. Its output is added to the workflow context
2. The context is passed to the next connected node
3. Nodes can reference previous outputs using Handlebars syntax: `{{nodeName.field}}`

### 3. Execution Flow
When a workflow is triggered:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Trigger   │────▶│   AI Node    │────▶│   Action    │
│   (Start)   │     │  (Process)   │     │  (Output)   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                    Context flows
                    through nodes
```

1. **Topological Sort** — Nodes are ordered based on dependencies
2. **Sequential Execution** — Each node runs in order, building context
3. **Logging** — Input/output captured at each step for debugging
4. **Error Handling** — Failures stop execution and mark the workflow as failed

---

## Roadmap

### In Progress
- [ ] More trigger types (Cron scheduling, API triggers)
- [ ] Conditional branching (If/Else nodes)
- [ ] Loop nodes for batch processing

### Planned
- [ ] Webhook triggers with custom endpoints
- [ ] Slack & Discord integrations
- [ ] GitHub integration (Issues, PRs, Actions)
- [ ] Email nodes (Send, Receive)
- [ ] Multi-tenant workspace support
- [ ] Workflow templates marketplace
- [ ] Real-time collaboration
- [ ] Workflow versioning and rollback

### Future
- [ ] Self-hosted deployment guide
- [ ] Plugin system for custom nodes
- [ ] Mobile-responsive editor
- [ ] Workflow analytics dashboard

---

## Contributing

Contributions are welcome! Here's how to get started:

### Development Workflow

1. **Fork the repository**

2. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
   - Follow existing code patterns
   - Add types for new code
   - Update tests if applicable

4. **Run linting**
```bash
npm run lint
```

5. **Submit a pull request**

### Adding a New Node

1. Create the node component in `src/features/execution/customNodes/`
2. Add the executor in `src/features/execution/lib/executor-registry.ts`
3. Register the node type in `prisma/schema.prisma`
4. Add the component mapping in `src/constants/node-component.ts`
5. Create the Inngest channel in `src/inngest/channel/`

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Follow the feature-based folder structure
- Use Zod for runtime validation

---

## License

This project is licensed under the MIT License.

---

<p align="center">
  Built with Next.js, TypeScript, and lots of coffee.
</p>
