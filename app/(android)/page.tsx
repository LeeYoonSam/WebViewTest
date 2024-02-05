"use client";

import LargeButton from "@/components/large-button";

const AndroidPage = () => {
  const onClickClose = () => {
    window.android.close();
  }

  const onClickKinesisLog = () => {
    const jsonData = JSON.stringify({
      "name": "smaple",
      "webview": {
        "project": "test",
        "name": "payment test"
      }
    });

    window.android.kinesisLog(jsonData);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <LargeButton
        title="웹뷰 닫기 호출"
        onClickAction={onClickClose}
      />

      <LargeButton
        title="Kinesis 로그 남기기 테스트"
        onClickAction={onClickKinesisLog}
      />
    </div>
  );
}

export default AndroidPage;