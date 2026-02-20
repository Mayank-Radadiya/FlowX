import { PageHeader } from "@/components/global/PageHeader/PageHeader";
import { requiredAuth } from "@/features/auth/server/guards";
import {
  BookOpen,
  Workflow,
  Activity,
  Play,
  KeyRound,
  ListTree,
  TerminalSquare,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Settings,
  Clock,
  Sparkles,
  Shield,
  Zap,
  Code2,
  MousePointer,
  RefreshCw,
  Bug,
  Rocket,
  Target,
  Layout,
  Link2,
  ExternalLink,
} from "lucide-react";
import React from "react";

export const metadata = {
  title: "User Guide | FlowX",
  description: "Complete platform documentation and feature overview.",
};

export default async function GuidePage() {
  await requiredAuth();

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Platform Guide"
        subtitle="Documentation"
        description="Master every feature of FlowX—from creating your first workflow to monitoring production executions."
        icon={<BookOpen className="size-6" />}
        gradient="blue"
      />

      <div className="mx-auto w-full max-w-4xl space-y-16 pb-12 mt-4">
        {/* Quick Navigation */}
        <nav className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layout className="size-4 text-primary" />
            Quick Navigation
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Getting Started", href: "#creating-workflow" },
              { label: "Canvas Editor", href: "#canvas-editor" },
              { label: "Node Types", href: "#node-types" },
              { label: "Credentials", href: "#credentials" },
              { label: "Workflow Logs", href: "#logs" },
              { label: "Execution History", href: "#executions" },
              { label: "Google Form Setup", href: "#google-form" },
              { label: "Pro Tips", href: "#pro-tips" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-primary/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Step 1: Creating a Workflow */}
        <section id="creating-workflow" className="space-y-5 scroll-mt-8">
          <DocHeading icon={<Play />} title="1. Creating Your First Workflow" />
          <p className="text-muted-foreground leading-relaxed">
            The journey begins on the <strong>Workflows</strong> page. This is
            your central hub for all active and drafted automations.
          </p>
          <div className="rounded-xl border border-border/50 bg-card p-5">
            <ol className="list-decimal pl-5 space-y-3 text-sm text-foreground/80">
              <li>
                Navigate to the <strong>Workflows</strong> tab in the sidebar (
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">/workflow</code>).
              </li>
              <li>
                Click the primary <strong>Create workflow</strong> button in the
                top right.
              </li>
              <li>
                A dialog box will appear. Enter a clear <strong>Name</strong>{" "}
                (e.g., &quot;Daily Sales Report&quot;) and an optional{" "}
                <strong>Description</strong>.
              </li>
              <li>
                Click <strong>Create</strong>. You will immediately be
                redirected to the <strong>Canvas Editor</strong>.
              </li>
            </ol>
          </div>
          <TipBox type="tip">
            Use descriptive names for your workflows! Names like &quot;Lead Processing v2&quot; or &quot;Daily Report - Marketing&quot; make it easier to manage multiple automations.
          </TipBox>
        </section>

        {/* Step 2: The Canvas */}
        <section id="canvas-editor" className="space-y-5 scroll-mt-8">
          <DocHeading icon={<Workflow />} title="2. The Canvas Editor" />
          <p className="text-muted-foreground leading-relaxed">
            The Canvas is where the magic happens. It is an infinite visual
            workspace where you drag, drop, and connect different nodes to build
            your automation logic.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard
              icon={<MousePointer className="size-4" />}
              title="Adding Nodes"
              desc="Right-click anywhere on the grid, or click the + button to open the Node Selector menu."
            />
            <InfoCard
              icon={<Link2 className="size-4" />}
              title="Connecting Nodes"
              desc="Click and drag from the right dot (Output) of one node to the left dot (Input) of the next node to create a data pipeline."
            />
            <InfoCard
              icon={<Settings className="size-4" />}
              title="Configuring Nodes"
              desc="Click any node to open its configuration panel on the right side of the screen."
            />
            <InfoCard
              icon={<Layout className="size-4" />}
              title="Canvas Controls"
              desc="Use the top action bar to Save your workflow, open the run Logs, or hit 'Run' to test the current flow."
            />
          </div>
          <TipBox type="tip">
            Use <strong>Ctrl/Cmd + Scroll</strong> to zoom in and out of the canvas. Double-click on empty space to quickly add a new node.
          </TipBox>
        </section>

        {/* Step 3: Node Types */}
        <section id="node-types" className="space-y-5 scroll-mt-8">
          <DocHeading
            icon={<ListTree />}
            title="3. Node Types & Required Settings"
          />
          <p className="text-muted-foreground leading-relaxed">
            Every automation begins with a <strong>Trigger</strong> (what starts
            it) and one or more <strong>Actions</strong> (what it does). When
            you click a node, you must configure its settings in the right-hand
            panel.
          </p>

          {/* Triggers Section */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Zap className="size-5 text-orange-500" />
              Trigger Nodes
            </h3>
            <div className="grid gap-4">
              <NodeFeatureCard
                title="Manual Trigger"
                type="Trigger"
                desc="Starts the workflow when you manually click the 'Run' button in the header. Perfect for testing and on-demand workflows."
                settings={["None required. Acts as the anchor point for your workflow."]}
              />
              <NodeFeatureCard
                title="Google Form Trigger"
                type="Trigger"
                desc="Automatically starts your workflow whenever someone submits a response to your connected Google Form."
                settings={[
                  "Webhook URL: Auto-generated unique URL for your workflow",
                  "Apps Script: Must be configured in Google Forms (see Section 7)",
                ]}
              />
              <NodeFeatureCard
                title="Stripe Trigger"
                type="Trigger"
                desc="Listens for payment events from Stripe—like successful charges, subscriptions, or refunds."
                settings={[
                  "Webhook URL: Auto-generated URL to paste in Stripe Dashboard",
                  "Events: Select which Stripe events should trigger this workflow",
                ]}
              />
            </div>
          </div>

          {/* Action Nodes Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="size-5 text-blue-500" />
              Action Nodes
            </h3>
            <div className="grid gap-4">
              <NodeFeatureCard
                title="HTTP Request"
                type="Action"
                desc="Make API calls to any external service. Send data, fetch information, or integrate with third-party platforms."
                settings={[
                  "URL (Required): The API endpoint to call",
                  "Method (Required): GET, POST, PUT, DELETE, PATCH",
                  "Headers (Optional): Custom headers like Authorization",
                  "Body (Optional): JSON payload for POST/PUT requests",
                ]}
              />
              <NodeFeatureCard
                title="Page to Text (Scraper)"
                type="Action"
                desc="Navigates to a webpage and extracts the raw text data from it. Great for web scraping and content extraction."
                settings={["URL (Required): The web address to scrape."]}
              />
            </div>
          </div>

          {/* AI Nodes Section */}
          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="size-5 text-purple-500" />
              AI-Powered Nodes
            </h3>
            <div className="grid gap-4">
              <NodeFeatureCard
                title="Google Gemini"
                type="AI"
                desc="Leverage Google's powerful Gemini models for text generation, analysis, summarization, and reasoning tasks."
                settings={[
                  "Prompt (Required): Instructions for the AI model",
                  "Model (Required): Gemini 1.5 Pro, Gemini 1.5 Flash, etc.",
                  "Credential (Required): Your Google AI API key from the vault",
                ]}
              />
              <NodeFeatureCard
                title="OpenAI GPT"
                type="AI"
                desc="Use OpenAI's GPT models (GPT-4o, GPT-4) for advanced text generation, code writing, and complex reasoning."
                settings={[
                  "Prompt (Required): Instructions for the AI model",
                  "Model (Required): GPT-4o, GPT-4, GPT-3.5-turbo",
                  "Credential (Required): Your OpenAI API key from the vault",
                ]}
              />
              <NodeFeatureCard
                title="Anthropic Claude"
                type="AI"
                desc="Access Anthropic's Claude models known for safe, reliable, and nuanced AI responses."
                settings={[
                  "Prompt (Required): Instructions for the AI model",
                  "Model (Required): Claude 3.5 Sonnet, Claude 3 Opus, etc.",
                  "Credential (Required): Your Anthropic API key from the vault",
                ]}
              />
            </div>
          </div>

          <TipBox type="warning">
            AI nodes require API keys stored in your Credentials vault. Make sure to add your keys before configuring these nodes!
          </TipBox>
        </section>

        {/* Step 4: Credentials */}
        <section id="credentials" className="space-y-5 scroll-mt-8">
          <DocHeading
            icon={<KeyRound />}
            title="4. Storing Credentials & API Keys"
          />
          <p className="text-muted-foreground leading-relaxed">
            Many action nodes (like AI models or third-party connections)
            require an API Key. Instead of copy-pasting API keys directly into
            every node, you manage them securely in the Credentials vault.
          </p>
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <h4 className="font-semibold text-sm mb-3 text-indigo-700 dark:text-indigo-400">
              How to store and use keys:
            </h4>
            <ol className="list-decimal pl-5 space-y-3 text-sm text-foreground/80">
              <li>
                Navigate to the <strong>Credentials</strong> route (
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">/credentials</code>) from the sidebar.
              </li>
              <li>
                Click <strong>Create Credential</strong>.
              </li>
              <li>
                Provide a recognizable <strong>Name</strong> (e.g., &quot;My Gemini
                Developer Key&quot;) and paste your secret token.
              </li>
              <li>
                Save it. The key is now encrypted securely in the database.
              </li>
              <li>
                Return to the Canvas. When configuring a node (like the AI
                node), open the <strong>Credential dropdown</strong> in its
                settings panel to select your saved key.
              </li>
            </ol>
          </div>
          <TipBox type="success">
            Your API keys are encrypted at rest and never exposed in workflow logs or the UI. FlowX uses industry-standard encryption to keep your secrets safe.
          </TipBox>
        </section>

        {/* Step 5: Logs */}
        <section id="logs" className="space-y-5 scroll-mt-8">
          <DocHeading icon={<TerminalSquare />} title="5. Live Workflow Logs" />
          <p className="text-muted-foreground leading-relaxed">
            When you run a workflow from the Canvas editor, you can monitor
            exactly what is happening under the hood in real-time.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
            <li>
              Click the <strong>Logs</strong> button in the top right of the
              editor header.
            </li>
            <li>A sliding sheet will open showing a live terminal output.</li>
            <li>
              As each node executes, it will print its start status, any debug
              messages, and its completion payload.
            </li>
            <li>
              If a node crashes, the exact error stack trace will be printed in
              red here, allowing you to instantly realize you forgot a
              credential or mistyped a URL.
            </li>
          </ul>
          <TipBox type="tip">
            Keep the Logs panel open while testing new workflows. It&apos;s the fastest way to catch configuration errors and see exactly what data flows between nodes.
          </TipBox>
        </section>

        {/* Step 6: Execution History */}
        <section id="executions" className="space-y-5 scroll-mt-8">
          <DocHeading
            icon={<Activity />}
            title="6. Execution History Dashboard"
          />
          <p className="text-muted-foreground leading-relaxed">
            For a high-level overview of past runs across all your automations,
            use the Execution History dashboard.
          </p>
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="p-5 border-b border-border/50 flex flex-col sm:flex-row gap-2 sm:items-center">
              <Activity className="size-4 text-primary" />
              <p className="text-sm text-foreground/80">
                Navigate to <strong>Executions</strong> (
                <code className="px-1.5 py-0.5 bg-muted rounded text-xs">/executions</code>) in the sidebar.
              </p>
            </div>
            <div className="p-5 bg-muted/20 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <strong className="block text-foreground mb-1">
                  Top Metrics Cards
                </strong>
                <span className="text-muted-foreground">
                  View your total run count, success rate percentage, and
                  average workflow block durations.
                </span>
              </div>
              <div>
                <strong className="block text-foreground mb-1">
                  Global Table
                </strong>
                <span className="text-muted-foreground">
                  Filter past runs by status (Success/Failed) or search by ID.
                  Monitor active processes in real time.
                </span>
              </div>
              <div className="sm:col-span-2 mt-2">
                <strong className="block text-foreground mb-1">
                  Deep Dive Panel
                </strong>
                <span className="text-muted-foreground">
                  Clicking any row in the execution table expands an inline
                  visual timeline of that specific run, node by node, complete
                  with the duration of each individual step and JSON payloads
                  for input/output data.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: Google Form Integration - NEW DETAILED SECTION */}
        <section id="google-form" className="space-y-6 scroll-mt-8">
          <DocHeading
            icon={<FileSpreadsheet />}
            title="7. Google Form Integration Setup"
          />
          <p className="text-muted-foreground leading-relaxed">
            Connect Google Forms to FlowX and automatically trigger workflows whenever someone submits a response. 
            This powerful integration lets you build automated lead capture, survey processing, registration systems, and more.
          </p>

          {/* Prerequisites */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h4 className="font-semibold text-sm mb-3 text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              Before You Begin
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
              <li>A Google account with access to Google Forms</li>
              <li>A workflow created in FlowX with a <strong>Google Form Trigger</strong> node</li>
              <li>Basic familiarity with Google Apps Script (no coding required—just copy & paste!)</li>
            </ul>
          </div>

          {/* Step-by-step Guide */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Step-by-Step Setup</h4>
            
            <SetupStep
              number={1}
              title="Add Google Form Trigger to Your Workflow"
              description="In the FlowX canvas editor, right-click and select 'Google Form' from the node menu. This will be the starting point of your automation."
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-3">
                <li>Click on the Google Form node to open its settings panel</li>
                <li>Click the <strong>&quot;Setup&quot;</strong> button to open the configuration dialog</li>
                <li>You&apos;ll see your unique webhook URL and a generated Apps Script</li>
              </ul>
            </SetupStep>

            <SetupStep
              number={2}
              title="Open Google Forms Apps Script Editor"
              description="Navigate to your Google Form and access the built-in script editor."
            >
              <div className="mt-3 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Navigation Path:</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="px-2 py-1 bg-background rounded border">Google Form</span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-background rounded border">⋮ (Three dots menu)</span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-background rounded border font-medium text-primary">Script editor</span>
                </div>
              </div>
            </SetupStep>

            <SetupStep
              number={3}
              title="Paste the Generated Script"
              description="Replace the default code in Apps Script with the FlowX-generated webhook script."
            >
              <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground mt-3">
                <li>In FlowX, click <strong>&quot;Copy Script&quot;</strong> button in the setup dialog</li>
                <li>In Apps Script editor, select all existing code (<code className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl/Cmd + A</code>)</li>
                <li>Delete it and paste the copied script (<code className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl/Cmd + V</code>)</li>
                <li>Click the <strong>Save</strong> icon (floppy disk) or press <code className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl/Cmd + S</code></li>
              </ol>
            </SetupStep>

            <SetupStep
              number={4}
              title="Create the Form Submit Trigger"
              description="Set up an automatic trigger that fires the script whenever someone submits the form."
            >
              <div className="mt-3 space-y-3">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Navigation Path:</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-background rounded border">Apps Script sidebar</span>
                    <span>→</span>
                    <span className="px-2 py-1 bg-background rounded border">⏰ Triggers (clock icon)</span>
                    <span>→</span>
                    <span className="px-2 py-1 bg-background rounded border font-medium text-primary">+ Add Trigger</span>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="p-3 bg-card rounded-lg border">
                    <span className="font-medium text-foreground">Choose function:</span>
                    <span className="text-muted-foreground ml-2">onFormSubmit</span>
                  </div>
                  <div className="p-3 bg-card rounded-lg border">
                    <span className="font-medium text-foreground">Event source:</span>
                    <span className="text-muted-foreground ml-2">From form</span>
                  </div>
                  <div className="p-3 bg-card rounded-lg border">
                    <span className="font-medium text-foreground">Event type:</span>
                    <span className="text-muted-foreground ml-2">On form submit</span>
                  </div>
                  <div className="p-3 bg-card rounded-lg border">
                    <span className="font-medium text-foreground">Failure notification:</span>
                    <span className="text-muted-foreground ml-2">Notify immediately</span>
                  </div>
                </div>
              </div>
            </SetupStep>

            <SetupStep
              number={5}
              title="Authorize the Script"
              description="Grant the necessary permissions for the script to send data to FlowX."
            >
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground mt-3">
                <li>When you save the trigger, Google will ask you to authorize the script</li>
                <li>Click <strong>&quot;Review permissions&quot;</strong></li>
                <li>Select your Google account</li>
                <li>Click <strong>&quot;Advanced&quot;</strong> → <strong>&quot;Go to [Project Name] (unsafe)&quot;</strong></li>
                <li>Click <strong>&quot;Allow&quot;</strong> to grant permissions</li>
              </ul>
              <TipBox type="warning" className="mt-4">
                The &quot;unsafe&quot; warning appears because this is a custom script, not a verified app. 
                It&apos;s safe to proceed—the script only sends form data to your FlowX webhook.
              </TipBox>
            </SetupStep>

            <SetupStep
              number={6}
              title="Test Your Integration"
              description="Submit a test response to verify everything is connected properly."
            >
              <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground mt-3">
                <li>Open your Google Form and submit a test response</li>
                <li>Go to FlowX and check the <strong>Executions</strong> page</li>
                <li>You should see a new execution triggered by your form submission</li>
                <li>Click on the execution to view the form data that was received</li>
              </ol>
            </SetupStep>
          </div>

          {/* Data Structure */}
          <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
              <Code2 className="size-5 text-primary" />
              <h4 className="font-semibold text-foreground">What Data Gets Sent?</h4>
            </div>
            <div className="p-5 bg-muted/20">
              <p className="text-sm text-muted-foreground mb-4">
                When a form is submitted, FlowX receives the following data structure:
              </p>
              <pre className="text-xs bg-background p-4 rounded-lg overflow-x-auto border">
{`{
  "formId": "1FAIpQLSc...",
  "formTitle": "Contact Form",
  "responseId": "2_ABaOnud...",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "respondentEmail": "user@example.com",
  "responses": {
    "Name": "John Doe",
    "Email": "john@example.com",
    "Message": "Hello, I have a question..."
  }
}`}
              </pre>
            </div>
          </div>

          <TipBox type="success">
            Your Google Form is now connected! Every submission will automatically trigger your FlowX workflow. 
            You can access all form fields in subsequent nodes using the <code className="px-1 py-0.5 bg-muted rounded text-xs">responses</code> object.
          </TipBox>
        </section>

        {/* Step 8: Pro Tips & Best Practices - NEW SECTION */}
        <section id="pro-tips" className="space-y-6 scroll-mt-8">
          <DocHeading
            icon={<Rocket />}
            title="8. Pro Tips & Best Practices"
          />
          <p className="text-muted-foreground leading-relaxed">
            Level up your workflow game with these expert tips. Following these best practices will help you build 
            more reliable, maintainable, and efficient automations.
          </p>

          <div className="grid gap-6">
            {/* Workflow Organization */}
            <ProTipCard
              icon={<Layout className="size-5" />}
              title="Workflow Organization"
              color="violet"
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Use descriptive names:</strong> &quot;Lead Capture - Website Form&quot; is better than &quot;Workflow 1&quot;</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Add descriptions:</strong> Document what the workflow does and when it should run</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Keep workflows focused:</strong> One workflow = one job. Create separate workflows for different tasks</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Version your workflows:</strong> Use names like &quot;v2&quot; when making major changes instead of overwriting</span>
                </li>
              </ul>
            </ProTipCard>

            {/* Testing & Debugging */}
            <ProTipCard
              icon={<Bug className="size-5" />}
              title="Testing & Debugging"
              color="orange"
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Test with Manual Trigger first:</strong> Before connecting webhooks, use Manual Trigger to test your logic</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Check the Logs panel:</strong> Always monitor logs during testing—errors appear in real-time</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Review execution history:</strong> Failed runs include detailed error messages and stack traces</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Test edge cases:</strong> Try empty inputs, special characters, and unexpected data formats</span>
                </li>
              </ul>
            </ProTipCard>

            {/* Security Best Practices */}
            <ProTipCard
              icon={<Shield className="size-5" />}
              title="Security Best Practices"
              color="green"
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Never hardcode API keys:</strong> Always use the Credentials vault for sensitive data</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Use descriptive credential names:</strong> &quot;Production OpenAI Key&quot; vs &quot;Test OpenAI Key&quot;</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Rotate keys periodically:</strong> Update your API keys every few months for better security</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Review webhook URLs:</strong> Keep your webhook URLs private—they provide direct access to trigger workflows</span>
                </li>
              </ul>
            </ProTipCard>

            {/* Performance Tips */}
            <ProTipCard
              icon={<Zap className="size-5" />}
              title="Performance Optimization"
              color="blue"
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Minimize node count:</strong> Combine operations where possible to reduce execution time</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Choose the right AI model:</strong> Use faster models (Gemini Flash, GPT-3.5) for simple tasks</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Write efficient prompts:</strong> Shorter, clearer prompts = faster AI responses and lower costs</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="size-4 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Monitor execution times:</strong> Use the Execution History to identify slow nodes</span>
                </li>
              </ul>
            </ProTipCard>

            {/* Common Pitfalls */}
            <ProTipCard
              icon={<AlertTriangle className="size-5" />}
              title="Common Pitfalls to Avoid"
              color="red"
            >
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span>
                  <span><strong>Forgetting to save:</strong> Always save your workflow before testing or leaving the editor</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span>
                  <span><strong>Missing credentials:</strong> Ensure all required API keys are configured before running</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span>
                  <span><strong>Disconnected nodes:</strong> Every action node must be connected to a trigger or previous action</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span>
                  <span><strong>Invalid URLs:</strong> Double-check URLs in HTTP Request nodes—include the full path with https://</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span>
                  <span><strong>Empty prompts:</strong> AI nodes will fail if the prompt field is empty or contains only whitespace</span>
                </li>
              </ul>
            </ProTipCard>
          </div>

          {/* Quick Reference */}
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="size-5 text-primary" />
              Quick Reference: Keyboard Shortcuts
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { keys: "Ctrl/Cmd + S", action: "Save workflow" },
                { keys: "Ctrl/Cmd + Z", action: "Undo last action" },
                { keys: "Delete / Backspace", action: "Delete selected node" },
                { keys: "Ctrl/Cmd + Click", action: "Multi-select nodes" },
                { keys: "Scroll wheel", action: "Zoom in/out" },
                { keys: "Space + Drag", action: "Pan canvas" },
              ].map((shortcut) => (
                <div key={shortcut.keys} className="flex items-center gap-3 text-sm">
                  <kbd className="px-2 py-1 bg-background rounded border text-xs font-mono shrink-0">
                    {shortcut.keys}
                  </kbd>
                  <span className="text-muted-foreground">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Help? */}
        <section className="rounded-2xl border border-border/50 bg-gradient-to-br from-muted/50 to-muted/20 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Need More Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Can&apos;t find what you&apos;re looking for? Check out our resources or reach out for support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://developers.google.com/apps-script/guides/triggers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border rounded-lg text-sm font-medium hover:border-primary/50 transition-colors"
            >
              <ExternalLink className="size-4" />
              Google Apps Script Docs
            </a>
            <a
              href="/workflow"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Workflow className="size-4" />
              Start Building
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

function DocHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 [&>svg]:size-5">
        {icon}
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  desc,
}: {
  icon?: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 transition-colors hover:border-primary/30 hover:bg-muted/10">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function NodeFeatureCard({
  title,
  type,
  desc,
  settings,
}: {
  title: string;
  type: string;
  desc: string;
  settings: string[];
}) {
  const typeStyles = {
    Trigger: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    Action: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    AI: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <span
          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${typeStyles[type as keyof typeof typeStyles] || typeStyles.Action}`}
        >
          {type}
        </span>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground">{desc}</p>
        <div>
          <strong className="text-xs text-foreground uppercase tracking-wider mb-2 block">
            Settings:
          </strong>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {settings.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TipBox({
  type,
  children,
  className = "",
}: {
  type: "tip" | "warning" | "success";
  children: React.ReactNode;
  className?: string;
}) {
  const styles = {
    tip: {
      container: "border-blue-500/20 bg-blue-500/5",
      icon: <Lightbulb className="size-4 text-blue-500" />,
      title: "text-blue-700 dark:text-blue-400",
      label: "Pro Tip",
    },
    warning: {
      container: "border-amber-500/20 bg-amber-500/5",
      icon: <AlertTriangle className="size-4 text-amber-500" />,
      title: "text-amber-700 dark:text-amber-400",
      label: "Heads Up",
    },
    success: {
      container: "border-green-500/20 bg-green-500/5",
      icon: <CheckCircle2 className="size-4 text-green-500" />,
      title: "text-green-700 dark:text-green-400",
      label: "Good to Know",
    },
  };

  const style = styles[type];

  return (
    <div className={`rounded-xl border ${style.container} p-4 ${className}`}>
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">{style.icon}</div>
        <div>
          <p className={`text-xs font-semibold ${style.title} mb-1`}>
            {style.label}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

function SetupStep({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 flex items-start gap-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          {number}
        </div>
        <div>
          <h5 className="font-semibold text-foreground">{title}</h5>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {children && (
        <div className="px-5 py-4 bg-muted/20">{children}</div>
      )}
    </div>
  );
}

function ProTipCard({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: "violet" | "orange" | "green" | "blue" | "red";
  children: React.ReactNode;
}) {
  const colorStyles = {
    violet: "border-violet-500/20 bg-violet-500/5",
    orange: "border-orange-500/20 bg-orange-500/5",
    green: "border-green-500/20 bg-green-500/5",
    blue: "border-blue-500/20 bg-blue-500/5",
    red: "border-red-500/20 bg-red-500/5",
  };

  const iconColorStyles = {
    violet: "text-violet-500",
    orange: "text-orange-500",
    green: "text-green-500",
    blue: "text-blue-500",
    red: "text-red-500",
  };

  return (
    <div className={`rounded-xl border ${colorStyles[color]} p-5`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={iconColorStyles[color]}>{icon}</span>
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );
}
