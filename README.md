# PerfAnalytics

![](https://i.hizliresim.com/e1v5ism.png)

**PerfAnalytics** is an ecosystem which collects and criticizes web performance data.

# Table of contents

- [PerfAnalytics](#perfanalytics)
- [Subsystems](#subsystems)
- [Installation 👷🏻](#installation-)
  - [Local Development 📍](#local-development-)
  - [Self Hosted Production 🌐](#self-hosted-production-)
- [Learn More 🤓](#learn-more-)
- [License 📝](#license-)

# Subsystems

The ecosystem consists of 3 subsystem;

1. **PerfAnalytics.Js is a client-side library, which collects some performance related key metrics from browser and sends to the PerfAnalytics.API**
2. **PerfAnalytics.API is a restful API which saves data, posted from PerfAnalytics.JS and returns time specific filtered data.**
3. **PerfAnalytics.Dashboard is a dashboard which shows perf related metrics in a visualized way.**

![](https://i.hizliresim.com/t5gjh5s.png)

---

# Installation 👷🏻

Install docker & docker compose according to the operating system you are using. <br />
`Learn More` : <https://docs.docker.com/>

## Local Development 📍

0. **Please clone the project.**
1. **Open terminal in the directory you cloned.**
2. **Run the following command:**

```bash
./run.sh
```

or

```bash
bash run.sh
```

3. **Please enter the "1" for local development.**
   ![](https://i.hizliresim.com/89wdkyy.png)

4. **Now it's completely ready!** 💯 <br />
   Dashboard: `localhost:3000` <br />
   Sample website: `localhost:8080` <br />
   Backend: `localhost:8000` <br />

![](https://i.hizliresim.com/8sucn6f.png)

**PerfAnalytics-OpenAPI / Curl request can be send to test api functionality.** <br />

`Check this out` : https://documenter.getpostman.com/view/11215964/UVByJqRY

## Self Hosted Production 🌐

0. **First you need 3️ domains.**

Frontend domain for the dashboard. (ex: perfanalytics.kagan.dev) <br />
Backend domain for the api. (ex: sample.kagan.dev) <br />

1. **Let's create github actions secrets after that create self-hosted runner.**

![](https://i.hizliresim.com/uiepnxq.png)

2. **Enter the runner registrations info:** 🏃

Please go to: your-repo settings/actions/runner, choose which operating system you are using. Type the download and configure commands given to you.

![](https://i.hizliresim.com/3yybzxh.png)

To run github actions runner in the background;

```bash
nohup bash run.sh &
```

3. **Now you can see your runner on github** ❤️

![](https://i.hizliresim.com/eivfh7g.png)

**Then make a commit and let the pipeline work!** ✔️

![](https://i.hizliresim.com/7brttmm.png)

**Once complete, your containers will be ready.**

![](https://i.hizliresim.com/ln15dc9.png)

4. **It's show time for Nginx proxy manager!** ✨

   > Expose your services easily and securely.

5. Go to the `<your-public-ip-address>:81/login` address.

6. **Please very first login and change the password.**
   Username: `admin@example.com`
   Password: `changeme`

**And easily create your proxy hosts.** 🔥
![](https://i.hizliresim.com/8ljj2po.png)
![](https://i.hizliresim.com/ia69wmy.png)
![](https://i.hizliresim.com/mtlt5ns.png)

Now, go to your github actions directory: (ex: actions-runner/\_work/TrendyolCase-KaganMert/TrendyolCase-KaganMert/)

```bash
cd actions-runner/_work/<repo-name>/<repo-name>
./run.sh
```

Select '2' and enter the "Backend domain name":

![](https://i.hizliresim.com/mraaar0.png)

You need to refresh sample website at least 1 time, after that you can see the dashboard from your frontend domain:

![](https://i.hizliresim.com/2dqoax3.png)

**That's it.** 💁

# Learn More 🤓

> Web Vitals is an initiative by Google to provide unified guidance for quality signals that are essential to delivering a great user experience on the web.

`Learn More` : <https://web.dev/vitals/>

# License 📝

[MIT](https://github.com/kaganmert/PerfAnalytics/blob/main/LICENSE)
