# useSSE

A lightweight React hook for consuming Server-Sent Events (SSE) with ease.

## Installation

Install the library using npm or yarn:

```bash
npm install @longdog/usesse
# or
yarn add @longdog/usesse
```

## Usage

```tsx
// JSON data

import { makeUseSSE } from "@longdog/usesse";

type ServerTime = {
  time: string;
};

const useSSE = makeUseSSE<ServerTime>("/api/sse", "time-update");

function App() {
  const data = useSSE();
  return (
    <>
      <div className="card">{data?.time || "no data"}</div>
    </>
  );
}
```

```jsx
// String data
// This example demonstrates how to use the `reviver` function to handle string data.

import { makeUseSSE } from "@longdog/usesse";
const useSSE =
  makeUseSSE < string > ("/api/sse", "string-update", (data) => data);
function App() {
  const data = useSSE();
  return (
    <>
      <div>{data || "no string data"}</div>
    </>
  );
}
```

## API

```typescript
makeUseSSE<T>(url: string, event: string, reviver?: (data: string) => T)
```

Creates a custom hook for consuming SSE.

- `url`: The URL of the SSE endpoint.

- `event`: The name of the SSE event to listen for.

- `reviver`: An optional function to transform the raw data before parsing.
  It takes a string and returns the parsed data of type T.
  This is useful for handling custom data formats or parsing logic.
  If not provided, the data will be parsed as JSON.
  The reviver function should return the parsed data of type T.

Returns a React hook that provides the latest parsed data of type T.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
