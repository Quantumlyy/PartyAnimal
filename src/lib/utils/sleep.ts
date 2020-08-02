import { promisify } from 'util';

interface PromisifiedTimeout {
	(ms: number): Promise<void>;
	<T>(ms: number, value: T): Promise<T>;
}

export const sleep: PromisifiedTimeout = promisify(setTimeout);
