import React from "react";
import { connect } from "react-redux";
import { home, trophy, logIn, settings } from "ionicons/icons";

import Page from "src/widgets/Page";
import ImageSlide from "src/widgets/ImageSlide";
import Button from "src/widgets/Button";
import MultiCol from "src/widgets/MultiCol";
import { newsSelector } from "src/state/news";
import { AppState } from "src/state";

export function Home({ news }: IHome) {
  return (
    <Page title="Welcome to Riddles" showBack={false}>
      {!!news && <ImageSlide images={news.map(n => n.img)} />}

      <Button text="Level" fluid link href="/level_list" />
      <Button text="Daily" fluid link href="/daily_list" />
      <Button text="Weekly" fluid link href="/weekly_list" />

      <MultiCol
        cols={[
          <Button icon={home} link href="/home" />,
          <Button icon={trophy} link href="/leaderboard" />,
          <Button icon={logIn} link href="/auth" />,
          <Button icon={settings} link href="/settings" />
        ]}
      />
    </Page>
  );
}

interface IHome {
  news?: News[];
}

const mapStateToProps = (state: AppState) => ({ news: newsSelector(state) });

export default connect(mapStateToProps)(Home);
