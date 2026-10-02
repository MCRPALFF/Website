"use client";

import Script from "next/script";
import { useId } from "react";

type TurnstileFieldProps = {
  siteKey?: string;
};

export function TurnstileField({ siteKey }: TurnstileFieldProps) {
  const fieldId = useId().replace(/:/g, "");

  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <input id={`${fieldId}-token`} type="hidden" name="turnstileToken" />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-theme="dark"
        data-callback={`onTurnstileSuccess${fieldId}`}
      />
      <Script id={`turnstile-callback-${fieldId}`} strategy="afterInteractive">
        {`
          window.onTurnstileSuccess${fieldId} = function(token) {
            var input = document.getElementById("${fieldId}-token");
            if (input) input.value = token;
          };
        `}
      </Script>
    </>
  );
}
