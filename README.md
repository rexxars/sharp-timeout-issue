# sharp-timeout

An example illustrating that sharp only respects the timeout on "processing" the image, not on the encoding(?) stage.

Ideally, `.timeout({seconds: NUM_SECS})` should timeout the entire operation, not just the processing stage.

Additionally, it would be nice to have a way to cancel ongoing operations, eg something like:

```ts
import sharp from 'sharp'

try {
  const abortController = new AbortController()
  const image = sharp('input.jpg')
    .resize(1000, 1000)
    .toFormat('avif', {
      signal: abortController.signal
    })
} catch (err) {
  console.log(err instanceof AbortError) // true
}

// Later
abortController.abort()
```
