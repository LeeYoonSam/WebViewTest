# WebView 테스트용

**기술 스택**
- Next.Js 14
- typescript
- shadcn-ui

## 실행 방법
1. 로컬 호스트 구동
- `npm run dev`

2. 다른 곳에서 웹 페이지를 실행 가능하도록 ngrok 으로 public url 만들기
- `ngrok http 3000`

```bash
Build better APIs with ngrok. Early access: ngrok.com/early-access                                                                                                                                                                         

.
.
.

Forwarding                    https://908a-106-240-234-98.ngrok-free.app -> http://localhost:3000  
```
- Forwarding 에 나와 있는 `https://908a-106-240-234-98.ngrok-free.app` url 로 접속


## [안드로이드 웹뷰 자바스크립트 인터페이스 테스트](./app/(android)/page.tsx)
- 안드로이드 프로젝트에서 WebView 를 사용하는 곳의 URL(Forwarding 으로 나온 url)을 변경
- 테스트 하고 싶은 인터페이스를 등록해서 테스트

### 안드로이드 인터페이스 등록
```kotlin
val webView: WebView
CommonJavascriptInterface(activity, webView)
webView.addJavascriptInterface(javascriptInterface, "android")
```

```kotlin
class CommonJavascriptInterface(
    private val activity: Activity,
    private val webView: WebView,
) {
    @JavascriptInterface
    fun callSomeJavascriptInterface() {
        activity.runOnUiThread {
          // some work
        }
    }
}
```

### 테스트 웹뷰 구현
```tsx
const onClickSomeInterface = () => {
  window.android.callSomeJavascriptInterface();
}
```
- `window.등록이름.인터페이스함수명()` 의 형태로 호출
- webView.addJavascriptInterface(javascriptInterface, "android") 인터페이스 등록시 사용한 `android`
- @JavascriptInterface fun callSomeJavascriptInterface() 에서 추가한 `callSomeJavascriptInterface()`
