import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Loader2 } from "lucide-react";
import {
  getAllContactSupportApi,
  replyToContactSupportApi,
} from "../api/customerSupportApi";

export default function AdminContactSupport() {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyData, setReplyData] = useState({ subject: "", message: "" });
  const [activeSupportId, setActiveSupportId] = useState(null);

  const { data: parents, isLoading } = useQuery({
    queryKey: ["contactSupport"],
    queryFn: getAllContactSupportApi,
  });

  const replyMutation = useMutation({
    mutationFn: replyToContactSupportApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["contactSupport"]);
      setReplyData({ subject: "", message: "" });
      setActiveSupportId(null);
    },
  });

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!activeSupportId) return;
    replyMutation.mutate({
      contactSupportId: activeSupportId,
      ...replyData,
    });
  };

  const handleClose = () => {
    setSelectedUser(null);
    setActiveSupportId(null);
    setReplyData({ subject: "", message: "" });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-400" />
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        📩 Contact Support (Admin View)
      </h1>

      <div className="grid gap-4">
        {parents?.parents?.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow p-4 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
          >
            <div>
              <h2 className="text-lg font-semibold">{user.email}</h2>
              <p className="text-sm text-gray-500">
                {user.contactSupports.length} message
                {user.contactSupports.length > 1 && "s"}
              </p>
            </div>
            <button
              onClick={() => setSelectedUser(user)}
              className="border border-teal-400 text-teal-400 px-4 py-1 rounded-md font-semibold hover:bg-teal-50 transition"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedUser.email}'s Messages
            </h2>

            {selectedUser.contactSupports.map((cs) => (
              <div key={cs.id} className="border-t pt-4 mt-2">
                <h3 className="font-medium text-gray-700">
                  {cs.name} - {cs.subject}
                </h3>
                <p className="text-gray-600 mt-1">{cs.message}</p>
                <span className="text-xs text-gray-400">
                  {new Date(cs.createdAt).toLocaleString()}
                </span>

                {cs.contactSupportReplyOwner.length > 0 ? (
                  <div className="ml-4 mt-3 space-y-2">
                    {cs.contactSupportReplyOwner.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-gray-100 rounded-lg p-3 shadow-sm"
                      >
                        <h4 className="font-medium text-gray-700">
                          {reply.subject}
                        </h4>
                        <p className="text-gray-600">{reply.message}</p>
                        <span className="text-xs text-gray-400">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 ml-4 mt-2">
                    No replies yet.
                  </p>
                )}

                <form
                  onSubmit={handleReplySubmit}
                  className="ml-4 mt-2 flex flex-col gap-2"
                >
                  <input
                    type="text"
                    placeholder="Reply Subject"
                    value={activeSupportId === cs.id ? replyData.subject : ""}
                    onChange={(e) => {
                      setActiveSupportId(cs.id);
                      setReplyData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }));
                    }}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                  <textarea
                    placeholder="Reply Message"
                    value={activeSupportId === cs.id ? replyData.message : ""}
                    onChange={(e) => {
                      setActiveSupportId(cs.id);
                      setReplyData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }));
                    }}
                    rows={3}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                  <button
                    type="submit"
                    disabled={replyMutation.isPending}
                    className="bg-teal-400 text-white px-4 py-2 rounded-md font-semibold hover:bg-teal-500 transition"
                  >
                    {replyMutation.isPending && activeSupportId === cs.id
                      ? "Sending..."
                      : "Send Reply"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
