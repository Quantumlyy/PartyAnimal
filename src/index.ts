import 'module-alias/register';

import { outputFile } from 'fs-nextra';
import chainfetch from 'chainfetch';
import { imageTypes } from '@lib/utils/constants/Types';
import { TOKEN } from './config';
import { Result } from '@lib/utils/types';
import { join } from 'path';
import { sleep } from '@lib/utils/sleep';
import { Duration } from '@klasa/duration';

async function request() {
	const result: Result = await chainfetch
		.get('https://api.weeb.sh/images/random')
		.query([
			['type', imageTypes[Math.floor(Math.random() * imageTypes.length)]]
		])
		.set([
			['User-Agent', 'Wolken/0.2.1'],
			['Authorization', `Wolke ${TOKEN}`]
		])
		.onlyBody();


	const { body: image }: { body: Buffer } = await chainfetch
		.get(result.url!)
		.set([
			['User-Agent', 'Wolken/0.2.1']
		])
		.toBuffer();

	await outputFile(join(__dirname, 'images', result.nsfw! ? 'nsfw' : 'normie', result.baseType!, `${result!.id}.${result.fileType!}`), image);
}

async function timed() {
	try {
		await request();
	} catch (err) {
		console.log(err);
	}

	const timeToNext = Math.floor(Math.random() * Math.floor(100000));
	console.log(`Request performed. Next in ${Duration.toNow(Date.now() + timeToNext)}`);
	await sleep(timeToNext);

	await timed();
}

void timed();
