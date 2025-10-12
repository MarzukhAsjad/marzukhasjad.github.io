## Monitoring your distributed microservices with Observability Tools

#### How you can monitor and keep checks on your FastAPI microservices with Logfire before they burn down

![Centralise your monitoring in one place](../images/blog3/centralise-monitoring.png)

When your system has more than a few microservices, how do you keep track of them all? How do you find out what went wrong when something breaks? What about precautionary measures to prevent failures? Do you visit each service's terminal logs individually? That would be a nightmare.

This is where observability tools come in. I covered in one of my previous [articles](#/blog/secure-modularised-microservices-with-webhooks-communication) how we can communicate between microservices using webhooks and how monitoring is essential. In this article, I'll show you how to set up Logfire, an observability tool, to monitor your FastAPI microservices. This is not a sponsored post; I genuinely find Logfire useful and want to share it with you.

### What is Pydantic Logfire?

Logfire is a cloud based observability tool that helps you monitor your applications and infrastructure. It provides real-time insights into your system's performance, errors, and logs. I keep mentioning Logfire since a lot of services in modern systems are based on Pydantic including FastAPI, PydanticAI. FastAPI uses Pydantic models, which seamlessly integrate with Logfire, also based on Pydantic. So if you're using FastAPI, Logfire is probably the best choice for you.

### Setting up Logfire

Setting up Logfire is straightforward. First, you need to create an account on [Logfire](https://logfire.com/). Once you have an account, you can create a new project. After creating a project, you'll be given an API key that you'll use to send logs to Logfire.
