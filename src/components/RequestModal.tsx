import { TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { type FC, useState } from "react";
import { api } from "~/utils/api";

const RequestModal: FC<{ id: string }> = ({ id }) => {
  const [request, setReqeust] = useState("");
  const [error, setError] = useState("");

  const addRequest = api.image.addRequest.useMutation();

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (request.trim() === "" || request.trim().length < 10) {
          return setError("Request too short!");
        }
        addRequest.mutateAsync({ id, request }).catch((e) => {
          console.log(e);
          notifications.show({ message: "An error occurred!", color: "red" });
        });
        modals.closeAll();
        notifications.show({
          message: "Request submitted successfully!",
          color: "green",
        });
      }}
    >
      {error && (
        <div className="w-full rounded-sm bg-red-500 p-4 text-sm text-white">
          {error}
        </div>
      )}
      <TextInput
        label="request description"
        className="w-full"
        value={request}
        onChange={(e) => {
          setReqeust(e.target.value);
        }}
      />
      <button className="w-full bg-black p-4 text-sm font-bold text-white">
        Submit request
      </button>
    </form>
  );
};
export default RequestModal;
