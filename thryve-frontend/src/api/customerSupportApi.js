import api from "../services/api";

export const getAllContactSupportApi = async () => {
  try {
    const response = await api.get("/contact-support");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch support requests"
    );
  }
};

export const replyToContactSupportApi = async ({
  contactSupportId,
  subject,
  message,
}) => {
  try {
    const response = await api.post("/contact-support/reply", {
      contactSupportId,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to send reply");
  }
};

export const insertContactSupportApi = async ({
  name,
  email,
  subject,
  message,
}) => {
  try {
    const response = await api.post("/contact-support", {
      name,
      email,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to submit support request"
    );
  }
};
