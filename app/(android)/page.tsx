"use client";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import LargeButton from "@/components/large-button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  interfaceFunctionName: z.string().min(1, {
    message: "자바스크립트 인터페이스 함수 이름을 입력해주세요."
  }),
});

const AndroidPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interfaceFunctionName: "",
    },
  });

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      // Android WebView에서 호출할 함수 이름
      const functionName = values.interfaceFunctionName;

      // Android WebView에서 JavaScript 함수 호출
      if (window.android && typeof window.android[functionName] === "function") {
        window.android[functionName]();
      } else {
        toast.error(`${functionName} 함수를 찾을 수 없습니다.`)
      }

      toast.success("Success commnad")
    } catch {
      toast.error("Something went to wrong.")
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="interfaceFunctionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Javascript Interface Function Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="someJavascriptInterface"
                      className="text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="lg"
              type="submit"
            >
              자바스크립트 인터페이스 직접 실행
            </Button>
          </div>
        </form>
      </Form>

      <Separator />

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