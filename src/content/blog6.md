---
title: How I Recreated the Dolly Zoom Effect on a Static Image with OpenCV
subtitle: Freezing the subject while shrinking the world using segmentation masks, affine transforms, and frame interpolation.
date: 2026-06-02
author: Marzukh Akib Asjad
slug: dolly-zoom-on-static-image-opencv
description: I wanted to recreate that classic dolly zoom feeling without a moving camera, using just one image. This post walks through the full computer vision pipeline I used, from bounding boxes to masks to GIF generation.
coverImage: /blog6/day2-cover.jpg
featured: false
draft: false
sortOrder: 6
tags:
  - computer-vision
  - cinematography
  - build-in-public
---

### Motive

You know that movie shot where the subject looks locked in place while the entire world stretches or collapses behind them? That is the dolly zoom effect, and it looks mildly illegal when done right.

I wanted to see if I could fake that effect with a **single static image**.

At first that sounds impossible, because no camera is moving. But if you break it down visually, the trick is actually straightforward:

1. Keep the subject fixed in the same position and size.
2. Scale the background in or out around a center point.

I used OpenCV in a notebook for the full pipeline, then generated a sequence of frames and stitched them into a GIF. This was Day 2 of my build-in-public streak, and it turned into a very fun mix of geometry, masks, and small debugging pain.

### Architecture

I approached this in two phases.

First, I used a toy image with a red rectangle to validate the math and coordinate logic. That helped me verify I could keep the boxed subject in place while shrinking the background.

Then I switched to a real image and upgraded the pipeline with person detection + instance segmentation so I could isolate an actual human subject.

```mermaid
flowchart LR
	A[Input Static Image] --> B[Detect Subject Region]
	B --> C[Extract Subject Mask]
	C --> D[Scale Background Around Subject Center]
	D --> E[Alpha Blend Subject Over Scaled Background]
	E --> F[Crop Common Valid Region]
	F --> G[Generate Multi-Scale Frames]
	G --> H[Export GIF]

	classDef block fill:#0b1020,stroke:#22c55e,color:#ecfeff,stroke-width:2px;
	class A,B,C,D,E,F,G,H block;
```

### Implementation

The first pass was intentionally simple. I loaded a basic image and isolated a red boundary box using color channel subtraction:

```python
b, g, r = cv2.split(img)
red_signal = cv2.subtract(cv2.subtract(r, g), b)
_, mask = cv2.threshold(red_signal, 50, 255, cv2.THRESH_BINARY)
```

Then I found contours, grabbed the largest red object, and extracted its bounding coordinates. That gave me a reliable ROI to test transformations:

```python
cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
largest_cnt = max(cnts, key=cv2.contourArea)
x, y, w, h = cv2.boundingRect(largest_cnt)
```

I plotted those points with Matplotlib (with axes visible) so I could verify pixel alignment while scaling. This was crucial, because early on I made the classic mistake: scaling happened around the top-left origin instead of the image center.

Once I corrected that, I moved to a real photo and built a more practical version.

For subject localization, I started with a pre-trained MobileNet-SSD model in OpenCV DNN to get a person box. Then for clean subject cutout, I used a pre-trained Mask R-CNN model and extracted the person mask.

```python
model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
model.eval()

with torch.no_grad():
		prediction = model([img_tensor])
```

After getting the mask, the core composition step was:

1. Compute subject center from mask pixels.
2. Affine-scale the whole background around that center.
3. Alpha blend the original subject over the scaled background.

```python
M = cv2.getRotationMatrix2D((center_x, center_y), 0, scale)
scaled_bg = cv2.warpAffine(original_cv2, M, (w, h), borderValue=(255, 255, 255))

blended = (foreground * mask_3ch) + (background * (1.0 - mask_3ch))
final_composition = blended.astype(np.uint8)
```

Then came the animation part. I generated around 30 scale values from 1.0 to 0.7, repeated the composition process for each scale, and stored each frame.

```python
num_frames = 30
scales = np.linspace(1.0, 0.7, num_frames)
```

Finally, I converted BGR frames to RGB and exported a looping GIF with `imageio`.

### Testing and Debugging

This was one of those projects where each stage looked "kind of right" until you inspected it closely.

The first weird result looked like the background was shrinking but drifting diagonally. That turned out to be a transformation-origin bug. Fixing center-based scaling made the effect immediately more believable.

The second issue was edge artifacts and blank margins. Since scaling down reveals empty border areas, I computed transformed corner coordinates and cropped to a valid common region across frames so the animation stays clean.

I also noticed slight translucency around the subject boundary in some frames. The mask worked well overall, but softer edges and interpolation artifacts can still show up when blending. That is one of the biggest visual quality levers if I revisit this.

Despite those quirks, the final GIF did produce the illusion I wanted: the subject feels anchored while the environment appears to pull away.

![First successful dolly zoom style GIF generated from static image frames](/blog6/final-dolly-zoom.gif)

### Security and Potential Improvements

No scary network security section this time, but there are still plenty of quality upgrades possible:

1. Use a sharper or refined segmentation mask (matting or edge refinement) to reduce halo artifacts.
2. Use easing-based interpolation for scale values instead of linear spacing for smoother perceived motion.
3. Add automatic subject selection when multiple people are present.
4. Turn the notebook into a reusable script/CLI pipeline where input image and frame count are configurable.
5. Export MP4 in addition to GIF for better quality and smaller size.

Also, Mask R-CNN inference is relatively heavy. For lightweight real-time workflows, a faster segmentation model would make more sense.

### Conclusion

This was a satisfying mini-experiment because it combines a cinematic idea with straightforward CV primitives: detection, masking, affine transforms, and blending.

The coolest part for me was realizing the effect is less about "fancy magic" and more about careful coordinate consistency. Keep the subject fixed, manipulate only the world, and your brain does the rest.

If you want to try this yourself, start with one image and one subject, get the alignment right, and only then worry about polishing masks and animation smoothness. The first good-looking result arrives faster than expected.

You can also watch the devlog version of this build for the full step-by-step narrative from rough prototype to final GIF.
