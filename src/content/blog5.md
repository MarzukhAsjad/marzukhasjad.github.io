---
title: How I Built a DIY Webcam with My Android Phone and Laptop
subtitle: Turning an Android phone into a local webcam server with CameraX and a lightweight embedded stream endpoint.
date: 2026-05-30
author: Marzukh Akib Asjad
slug: diy-webcam-android-phone-laptop
description: I am really attracted to shiny and glowy objects. So when I saw the ASUS ROG G14 with the crazy backlit animation, I did not hesitate at all to buy it during the first year of college. It was only after turning it on that I realised it did not have a webcam.
coverImage: /blog5/day1-cover.jpg
featured: false
draft: false
sortOrder: 5
tags:
  - android
  - build-in-public
  - server
---

### Motive

I am **really** attracted to shiny and glowy objects. So when I saw the ASUS ROG G14 with the crazy backlit animation, I did not hesitate at all to buy it during the first year of college. It was only after turning it on that I realised it did not have a webcam.

![My father did ask why my laptop has a disco on the back{width: w-75}](/blog5/rog-backlid-anime-matrix.jpg)

So when I announced that I would create a 30-day build-in-public series on LinkedIn, I realised I had no webcam on my laptop. So for the first project, I decided to turn my phone's camera into a webcam for my laptop.

The idea was straightforward. My laptop would make a request to an application running on my phone, the phone would open its camera, and the latest footage would be streamed back to the laptop. That meant I needed a small Android application (owning an Android phone really came in clutch) that could both access the camera and expose an HTTP endpoint inside the app itself.

### Architecture

To get started, I set up an Android project in Android Studio and looked into how camera access works in modern Android apps. The last time I worked with Android was back in the 3rd year of my college, so it has been some time. After researching for a while, I found the two horsemen that would serve my Android app's purpose. **CameraX** for camera-related shenanigans and **Ktor** for hosting an embedded server within the app.

```mermaid
flowchart RL
  phone["Phone<br>(CameraX + Ktor)"]
  wifi(("Wi‑Fi"))
  laptop["Laptop<br>(Python client → virtual webcam)"]

  phone -->|"MJPEG stream<br>GET :8080/stream"| wifi --> laptop

  classDef phone fill:#0f172a,stroke:#38bdf8,color:#e2e8f0,stroke-width:2px;
  classDef wifi fill:#fef3c7,stroke:#f97316,color:#111827,stroke-width:2px;
  classDef laptop fill:#14532d,stroke:#34d399,color:#ecfdf5,stroke-width:2px;

  class phone phone;
  class wifi wifi;
  class laptop laptop;
```

### Implementation

The following dependencies and permissions had to be explicitly added to the `build.gradle.kts` and `AndroidManifest.xml` files, respectively.

```kts
    implementation(libs.androidx.camera.core)
    implementation(libs.androidx.camera.camera2)
    implementation(libs.androidx.camera.lifecycle)
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.server.cio)
```

```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
```

One of the early design decisions was to avoid sending every possible frame continuously. Streaming everything as fast as possible would put unnecessary pressure on the phone’s CPU, so I focused on returning the latest frame at a small interval instead. That interval was set to around 30 milliseconds, which roughly targets 30 FPS while keeping the implementation lightweight enough for a simple DIY setup.

```kotlin
// MainActivity.kt
    private fun startCamera() {
        val imageAnalysis = ImageAnalysis.Builder()
            // Do not queue every frame. Just keep the newest one.
            .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
            .build()

        imageAnalysis.setAnalyzer(cameraExecutor) { image ->
            image.use {
                // Take the camera frame and turn it into a bitmap.
                val bitmap = image.toBitmap()

                // Compress that bitmap into JPEG bytes.
                val stream = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.JPEG, 80, stream)

                // Store the latest frame so the /stream route can send it.
                latestFrame = stream.toByteArray()
            }
        }

        // Connect this analyzer to the front camera so it starts receiving frames.
    }
```

The frame processing logic was implemented using CameraX’s `ImageAnalysis` use case, but to decide how many frames to return, I preferred to do it on the server side instead of the client side.

```kotlin
// MainActivity.kt
    private fun startServer() {
        // start server
        embeddedServer<CIOApplicationEngine, CIOApplicationEngine.Configuration> (CIO, port = 8080, host = "0.0.0.0") {
            configureRouting { latestFrame } // Routing configuration done on a different file for better readability
        }.start(wait = false)
    }
```

The routing configuration was straightforward. The root endpoint was a simple health check that returned a "Webcam server is running" message, and the `/stream` endpoint returned the latest camera footage as an MJPEG stream. The streaming endpoint was implemented using Ktor’s CIO engine, which allowed for efficient handling of HTTP requests and responses directly within the Android app.

```kotlin
// WebcamRouting.kt

fun Application.configureRouting(latestFrame: () -> ByteArray?) {
    routing {
        get("/stream") {
            // Keep sending the latest JPEG frame as an MJPEG response.
            call.respondOutputStream(
                ContentType.parse("multipart/x-mixed-replace; boundary=frame")
            ) {
                while (true) {
                    val frame = latestFrame()

                    if (frame != null) {
                        // Write the multipart headers for this frame.
                        ... write(headers)
                        // Write the actual JPEG bytes.
                        ... write(frame)
                        flush()
                    }

                    // Small delay so the app sends frames steadily instead of too aggressively.
                    delay(30)
                }
            }
        }

        get("/") {
            call.respondText("Webcam server running")
        }
    }
}
```

### Testing and Debugging

Testing on my phone was just downright painful. I know most Android developers would laugh at this, but wow, it took me forever to find the developer options. After looking up online, I learned that I would have to tap a certain build setting on the phone 7 times to turn on the developer options.

![Me trying to find the "developer options" without knowing I had to activate it first{width: w-100}](/blog5/looking-through-settings-be-like.gif)

After building it and running it, the root endpoint responded correctly, which confirmed that the server itself was alive, but the `/stream` endpoint did not work. This is the moment where I realised having logs would have been a great help. I did try to hand it off to some LLMs to help me debug, but it was hard to describe the issue without logs, and I also did not want to spend the time to set up a proper logging system within the app. Turns out, Logcat is really helpful and easy to use for debugging Android apps, and I should have used it from the start. So after setting up some Logcat logs to check if the camera was working properly, I found out that the camera was not even opening.

The issue was that camera permissions needed to be requested explicitly at runtime. After handling permissions properly, the application reopened with the correct permission prompt and the stream finally started returning footage successfully.

![Explicitly asking the phone for camera permissions at runtime was the missing piece of the puzzle{width: w-100}](/blog5/check-for-permission.png)

![The stream finally started working after handling permissions properly (that's me lol){width: w-100}](/blog5/works-now.png)

That moment was the payoff. The Android phone was now acting like a small local webcam server, and the laptop could request the stream and receive live camera output back from the phone. I made sure to upload the source code to a public [GitHub repository](https://github.com/MarzukhAsjad/diy-webcam) for anyone interested in trying it out or building on it.

### Security and Potential Improvements

This app is a security nightmare, so I would not recommend using it on any network that you do not trust. The server is open to anyone on the same Wi-Fi network, and there is no authentication or encryption in place. For a more secure implementation, you could add authentication mechanisms, encrypt the stream, or even implement a more robust streaming protocol. Additionally, the current implementation is quite basic and could be improved in several ways. For example, you could optimize the frame encoding to reduce latency, add support for multiple cameras or devices, or implement a more efficient streaming protocol like WebRTC for better performance. Will I work on these improvements? Probably not, but if you are interested in building on this project, feel free to fork the repository and experiment with different features and optimizations.

### Conclusion

Overall, this project was a fun and educational experience that allowed me to explore Android development, camera access, and embedded server hosting. If you have an old Android phone lying around and want to turn it into a DIY webcam, this project is a great starting point. You can check out my YouTube video [here](https://www.youtube.com/watch?v=_Iqa9tep-5c) and subscribe to my channel for future updates. I will probably not work with an Android project anytime soon. The next few projects will definitely be limited to what I can build on my laptop. Stay tuned for the next one!