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

## API

```typescript
makeUseSSE<T>(url: string, event: string)
```

Creates a custom hook for consuming SSE.

- `url`: The URL of the SSE endpoint.

- `event`: The name of the SSE event to listen for.

Returns a React hook that provides the latest parsed data of type T.

## License

This project is licensed under the MIT License.
See the [LICENSE](LICENSE) file for details.
