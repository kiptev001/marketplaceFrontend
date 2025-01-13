export const saveImages = async (images: File[] | null) => {
  const uploadFile = async (file: File):Promise<string> => {
    const formdata = new FormData();
    formdata.append('image', file);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/upload`, requestOptions);
    const { url } = await response.json();
    return url;
  };

  if(!images)return null;

  const imageUrls = await Promise.all(images.map(file => uploadFile(file)));

  return imageUrls;
};
