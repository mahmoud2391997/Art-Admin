import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export default function ConfirmDelete({ open, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      handler={onCancel}
      className="max-w-md mx-auto h-52 bg-white rounded-lg shadow-lg"
    >
      <DialogHeader className="text-lg font-semibold font-eb-garamond text-gray-800">
        Confirm Delete
      </DialogHeader>
      <DialogBody className="flex items-center justify-center">
        <Typography variant="h6" color="blue-gray" className="text-center text-xl font-eb-garamond">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-end">
        <button
          onClick={onCancel}
          className="mr-8 text-black capitalize font-eb-garamond hover:text-gray-500 transition duration-200 bg-white"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="mr-8 text-black font-eb-garamond font-bold text-main capitalize hover:text-red-700 transition duration-200 bg-white"
        >
          Delete
        </button>
      </DialogFooter>
    </Dialog>
  );
}
