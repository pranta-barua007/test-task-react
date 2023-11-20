import { cache } from 'react'
import { prismaClient } from '../lib/prismaDb';

// not being used right now
// For converting GroupSelect to LEGO block
export const getAllBaseSectors = cache(async () => {
  const item = await prismaClient.sector.findMany({
    where: {
        parentId: null
    },
    include: {
        subSectors: true
    }
    });
  return item
});