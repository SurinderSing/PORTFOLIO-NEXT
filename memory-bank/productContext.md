# Memory Bank - Product Context

## User Experience Goals
We want the user to be wowed at first glance by the design, speed, and clean typography:
- **Fast Load Speed:** Highly optimized fonts (`next/font`), lightweight Framer Motion transitions, and Next.js static component routing ensure sub-second loads.
- **High Visual Contrast:** Curated theme variations mapping HSL color spaces smoothly. Support for system dark/light overrides.
- **Engagement Details:** Interactive project highlight badges, hover actions (`nav-btn-hover`), and scroll reveals that provide a highly responsive feel.

---

## Key Core Interfaces

### 1. Root Portal Page (`/`)
- Professional summary paragraph explaining Surinder's developer track.
- A "What I do!" grid showcasing six core expertise cards:
  1. Frontend Development
  2. Full-Stack Development
  3. AI Tools
  4. Team Leadership & Mentoring
  5. Performance Optimization
  6. Communication & Problem Solving

### 2. Resume Screen (`/resume`)
- Timeline split into two primary tracks:
  - **Education:** BCA Bachelor degree (2022-2023), Computer Science Diploma (2018-2021), and High School (2018).
  - **Experience:**
    - Frontend Developer at Gimmefy AI (12/2023 - Present)
    - Frontend Developer at Collaberus Technologies (06/2022 - 10/2023)
    - Frontend & Technical Associate at Drishti IAS (10/2021 - 06/2022)
- Categorized skills layout with badge items (Frontend Skills, Component Libraries, Additional Tools, Backend, and Soft Skills).

### 3. Portfolio Showcase (`/work`)
- High-fidelity visual cards showcasing four core projects:
  - **Gimmefy AI:** Automated AI marketing assistant tool (React, Mantine, Redux).
  - **Dialmantra Dialer:** Contact center VoIP solution (React, Redux, JSSIP, AntD).
  - **Amotus Online:** Remote screen-sharing tool (React, Node, Mongo, Express).
  - **Drishti IAS Website:** Educational website frontend (HTML, CSS, JS).
- A prompt section directing visitors to explore more projects on Surinder's GitHub profile.

### 4. Contact Form (`/contact`)
- Integration with Formspree for handling form submissions safely without active server-side SMTP endpoints.
- Client validation checks (Name, Email, Message) using standard HTML5 input validations.
- Success confirmation banner upon form completion.
