import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const Blog: React.FC = () => {
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
            <ReactMarkdown
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
                img: ({ src, alt }) => (
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={src}
                      alt={alt}
                      className="rounded-2xl w-150 h-auto mb-2"
                    />
                    <caption className="text-gray-500 text-sm text-center">
                      {alt}
                    </caption>
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-yellow-500 bg-yellow-900/20 pl-4 pr-4 py-3 rounded-r-lg italic text-yellow-200 mb-4 font-mono">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {`## Secure modularised microservices with webhooks communication

#### How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity.

![Webhooks communication between microservices](/webhook_post_image.png)

### Motive

Microservices in a small-medium sized company are rather, dilemma moments. Do you go with them because the trend nowadays is spinning microservices? Like my friend works in a small bank and they have at least 9 microservices, one of which is literally adding 2 and 3 but on a slightly larger scale. But the funny thing is, now he can at least add to his resume:

> Well versed with microservices architecture; Docker; Kubernetes.

Happy for him to be honest, because I think recruiters ***dig*** for that sort of thing.

But microservices are not always overkill, sometimes they are necessary. For example, you just onboarded a company as a project manager, and suddently you find out your company have some legacy REST APIs built in Java or PHP. 

When your company starts to grow, so does the complexity of your systems and naturally, you will end up with having some microservices. If you created one API, and are currently serving less than 1000 users, and if you have some microservices for your single programming language/framework API, then nah, microservices are not worth it. But sometimes, even for a small user base, you happen to have some microservices built in completely different frameworks for different use cases. In my company for example, we have one microservice that handles customer enquiry reports, talking with third party services, and managing these reports, let's call it the credit enquiry service. We also have another microservice that is used internally by our operations team, i.e, the loan management system. These two systems are built in two different frameworks. The credit enquiry service is built with Java Spring Boot, whereas the loan management system is built with Node.js. I am not going to discuss the pros and cons of microservices here, but one of the challenges you will face is how to make these microservices communicate with each other.

### Some assumptions

With any large system, we have to take some assumptions.

1. These microservices are not allowed to directly access each other's database.
2. They are REST API based.
3. Your distributed system does not handle excessively large traffic, like in the scale of millions of requests per second (even then it would technically be fine but requires further optimisations).

### What are webhooks?

A webhook is just stupidly simple. It is just a notification event in the form of an HTTP POST request. What does it expect back? A 200 OK response. That's it. You can send any data you want in the body of the POST request, usually in JSON format. The receiving service can then process this data as needed. This simplicity is what makes webhooks so powerful and easy to implement. So to make a webhook work, you need both sides of the communication to be set up. The sender, which is the service that will trigger the webhook, and the receiver, which is the service that will handle the incoming webhook request.

### Sender service

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

*Code snippet for sending a webhook from the credit enquiry service.*

### Receiver service

\`\`\`javascript
app.post('/webhook', (req, res) => {
  const data = req.body;
  // Process the incoming data
  console.log('Received webhook data:', data);
  res.status(200).send('Webhook received');
});
\`\`\`

*Code snippet for receiving a webhook in the loan management system.*

In the receiver service, we can accordingly handle the webhook as a notification. Depending on the type of notification, which would be specified in the body of the POST request, we can then trigger different actions. For example, if the credit enquiry service sends a notification that a new credit report is available for download, the loan management system can then fetch this report and update its records.

What we have here is a simple yet effective way for two different microservices to communicate with each other without directly accessing each other's databases. While this is simple, we can now build upon this foundation to add more features, such as security, retries, and logging, to make our webhook communication more robust and secure. I will also discuss how webhooks can assist with scalability of distributed systems.

### Security

We now have to add the security layer. Since webhooks are just HTTP requests, they can be vulnerable to various attacks from malicious actors. To secure our webhooks, we can implement one of the following methods:

1. **Authentication**: We can use API keys or tokens to authenticate the sender of the webhook. The receiver service will then verify this key/token before processing the request. Basically, we are saying here that only requests with the correct key/token will be accepted.

2. **Signature Verification**: The sender can include a signature in the headers of the webhook request. The receiver can then use a shared secret to verify this signature, ensuring that the request has not been tampered with. This adds an extra layer of security, as only the sender and receiver know the shared secret.

3. **HTTPS**: Always use HTTPS to encrypt the data being transmitted. Try to do this by default.

4. **IP Whitelisting**: If possible, restrict incoming webhook requests to known IP addresses. This adds an additional layer of security by ensuring that only requests from trusted sources are processed.

### Retry Mechanism

Network issues or temporary server problems can cause webhook deliveries to fail. To handle this, we can implement a retry mechanism in the sender service. If a webhook delivery fails (e.g., due to a timeout or a 5xx error), the sender can automatically retry the delivery after a short delay. This can be done using a simple exponential backoff strategy, where the delay increases with each successive failure, for example, 1s, 2s, 4s, 8s, etc. We can also set a maximum number of retries to avoid infinite loops. The only issue with this is that failed webhook events will have to be stored somewhere, like in a database or a message queue, until they are successfully delivered or reach the maximum retry limit. If after the maximum retries the webhook event is still not delivered, ensure that you have the option to manually resend it (Do notify the IT Team by this point).

Honestly, the retry mechanism is the only con I can think of with webhooks as it requires some additional infrastructure to store failed events.

### Logging

Implementing logging for webhook events is crucial for monitoring and debugging purposes, especially in cases of failure. We should log the following information:

- Event type and payload
- Timestamp of the event
- Status of the webhook delivery (success/failure)
- Response time and any error messages

### Scalability

As your system grows, the number of webhook events may increase significantly. To handle this increased load, consider using a message queue (e.g., RabbitMQ, Kafka) to decouple the sender and receiver services. The sender can publish webhook events to the queue, and the receiver can consume these events at its own pace. This helps to prevent overloading the receiver service and ensures that webhook events are processed reliably.

Because it is loosely coupled, webhooks allow for greater flexibility in your system architecture. You can easily add or remove services without affecting the overall communication flow. Each service can process events independently, making it easier to scale and maintain your system over time. If one of your microservices has a further replica for load balancing, it can simply subscribe to the same webhook events without any additional configuration. Just make sure to put them behind a load balancer like Nginx to avoid duplicate processing of the same event. You can also use this to create a zero downtime deployment strategy, but more about that in another post.

### Conclusion

Webhooks are a simple yet powerful way for microservices to communicate with each other. This is also a very common pattern used in many SaaS applications to allow third-party integrations. Some popular examples include WhatsApp Business API, GitHub webhooks, Stripe webhooks, and many more.

If you have read this far, thank you!`}
            </ReactMarkdown>

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
