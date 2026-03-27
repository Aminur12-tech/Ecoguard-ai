import cloudinary from "../config/cloudinary";

export const uploadImage = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ecoguard_poi",
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};