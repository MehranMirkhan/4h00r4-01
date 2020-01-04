import React, { useState } from 'react';
import { Button, Icon, Image, Modal } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { FilePicker, MultiInputField } from 'src/components/FormFields';

import { API } from 'src/redux/store_config';
import config from 'src/app.config.json';


export const HintField = ({ input, meta, children, path, formProps, ...props }) => {
  const type = useSelector(state => formValueSelector(formProps.form)(state, "type"));
  switch (type) {
    case "image":
      return <ImageHint value={input.value} onChange={input.onChange} />;
    case "choice":
      return <MultiInputField name="choices" label="اندیس گزینه‌های حذفی (از صفر)" input={input} />;
    case "letter":
      return <MultiInputField name="letters" label="اندیس حروف حذفی (از صفر)" input={input} />;
  }
  return null;
}

function ImageHint({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onSubmit = () => {
    setSubmitting(true);
    saveFile(file, "q_img")
      .then(res => {
        if (!res) return;
        onChange(res.data.relative_path);
        onClose();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return <div style={{ marginBottom: 16 }}>
    <Modal trigger={<Button onClick={e => { e.preventDefault(); onOpen(); }}>انتخاب تصویر</Button>}
      open={open} onClose={onClose}>
      <Modal.Content>
        <FilePicker input={{ onChange: setFile }} />
        <Button type='submit' color='green' icon labelPosition="left"
          disabled={!file} onClick={onSubmit} loading={submitting}>
          <Icon name='check' />
          ذخیره
      </Button>
      </Modal.Content>
    </Modal>
    {!!value ? <Image src={`${config.server_url}storage/${value}`} /> : null}
  </div>;
}

function saveFile(file, path) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);
  return API.post("files", formData);
}

function deleteFile(url) {
  return API.delete("files", { data: { path: url } });
}
