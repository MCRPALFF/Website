"use client";

import { useMemo } from "react";

type ObfuscatedEmailProps = {
  user: string;
  domain: string;
  className?: string;
};

export function ObfuscatedEmail({ user, domain, className }: ObfuscatedEmailProps) {
  const email = useMemo(() => `${user}@${domain}`, [user, domain]);

  return (
    <a href={`mailto:${email}`} className={className}>
      {user}
      {"@"}
      {domain}
    </a>
  );
}
