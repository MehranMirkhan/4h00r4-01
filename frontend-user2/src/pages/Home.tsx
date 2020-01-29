import React from "react";

import Page from "src/widgets/Page";
import { useTranslation } from "react-i18next";

export default function() {
  const { t } = useTranslation();
  const title = t("Welcome to Puzzles");
  return (
    <Page title={title} showBack={false}>
      <div>home</div>
    </Page>
  );
}
