import React from "react";

const InvitationItem = ({ index, invitation, handleAccept, handleReject }) => {
  return (
    <form className="py-2 mb-2 px-4 text-sm flex justify-between items-center border border-gray-300 rounded-md f ">
      <p className="font-mono font-extrabold">{index}</p>
      <div>
        <p>
          <span className="font-mono font-extrabold">Title:</span>
          <span className="font-sans">{invitation.taskId.title}</span>
        </p>
        <p>
          <span className="font-mono font-extrabold">Owner:</span>
          <span className="font-sans">{invitation.taskId.owner.name}</span>
        </p>
        <p>
          <span className="font-mono font-extrabold">Invitation Status:</span>
          <span className="font-sans">{invitation.invitationStatus}</span>
        </p>
      </div>
      <div className="font-mono flex items-center justify-center flex-col md:flex-row">
        <input
          type="button"
          value="Accept"
          onClick={() => handleAccept(invitation)}
          className="text-white bg-green-700 rounded-md p-1 cursor-pointer"
        />

        <input
          type="button"
          value="Reject"
          onClick={() => handleReject(invitation)}
          className="text-white bg-red-700 rounded-md p-1 cursor-pointer mt-1 md:mt-0 md:ml-2"
        />
      </div>
    </form>
  );
};

export default InvitationItem;
