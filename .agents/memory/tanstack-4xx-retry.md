---
name: TanStack Query 4xx retry loop
description: TanStack Query retries failed queries by default — 404 on "no profile" causes infinite spinner unless retries are disabled for 4xx errors.
---

The rule: configure `QueryClient` with a custom `retry` function that returns `false` for 4xx status codes:

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof Error && "status" in error) {
          const status = (error as { status: number }).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
    },
  },
});
```

**Why:** When no user profile exists yet, `useGetProfile()` returns 404. TanStack Query retries it (default 3 times with backoff), keeping `isLoading: true` the whole time — the onboarding spinner never resolves. This is especially bad in patterns that gate rendering on `isLoading`.

**How to apply:** Always configure this in the root `QueryClientProvider` for any app that has optional/conditional resources that return 404 when absent.
