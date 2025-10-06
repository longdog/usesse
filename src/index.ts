import { useMemo, useSyncExternalStore } from "react";

const makeSSESource = (url: string, event: string) => {
  let evtSource: EventSource | null = null;

  let state: unknown | undefined = undefined;
  const subscribers = new Set<() => void>();
  return {
    subscribe: (callback: () => void) => {
      subscribers.add(callback);
      if (!evtSource) {
        evtSource = new EventSource(url);
        evtSource.onopen = (event) => {
          console.log("Connection opened:", event);
        };
        evtSource.onerror = (event) => {
          console.error("Connection error:", event);
        };
        evtSource.addEventListener(event, (event: MessageEvent) => {
          state = event?.data;
          subscribers.forEach((callback) => callback());
        });
      }
      return () => {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          evtSource?.close();
          evtSource = null;
        }
      };
    },
    getVal: () => {
      return state;
    },
  };
};

export const makeUseSSE = <T>(
  url: string,
  event: string,
  reviver?: (data: string) => T
) => {
  return () => {
    const sse = useMemo(() => makeSSESource(url, event), []);
    const rawData = useSyncExternalStore(sse.subscribe, sse.getVal);
    const data: T | undefined = useMemo(() => {
      if (rawData && typeof rawData === "string") {
        try {
          return reviver ? reviver(rawData) : (JSON.parse(rawData) as T);
        } catch {
          /* */
        }
      }
      return undefined;
    }, [rawData]);
    return data;
  };
};
