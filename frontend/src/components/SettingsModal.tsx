import { useState } from "react"

import { Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Stack } from "@mui/joy"

interface SettingsModalProps {
  name: string | undefined,
  show: boolean,
  onClose: Function,
  onSubmit: Function
}

export default function SettingsModal({ name, show, onClose, onSubmit }: SettingsModalProps) {
  const [value, setValue] = useState(name)
  return <Modal
    open={show}
    onClose={() => onClose(value)}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <ModalDialog>
      <ModalClose />
      <form method="dialog"
        onSubmit={() => onSubmit(value)}
      >
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input autoFocus value={value} onChange={e => setValue(e.target.value)} />
          </FormControl>
          <Button type="submit" disabled={!value}> Submit </Button>
        </Stack>
      </form>
    </ModalDialog>
  </Modal>
}