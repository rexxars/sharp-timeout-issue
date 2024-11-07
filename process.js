import sharp from 'sharp'

const formats = ['avif', 'webp', 'jpeg', 'png', 'gif']
const timeouts = [1, 2, 3]

for (const timeout of timeouts) {
  console.log('Timeout: %d seconds', timeout)
  for (const format of formats) {
    console.log('  [%s]', format)
    const start = Date.now()
    try {
      await sharp('./input.jpg')
        .timeout({seconds: timeout})
        .resize(2048, 2048)
        .toFormat(format, {effort: 6})
        .toFile(`./output/output.${format}`)

      const timeSpent = Date.now() - start
      const timeoutMs = timeout * 1000
      if (timeSpent > timeoutMs) {
        console.error('    ❌ Exceeded timeout by %d milliseconds without failing', timeSpent - timeoutMs)
      } else {
        console.log('    ✅ Processed image in less than %d seconds', timeout)
      }
    } catch (err) {
      if (err.message.includes('timeout')) {
        console.error('    ✅ Respected timeout of %d seconds', timeout)
      } else {
        console.error('    Failed to process image, spent %d ms', Date.now() - start)
        console.error('    %s', err.message.trim().replace(/\n/g, '\n    '))
      }
    }
  }
}
