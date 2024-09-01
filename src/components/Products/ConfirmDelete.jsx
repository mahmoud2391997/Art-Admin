import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';

export default function ConfirmDelete({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open} handler={onCancel} className="max-w-md mx-auto">
            <DialogHeader>Confirm Delete</DialogHeader>
            <DialogBody>
                <Typography variant="h6" color="blue-gray">
                    Are you sure you want to delete this product? This action cannot be undone.
                </Typography>
            </DialogBody>
            <DialogFooter>
                <Button color="red" onClick={onConfirm} className="mr-2">
                    Delete
                </Button>
                <Button color="blue" onClick={onCancel}>
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
  )
}
