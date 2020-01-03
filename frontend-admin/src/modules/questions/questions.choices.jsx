import React, { useState } from 'react';
import { Form, Input, Button, Icon, Image, Segment, Modal } from 'semantic-ui-react';

import { FilePicker } from 'src/components/FormFields';

import { API } from 'src/redux/store_config';
import config from 'src/app.config.json';


export const ChoicesField = ({ input, meta, children, path, ...props }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const values = !!input.value ? JSON.parse(input.value) : [];
  const N = !!values ? values.length : 0;

  // =============  CHOICE MODAL  =============
  const ChoiceModal = () => {
    const [obj, setObj] = useState({ type: "text", value: null });
    const [submitting, setSubmitting] = useState(false);
    const onSubmit = () => {
      if (obj.type === "text") {
        values.push({ type: "text", value: "" });
        input.onChange(JSON.stringify(values));
        onClose();
      } else {
        setSubmitting(true);
        saveFile(obj.value, "q_img")
          .then(res => {
            if (!res) return;
            values.push({ type: "image", value: res.data.relative_path });
            input.onChange(JSON.stringify(values));
            onClose();
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    };
    return <>
      <Form.Dropdown selection options={[
        { key: "text", text: "متنی", value: "text" },
        { key: "image", text: "تصویری", value: "image" },
      ]}
        value={obj.type}
        onChange={(e, { value }) => setObj({ type: value, value: null })}
      />
      <div style={{ height: 8 }} />
      {obj.type === "image"
        ? <FilePicker input={{ onChange: file => setObj({ type: "image", value: file }) }} />
        : null
      }
      <Button type='submit' color='green' icon labelPosition="left"
        disabled={obj.type === "image" && !obj.value}
        onClick={onSubmit} loading={submitting}>
        <Icon name='check' />
        ذخیره
      </Button>
    </>
  };

  let result = [];
  for (let i = 0; i < N; i++)
    result.push(<ChoiceRow key={i} entity={values[i]} index={i} values={values} input={input} />);

  return <>
    <Segment raised attached="top" color="blue" inverted>
      <h4 style={{ display: "inline" }}>{props.label}</h4>
      <Modal trigger={
        <Icon name="add" circular inverted color="green" size="small" onClick={onOpen}
          style={{ cursor: "pointer", float: "left" }} />
      }
        open={open} onClose={onClose}>
        <Modal.Content>
          <ChoiceModal />
        </Modal.Content>
      </Modal>
    </Segment>
    <Segment raised attached="bottom">
      {result}
    </Segment>
  </>;
};

const ChoiceRow = ({ entity, index, values, input }) => <div style={{ margin: "4px 0" }}>
  {entity.type === 'image'
    ? <>
      <Image src={`${config.server_url}storage/${entity.value}`}
        style={{ maxWidth: "90%", display: "inline-block" }} />
      <Icon name="times" color="red" circular inverted style={{ marginRight: 8 }}
        onClick={(e) => {
          e.preventDefault();
          deleteFile(values[index]);
          values.splice(index, 1);
          input.onChange(JSON.stringify(values));
        }} />
    </>
    : <Input fluid value={entity.value}
      onChange={(e, { value }) => {
        values[index].value = value;
        input.onChange(JSON.stringify(values));
      }}
      action={{
        icon: "minus", color: "red", onClick: (e) => {
          e.preventDefault();
          values.splice(index, 1);
          input.onChange(JSON.stringify(values));
        }
      }}
      style={{ marginTop: index > 0 ? 16 : 0 }} />
  }
</div>;


function saveFile(file, path) {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);
  return API.post("files", formData);
}

function deleteFile(url) {
  return API.delete("files", { data: { path: url } });
}
