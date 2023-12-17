import { useEffect, useRef, useState } from 'react'

import { CssVarsProvider } from "@mui/joy/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import { CircularProgress, Divider, Stack, Typography, IconButton } from "@mui/joy";

import ChatInput from "./components/ChatInput";
import Messages from "./components/Messages";
import SettingsModal from "./components/SettingsModal";

import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider';


function App() {
  const provider = useRef<HocuspocusProvider>()
  const ID = useRef<string>()
  const [users, setUsers] = useState<Y.Map<string>>(new Y.Map())
  const [showModal, setShowModal] = useState(true)
  const [inProgressMessages, setInProgressMessages] = useState<InProgressMessage[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    provider.current = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name: "document",
      onAwarenessUpdate: () => {
        let messages: InProgressMessage[] = [];
        for (const [key, state] of provider.current!.awareness!.getStates()) {
          if (key.toString() !== ID.current && !!state["inprogress"]) {
            messages.push({
              id: key.toString(),
              message: state["inprogress"]
            })
          }
        }
        setInProgressMessages(messages)
      },
      onConnect: () => {
        ID.current = (provider.current!.awareness?.clientID)?.toString()
        const users = provider.current!.document.getMap<string>("users")
        users.observe(() => {
          setUsers(provider.current!.document.getMap<string>("users"))
        })
        const messages = provider.current!.document.getArray<Message>("messages")
        messages.observe(() => {
          setMessages(provider.current!.document.getArray<Message>("messages").toArray())
        })
        setMessages(messages.toArray())

        setConnected(true)
      },
      onDisconnect: () => {
        setConnected(false)
      }
    })
    return () => {
      provider.current?.destroy()
    }
  }, [])

  return (
    <CssVarsProvider>
      {connected ? <>
        <SettingsModal
          name={users.get(ID.current!)}
          show={showModal}
          onClose={() => {
            if (users.get(ID.current!)) { setShowModal(false) }
          }}
          onSubmit={(name: string) => {
            provider.current!.document.getMap("users").set(ID.current!, name)
            setShowModal(false)
          }}
        />
        <Stack height="100%" width="100%" display="flex">
          <Stack direction="row" justifyContent="space-between" padding={"8px"}>
            <Typography level="h1">Group Chat</Typography>
            <IconButton onClick={() => setShowModal(true)} sx={{ justifySelf: "end" }}><SettingsIcon /></IconButton>
          </Stack>
          <Divider />
          <Messages messages={messages} id={ID.current} inProgressMessages={inProgressMessages} names={users} />
          <Divider />
          <ChatInput
            onChange={(m: string) => provider.current?.awareness?.setLocalStateField("inprogress", m)}
            onSend={(m: string) => {
              provider.current?.awareness?.setLocalStateField("inprogress", "")
              provider.current?.document.getArray("messages").insert(0, [{ message: m, id: ID.current, time: Date.now() }])
            }}
          />
        </Stack>
      </>
        : <CircularProgress />
      }
    </CssVarsProvider>
  )
}

export default App
