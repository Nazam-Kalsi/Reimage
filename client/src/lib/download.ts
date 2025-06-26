export const download = async (url: string) => {
    const image = await fetch(url);
    const nameSplit = url.split("/");
    const duplicateName = nameSplit.pop();
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "" + duplicateName + "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };