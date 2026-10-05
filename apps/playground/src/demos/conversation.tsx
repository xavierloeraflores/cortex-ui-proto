import { useState } from "react";
import { useForm } from "react-hook-form";
import * as UI from "@cortex/ui";
import { ArrowUp, Check, FileText, Paperclip, X, Sparkles } from "lucide-react";

export function ConversationDemo() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [attached, setAttached] = useState(true);
  return (
    <div className="demo-stack">
      <UI.MessageScrollerProvider autoScroll>
        <UI.MessageScroller className="h-[128px]">
          <UI.MessageScrollerViewport>
            <UI.MessageScrollerContent className="gap-3">
              <UI.MessageScrollerItem messageId="welcome">
                <UI.Message>
                  <UI.MessageAvatar>
                    <span className="p-2 text-primary">
                      <Sparkles size={15} />
                    </span>
                  </UI.MessageAvatar>
                  <UI.MessageContent>
                    <UI.MessageHeader>
                      Cortex assistant <span className="ml-2 micro">DEMO</span>
                    </UI.MessageHeader>
                    <UI.Bubble>What will you create today?</UI.Bubble>
                    <UI.MessageFooter>Ready when you are.</UI.MessageFooter>
                  </UI.MessageContent>
                </UI.Message>
              </UI.MessageScrollerItem>
              {messages.map((message, i) => (
                <UI.MessageScrollerItem
                  key={i}
                  messageId={`message-${i}`}
                  scrollAnchor
                >
                  <UI.Message align="end">
                    <UI.MessageContent>
                      <UI.Bubble>{message}</UI.Bubble>
                    </UI.MessageContent>
                  </UI.Message>
                  <UI.Message className="mt-2">
                    <UI.MessageContent>
                      <UI.Bubble variant="outline">
                        Added to your local sketchbook. This is a UI preview, so
                        no message was sent to a server.
                      </UI.Bubble>
                    </UI.MessageContent>
                  </UI.Message>
                </UI.MessageScrollerItem>
              ))}
            </UI.MessageScrollerContent>
          </UI.MessageScrollerViewport>
          <UI.MessageScrollerButton />
        </UI.MessageScroller>
      </UI.MessageScrollerProvider>
      {attached && (
        <UI.Attachment className="w-full">
          <UI.AttachmentMedia>
            <FileText />
          </UI.AttachmentMedia>
          <UI.AttachmentContent>
            <UI.AttachmentTitle>design-system.fig</UI.AttachmentTitle>
            <UI.AttachmentDescription>
              Reference document · 2.4 MB
            </UI.AttachmentDescription>
          </UI.AttachmentContent>
          <UI.AttachmentActions>
            <UI.AttachmentAction
              aria-label="Remove attachment"
              onClick={() => setAttached(false)}
            >
              <X />
            </UI.AttachmentAction>
          </UI.AttachmentActions>
        </UI.Attachment>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            setMessages([...messages, input.trim()]);
            setInput("");
          }
        }}
      >
        <UI.InputGroup>
          <UI.InputGroupAddon>
            <UI.InputGroupButton
              aria-label="Attach sample document"
              onClick={() => setAttached(!attached)}
            >
              <Paperclip />
            </UI.InputGroupButton>
          </UI.InputGroupAddon>
          <UI.InputGroupInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Chat message"
            placeholder="Ask something. Make something."
          />
          <UI.InputGroupAddon align="inline-end">
            <UI.InputGroupButton
              type="submit"
              variant="default"
              size="icon-xs"
              aria-label="Send message"
              disabled={!input.trim()}
            >
              <ArrowUp />
            </UI.InputGroupButton>
          </UI.InputGroupAddon>
        </UI.InputGroup>
      </form>
    </div>
  );
}
const questions = [
  {
    name: "direction",
    required: true,
    prompt: "What should we build next?",
    choices: [
      { value: "dashboard", label: "A dashboard" },
      { value: "editor", label: "A creative editor" },
    ],
  },
  {
    name: "priority",
    required: false,
    prompt: "Choose your priorities",
    multiple: true,
    choices: [
      { value: "speed", label: "Speed" },
      { value: "detail", label: "Detail" },
    ],
  },
] as const;
export function QuestionnaireDemo() {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <div className="demo-stack items-center py-6">
      <Check className="text-primary" />
      <h3>Direction received.</h3>
      <p className="muted">Your answers are saved in this preview.</p>
      <UI.Button
        variant="outline"
        size="sm"
        onClick={() => setSubmitted(false)}
      >
        Start again
      </UI.Button>
    </div>
  ) : (
    <UI.Questionnaire
      items={questions}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <UI.QuestionnaireProgress />
      {questions.map((q) => (
        <UI.QuestionnaireItem
          key={q.name}
          name={q.name}
          required={q.required}
          multiple={"multiple" in q ? q.multiple : false}
        >
          <UI.QuestionnaireTitle>{q.prompt}</UI.QuestionnaireTitle>
          <UI.QuestionnaireChoices>
            {q.choices.map((choice) => (
              <UI.QuestionnaireChoice key={choice.value} value={choice.value}>
                {choice.label}
              </UI.QuestionnaireChoice>
            ))}
          </UI.QuestionnaireChoices>
          <UI.QuestionnaireError />
        </UI.QuestionnaireItem>
      ))}
      <UI.QuestionnaireActions>
        <UI.QuestionnairePrevious size="sm" />
        <UI.QuestionnaireSkip size="sm" />
        <UI.QuestionnaireNext size="sm" />
        <UI.QuestionnaireSubmit size="sm">
          Save direction
        </UI.QuestionnaireSubmit>
      </UI.QuestionnaireActions>
    </UI.Questionnaire>
  );
}
export function FormDemo() {
  const form = useForm<{ email: string }>({ defaultValues: { email: "" } });
  return (
    <UI.Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          UI.toast.success("You're on the list"),
        )}
        className="demo-stack"
        noValidate
      >
        <UI.FormField
          control={form.control}
          name="email"
          rules={{
            required: "Enter your email address.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Use a valid email address.",
            },
          }}
          render={({ field }) => (
            <UI.FormItem>
              <UI.FormLabel>Stay in the loop</UI.FormLabel>
              <UI.FormControl>
                <UI.Input
                  type="email"
                  placeholder="you@studio.design"
                  {...field}
                />
              </UI.FormControl>
              <UI.FormDescription>
                New components. Occasional field notes.
              </UI.FormDescription>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
        <UI.Button type="submit">
          Join the transmission <ArrowUp className="rotate-45" />
        </UI.Button>
        <p className="micro">LOCAL VALIDATION / NO EMAIL IS SENT</p>
      </form>
    </UI.Form>
  );
}
