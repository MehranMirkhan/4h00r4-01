import React from "react";
import { connect } from "react-redux";
import { IonList, IonItem } from "@ionic/react";

import Page from "src/widgets/Page";
import SelectOne from "src/widgets/SelectOne";
import { AppState } from "src/state";
import { langSelector, setLang } from "src/state/settings";

export function Settings({ lang, setLang }: ISettings) {
  return (
    <Page title={"Settings"} showBack={true}>
      <IonList>
        <IonItem>
          <SelectOne
            label={"Language"}
            value={lang}
            options={[
              { name: "English", value: "en" },
              { name: "فارسی", value: "fa" }
            ]}
            onChange={setLang}
          />
        </IonItem>
      </IonList>
    </Page>
  );
}

interface ISettings {
  lang?: string;
  setLang?: (lang: string) => void;
}

const props = (state: AppState) => ({ lang: langSelector(state) });
const actions = { setLang };

export default connect(props, actions)(Settings);
