import request from "supertest";
import _ from "underscore";
import { app } from "../server";
import { clearDatabase, closeDatabase } from "./mockdb";

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("➡️ Metrics general test case:", () => {
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  it("1-)Success Status: Metric values should be created.", async () => {
    expect(
      (await request(app).post("/api/v1/metrics").send(MOCK_METRIC)).status
    ).toBe(201);
  });
  // ------------------------------------------------------------------------------------------------
  it("1-)Failure Status: should not create a metric when required fields are missing", async () => {
    const urlMissing = _.omit(MOCK_METRIC, (value, key) => key !== "URL");
    const timestampMissing = _.omit(
      MOCK_METRIC,
      (value, key) => key !== "Timestamp"
    );

    expect(
      (await request(app).post("/api/v1/metrics").send(urlMissing)).status
    ).toBe(400);

    expect(
      (await request(app).post("/api/v1/metrics").send(timestampMissing)).status
    ).toBe(400);
  });
  // ************************************************************************************************

  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  it("2-)Success Status: should return api/v1/metrics within a time range", async () => {
    await request(app)
      .post("/api/v1/metrics")
      .send(MOCK_METRIC)
      .then(async (res) => {
        let start = "2021-10-27T19:48:48.673Z";
        let end = "2021-10-27T19:48:48.673Z";

        end = new Date().toISOString();
        await request(app)
          .get(`/api/v1/metrics?startDate=${start}&endDate=${end}`)
          .then((metricsRequest) => {
            expect(metricsRequest.status).toBe(200);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  });
});
// ************************************************************************************************

const MOCK_METRIC = {
  URL: "http://sample.kagan.dev",
  TTFB: 0.5,
  FCP: 0.4,
  DomLoad: 0.045,
  WindowLoad: 0.6,
  Files: [],
  Timestamp: "2021-10-31T20:00:00.000Z",
};
