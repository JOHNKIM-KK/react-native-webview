import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import WebView from 'react-native-webview';

function App(): JSX.Element {
  const webview = useRef<WebView>(null);

  const sendEvent = (len: number, key: string) => {
    webview.current?.injectJavaScript(`
      window.receiveFromNative(${len}, '${key}');
      true;
    `);
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <WebView
        ref={webview}
        applicationNameForUserAgent="MyDcode"
        pullToRefreshEnabled
        source={{ uri: 'https://gynfp8.csb.app' }}
        onMessage={(message) => {
          const { data, key } = JSON.parse(message.nativeEvent.data);
          setTimeout(() => {
            sendEvent(data.length, key); // 2초 후 data의 길이를
          }, 2000);
        }}
      />
    </SafeAreaView>
  );
}

export default App;
