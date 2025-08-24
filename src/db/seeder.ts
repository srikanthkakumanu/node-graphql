import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

type ModelKey = 'genre' | 'author' | 'book' | 'review';
const modelMap: Record<string, ModelKey> = {
    'genres.json': 'genre',
    'authors.json': 'author',
    'books.json': 'book',
    'reviews.json': 'review',
};

const prisma = new PrismaClient();

async function seedFile(fileName: string) {
    const modelKey = modelMap[fileName];
    if (!modelKey) {
        console.log(`Skipping ${fileName}: no model mapping found.`);
        return;
    }

    const dataDir = path.join(process.cwd(), 'config', 'data');
    const filePath = path.join(dataDir, fileName);

    let fileContent;
    try {
        fileContent = await fs.readFile(filePath, 'utf-8');
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log(`Skipping seed for ${fileName}: file not found.`);
            return;
        }
        throw new Error(`Failed to read ${fileName}: ${error.message}`);
    }

    let data;
    try {
        data = JSON.parse(fileContent);
    } catch (error: any) {
        throw new Error(`Failed to parse JSON from ${fileName}: ${error.message}`);
    }

    if (!Array.isArray(data) || data.length === 0) {
        console.log(`Skipping ${fileName}: content is not a non-empty array.`);
        return;
    }

    console.log(`Seeding ${modelKey}...`);

    const modelDelegate = (prisma as any)[modelKey];

    try {
        const { count } = await modelDelegate.createMany({
            data,
            skipDuplicates: true,
        });
        console.log(`Seeded ${count} records for ${modelKey}.`);
    } catch (error: any) {
        throw new Error(`Failed to seed ${modelKey}: ${error.message}`);
    }
}

async function seedAll() {
    const seedOrder = ['genres.json', 'authors.json', 'books.json', 'reviews.json'];
    for (const fileName of seedOrder) {
        await seedFile(fileName);
    }
}

export async function seed() {
    console.log('Seeding database...');
    try {
        await seedAll();
        console.log('Seeding finished.');
    } finally {
        await prisma.$disconnect();
    }
}