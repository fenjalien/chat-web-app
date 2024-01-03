import { Sheet, Stack } from "@mui/joy"

interface MessageProps {
    name: string | undefined,
    message: string,
    time?: number
    variant: "me" | "you" | "inprogress"
}

const VARIANTS = {
    me: {
        color: "neutral",
        variant: "outlined",
        borderRadius: "1em 1em 0em 1em"
    },
    you: {
        color: "primary",
        variant: "solid",
        borderRadius: "1em 1em 1em 0em"
    },
    inprogress: {
        color: "neutral",
        variant: "soft",
        borderRadius: "1em 1em 1em 0em"
    }
} as const

export default function MessageDisplay({ name, message, variant = "you", time }: MessageProps) {
    const style = VARIANTS[variant]
    const notes = []
    if (variant != "me") {
        notes.push(name)
    }
    if (variant != "inprogress" && time) {
        const date = new Date(time)
        notes.push([date.getHours(), date.getMinutes()].map(n => n.toString().padStart(2, "0")).join(":"))
    }

    return <Stack alignItems={variant === "me" ? "end" : "start"} marginBottom="8px">
        <Sheet
            color={style.color}
            variant={style.variant}
            sx={{
                p: 1,
                borderRadius: style.borderRadius,
                overflowWrap: "break-word",
                maxWidth: "70vw"
            }}
        >
            {message}
        </Sheet>
        <Sheet color="neutral" sx={{ fontSize: "0.7em" }}>
            {notes.join(", ")}
        </Sheet>
    </Stack>
}