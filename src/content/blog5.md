---
title: How I Built a DIY Webcam with My Android Phone and Laptop
subtitle: Turning an Android phone into a local webcam server with CameraX and a lightweight embedded stream endpoint.
date: 2026-05-30
author: Marzukh Akib Asjad
slug: diy-webcam-android-phone-laptop
description: A practical breakdown of building an Android-based DIY webcam using CameraX, runtime permissions, and local HTTP streaming.
coverImage: /blog5/day-cover.jpg
featured: false
draft: false
sortOrder: 5
tags:
  - android
  - build-in-public
  - server
---

### Motive

I am **really** attracted to shiny and glowy objects. So when I saw the ASUS ROG G14 with the crazy backlid animation, I did not hesitate at all to buy it during the first year of college. It was only after turning it on did I realise that it did not have a webcam.

![My father did ask why my laptop has a disco on the back{width: w-75}](/blog5/rog-backlid-anime-matrix.jpg)

So when I announed that I would create a 30 day series of building-in-public on LinkedIn, I realised I had no webcam on my laptop. So for the first project, I decided to turn my phone's camera into a webcam for my laptop.

The idea was straightforward. My laptop would make a request to an application running on my phone, the phone would open its camera, and the latest footage would be streamed back to the laptop. That meant I needed a small Android application (owning an Android phone really came to clutch) that could both access the camera and expose an HTTP endpoint inside the app itself.

### Architecture

To get started, I set up an Android project in Android Studio and looked into how camera access works in modern Android apps. Last I worked with Android was back in the 3rd year of my college, so it has been some time. After researching for a while, I found the two horsemen that would serve my android app's purpose. **CameraX** for camera related shenanigans and **Ktor** for hosting an embedded server within the app.

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

Once the basic direction was clear, the architecture became much easier to reason about. The app needed camera-related dependencies, the right permissions, a main activity to initialize things, and a small routing layer for the server endpoints. In the main activity, the plan was to create a startCamera() flow that opens the camera and keeps track of the most recent frame available for streaming.

I separated the server routing into its own file and defined two endpoints. One route was just a simple root path to confirm that the embedded server was running, and the other was a /stream endpoint responsible for returning the actual footage. That split made the app easier to debug because I could test server health separately from camera streaming.

One of the early design decisions was to avoid sending every possible frame continuously. Streaming everything as fast as possible would put unnecessary pressure on the phone’s CPU, so I focused on returning the latest frame at a small interval instead. In the transcript, that interval was set to around 30 milliseconds, which roughly targets 30 FPS while keeping the implementation lightweight enough for a simple DIY setup.

To make the app practical to use, I added logging and a way to surface the phone’s current IP address on startup. That mattered because the laptop needed to know exactly which local IP and port to hit in order to talk to the app, and the transcript shows testing against port 8080. Small visibility improvements like this often save more debugging time than people expect.

The first test was encouraging but incomplete. The root endpoint responded correctly, which confirmed that the server itself was alive, but the /stream endpoint did not work at first. That is usually the phase where a project stops feeling like a neat idea and starts becoming a real engineering task.

The fix came from checking the logs and reviewing the setup more carefully. One issue was that the streaming delay had not actually been added yet, and another was that camera permissions needed to be requested explicitly at runtime. After adding the delay and handling permissions properly, the application reopened with the correct permission prompt and the stream finally started returning footage successfully.

That moment was the payoff. The Android phone was now acting like a small local webcam server, and the laptop could request the stream and receive live camera output back from the phone. From there, the next steps were packaging the app into an APK and uploading the source code so others could inspect the implementation for themselves.

What I like most about this project is that it sits in a sweet spot between fun and practical. It solves a real problem, but it also forces you to think about architecture, permissions, resource usage, and debugging on a real device. Projects like this are a good reminder that even a simple tool can become a great learning exercise when you build it end to end.

Optional ending
You can end the post with a short closing like this:

This project started as a workaround for a missing webcam, but it quickly became a fun way to combine Android camera handling with lightweight local streaming. The final version is simple, usable, and a good foundation for future improvements like better frame encoding, multi-device support, or lower-latency transport.
