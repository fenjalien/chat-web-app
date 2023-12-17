import { Stack } from "@mui/joy";
import MessageDisplay from "./MessageDisplay";

import * as Y from "yjs";

interface MessagesProps {
    messages: Message[],
    names: Y.Map<string>,
    inProgressMessages: InProgressMessage[],
    id: string | undefined
}

export default function Messages({ id, messages, names, inProgressMessages }: MessagesProps) {
    return <Stack alignItems="stretch" flex="1" overflow="clip scroll" paddingX="8px" direction="column-reverse">
        {inProgressMessages.map(m => <MessageDisplay
            variant="inprogress"
            message={m.message}
            name={names.get(m.id)}
        />)}
        {messages.map(
            m => {
                return <MessageDisplay
                    variant={m.id === id ? "me" : "you"}
                    message={m.message}
                    name={names.get(m.id)}
                    time={m.time}
                />
            })}
    </Stack>
}