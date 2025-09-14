export const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dlqsn2byv/image/upload`;

export const CLOUDINARY_UPLOAD_PRESET = "funeral-service";

export const uploadImageToCloudinary = async (file)=> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary response missing secure_url");
  }

  return data.secure_url;
};
