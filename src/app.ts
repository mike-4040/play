import { Mutex, MutexInterface, Semaphore, SemaphoreInterface, withTimeout } from 'async-mutex';
import { scheduler } from 'timers/promises';

async function fetching(requestId: string, x: number = 1000) {
  console.log('start fetching', { requestId, x })
  await scheduler.wait(1000);
  console.log('end   fetching', { requestId, x })
  return requestId;
}


class API {
  static #instance: API;

  #mutexes: Map<string, Mutex>;

  #mutexesMapMutex: Mutex;

  constructor () {
    this.#mutexesMapMutex = new Mutex();
    this.#mutexes = new Map();
  }

  public static get instance(): API {
    if (!API.#instance) {
      API.#instance = new API();
    }
    return API.#instance;
  }

  async #getRequestMutex(requestId: string): Promise<Mutex> {
    const release = await this.#mutexesMapMutex.acquire();
    try {
      if (!this.#mutexes.has(requestId)) {
        this.#mutexes.set(requestId, new Mutex());
      }
      return this.#mutexes.get(requestId) as Mutex;
    } finally {
      release();
    }
  }

  async #wrapCall<T>(
    requestId: string,
    func: () => Promise<T>,
  ): Promise<T> {
    const requestMutex = await this.#getRequestMutex(requestId);
    return requestMutex.runExclusive(async (): Promise<T> => func());
  }

  async request1(x: number) {
    return this.#wrapCall('request1', () => fetching('r1', x));
  }

  async request2(x: number) {
    return this.#wrapCall('request2', () => fetching('r2', x));
  }
}


async function main3() {
  const result = await Promise.all([
    API.instance.request1(1),
    API.instance.request1(2),
    API.instance.request2(2),
    API.instance.request1(3)
  ]);
  console.log({ result });
}

await main3();

console.log('done')

