## Secure modularised microservices with webhooks communication

#### How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity.

![Webhooks communication between microservices](/blog1/webhook_post_image.png)

### Motive

Microservices are super beneficial for a large company, with a large subdivided team. But for a small-medium sized company with 2 to 5 developers, it can be a dilemma. Do you go with them because the trend nowadays is spinning microservices? For instance, a friend of mine works with a personal credit lender firm and they have at least 9 microservices, one of which is literally adding 2 and 3 but on a slightly larger scale.

![Absolute Cinema 🙌{width: w-100}](/blog1/scooby_meme.png)

Did I forget to mention that I am that friend? Just kidding... _or am I?_

See, microservices are not always overkill, sometimes they are necessary. For example, you just onboarded a company as a project manager, and suddenly you find out your company has some legacy REST APIs built in Java or PHP. What is the first thing you do? Rewrite them in modern frameworks like FastAPI and Express? **_HELL NAW!_**

> "If it ain't broke, don't fix it." -- Albert Einstein

When your company starts to grow, so does the complexity of your systems and naturally, you will end up with having some microservices. Sometimes, even for a small user base, you happen to have some microservices built in completely different frameworks for different use cases. In my company for example, we have one microservice that handles customer enquiry reports, talking with third party services, and managing these reports, let's call it the credit enquiry service. We also have another microservice that is used internally by our operations team, i.e, the loan management system. These two systems are built in two different frameworks. The credit enquiry service was built with Java Spring Boot, whereas the loan management system has been built on Node.js. This article does not cover the advantages and disadvantages of microservices, but if you're in a similar situation and have decided to adopt microservices, one of the challenges you will face is how to make these microservices communicate with each other. This article precisely covers that.

### Some assumptions

With any large system, we have to take some assumptions.

1. These microservices are not allowed to directly access each other's database (If they are, then you have a weird case, could have just made it a monolith).
2. They are RESTful APIs (you could still apply the same concept to other types of APIs).
3. Your distributed system does not handle excessively large traffic, like in the scale of millions of requests per second (even then it would technically be fine but requires further optimisations).
4. You have knowledge of (or are learning) the framework for all the microservices involved.

### What are webhooks?

A webhook is just stupidly simple. It comprises of a notification event in the form of an HTTP POST request to an endpoint (the webhook URL). It may not even expect back anything. But, a 200 OK response would be nice to let the sender know that the request was received successfully.

![Webhook communication via REST API](/blog1/http_post_request.png)

You can send any data you want in the body of the POST request, usually in JSON format. The receiving service can then process this data as needed. This simplicity is what makes webhooks so powerful and easy to implement. So to make a webhook work, you need both sides of the communication to be set up. The sender, which is the service that will trigger the webhook, and the receiver, which is the service that will handle the incoming webhook request.

##### Sender service

```javascript
const sendWebhook = async (data) => {
  const response = await axios.post(
    "https://loan-management-system.com/webhook",
    data
  );
  if (response.status === 200) {
    console.log("Webhook sent successfully");
  } else {
    console.error("Failed to send webhook");
  }
};
```

_Code snippet for sending a webhook event from the credit enquiry service._

##### Receiver service

```javascript
app.post("/webhook", (req, res) => {
  const data = req.body;
  // Process the incoming data
  console.log("Received webhook data:", data);
  res.status(200).send("Webhook received");
});
```

_Code snippet for receiving a webhook event in the loan management system._

In the receiver service, we can accordingly handle the webhook as a notification. Depending on the type of notification, which would be specified in the body of the POST request, we can then trigger different actions. For example, if the credit enquiry service sends a notification that a new credit report is available for download, the loan management system can then fetch this report and update its records.

```javascript
const type = data.type; // e.g., the data is the req.body, i.e the payload of the webhook event

switch (type) {
  case "report_ready":
    // Handle new report notification
    fetchAndStoreReport(data.reportId);
    break;
  case "report_corrupted":
    // Handle report corrupted notification
    handleCorruptedReport(data.reportId);
    break;
  default:
    console.warn("Unknown webhook type:", type);
}
```

_Code snippet for handling different types of webhook notifications._

What we have here is a simple yet effective way for two different microservices to communicate with each other without directly accessing each other's databases. While this is simple, we can now build upon this foundation to add more features, such as **security**, **retries**, and **logging**, to make our webhook communication more robust and secure. I will also discuss how webhooks can assist with **scalability** of distributed systems.

### Security

We now have to add the security layer. Since webhooks are just HTTP requests, they can be vulnerable to various attacks from malicious actors. To secure our webhooks, we can implement one of the following methods:

1. **Authentication**: We can use API keys or tokens to authenticate the sender of the webhook. The receiver service will then verify this key/token before processing the request. Basically, we are saying here that only requests with the correct key/token will be accepted. We can further enhance this by introducing Multi-Factor Authentication (MFA) if needed.

2. **Signature Verification**: The sender can include a signature in the headers of the webhook request. The receiver can then use a shared secret to verify this signature, ensuring that the request has not been tampered with. This adds an extra layer of security, as only the sender and receiver know the shared secret.

3. **HTTPS**: Always use HTTPS to encrypt the data being transmitted. Try to do this by default.

4. **IP Whitelisting**: If possible, restrict incoming webhook requests to known IP addresses. This adds an additional layer of security by ensuring that only requests from trusted sources are processed.

\quiz_start
\question Which method could protect your microservices against a [man-in-the-middle](https://www.ibm.com/think/topics/man-in-the-middle) attack?
\option_wrong Signature Verification
\option_wrong Authentication
\option_correct Mixture of both
\explanation The correct answer is **C. Mixture of both**. Implementing simple bearer token authentication alone makes your system vulnerable to man-in-the-middle attacks, as an attacker could intercept the token and reuse it. Signature verification alone also has its limitations, as it does not authenticate the sender. By combining both methods, you ensure that the sender is authenticated (via the token) and that the request has not been tampered with (via signature verification).
\quiz_end

Regardless, just combine all the methods if possible. Security is not something to be taken lightly. You do not want those 10 users to sue you because of a data breach.

### Retry Mechanism

Network issues or temporary server problems can cause webhook deliveries to fail. To handle this, we can implement a retry mechanism in the sender service. If a webhook delivery fails (e.g., due to a timeout or a 5xx error), the sender can automatically retry the delivery after a short delay. This can be done using a simple exponential backoff strategy, where the delay increases with each successive failure, for example, 1s, 2s, 4s, 8s, etc. We can also set a maximum number of retries to avoid infinite loops. The only issue with this is that failed webhook events will have to be stored somewhere, like in a database or a message queue, until they are successfully delivered or reach the maximum retry limit. If after the maximum retries the webhook event is still not delivered, ensure that you have the option to manually resend it (you might want to notify the IT Team by this point, or you).

```javascript
while (attempt < maxRetries) {
  try {
    const response = await axios.post(webhookUrl, data, {
      timeout: 10000, // 10 second timeout
    });

    if (response.status === 200) {
      console.log("Webhook sent successfully");
    }
  } catch (error) {
    console.log(`Webhook attempt ${attempt + 1} failed:`, error.message);
  }

  attempt++;

  if (attempt < maxRetries) {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s...
    const delay = Math.pow(2, attempt) * 1000;
    console.log(`Retrying in ${delay}ms...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

console.error(`Webhook failed after ${maxRetries} attempts`);
```

_Simple retry mechanism with exponential backoff for webhook delivery._

The retry mechanism is one of the disadvantages I can think of with webhooks as it requires some additional infrastructure to store failed events.

### Logging

Implementing logging for webhook events is crucial for monitoring and debugging purposes, especially in cases of failure. We should log the following information:

- Event type and payload
- Timestamp of the event
- Status of the webhook delivery (success/failure)
- Response time and any error messages
- Attempt count for retries

These should not just be logged to the console/terminal, but also stored in a persistent storage solution like a database or a log management system. This way, you can easily query and analyze the logs to identify patterns or issues with webhook deliveries. It might seem a huge pain to set this up, but buddy, trust me, when a customer is calling you because they did not get their subscribed content after paying for it, and your terminal output just magically disappeared, the last thing you want is for your paid user count to drop from 2 to 0.

!["Sir, please tell me you remember the unique transaction ID that appeared in the URL when you paid?" 😭😭{width: w-75}](/blog1/pls_gif.gif)

This is where observability tools come into play. They come pre-packaged with features like logging, monitoring, and alerting, making it easier to keep track of webhook events and their status. You could additionally configure setting up alerts for repeated failures or other anomalies in webhook processing to proactively address potential issues. A feature to manually resend webhook events may have to be implemented by you in your webhook system in case of long failures. Some popular observability tools include [Prometheus + Grafana](https://www.geeksforgeeks.org/devops/what-is-prometheus-and-grafana/), [Pydantic Logfire](https://pydantic.dev/logfire) and many more. In my startup, we have implemented Logfire to integrate with our FastAPI micro-services because it is super simple to set up, seamlessly blends with our AI services, and has a very user-friendly dashboard. Sometime in the future, I will write another blog post on how to setup Logfire to monitor your microservices.

### Scalability

As your system grows, the number of webhook events may increase significantly. To handle this increased load, consider using a message queue (e.g., RabbitMQ, Kafka) to decouple the sender and receiver services. The sender can publish webhook events to the queue, and the receiver can consume these events at its own pace. This helps to prevent overloading the receiver service and ensures that webhook events are processed reliably. Your system will officially then have incorporated **event-driven architecture** (+1 to your resume).

Because it is loosely coupled, webhooks allow for greater flexibility in your system architecture. You can easily add or remove services without affecting the overall communication flow. Each service can process events independently, making it easier to scale and maintain your system over time. If one of your microservices has a further replica for load balancing, it can simply subscribe to the same webhook events without any additional configuration. Just make sure to put them behind a load balancer like Nginx to avoid duplicate processing of the same event. You can also use this to create a zero downtime deployment strategy, but more about that in another post.

### Conclusion

Webhooks are a simple yet powerful way for microservices to communicate with each other. This is also a very common pattern used in many SaaS applications to allow third-party integrations. Some popular examples include WhatsApp Business API, GitHub webhooks, Stripe webhooks, and many more.

If you have read this far, thank you!
