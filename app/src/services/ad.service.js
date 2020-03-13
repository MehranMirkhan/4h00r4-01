import tapsell from "tapsell-v3-cordova-plugin/www/tapsell";

import { tapsell as tapsellConfig } from "src/app.config.json";

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
      onError("As is not available");
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
