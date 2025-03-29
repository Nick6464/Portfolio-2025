# My Portfolio

Welcome to my portfolio! This repository showcases my work, interests, and some of my public projects.

This portfolio website is based on a template created by Payton, which can be found [here](https://github.com/paytonjewell/ReactPortfolioTemplate). I've customized and improved upon the original template to suit my preferences and showcase my skills.

---

## Features

- **Hosting:** The site is hosted using an Amplify web app, with DNS hosted Route 53.
- **Deployment:** Deployment is handled using GitHub actions.
- **Mockup Images:** I generate mockup images using [Pixeltrue](https://mockups.pixeltrue.com/).

---

## Background

One of the most significant additions to my portfolio is the background. I utilized Three.js and React Three Fiber (R3F) for this purpose. While it was my first experience with these libraries, my background in 3D work from my university days provided a good foundation.

I hadn't worked on 3D modeling since my university project, where I created a Ray Tracing Scene in C++. For the planet model, I followed a tutorial and converted the file to a format compatible with Three.js.

The goal was to have a slowly spinning planet, partially off the page, as demonstrated below:

![Planet Half Demo](https://github.com/Nick6464/Portfolio/blob/master/src/img/planetHalfDemo.png)

Once I had the initial model rendering, I adjusted its size and position to achieve the desired effect. To enhance the dark mode, I added stars to the canvas, creating a sky-like appearance.

I noticed the planet's rotation rate was tied to the framerate, resulting in varied speeds across different monitors. To rectify this, I linked the rotation to time rather than framerate, ensuring consistency across platforms. Additionally, I adjusted the light mode background color to a sky blue, complementing the aesthetic.

---

## Terminal Consistency

The terminal window styling stood out to me, so I implemented it wherever a box was used. This included the Home page with my information and the Projects page. Some modifications were necessary to ensure the terminal could handle images and other components, not just text.

---

These changes brought the entire site together, creating an immersive experience that, in my opinion, better represents my skills and unique style compared to the original template.

---
