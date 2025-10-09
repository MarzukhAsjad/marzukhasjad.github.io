import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import QuizComponent from "@/components/QuizComponent";

const Blog: React.FC = () => {
  // Function to process markdown content and extract quizzes
  const processContent = (content: string) => {
    const parts: React.ReactElement[] = [];
    const sections = content.split(/\\quiz_start[\s\S]*?\\quiz_end/);
    const quizMatches = content.match(/\\quiz_start[\s\S]*?\\quiz_end/g);

    sections.forEach((section, index) => {
      // Add regular markdown content
      if (section.trim()) {
        parts.push(
          <ReactMarkdown
            key={`content-${index}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-4 text-pink-300 font-serif text-left">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-3 text-green-500 font-mono text-center">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-2 text-blue-400 font-mono text-left">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-200 mb-4 text-left">{children}</p>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-medium mb-4 text-gray-400 text-center italic">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-base font-semibold mb-3 text-purple-300 text-left">
                  {children}
                </h5>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              code: ({ node, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                const inline = !match;
                return !inline ? (
                  <div className="mb-4 text-left">
                    <pre className="bg-gray-900 text-green-400 p-2 sm:p-4 rounded-lg overflow-x-auto text-left">
                      <code
                        className={`${className} text-xs sm:text-sm`}
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code
                    className="bg-gray-700 text-green-300 px-1 py-0.5 rounded text-xs sm:text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-200 mb-4 text-left">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-6 text-gray-200 mb-4 text-left">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1 text-left pl-2">{children}</li>
              ),
              img: ({ src, alt }) => {
                // Parse width from alt text if specified in format: alt text {width: w-100}
                const validWidths: { [key: string]: string } = {
                  "w-50": "w-50",
                  "w-75": "w-75",
                  "w-100": "w-100",
                  "w-150": "w-150",
                  "w-200": "w-200",
                  "w-32": "w-32",
                  "w-64": "w-64",
                  "w-96": "w-96",
                  "w-full": "w-full",
                  "w-1/2": "w-1/2",
                  "w-1/3": "w-1/3",
                  "w-2/3": "w-2/3",
                };

                let width = "w-150"; // default
                let cleanAlt = alt || "";

                if (alt && alt.includes("{width:")) {
                  const widthMatch = alt.match(/\{width:\s*([^}]+)\}/);
                  if (widthMatch && widthMatch[1]) {
                    const requestedWidth = widthMatch[1].trim();
                    width = validWidths[requestedWidth] || "w-150";
                    cleanAlt = alt.replace(/\{width:\s*[^}]+\}/, "").trim();
                  }
                }

                return (
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={src}
                      alt={cleanAlt}
                      className={`rounded-2xl ${width} h-auto mb-2`}
                    />
                    <caption className="text-gray-500 text-sm text-center">
                      {cleanAlt}
                    </caption>
                  </div>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-yellow-500 bg-yellow-900/20 pl-4 pr-4 py-3 rounded-r-lg italic text-yellow-200 mb-4 font-mono text-center [&>p]:mb-0 [&>p]:text-center">
                  {children}
                </blockquote>
              ),
            }}
          >
            {section}
          </ReactMarkdown>
        );
      }

      // Add quiz component if there's a quiz match
      if (quizMatches && quizMatches[index]) {
        parts.push(
          <QuizComponent key={`quiz-${index}`} content={quizMatches[index]} />
        );
      }
    });

    return parts;
  };

  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <header className="mb-8">
          <Link
            to="/"
            className="mt-4 text-sm sm:text-lg !text-yellow-400 font-mono mb-4 inline-block hover:!text-yellow-600 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-pink-300 font-serif">
            Blog
          </h1>
          <TypingAnimation
            duration={50}
            className="mt-4 text-sm sm:text-lg font-mono"
            as={"header"}
          >
            {"Dumping thoughts, tutorials, and insights..."}
          </TypingAnimation>
        </header>

        <div className="space-y-8">
          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            {processContent(`## Secure modularised microservices with webhooks communication

#### How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity.

![Webhooks communication between microservices](/webhook_post_image.png)

### Motive

Microservices are super beneficial for a large company, with a large subdivided team. But for a small-medium sized company with 2 to 5 developers, it can be a dilemma. Do you go with them because the trend nowadays is spinning microservices? For instance, a friend of mine works with a personal credit lender firm and they have at least 9 microservices, one of which is literally adding 2 and 3 but on a slightly larger scale.

![Absolute Cinema 🙌{width: w-100}](/scooby_meme.png)

Did I forget to mention that I am that friend? Just kidding... *or am I?*

See, microservices are not always overkill, sometimes they are necessary. For example, you just onboarded a company as a project manager, and suddenly you find out your company has some legacy REST APIs built in Java or PHP. What is the first thing you do? Rewrite them in modern frameworks like FastAPI and Express? ***HELL NAW!***

> If it ain't broke, don't fix it. -- Albert Einstein

When your company starts to grow, so does the complexity of your systems and naturally, you will end up with having some microservices. Sometimes, even for a small user base, you happen to have some microservices built in completely different frameworks for different use cases. In my company for example, we have one microservice that handles customer enquiry reports, talking with third party services, and managing these reports, let's call it the credit enquiry service. We also have another microservice that is used internally by our operations team, i.e, the loan management system. These two systems are built in two different frameworks. The credit enquiry service was built with Java Spring Boot, whereas the loan management system has been built on Node.js. This article does not cover the advantages and disadvantages of microservices, but if you're in a similar situation and have decided to adopt microservices, one of the challenges you will face is how to make these microservices communicate with each other. This article precisely covers that.

### Some assumptions

With any large system, we have to take some assumptions.

1. These microservices are not allowed to directly access each other's database (If they are, then you have a weird case, could have just made it a monolith).
2. They are RESTful APIs (you could still apply the same concept to other types of APIs).
3. Your distributed system does not handle excessively large traffic, like in the scale of millions of requests per second (even then it would technically be fine but requires further optimisations).
4. You have knowledge of (or are learning) the framework for all the microservices involved.

### What are webhooks?

A webhook is just stupidly simple. It comprises of a notification event in the form of an HTTP POST request to an endpoint (the webhook URL). It may not even expect back anything. But, a 200 OK response would be nice to let the sender know that the request was received successfully.

![Webhook communication via REST API](/http_post_request.png)

You can send any data you want in the body of the POST request, usually in JSON format. The receiving service can then process this data as needed. This simplicity is what makes webhooks so powerful and easy to implement. So to make a webhook work, you need both sides of the communication to be set up. The sender, which is the service that will trigger the webhook, and the receiver, which is the service that will handle the incoming webhook request.

##### Sender service

\`\`\`javascript
const sendWebhook = async (data) => {
  const response = await axios.post('https://loan-management-system.com/webhook', data);
  if (response.status === 200) {
    console.log('Webhook sent successfully');
  } else {
    console.error('Failed to send webhook');
  }
};
\`\`\`

*Code snippet for sending a webhook event from the credit enquiry service.*

##### Receiver service

\`\`\`javascript
app.post('/webhook', (req, res) => {
  const data = req.body;
  // Process the incoming data
  console.log('Received webhook data:', data);
  res.status(200).send('Webhook received');
});
\`\`\`

*Code snippet for receiving a webhook event in the loan management system.*

In the receiver service, we can accordingly handle the webhook as a notification. Depending on the type of notification, which would be specified in the body of the POST request, we can then trigger different actions. For example, if the credit enquiry service sends a notification that a new credit report is available for download, the loan management system can then fetch this report and update its records.

\`\`\`javascript
const type = data.type; // e.g., the data is the req.body, i.e the payload of the webhook event

switch (type) {
  case 'report_ready':
    // Handle new report notification
    fetchAndStoreReport(data.reportId);
    break;
  case 'report_corrupted':
    // Handle report corrupted notification
    handleCorruptedReport(data.reportId);
    break;
  default:
    console.warn('Unknown webhook type:', type);
}
\`\`\`

*Code snippet for handling different types of webhook notifications.*


What we have here is a simple yet effective way for two different microservices to communicate with each other without directly accessing each other's databases. While this is simple, we can now build upon this foundation to add more features, such as **security**, **retries**, and **logging**, to make our webhook communication more robust and secure. I will also discuss how webhooks can assist with **scalability** of distributed systems.

### Security

We now have to add the security layer. Since webhooks are just HTTP requests, they can be vulnerable to various attacks from malicious actors. To secure our webhooks, we can implement one of the following methods:

1. **Authentication**: We can use API keys or tokens to authenticate the sender of the webhook. The receiver service will then verify this key/token before processing the request. Basically, we are saying here that only requests with the correct key/token will be accepted. We can further enhance this by introducing Multi-Factor Authentication (MFA) if needed.

2. **Signature Verification**: The sender can include a signature in the headers of the webhook request. The receiver can then use a shared secret to verify this signature, ensuring that the request has not been tampered with. This adds an extra layer of security, as only the sender and receiver know the shared secret.

3. **HTTPS**: Always use HTTPS to encrypt the data being transmitted. Try to do this by default.

4. **IP Whitelisting**: If possible, restrict incoming webhook requests to known IP addresses. This adds an additional layer of security by ensuring that only requests from trusted sources are processed.

\\quiz_start
\\question Which method could protect your microservices against a [man-in-the-middle](https://www.ibm.com/think/topics/man-in-the-middle) attack?
\\option_wrong Signature Verification
\\option_wrong Authentication
\\option_correct Mixture of both
\\explanation The correct answer is **C. Mixture of both**. Implementing simple bearer token authentication alone makes your system vulnerable to man-in-the-middle attacks, as an attacker could intercept the token and reuse it. Signature verification alone also has its limitations, as it does not authenticate the sender. By combining both methods, you ensure that the sender is authenticated (via the token) and that the request has not been tampered with (via signature verification).
\\quiz_end

Regardless, just combine all the methods if possible. Security is not something to be taken lightly. You do not want those 10 users to sue you because of a data breach.

### Retry Mechanism

Network issues or temporary server problems can cause webhook deliveries to fail. To handle this, we can implement a retry mechanism in the sender service. If a webhook delivery fails (e.g., due to a timeout or a 5xx error), the sender can automatically retry the delivery after a short delay. This can be done using a simple exponential backoff strategy, where the delay increases with each successive failure, for example, 1s, 2s, 4s, 8s, etc. We can also set a maximum number of retries to avoid infinite loops. The only issue with this is that failed webhook events will have to be stored somewhere, like in a database or a message queue, until they are successfully delivered or reach the maximum retry limit. If after the maximum retries the webhook event is still not delivered, ensure that you have the option to manually resend it (you might want to notify the IT Team by this point, or you).

\`\`\`javascript
while (attempt < maxRetries) \{
  try \{
    const response = await axios.post(webhookUrl, data, \{
      timeout: 10000, // 10 second timeout
    \});
    
    if (response.status === 200) \{
      console.log('Webhook sent successfully');
    \}
  \} catch (error) \{
    console.log(\`Webhook attempt \$\{attempt + 1\} failed:\`, error.message);
  \}
  
  attempt++;
  
  if (attempt < maxRetries) \{
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s...
    const delay = Math.pow(2, attempt) * 1000;
    console.log(\`Retrying in \$\{delay\}ms...\`);
    await new Promise(resolve => setTimeout(resolve, delay));
  \}
\}

console.error(\`Webhook failed after \$\{maxRetries\} attempts\`);
\`\`\`

*Simple retry mechanism with exponential backoff for webhook delivery.*

The retry mechanism is one of the disadvantages I can think of with webhooks as it requires some additional infrastructure to store failed events.

### Logging

Implementing logging for webhook events is crucial for monitoring and debugging purposes, especially in cases of failure. We should log the following information:

- Event type and payload
- Timestamp of the event
- Status of the webhook delivery (success/failure)
- Response time and any error messages

These should not just be logged to the console/terminal, but also stored in a persistent storage solution like a database or a log management system. This way, you can easily query and analyze the logs to identify patterns or issues with webhook deliveries. Additionally, consider setting up alerts for repeated failures or other anomalies in webhook processing to proactively address potential issues. A method to resend failed webhook events manually would also be beneficial. Some popular observability tools include [Prometheus + Grafana](https://www.geeksforgeeks.org/devops/what-is-prometheus-and-grafana/), [Pydantic Logfire](https://pydantic.dev/logfire) and many more. In my startup, we implemented Logfire to integrate with our FastAPI micro-services because it is super simple to set up, seamlessly blends with our AI services, and has a very user-friendly dashboard. I will write another article about how to setup Logfire to monitor your microservices soon.

### Scalability

As your system grows, the number of webhook events may increase significantly. To handle this increased load, consider using a message queue (e.g., RabbitMQ, Kafka) to decouple the sender and receiver services. The sender can publish webhook events to the queue, and the receiver can consume these events at its own pace. This helps to prevent overloading the receiver service and ensures that webhook events are processed reliably.

Because it is loosely coupled, webhooks allow for greater flexibility in your system architecture. You can easily add or remove services without affecting the overall communication flow. Each service can process events independently, making it easier to scale and maintain your system over time. If one of your microservices has a further replica for load balancing, it can simply subscribe to the same webhook events without any additional configuration. Just make sure to put them behind a load balancer like Nginx to avoid duplicate processing of the same event. You can also use this to create a zero downtime deployment strategy, but more about that in another post.

### Conclusion

Webhooks are a simple yet powerful way for microservices to communicate with each other. This is also a very common pattern used in many SaaS applications to allow third-party integrations. Some popular examples include WhatsApp Business API, GitHub webhooks, Stripe webhooks, and many more.

If you have read this far, thank you!`)}

            <div className="flex items-center text-sm text-gray-500 mt-6">
              <span>Marzukh Akib Asjad</span>
              <span className="mx-2">•</span>
              <span>Coming Soon</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;
