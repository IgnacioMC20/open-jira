import { status } from "../context/constants";

/**
 * interface SeedData {
 *  entries: SeedEntry[];
 * }
 * 
 * interface SeedEntry {
 *  description: string;
 *  status: string;
 *  createdAt: number; 
 * }
 */

export const seedData = {
    entries: [
        {
            description: `This is a description for entries initial state - ${status.pending}`,
            status: status.pending,
            createdAt: Date.now(),
        },
        {
            description: `This is a description for entries initial state - ${status.inProgress}`,
            status: status.inProgress,
            createdAt: Date.now() - 100000000000,
        },
        {
            description: `This is a description for entries initial state - ${status.finished}`,
            status: status.finished,
            createdAt: Date.now() - 100000000,
        },
    ],
}