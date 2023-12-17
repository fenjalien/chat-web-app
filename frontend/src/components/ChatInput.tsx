import { useEffect, useState } from "react";

import { IconButton, Input, Stack } from "@mui/joy";
import SendIcon from '@mui/icons-material/Send';

interface ChatProps {
    onChange: Function,
    onSend: Function
}

export default function ChatInput({ onChange, onSend }: ChatProps) {
    const [message, setMessage] = useState("")

    return (
        <form method="dialog" className="chatForm" onSubmit={() => {
            onSend(message)
            setMessage("")
        }}>
            <Stack direction="row" justifyContent="center">
                <Input autoFocus fullWidth placeholder="Message" value={message} onChange={(e) => { setMessage(e.target.value); onChange(e.target.value) }} />
                <IconButton disabled={!message} type="submit" > <SendIcon /> </IconButton>
            </Stack>
        </form>
    )
}