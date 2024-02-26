import { load } from 'cheerio'

export const getMetadataFromUrl = async (url: string) => {
  const source = await fetch(url)
  const $ = load(await source.text())

  return {
    title: $('meta[property="og:title"]').attr('content') ?? '',
    description: $('meta[property="og:description"]').attr('content') ?? '',
    image: $('meta[property="og:image"]').attr('content') ?? ''
  }
}
