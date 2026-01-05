## Monitoring your distributed microservices with Observability Tools

#### How you can monitor and keep checks on your FastAPI microservices with Logfire before they burn down

![Centralise your monitoring in one place](/blog3/centralise-monitoring.png)

When your system has more than a few microservices, how do you keep track of them all? How do you find out what went wrong when something breaks? What about precautionary measures to prevent failures? Do you visit each service's terminal logs individually? That would be a nightmare.

![No centralised logging means ssh-ing into each service separately{width: w-100}](/blog3/crazy-typing.gif)

This is where observability tools come in. I covered in one of my previous [articles](#/blog/secure-modularised-microservices-with-webhooks-communication) how we can communicate between microservices using webhooks and how monitoring is essential. In this article, I'll show you how to set up Logfire, an observability tool, to monitor your FastAPI microservices. This is not a sponsored post; I genuinely find Logfire useful and want to share it with you.

### What is Pydantic Logfire?

Logfire is a cloud based observability tool that helps you monitor your applications and infrastructure. It provides real-time insights into your system's performance, errors, and logs. I keep mentioning Logfire since a lot of services in modern systems are based on Pydantic including FastAPI, PydanticAI. But FastAPI is not just limited to that. So if you're using FastAPI, Logfire is probably the best choice for you.

### Setting up Logfire

Setting up Logfire is straightforward. First, you need to create an account on [Logfire](https://logfire.com/). Once you have an account, you can create a new project. After creating a project, you'll be given an API key that you'll use to send logs to Logfire, which is done automatically with some simple configuration.

To integrate Logfire with your FastAPI application, you can use the `logfire` Python package. You can install it using pip:

```bash
pip install 'logfire[fastapi]'
```

or using uv:
```bash
uv add 'logfire[fastapi]'
```

Next, you need to configure Logfire in your FastAPI application. Here's a simple example of how to do this:

```python
import logfire
from fastapi import FastAPI

app = FastAPI()

logfire.configure()
logfire.instrument_fastapi(app)


@app.get("/hello")
async def hello(name: str):
    return {"message": f"hello {name}"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
```

If you run this FastAPI application and make requests to the `/hello` endpoint, you'll see logs appearing in your Logfire dashboard in real-time.

More detailed instructions can be found in the [Logfire FastAPI documentation](https://logfire.pydantic.dev/docs/integrations/web-frameworks/fastapi/#usage).

### Monitoring multiple microservices

Once you have Logfire set up in one of your FastAPI microservices, you can easily add it to other microservices as well. Each microservice can be configured to send logs to the same Logfire project, allowing you to centralize your monitoring. This way, you can have a single dashboard where you can monitor all your microservices, making it easier to identify issues and track performance across your entire system. Best part? Logfire supports not just FastAPI but also other web frameworks, LLMs, databases, and more. Check out their [integrations page](https://logfire.pydantic.dev/docs/integrations/) for more details.

### When logfire fails

This might sound ironic but what happens when the server instance running your microservice goes down? This happens more often than you think, especially in cloud environments when your EC2 instance or container crashes. 

![Back in 44 BC, Julius Caesar was killed because he blindly trusted Brutus and his last words were "Et tu, Brute?". Don't be like Caesar. Have backup plans for your backup plans.{width: w-100}](/blog3/et-tu-brutus.jpg)

To avoid being backstabbed, you can set up health checks and alerts in Logfire and poll every once in a while to an endpoint in your microservice. You can check this [guide for detecting service is down](https://logfire.pydantic.dev/docs/how-to-guides/detect-service-is-down/) for more details. This is crucial as suddenly your microservice going down without any alert can lead to a bad user experience (*blushes from personal experience ಥ _ ಥ*). 

> "Bro I paid money for your service but it's been down for 2 hours already!!" -- frustrated user

Super embarassing situation and a pretty bad way to lose customers. So make sure to set up alerts and health checks properly.

### Conclusion

Telemetry and monitoring are super crucial for distributed systems. With tools like Logfire, you can easily keep track of these separate individual services in one place. Make sure to set up alerts and dashboards in Logfire to get the most out of it. Happy monitoring!

