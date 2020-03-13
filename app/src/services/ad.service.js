import tapsell from "tapsell-v3-cordova-plugin/www/tapsell";

import api from "src/api";
import { store } from "src/providers/StateProvider";
import { tapsell as tapsellConfig } from "src/app.config.json";
import { isSuccess } from "src/tools/axiosInstance";
import { fetchMe } from "src/reducers/auth.reducer";

tapsell.initialize(tapsellConfig.key);
tapsell.setDebugMode(tapsellConfig.debug);
tapsell.setAutoHandlePermissions(tapsellConfig.autoHandlePermissions);
tapsell.setMaxAllowedBandwidthUsagePercentage(tapsellConfig.bandwidth);

export function showAd(
  zoneId,
  { onError = e => {}, onOpen = () => {}, onClose = () => {} }
) {
  tapsell.requestAd(zoneId, false, result => {
    if (result["action"] === "onAdAvailable") {
      tapsell.showAd(result["adId"], false, false, 3, true, result2 => {
        if (result2["action"] === "onOpened") onOpen();
        else if (result2["action"] === "onClosed") onClose();
      });
    } else if (result["action"] === "onNoAdAvailable")
      onError("Ad is not available");
    else if (result["action"] === "onNoNetwork") onError("Network Error");
    else if (result["action"] === "onError") onError(result["error"]);
    else if (result["action"] === "onExpiring") onError("As is expired");
  });
}

export function setRewardCallback(onReward) {
  tapsell.setRewardCallback(result => {
    if (result["action"] === "onAdShowFinished")
      if (result["completed"] && result["rewarded"]) onReward();
  });
}

setRewardCallback(() => {
  api.users.adWatched(tapsellConfig.profile_zone_id).then(resp => {
    if (isSuccess(resp)) {
      store.dispatch(fetchMe());
    }
  });
});
