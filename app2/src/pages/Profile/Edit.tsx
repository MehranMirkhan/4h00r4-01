import React, { useState } from "react";
import { connect } from "react-redux";
import { IonList } from "@ionic/react";

import Page from "src/widgets/Page";
import Input from "src/widgets/Input";
import Button from "src/widgets/Button";
import { AppState } from "src/state";
import { authMeSelector, updateMeReq } from "src/state/auth";

export function Edit({ me = {}, onSubmit }: IEdit) {
  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);

  return (
    <Page title={"Edit"} showBack={true}>
      <IonList>
        <Input
          label="Name"
          type="text"
          value={name || ""}
          placeholder={me.name}
          onChange={setName}
        />
        <Input
          label="Email"
          type="email"
          value={email || ""}
          placeholder={me.email}
          onChange={setEmail}
        />
      </IonList>
      <div>
        <Button
          text="Submit"
          type="submit"
          color="success"
          onClick={() => onSubmit(name, email)}
        />
      </div>
    </Page>
  );
}

interface IEdit {
  me?: Partial<User>;
  onSubmit: (name?: string, email?: string) => void;
}

const props = (state: AppState) => ({
  me: authMeSelector(state)
});

const actions = {
  onSubmit: (name?: string, email?: string) => updateMeReq({ name, email })
};

export default connect(props, actions)(Edit);
