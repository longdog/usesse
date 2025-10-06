import { makeUseSSE } from "../../dist/index.es.js";
import "./App.css";

export type BroadcastCommand = "select" | "skip" | "play" | "stop";

export type BroadcastState = {
  command?: BroadcastCommand;
  params?: {
    id: number;
    isTest: boolean;
  };
};

const eventId = 1;
const useSSE = makeUseSSE<BroadcastState>(
  `/api/events/stream/${eventId}`,
  "message"
);

function App() {
  const sseData = useSSE();

  return (
    <>
      <div>{JSON.stringify(sseData)}</div>
    </>
  );
}

export default App;
