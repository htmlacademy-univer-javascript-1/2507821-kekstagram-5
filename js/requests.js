const sendImage = async (data) => {
  data.submitter.disabled = true;
  const requestData = new FormData(data.form);
  fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'post',
    body: requestData
  }).then((response) => {
    if (response.ok) {
      data.clearWindow(true);
      data.success();
    } else {
      data.error();
    }
  }).finally(() => {
    data.submitter.disabled = false;
  });
};

const downloadImages = async () => {
  const response = await fetch('https://29.javascript.htmlacademy.pro/kekstagram/data');
  const data = await response.json();
  return data;
};

export {sendImage, downloadImages};
