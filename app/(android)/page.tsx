"use client";

import LargeButton from "@/components/large-button";
import { toast } from "sonner";

const AndroidPage = () => {
  const onClickClose = () => {
    
    try {
      window.android.close();
      toast.success("Success")
    } catch {
      toast.error("Something went to wrong.")
    }
  }

  const onClickKinesisLog = () => {
    try {
      const jsonData = JSON.stringify({
        "name": "smaple",
        "webview": {
          "project": "test",
          "name": "payment test"
        }
      });
  
      window.android.kinesisLog(jsonData);
      toast.success("Success")
    } catch {
      toast.error("Something went to wrong.")
    }
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