import React, { useEffect } from "react";
import { connect } from "react-redux";
import { home, trophy, logIn, settings } from "ionicons/icons";

import Page from "src/widgets/Page";
import ImageSlide from "src/widgets/ImageSlide";
import Button from "src/widgets/Button";
import MultiCol from "src/widgets/MultiCol";
import { newsSelector, fetchNewsRequest } from "src/state/news";
import { AppState } from "src/state";

// import Dev from "src/components/Dev";

import "src/i18n";
import config from "src/app.config.json";

export function Home({ news, fetchNews }: IHome) {
  useEffect(() => {
    if (!!fetchNews) fetchNews();
  }, []);
  return (
    <Page title="Welcome to Riddles" showBack={false}>
      {!!news && (
        <ImageSlide
          images={news.map(n => `${config.base_url}/storage/${n.image}`)}
        />
      )}

      <Button text="Level" fluid link href="/level_list" />
      <Button text="Daily" fluid link href="/daily" />
      <Button text="Weekly" fluid link href="/weekly" />

      <MultiCol
        cols={[
          <Button icon={home} link href="/home" />,
          <Button icon={trophy} link href="/leaderboard" />,
          <Button icon={logIn} link href="/auth" />,
          <Button icon={settings} link href="/settings" />
        ]}
      />

      {/* <Dev /> */}
    </Page>
  );
}

interface IHome {
  news?: News[];
  fetchNews?: () => void;
}

const props = (state: AppState) => ({ news: newsSelector(state) });
const actions = { fetchNews: fetchNewsRequest };

export default connect(props, actions)(Home);
