import { message } from 'antd'


const copyToClipBoard = (text: string) => {

  var textArea: HTMLTextAreaElement = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();

  message.success("Copied to clipboard!");
}

export default copyToClipBoard