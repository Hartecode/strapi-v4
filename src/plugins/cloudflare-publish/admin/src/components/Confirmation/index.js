import React from 'react';


const Confirmation = (isVisible, onClose) => {
  const [isVisible, setIsVisible] = useState(false);
  return <>
          <Dialog onClose={onClose} title="Confirmation" isOpen={isVisible}>
            <DialogBody icon={<ExclamationMarkCircle />}>
              <Stack size={2}>
                <Flex justifyContent="center">
                  <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
                </Flex>
              </Stack>
            </DialogBody>
            <DialogFooter startAction={<Button onClick={() => setIsVisible(false)} variant="tertiary">
                  Cancel
                </Button>} endAction={<Button variant="danger-light" startIcon={<Trash />}>
                  Confirm
                </Button>} />
          </Dialog>
        </>;
}

export default Confirmation;