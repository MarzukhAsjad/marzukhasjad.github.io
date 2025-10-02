import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="container mx-auto px-30 py-8">
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
            <h2 className="text-2xl font-semibold mb-3 text-green-500 font-mono">
              Secure modularised microservices with webhooks communication
            </h2>
            <p className="text-gray-400 mb-4 font-mono">
              How to communicate using webhooks between REST API based
              microservices while maintaining simplicity, security and
              modularity.
            </p>
            <div className="flex justify-center mb-4">
              <img
                src="/webhook_post_image.png"
                alt="Webhooks"
                className="rounded-2xl w-150 h-auto"
              />
            </div>
            <caption className="flex justify-center text-gray-500 text-sm mb-4">
              Webhooks communication between microservices
            </caption>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Motive</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              When your company starts to grow, so does the complexity of your
              systems and naturally, you will end up with having some
              microservices. If you created one API, and are currently serving
              less than 1000 users, and if you have some microservices for your
              single programming language/framework API, then nah, microservices
              are not worth it. But sometimes, even for a small user base, you
              happen to have some microservices built in completely different
              frameworks for different use cases. In my company for example, we
              have one microservice that handles customer enquiry reports,
              talking with third party services, and managing these reports,
              let's call it the credit enquiry service. We also have another
              microservice that is used internally by our operations team, i.e,
              the loan management system. These two systems are built in two
              different frameworks. The credit enquiry service is built with
              Java Spring Boot, whereas the loan management system is built with
              Node.js. I am not going to discuss the pros and cons of
              microservices here, but one of the challenges you will face is how
              to make these microservices communicate with each other.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Ideal assumptions</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              With any large system, we have to take some assumptions.
            </p>
            <p className="text-gray-200 mb-1 text-justify">
              1. These microservices are not allowed to directly access each
              other's database.
            </p>
            <p className="text-gray-200 mb-1 text-justify">
              2. They are REST API based.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              3. Your distributed system does not handle excessively large
              traffic, like in the scale of millions of requests per second
              (even then it would technically be fine but requires further
              optimisations).
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>What are webhooks?</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              A webhook is just stupidly simple. It is just a notification event
              in the form of an HTTP POST request. What does it expect back? A
              200 OK response. That's it. You can send any data you want in the
              body of the POST request, usually in JSON format. The receiving
              service can then process this data as needed. This simplicity is
              what makes webhooks so powerful and easy to implement. So to make
              a webhook work, you need both sides of the communication to be set
              up. The sender, which is the service that will trigger the
              webhook, and the receiver, which is the service that will handle
              the incoming webhook request.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Sender service</strong>
            </p>
            <code className="bg-gray-900 text-left text-green-400 p-4 rounded-lg block mb-4 overflow-x-auto">
              <pre>
                <code>
                  {`const sendWebhook = async (data) => {
  const response = await axios.post('https://loan-management-system.com/webhook', data);
  if (response.status === 200) {
    console.log('Webhook sent successfully');
  } else {
    console.error('Failed to send webhook');
  }
};`}
                </code>
              </pre>
            </code>
            <caption className="flex justify-center text-gray-500 text-sm mb-4">
              Code snippet for sending a webhook from the credit enquiry
              service.
            </caption>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Receiver service</strong>
            </p>
            <code className="bg-gray-900 text-left text-green-400 p-4 rounded-lg block mb-4 overflow-x-auto">
              <pre>
                <code>
                  {`app.post('/webhook', (req, res) => {
  const data = req.body;
  // Process the incoming data
  console.log('Received webhook data:', data);
  res.status(200).send('Webhook received');
});`}
                </code>
              </pre>
            </code>
            <caption className="flex justify-center text-gray-500 text-sm mb-4">
              Code snippet for receiving a webhook in the loan management
              system.
            </caption>
            <p className="text-gray-200 mb-4 text-justify">
              In the receiver service, we can accordingly handle the webhook as
              a notification. Depending on the type of notification, which would
              be specified in the body of the POST request, we can then trigger
              different actions. For example, if the credit enquiry service
              sends a notification that a new credit report is available for
              download, the loan management system can then fetch this report
              and update its records.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              What we have here is a simple yet effective way for two different
              microservices to communicate with each other without directly
              accessing each other's databases. While this is simple, we can now
              build upon this foundation to add more features, such as security,
              retries, and logging, to make our webhook communication more
              robust and secure. I will also discuss how webhooks can assist
              with scalability of distributed systems.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Security</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              We now have to add the security layer. Since webhooks are just
              HTTP requests, they can be vulnerable to various attacks from
              malicious actors. To secure our webhooks, we can implement one of
              the following methods:
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              1. Authentication: We can use API keys or tokens to authenticate
              the sender of the webhook. The receiver service will then verify
              this key/token before processing the request. Basically, we are
              saying here that only requests with the correct key/token will be
              accepted.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              2. Signature Verification: The sender can include a signature in
              the headers of the webhook request. The receiver can then use a
              shared secret to verify this signature, ensuring that the request
              has not been tampered with. This adds an extra layer of security,
              as only the sender and receiver know the shared secret.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              3. HTTPS: Always use HTTPS to encrypt the data being transmitted.
              Try to do this by default.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              4. IP Whitelisting: If possible, restrict incoming webhook
              requests to known IP addresses. This adds an additional layer of
              security by ensuring that only requests from trusted sources are
              processed.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Retry Mechanism</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              Network issues or temporary server problems can cause webhook
              deliveries to fail. To handle this, we can implement a retry
              mechanism in the sender service. If a webhook delivery fails
              (e.g., due to a timeout or a 5xx error), the sender can
              automatically retry the delivery after a short delay. This can be
              done using a simple exponential backoff strategy, where the delay
              increases with each successive failure, for example, 1s, 2s, 4s,
              8s, etc. We can also set a maximum number of retries to avoid
              infinite loops. The only issue with this is that failed webhook
              events will have to be stored somewhere, like in a database or a
              message queue, until they are successfully delivered or reach the
              maximum retry limit. If after the maximum retries the webhook
              event is still not delivered, ensure that you have the option to
              manually resend it (Do notify the IT Team by this point).
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              Honestly, the retry mechanism is the only con I can think of with
              webhooks as it requires some additional infrastructure to store
              failed events.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Logging</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              Implementing logging for webhook events is crucial for monitoring
              and debugging purposes, especially in cases of failure. We should
              log the following information:
            </p>
            <ul className="list-disc list-inside text-gray-200 mb-4 text-justify">
              <li>Event type and payload</li>
              <li>Timestamp of the event</li>
              <li>Status of the webhook delivery (success/failure)</li>
              <li>Response time and any error messages</li>
            </ul>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Scalability</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              As your system grows, the number of webhook events may increase
              significantly. To handle this increased load, consider using a
              message queue (e.g., RabbitMQ, Kafka) to decouple the sender and
              receiver services. The sender can publish webhook events to the
              queue, and the receiver can consume these events at its own pace.
              This helps to prevent overloading the receiver service and ensures
              that webhook events are processed reliably.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              Because it is loosely coupled, webhooks allow for greater
              flexibility in your system architecture. You can easily add or
              remove services without affecting the overall communication flow.
              Each service can process events independently, making it easier to
              scale and maintain your system over time. If one of your
              microservices has a further replica for load balancing, it can
              simply subscribe to the same webhook events without any additional
              configuration. Just make sure to put them behind a load balancer
              like Nginx to avoid duplicate processing of the same event. You
              can also use this to create a zero downtime deployment strategy,
              but more about that in another post.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              <strong>Conclusion</strong>
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              Webhooks are a simple yet powerful way for microservices to
              communicate with each other. This is also a very common pattern
              used in many SaaS applications to allow third-party integrations.
              Some popular examples include WhatsApp Business API, GitHub
              webhooks, Stripe webhooks, and many more.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              If you have read this far, thank you!
            </p>
            <div className="flex items-center text-sm text-gray-500">
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
