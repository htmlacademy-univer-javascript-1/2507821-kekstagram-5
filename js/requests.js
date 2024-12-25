const sendImage = async (data) => {
  data.submitter.disabled = true;
  const requestData = new FormData(data.form);
  fetch('https://29.javascript.htmlacademy.pro/kekstagram', {
    method: 'post',
    body: requestData
  }).then((response) => {
    if (response.ok) {
      data.clearWindow();
      data.success();
    } else {
      data.error();
    }
  }).catch(() => {
    data.error();
  }).finally(() => {
    data.submitter.disabled = false;
  });
};

export default sendImage;
