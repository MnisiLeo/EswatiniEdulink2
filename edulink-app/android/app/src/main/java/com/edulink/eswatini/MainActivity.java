package com.edulink.eswatini;

import android.app.Activity;
import android.os.Bundle;
import android.Manifest;
import android.content.pm.PackageManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient.FileChooserParams;
import android.content.Intent;
import android.net.Uri;
import android.provider.MediaStore;
import java.util.List;

import androidx.annotation.Nullable;
import androidx.webkit.WebViewAssetLoader;

public class MainActivity extends Activity {

    private WebView webView;
    private ValueCallback<Uri[]> filePathCallback;
    private Uri cameraOutputUri;
    private static final int FILE_CHOOSER_REQUEST = 4101;
    private static final int CAMERA_PERMISSION_REQUEST = 4102;
    private FileChooserParams pendingChooserParams;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);

        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);

        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);

        settings.setDatabaseEnabled(true);

        WebViewAssetLoader assetLoader =
                new WebViewAssetLoader.Builder()
                        .addPathHandler(
                                "/assets/",
                                new WebViewAssetLoader.AssetsPathHandler(this)
                        )
                        .build();

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = callback;

                try {
                    pendingChooserParams = params;
                    if (params.isCaptureEnabled() && acceptsImage(params.getAcceptTypes()) &&
                            android.os.Build.VERSION.SDK_INT >= 23 &&
                            checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                        requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
                        return true;
                    }
                    launchChooser(params);
                    return true;
                } catch (Exception e) {
                    filePathCallback = null;
                    pendingChooserParams = null;
                    return false;
                }
            }
        });

        webView.setWebViewClient(new WebViewClient() {

            @Override
            public WebResourceResponse shouldInterceptRequest(
                    WebView view,
                    WebResourceRequest request
            ) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(
                    WebView view,
                    String url
            ) {
                return assetLoader.shouldInterceptRequest(
                        android.net.Uri.parse(url)
                );
            }
        });

        // The React/Vite application is placed here by GitHub Actions.
        webView.loadUrl(
                "https://appassets.androidplatform.net/assets/public/index.html"
        );

        setContentView(webView);
    }

    private void launchChooser(FileChooserParams params) {
        if (params.isCaptureEnabled() && acceptsImage(params.getAcceptTypes())) {
            Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            cameraOutputUri = getContentResolver().insert(
                    MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                    new android.content.ContentValues() {{
                        put(MediaStore.Images.Media.DISPLAY_NAME, "EduLink-" + System.currentTimeMillis() + ".jpg");
                        put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
                    }});
            if (cameraOutputUri != null) {
                cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, cameraOutputUri);
                cameraIntent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
                startActivityForResult(cameraIntent, FILE_CHOOSER_REQUEST);
                return;
            }
        }

        Intent picker = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        picker.addCategory(Intent.CATEGORY_OPENABLE);
        picker.setType(resolveMimeType(params.getAcceptTypes()));
        picker.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false);
        startActivityForResult(picker, FILE_CHOOSER_REQUEST);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != CAMERA_PERMISSION_REQUEST) return;
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED &&
                filePathCallback != null && pendingChooserParams != null) {
            try {
                launchChooser(pendingChooserParams);
            } catch (Exception e) {
                filePathCallback.onReceiveValue(null);
                filePathCallback = null;
            }
        } else if (filePathCallback != null) {
            filePathCallback.onReceiveValue(null);
            filePathCallback = null;
        }
        pendingChooserParams = null;
    }

    private boolean acceptsImage(String[] types) {
        if (types == null || types.length == 0) return false;
        for (String type : types) if (type != null && type.toLowerCase().startsWith("image/")) return true;
        return false;
    }

    private String resolveMimeType(String[] types) {
        if (types == null || types.length == 0) return "*/*";
        for (String type : types) {
            if (type == null || type.trim().isEmpty()) continue;
            if (type.contains("/")) return type;
        }
        return "*/*";
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST || filePathCallback == null) return;

        Uri[] results = null;
        if (resultCode == RESULT_OK) {
            if (cameraOutputUri != null) {
                results = new Uri[]{cameraOutputUri};
            } else if (data != null) {
                Uri uri = data.getData();
                if (uri != null) results = new Uri[]{uri};
            }
        } else if (cameraOutputUri != null) {
            try { getContentResolver().delete(cameraOutputUri, null, null); } catch (Exception ignored) {}
        }
        filePathCallback.onReceiveValue(results);
        filePathCallback = null;
        pendingChooserParams = null;
        cameraOutputUri = null;
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.destroy();
        }

        super.onDestroy();
    }
}
