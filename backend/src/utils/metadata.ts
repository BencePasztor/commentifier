import { load } from 'cheerio'

export const getMetadataFromUrl = async (url: string) => {
  const source = await fetch(url)
  const $ = load(await source.text())

  return {
    title: $('title').text() ?? '',
    description: $('meta[name="description"]').attr('content') ?? '',
    image: $('meta[property="og:image"]').attr('content') ?? ''
  }
}
