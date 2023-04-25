import React, { useContext, useEffect, useState } from "react";
import SEO from "../containers/seo";
import InvitationItem from "./InvitationItem";
import axios from "axios";
import { TodoContext } from "../containers/TodoContextProvider";
import { useCallback } from "react";

const Invitations = () => {
  const { userId, updateIsLoading } = useContext(TodoContext);
  const [invitations, setInvitations] = useState([]);
  const [isLoadingInvitations, setIsLoadingInvitations] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post("/collaborators/invitations", {
        userId,
      });
      setInvitations(response.data);
      setIsLoadingInvitations(false);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
    return () => {
      setIsLoadingInvitations(true);
    };
  }, [fetchData]);

  const handleAccept = async (invite) => {
    try {
      updateIsLoading(true);
      setIsLoadingInvitations(true);
      await axios.patch("/collaborators/invitation", {
        taskId: invite.taskId._id,
        userId: invite.userId,
        invitationStatus: "accepted",
      });

      fetchData();
      updateIsLoading(false);
    } catch (error) {
      console.log(`Unable to Accept - ${error.response.data.message}`);
    }
  };

  const handleReject = async (invite) => {
    try {
      updateIsLoading(true);
      setIsLoadingInvitations(true);
      await axios.patch("/collaborators/invitation", {
        taskId: invite.taskId._id,
        userId: invite.userId,
        invitationStatus: "rejected",
      });
      fetchData();
      updateIsLoading(false);
    } catch (error) {
      // console.log(`Unable to Accept - ${error.response.data.message}`);
      console.log(error);
    }
  };

  return (
    <div className="p-5 w-full max-w-screen-lg mx-auto">
      <SEO
        title="Task Invitation"
        description="Invitation to Collaborate on Tasks"
      />
      {isLoadingInvitations ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>Loading Invitations...</h1>
        </div>
      ) : !invitations.length ? (
        <div className="p-4 flex flex-col items-center justify-center">
          <h1>No Invitations</h1>
        </div>
      ) : (
        invitations.map((invitation, index) => (
          <InvitationItem
            key={index}
            invitation={invitation}
            handleAccept={handleAccept}
            handleReject={handleReject}
          />
        ))
      )}
    </div>
  );
};

export default Invitations;
