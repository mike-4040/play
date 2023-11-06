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

    if (!this.#mutexes.has(requestId)) {
      const release = await this.#mutexesMapMutex.acquire();
      try {
        this.#mutexes.set(requestId, new Mutex());
      } finally {
        release();
      }
    }
    return this.#mutexes.get(requestId) as Mutex;
  }

  async #wrapCall<T>(
    requestId: string,
    func: () => Promise<T>,
  ): Promise<T> {
    let requestMutex: Mutex | undefined;

    // Ensures that only one mutex is created per unique request ID at a time
    // and that there cannot accidentally be two mutexes for the same unique request ID
    const release = await this.#mutexesMapMutex.acquire();
    try {
      requestMutex = this.#mutexes.get(requestId);
      if (!requestMutex) {
        requestMutex = new Mutex();
        this.#mutexes.set(requestId, requestMutex);
      }
    } finally {
      release();
    }
    console.log('requestMutex', requestId, requestMutex.isLocked())
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

