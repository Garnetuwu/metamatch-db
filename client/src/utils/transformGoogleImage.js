const transformGoogleImage = (url) => {
  const id = url.split("/")[5];
  const newURL = `https://drive.google.com/uc?export=view&id=${id}`;
  return newURL;
};

export default transformGoogleImage;
