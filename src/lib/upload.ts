/**
 * Image upload utility supporting ImgBB and local data URI fallback
 */
export async function uploadImageToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (apiKey) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.data?.url) {
        return data.data.url;
      }
    } catch (err) {
      console.warn("ImgBB API upload encountered an error, falling back to data URL preview:", err);
    }
  }

  // Resilient fallback: Convert file to Base64 Data URL so the app works seamlessly even without an external API key!
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
