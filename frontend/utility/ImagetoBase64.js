async function ImagetoBase64(file, maxSize) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      if (base64.length / 1024 <= maxSize) {
        resolve(base64);
      } else {
        reject(new Error(`File size exceeds ${maxSize} KB`));
      }
    };
    reader.onerror = (err) => reject(err);
  });

  return data;
}

export { ImagetoBase64 };
