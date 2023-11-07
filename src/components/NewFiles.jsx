export default function NewFiles({ downloadURL, slug }) {
  const imageUrl =
    "https://images.unsplash.com/photo-1476044591369-74ee6ac6899c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb";
  const downloadImage = async (imageSrc, imageName, forceDownload) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = imageSrc;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const imageBlob = await fetch(imageSrc).then((response) =>
        response.blob()
      );
      const objectURL = URL.createObjectURL(imageBlob);
      const link = document.createElement("a");
      link.href = objectURL;
      link.download = imageName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        downloadImage(imageUrl, "1_MY_React_logo", true); // Set true to force download
      }}
    >
      Download Image
    </button>
  );
}
