'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, Terminal, CheckCircle2 } from 'lucide-react';

interface TerminalContactFormProps {
  formspreeId?: string | null;
  email?: string;
}

export const TerminalContactForm: React.FC<TerminalContactFormProps> = ({
  formspreeId,
  email = 'ssurindersingh100@gmail.com',
}) => {
  const [state, handleSubmit] = useForm(
    formspreeId || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'xrgwgbye'
  );

  if (state.succeeded) {
    return (
      <div className="rounded-xl border border-primary/40 bg-card p-6 sm:p-8 font-mono text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">
          Transmission Received
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your message has been safely delivered to my inbox. Expect a response
          within 24 hours.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>Send Another Transmission</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/80 bg-card overflow-hidden font-mono shadow-xs">
      {/* Terminal window titlebar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-tertiary-2 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-mono">
          ~/contact/transmission.sh
        </span>
        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
        {/* User Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            <span className="text-primary font-bold">&gt;</span>
            <span>const USER_NAME =</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="'Enter your designated name...'"
            required
            className="font-mono text-xs text-foreground bg-background/80 border-border focus:border-primary"
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-red-500 text-[11px]"
          />
        </div>

        {/* User Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            <span className="text-primary font-bold">&gt;</span>
            <span>const USER_EMAIL =</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="'username@domain.com'"
            required
            className="font-mono text-xs text-foreground bg-background/80 border-border focus:border-primary"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-[11px]"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-xs text-muted-foreground flex items-center gap-1"
          >
            <span className="text-primary font-bold">&gt;</span>
            <span>let message = `</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Construct your payload message here..."
            required
            className="font-mono text-xs text-foreground bg-background/80 border-border focus:border-primary"
          />
          <span className="text-xs text-muted-foreground block">`;</span>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-[11px]"
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={state.submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{state.submitting ? 'EXECUTING...' : 'EXECUTE_SEND()'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TerminalContactForm;
