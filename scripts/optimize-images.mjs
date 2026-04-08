import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, extname, basename } from 'path'

const INPUT_DIR = 'public/images'
const QUALITY = 82

const MAPPING = [
  ['Handicamp_socky_2025-106.jpg', 'handicamp-foto-01.webp'],
  ['Handicamp_socky_2025-117.jpg', 'handicamp-foto-02.webp'],
  ['Handicamp_socky_2025-128.jpg', 'handicamp-foto-03.webp'],
  ['Handicamp_socky_2025-173.jpg', 'handicamp-foto-04.webp'],
  ['Handicamp_socky_2025-175.jpg', 'handicamp-foto-05.webp'],
  ['Handicamp_socky_2025-49.jpg',  'handicamp-foto-06.webp'],
  ['Handicamp_socky_2025-61.jpg',  'handicamp-foto-07.webp'],
  ['Handicamp_socky_2025-66.jpg',  'handicamp-foto-08.webp'],
  ['Handicamp_socky_2025-78.jpg',  'handicamp-foto-09.webp'],
  ['Handicamp_socky_2025-80.jpg',  'handicamp-foto-10.webp'],
  ['Handicamp_socky_2025-88.jpg',  'handicamp-foto-11.webp'],
  ['IMG_0394.jpg',                 'handicamp-foto-12.webp'],
  ['IMG_0411.jpg',                 'handicamp-foto-13.webp'],
  ['IMG_0491.jpg',                 'handicamp-foto-14.webp'],
  ['IMG_0518.jpg',                 'handicamp-foto-15.webp'],
  ['IMG_0574.jpg',                 'handicamp-foto-16.webp'],
  ['IMG_0617.jpg',                 'handicamp-foto-17.webp'],
  ['IMG_0621.jpg',                 'handicamp-foto-18.webp'],
  ['IMG_0773.jpg',                 'handicamp-foto-19.webp'],
  ['IMG_0869.jpg',                 'handicamp-foto-20.webp'],
  ['IMG_0992.jpg',                 'handicamp-foto-21.webp'],
  ['IMG_1521.jpg',                 'handicamp-foto-22.webp'],
  ['IMG_1523.jpg',                 'handicamp-foto-23.webp'],
  ['IMG_1559.jpg',                 'handicamp-foto-24.webp'],
  ['IMG_1852.jpg',                 'handicamp-foto-25.webp'],
  ['IMG_1939.jpg',                 'handicamp-foto-26.webp'],
  ['IMG_4366.jpg',                 'handicamp-foto-27.webp'],
  ['IMG_4504.jpg',                 'handicamp-foto-28.webp'],
]

// Delete the unreferenced HEIC file
const heifPath = join(INPUT_DIR, 'IMG_1082.HEIC.heif')
try {
  await unlink(heifPath)
  console.log(`Deleted ${heifPath}`)
} catch {
  console.log(`Skipped (not found): ${heifPath}`)
}

for (const [oldName, newName] of MAPPING) {
  const inputPath = join(INPUT_DIR, oldName)
  const outputPath = join(INPUT_DIR, newName)

  await sharp(inputPath)
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  await unlink(inputPath)

  const { size } = await import('fs').then(fs =>
    fs.promises.stat(outputPath)
  )
  console.log(`${oldName} → ${newName} (${(size / 1024).toFixed(0)} KB)`)
}

console.log('\nDone.')
