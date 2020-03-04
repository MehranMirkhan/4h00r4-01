import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Page from "src/widgets/Page";
import useAsync from "src/tools/useAsync";
import api from "src/api";

export default function() {
  const { t } = useTranslation();

  // Data
  const { call, response } = useAsync();
  useEffect(() => {
    call(() => api.users.getLeaderboard());
  }, [call]);

  return (
    <Page title={t("Leader Board")} showBack={true}>
      {response && <LeaderBoard data={response.data} />}
    </Page>
  );
}

function LeaderBoard({ data }: { data: LeaderBoardResponse }) {
  return <div>{JSON.stringify(data)}</div>;
}
