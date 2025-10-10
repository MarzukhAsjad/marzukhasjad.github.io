## B2C success is about customer convenience

#### B2C success hinges on customer convenience: seamless WhatsApp AI chat, quick on-boarding, and precise guidance driving rapid 3k+ user growth in 3 months.

![Just how much does convenience play a role in B2C success?](/blog2/convenience_affects_b2c.png)

As the co-founder of an ed-tech startup, I’ve seen firsthand how focusing on customers’ convenience drives success in the B2C (Business to Consumers) space. It really surprised me that nowadays, no one wants to go to a website, click a link, download an app, create their profile on the app, sign up through an external auth provider, be rerouted back to the website to pay, do 10 other steps to be finally onboarded onto the app. So sadly, we had to settle for something simpler and more convenient.

We decided to deliver our SaaS over WhatsApp and packed it with features such as AI chat, sending voice recordings or images, receiving image-based responses, while providing payment processing, all via WhatsApp Business API, without needing app downloads or different rerouting. Why WhatsApp, an existing app that almost everyone in our target customer base has downloaded, and why not create a new iOS & Android app, developed with React Native/Flutter, a polished and animated dashboard, and publish it on the App store with thousands of dollars of investment? This article will focus on why we preferred convenience for customers (and coincidentally for developers too) as one of the main factors in creating our SaaS.

![With $0 in our bank accounts, this was a very difficult choice{width: w-100}](/blog2/difficult_choice.png)

I made a serious bold title, so we need to quantify **success** here. Hence, for the sake of this blog, success for our product is quantified as number of users, for which we were actually able to get **3000+ within 10 days of launch**, with some even being repeated paid customers.

### Analysing customer demands and their focus

We first had to analyse our customers, the high school students who would sit for their HKDSE Examination (A national-level examination for all final year secondary school students, whose results can also be used for university admission). The following describes them well:

1. Last year of school, they want to focus entirely on their studies and just graduate and move on to the next stage of their life ASAP (poor kids, who’s going to tell them that those are the easier days of their life).
2. They are ambitious, targetting the top universities in Hong Kong.
3. They have the upcoming HKDSE exams, and they will not be distracted (or so they desire).
4. At the same time, they literally do not have any time to prepare or research for the subsequent university selection program. 3 days is all they have to select their universities when the results come out.
5. They need accurate and credible information backed results.
6. Very limited money unless they already founded a VC backed B2B pre-revenue AI SaaS product.

With the factors we have, using a survey, we can now accurately gauge which of these is more important. We however eyeballed this and came to the following comparison (see Venn Diagram below):

![Venn Diagram showing intersection of Convenience, Price and Accuracy{width: w-100}](/blog2/venn_diagram.webp)

We decided to focus on this intersection, by giving more focus on convenience and accuracy, rather than price, since in the early stages of a B2C product, number of users (with some revenue) can determine the effectiveness of our product in the market.

### Our Implementation

##### Focus on Convenience

We made everything seamless through WhatsApp, from sign-up and bot interactions to multimedia exchanges and event payments (partially inside WhatsApp), thus, eliminating the need for links, apps, or extensive tutorials. WhatsApp Business API was our delivery platform, which also supports [WhatsApp Flows](https://business.whatsapp.com/products/whatsapp-flows) for interactive Forms and Elements, thus helping us deliver interactive information rather than just plain boring text messages. This not only made it convenient for users but also for our developers to build the system. Since you can’t use `VC` to spell `B`-`O`-`O`-`T`-`S`-`T`-`R`-`A`-`P`-`P`-`E`-`D`, we had to compromise here and stick to WhatsApp Business API and not opt for full-fledged React Native mobile apps for our SaaS.

##### Focus on Accuracy

We invested heavily in our Agentic AI for top-notch reliability (shoutout to my co-founder Jacky for bringing the AI system to life) that ensures students get trustworthy guidance on university selections based on their DSE grades, preferences and skills. The AI is responsible for calculating weighted scores, querying factual information from our database and making relevant recommendations. Since time was of the essence, we decided to focus mainly on university admissions assistance first to produce more accurate results in that area.

##### Emphasis on Price (Affordability)

Let’s be real, high school students have limited disposable income. We revamped our pricing model into small, convenient top-up packages that better fit their budgets. Admittedly, we would’ve liked to make some profit here, but we decided to prioritise expanding our user base and thus better penetrate the market.

Circling back to convenience, we tried our best to offer a majority of the payment process within WhatsApp (check screenshots below) but we offloaded the payment collection process to AirWallex, mainly for security compliance and lack of time.

![Payment in WhatsApp Flows, all internal, with the exception of customer’s payment information being submitted externally via AirWallex for security compliance.{width: w-150}](/blog2/screenshots.webp)

Marketing kicked off before the product launch to build our audience via platforms like Threads where their goofy ahh algorithm really helped us big time to connect to our audience, then subtly shifted post-release to highlight the product, ramping up leads gradually. Kudos to our CEO and marketing team for timing it perfectly.

### Key Lessons

In B2C, success depends on blending user benefits with convenience, customised for the market. I have to agree though that our timing and WhatsApp chatbot integration convenience gave us a huge advantage, making the onboarding process very simple for users, thereby leading to the establishment of a huge user base.

We also tried to spin off a B2B (Business to Business) business model with our existing strategy but failed miserably. In another post, I’ll dive deeper into how and why B2B sales did **_NOT_** work with the same strategy.

In the future, I’ll follow up with a dedicated tech focused post on how we built and delivered this SaaS entirely via WhatsApp
