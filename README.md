# PerfAnalytics

![](https://i.hizliresim.com/e1v5ism.png)

**PerfAnalytics** is an ecosystem which collects and criticizes web performance data.

Table of Contents

- [PerfAnalytics](#perfanalytics)
- [Subsystems](#subsystems)
- [Highlights](#highlights)
- [Requirements](#requirements)
- [Installation](#installation)
  * [Development](#development)
  * [Production](#production)
- [Learn More](#learn-more)
- [License](#license)

# Subsystems

The ecosystem consists of 3 subsystem;

1. **PerfAnalytics.Js**
2. **PerfAnalytics.API**
3. **PerfAnalytics.Dashboard**

![](https://i.hizliresim.com/lj9z7dy.png)

# Highlights

- **PerfAnalytics.JS** is a client-side library, which collects some performance related key metrics from browser and sends to the PerfAnalytics.API

- **PerfAnalytics.API** is a restful API which saves data, posted from PerfAnalytics.JS and returns time specific filtered data.

- **PerfAnalytics.Dashboard** is a dashboard which shows perf related metrics in a visualized way.

---

# Requirements

# Installation

## Development

```
npm install
```

```
npm run dev
```

## Production

```
docker-compose up --build
```

# Learn More

> Web Vitals is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

`Learn More` : <https://web.dev/vitals/>

# License

[MIT](https://github.com/kaganmert/PerfAnalytics/blob/main/LICENSE)


